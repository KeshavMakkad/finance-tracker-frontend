import { createContext, useContext, useEffect, useState } from "react";

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

export interface FinancialRecord {
    _id?: string;
    userId: string;
    date: Date;
    description: string;
    amount: number;
    category: string;
    paymentMethod: string;
}

interface FinancialRecordsContextType {
    records: FinancialRecord[];
    userId: string;
    addRecord: (record: FinancialRecord) => void;
    updateRecord: (id: string, newRecord: FinancialRecord) => void;
    deleteRecord: (id: string) => void;
}

export const FinancialRecordsContext = createContext<
    FinancialRecordsContextType | undefined
>(undefined);

export const FinancialRecordsProvider = ({
    children,
    userId,
}: {
    children: React.ReactNode;
    userId: string;
}) => {
    const [records, setRecords] = useState<FinancialRecord[]>([]);

    const fetchRecords = async () => {
        try {
            const response = await fetch(
                `${BACKEND_URL}/financial-records/getAllByUserID/${userId}`
            );
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
            const records = await response.json();
            setRecords(records);
        } catch (error) {
            console.error("Error fetching records:", error);
        }
    };

    useEffect(() => {
        fetchRecords();
    }, [userId]);

    const addRecord = async (record: FinancialRecord) => {
        const response = await fetch(`${BACKEND_URL}/financial-records`, {
            method: "POST",
            body: JSON.stringify({ ...record, userId }),
            headers: { "Content-Type": "application/json" },
        });

        if (response.ok) {
            const newRecord = await response.json();
            setRecords((prev) => [...prev, newRecord]);
        }
    };

    const updateRecord = async (id: string, newRecord: FinancialRecord) => {
        const response = await fetch(`${BACKEND_URL}/financial-records/${id}`, {
            method: "PUT",
            body: JSON.stringify(newRecord),
            headers: { "Content-Type": "application/json" },
        });

        if (response.ok) {
            const updatedRecord = await response.json();
            setRecords((prev) =>
                prev.map((record) => (record._id === id ? updatedRecord : record))
            );
        }
    };

    const deleteRecord = async (id: string) => {
        const response = await fetch(`${BACKEND_URL}/financial-records/${id}`, {
            method: "DELETE",
        });

        if (response.ok) {
            setRecords((prev) => prev.filter((record) => record._id !== id));
        }
    };

    return (
        <FinancialRecordsContext.Provider
            value={{ records, userId, addRecord, updateRecord, deleteRecord }}
        >
            {children}
        </FinancialRecordsContext.Provider>
    );
};

export const useFinancialRecords = () => {
    const context = useContext(FinancialRecordsContext);
    if (!context) {
        throw new Error("useFinancialRecords must be used within a FinancialRecordsProvider");
    }
    return context;
};
