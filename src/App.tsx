import "./App.css";
import {
    BrowserRouter as Router,
    Routes,
    Route,
    Link,
    Navigate,
} from "react-router-dom";
import { Auth } from "./pages/auth";
import { FinancialRecordsProvider } from "./contexts/financial-record-context";
import {
    SignedIn,
    UserButton,
    SignedOut,
    SignInButton,
} from "@clerk/clerk-react";
import { FinancialRecordForm } from "./pages/dashboard/financial-record-form";
import { FinancialRecordList } from "./pages/dashboard/financial-record-list";
import FinancialAdvice from "./pages/dashboard/financial-advice";

function App() {
    return (
        <Router>
            <div className="app-container">
                <div className="navbar">
                    {/* Left-aligned navigation buttons */}
                    <div className="nav-links">
                        <SignedIn>
                            <Link to="/add">
                                <button className="nav-button">
                                    Add Finance
                                </button>
                            </Link>
                            <Link to="/view">
                                <button className="nav-button">
                                    See Finances
                                </button>
                            </Link>
                            <Link to="/advice">
                                <button className="nav-button">
                                    Get Personalized Advice
                                </button>
                            </Link>
                        </SignedIn>
                    </div>

                    {/* Right-aligned profile/user button */}
                    <div className="user-container">
                        <SignedIn>
                            <UserButton />
                        </SignedIn>
                        <SignedOut>
                            <div className="sign-in-button-container">
                                <SignInButton mode="modal" />
                            </div>
                        </SignedOut>
                    </div>
                </div>

                <Routes>
                    {/* Redirect root ("/") to "/add" */}
                    <Route path="/" element={<Navigate to="/add" />} />
                    <Route path="/auth" element={<Auth />} />
                    <Route
                        path="/add"
                        element={
                            <FinancialRecordsProvider>
                                <FinancialRecordForm />
                            </FinancialRecordsProvider>
                        }
                    />
                    <Route
                        path="/view"
                        element={
                            <FinancialRecordsProvider>
                                <FinancialRecordList />
                            </FinancialRecordsProvider>
                        }
                    />
                    <Route
                        path="/advice"
                        element={
                            <FinancialRecordsProvider>
                                <FinancialAdvice />
                            </FinancialRecordsProvider>
                        }
                    />
                </Routes>
            </div>
        </Router>
    );
}

export default App;
