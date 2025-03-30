import { useUser } from "@clerk/clerk-react";
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
    addRecord: (record: FinancialRecord) => void;
    updateRecord: (id: string, newRecord: FinancialRecord) => void;
    deleteRecord: (id: string) => void;
}

export const FinancialRecordsContext = createContext<
    FinancialRecordsContextType | undefined
>(undefined);

export const FinancialRecordsProvider = ({
    children,
}: {
    children: React.ReactNode;
}) => {
    const [records, setRecords] = useState<FinancialRecord[]>([]);
    const { user } = useUser();

    const fetchRecords = async () => {
        if (!user) return;
        try {
            const response = await fetch(
                `${BACKEND_URL}/financial-records/getAllByUserID/${user.id}`
            );
            console.log("Helloo")
    
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
            console.log(response)
    
            const records = await response.json();
            console.log(records);
            setRecords(records);
        } catch (error) {
            console.error("Error fetching records:", error);
        }
    };
    
    useEffect(() => {
        fetchRecords();
    }, [user]);

    const addRecord = async (record: FinancialRecord) => {
        const response = await fetch(`${BACKEND_URL}/financial-records`, {
            method: "POST",
            body: JSON.stringify(record),
            headers: {
                "Content-Type": "application/json",
            },
        });

        try {
            if (response.ok) {
                const newRecord = await response.json();
                setRecords((prev) => [...prev, newRecord]);
            }
        } catch (err) {
            console.error(err)
        }
    };

    const updateRecord = async (id: string, newRecord: FinancialRecord) => {
        const response = await fetch(`${BACKEND_URL}/financial-records/${id}`, {
            method: "PUT",
            body: JSON.stringify(newRecord),
            headers: {
                "Content-Type": "application/json",
            },
        });

        try {
            if (response.ok) {
                const newRecord = await response.json();
                setRecords((prev) =>
                    prev.map((record) => {
                        if (record._id === id) {
                            return newRecord;
                        } else {
                            return record;
                        }
                    })
                );
            }
        } catch (err) {}
    };

    const deleteRecord = async (id: string) => {
        const response = await fetch(`${BACKEND_URL}/financial-records/${id}`, {
            method: "DELETE",
        });

        try {
            if (response.ok) {
                const deletedRecord = await response.json();
                setRecords((prev) =>
                    prev.filter((record) => record._id !== deletedRecord._id)
                );
            }
        } catch (err) {

        }
    };

    return (
        <FinancialRecordsContext.Provider
            value={{ records, addRecord, updateRecord, deleteRecord }}
        >
            {children}
        </FinancialRecordsContext.Provider>
    );
};

export const useFinancialRecords = () => {
    const context = useContext<FinancialRecordsContextType | undefined>(
        FinancialRecordsContext
    );

    if (!context) {
        throw new Error(
            "useFinancialRecords must be used within a FinancialRecordsProvider"
        );
    }

    return context;
};
