export const fetchFinancialAdvice = async (expenses: any): Promise<{ generated_text: string }[] | undefined> => {
    const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;
    try {
        const response = await fetch(`${BACKEND_URL}/api/getFinancialAdvice`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ expenses }),
        });

        if (!response.ok) {
            throw new Error(`Failed to fetch AI advice: ${response.statusText}`);
        }

        const data = await response.json();
        console.log("AI Advice:", data);

        return data; // ✅ Ensure the function returns data
    } catch (error) {
        console.error("Error fetching AI advice:", error);
        return undefined; // ✅ Return undefined if an error occurs
    }
};
