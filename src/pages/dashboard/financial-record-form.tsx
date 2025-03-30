import { useState } from "react";
import { useUser } from "@clerk/clerk-react";
import { useFinancialRecords } from "../../contexts/financial-record-context";
import "./financial-record.css";

export const FinancialRecordForm = () => {
  const [description, setDescription] = useState<string>("");
  const [amount, setAmount] = useState<string>("");
  const [category, setCategory] = useState<string>("");
  const [paymentMethod, setPaymentMethod] = useState<string>("");
  const [errors, setErrors] = useState({
    description: false,
    amount: false,
    category: false,
    paymentMethod: false,
  });
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const { addRecord } = useFinancialRecords();
  const { user } = useUser();

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setSuccessMessage(null);
    setErrorMessage(null);

    // Check for empty fields and set errors
    const newErrors = {
      description: description.trim() === "",
      amount: amount.trim() === "" || isNaN(parseFloat(amount)),
      category: category.trim() === "",
      paymentMethod: paymentMethod.trim() === "",
    };

    setErrors(newErrors);

    if (Object.values(newErrors).some((error) => error)) {
      setErrorMessage("Please fill in all fields correctly.");
      return;
    }

    // Create a new record
    const newRecord = {
      userId: user?.id ?? "",
      date: new Date(),
      description: description.trim(),
      amount: parseFloat(amount),
      category: category.trim(),
      paymentMethod: paymentMethod.trim(),
    };

    addRecord(newRecord);
    setSuccessMessage("Record added successfully!");
    setDescription("");
    setAmount("");
    setCategory("");
    setPaymentMethod("");
    setErrors({ description: false, amount: false, category: false, paymentMethod: false });
  };

  return (
    <div className="form-container">
      <form onSubmit={handleSubmit}>
        {successMessage && <p className="success-message">{successMessage}</p>}
        {errorMessage && <p className="error-message">{errorMessage}</p>}

        <div className="form-field">
          <label>Description:</label>
          <input
            type="text"
            className={`input ${errors.description ? "input-error" : ""}`}
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
          {errors.description && <p className="error-text">Description is required.</p>}
        </div>

        <div className="form-field">
          <label>Amount:</label>
          <input
            type="number"
            className={`input ${errors.amount ? "input-error" : ""}`}
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            placeholder="Ex. 100"
          />
          {errors.amount && <p className="error-text">Enter a valid amount.</p>}
        </div>

        <div className="form-field">
          <label>Category:</label>
          <select
            className={`input ${errors.category ? "input-error" : ""}`}
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          >
            <option value="">Select a Category</option>
            <option value="Food">Food</option>
            <option value="Rent">Rent</option>
            <option value="Salary">Salary</option>
            <option value="Utilities">Utilities</option>
            <option value="Entertainment">Entertainment</option>
            <option value="Other">Other</option>
          </select>
          {errors.category && <p className="error-text">Category is required.</p>}
        </div>

        <div className="form-field">
          <label>Payment Method:</label>
          <select
            className={`input ${errors.paymentMethod ? "input-error" : ""}`}
            value={paymentMethod}
            onChange={(e) => setPaymentMethod(e.target.value)}
          >
            <option value="">Select a Payment Method</option>
            <option value="Credit Card">Credit Card</option>
            <option value="Cash">Cash</option>
            <option value="Bank Transfer">Bank Transfer</option>
          </select>
          {errors.paymentMethod && <p className="error-text">Payment method is required.</p>}
        </div>

        <button type="submit" className="button">
          Add Record
        </button>
      </form>
    </div>
  );
};
  