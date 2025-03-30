import { useFinancialRecords } from "../../contexts/financial-record-context";
import { fetchFinancialAdvice } from "../../contexts/financial-advice";
import { useState } from "react";
import "./financial-record.css"; // Make sure to create and import this CSS file

const FinancialAdvice = () => {
    const { records } = useFinancialRecords();
    const [advice, setAdvice] = useState<string>("");
    const [loading, setLoading] = useState<boolean>(false);

    const handleFetchFinancialAdvice = async () => {
        if (!records || records.length === 0) {
            setAdvice("No records available to analyze.");
            return;
        }

        setLoading(true);
        try {
            const response = await fetchFinancialAdvice(records);

            if (response && Array.isArray(response) && response.length > 0) {
                const generatedText =
                    response[0].generated_text || "No advice received.";
                const adviceText =
                    generatedText.split("Transactions END")[1] || generatedText;

                setAdvice(adviceText.trim());
            } else {
                setAdvice("No valid advice received from AI.");
            }
        } catch (error) {
            console.error("Error fetching financial advice:", error);
            setAdvice("Failed to fetch advice. Please try again later.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="advice-container">
            <button onClick={handleFetchFinancialAdvice} disabled={loading}>
                {loading ? "Fetching Advice..." : "Get Financial Advice"}
            </button>

            {loading && (
                <div className="spinner-container">
                    <div className="spinner"></div>
                    <p>Loading...</p>
                </div>
            )}

            {advice && !loading && (
                <p className="advice-text">
                    <strong>AI Advice:</strong> {advice}
                </p>
            )}
        </div>
    );
};

export default FinancialAdvice;
