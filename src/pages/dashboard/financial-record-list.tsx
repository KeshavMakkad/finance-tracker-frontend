import { useMemo, useState } from "react";
import {
    FinancialRecord,
    useFinancialRecords,
} from "../../contexts/financial-record-context";
import { useTable, Column, CellProps } from "react-table";
import { Pie } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import "./financial-record.css";

ChartJS.register(ArcElement, Tooltip, Legend);

interface EditableCellProps extends CellProps<FinancialRecord> {
    updateRecord: (rowIndex: number, columnId: string, value: any) => void;
    editable: boolean;
}

const EditableCell: React.FC<EditableCellProps> = ({
    value: initialValue,
    row,
    column,
    updateRecord,
    editable,
}) => {
    const [isEditing, setIsEditing] = useState(false);
    const [value, setValue] = useState(initialValue);
    const onBlur = () => {
        setIsEditing(false);
        updateRecord(row.index, column.id, value);
    };

    return (
        <div
            onClick={() => editable && setIsEditing(true)}
            style={{ cursor: editable ? "pointer" : "default" }}
        >
            {isEditing ? (
                <input
                    value={value}
                    onChange={(e) => setValue(e.target.value)}
                    autoFocus
                    onBlur={onBlur}
                    style={{ width: "100%" }}
                />
            ) : (
                value?.toString() || "-"
            )}
        </div>
    );
};

export const FinancialRecordList = () => {
    const { records, updateRecord, deleteRecord } = useFinancialRecords();
    const [chartVisible, setChartVisible] = useState(false);

    const updateCellRecord = (
        rowIndex: number,
        columnId: string,
        value: any
    ) => {
        const id = records[rowIndex]?._id;
        if (id) {
            updateRecord(id, { ...records[rowIndex], [columnId]: value });
        }
    };

    const columns: Array<Column<FinancialRecord>> = useMemo(
        () => [
            {
                Header: "Description",
                accessor: "description",
                Cell: (props) => (
                    <EditableCell
                        {...props}
                        updateRecord={updateCellRecord}
                        editable={true}
                    />
                ),
            },
            {
                Header: "Amount",
                accessor: "amount",
                Cell: (props) => (
                    <EditableCell
                        {...props}
                        updateRecord={updateCellRecord}
                        editable={true}
                    />
                ),
            },
            {
                Header: "Category",
                accessor: "category",
                Cell: (props) => (
                    <EditableCell
                        {...props}
                        updateRecord={updateCellRecord}
                        editable={true}
                    />
                ),
            },
            {
                Header: "Payment Method",
                accessor: "paymentMethod",
                Cell: (props) => (
                    <EditableCell
                        {...props}
                        updateRecord={updateCellRecord}
                        editable={true}
                    />
                ),
            },
            {
                Header: "Date",
                accessor: "date",
                Cell: (props) => (
                    <EditableCell
                        {...props}
                        updateRecord={updateCellRecord}
                        editable={false}
                    />
                ),
            },
            {
                Header: "Delete",
                id: "delete",
                Cell: ({ row }) => (
                    <button
                        onClick={() => deleteRecord(row.original._id ?? "")}
                        className="button"
                    >
                        Delete
                    </button>
                ),
            },
        ],
        [records]
    );

    const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
        useTable({
            columns,
            data: records,
        });

    // Generate Pie Chart Data
    const categoryTotals = useMemo(() => {
        return records.reduce((acc, record) => {
            acc[record.category] = (acc[record.category] || 0) + record.amount;
            return acc;
        }, {} as Record<string, number>);
    }, [records]);

    const togglePieChart = () => {
        const pieChart: HTMLDivElement | null = document.querySelector('.pie-chart');
        if (pieChart) {
            const isCurrentlyVisible = pieChart.style.display === "block";
            pieChart.style.display = isCurrentlyVisible ? "none" : "block";
            setChartVisible(!isCurrentlyVisible);
        }
    };

    

    const pieChartData = {
        labels: Object.keys(categoryTotals),
        datasets: [
            {
                data: Object.values(categoryTotals),
                backgroundColor: [
                    "#ff6384",
                    "#36a2eb",
                    "#ffce56",
                    "#4bc0c0",
                    "#9966ff",
                    "#ff9f40",
                ],
                hoverBackgroundColor: [
                    "#ff4b5c",
                    "#2a9df4",
                    "#ffb400",
                    "#26a69a",
                    "#8a2be2",
                    "#ff8c00",
                ],
            },
        ],
    };

    return (
        <>
            <div className="list-container">
                <table {...getTableProps()} className="table">
                    <thead>
                        {headerGroups.map((hg) => (
                            <tr {...hg.getHeaderGroupProps()}>
                                {hg.headers.map((column) => (
                                    <th {...column.getHeaderProps()}>
                                        {column.render("Header")}
                                    </th>
                                ))}
                            </tr>
                        ))}
                    </thead>
                    <tbody {...getTableBodyProps()}>
                        {rows.map((row) => {
                            prepareRow(row);
                            return (
                                <tr {...row.getRowProps()}>
                                    {row.cells.map((cell) => (
                                        <td {...cell.getCellProps()}>
                                            {cell.render("Cell")}
                                        </td>
                                    ))}
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
            </div>
            <div className="chart-container">
                <button onClick={togglePieChart}>
                    {chartVisible ? "Hide Spending Chart" : "See Your Spending Chart"}
                </button>

                {records.length > 0 && (
                    <div className="pie-chart" style={{display: "none"}}>
                        <h3>Expense Distribution by Category</h3>
                        <Pie data={pieChartData} />
                    </div>
                )}
            </div>
        </>
    );
};
