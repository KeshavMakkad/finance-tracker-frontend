import "./App.css";
import { BrowserRouter as Router, Routes, Route, Link, Navigate } from "react-router-dom";
import { FinancialRecordsProvider } from "./contexts/financial-record-context";
import { FinancialRecordForm } from "./pages/dashboard/financial-record-form";
import { FinancialRecordList } from "./pages/dashboard/financial-record-list";
import FinancialAdvice from "./pages/dashboard/financial-advice";

function App() {
    const userId = "user_123456"; // Hardcoded user ID

    return (
        <Router>
            <div className="app-container">
                <div className="navbar">
                    <div className="nav-links">
                        <Link to="/add"><button className="nav-button">Add Finance</button></Link>
                        <Link to="/view"><button className="nav-button">See Finances</button></Link>
                        <Link to="/advice"><button className="nav-button">Get Personalized Advice</button></Link>
                    </div>
                    <div className="user-container">
                        <p className="user-id-display">User: {userId}</p>
                    </div>
                </div>

                <FinancialRecordsProvider userId={userId}>
                    <Routes>
                        <Route path="/" element={<Navigate to="/add" />} />
                        <Route path="/add" element={<FinancialRecordForm />} />
                        <Route path="/view" element={<FinancialRecordList />} />
                        <Route path="/advice" element={<FinancialAdvice />} />
                    </Routes>
                </FinancialRecordsProvider>
            </div>
        </Router>
    );
}

export default App;
