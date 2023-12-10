import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";
import Modal from "./Modal";
import "./AddExpense.css";

const AddExpense = () => {
  const notify = () => toast("Expense added successfully!");
  const notifyUpdate = () => toast("Expense updated successfully!");
  const notifyDelete = () => toast("Expense deleted successfully!");
  const [expenses, setExpenses] = useState([]);
  const [editIndex, setEditIndex] = useState(null);
  const getCurrentDate = () => {
    const today = new Date();
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, "0");
    const day = String(today.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  };

  const [expenseData, setExpenseData] = useState({
    expenseName: "",
    amount: "",
    date: getCurrentDate(),
    category: "",
  });

  const [isModalOpen, setModalOpen] = useState(false);

  const openModal = () => {
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setExpenseData({
      ...expenseData,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const newExpense = {
      expenseName: expenseData?.expenseName,
      amount: expenseData?.amount,
      date: expenseData?.date,
      category: expenseData?.category,
    };
    if (editIndex !== null) {
      setExpenses((prevExpenses) => {
        const updatedExpenses = [...prevExpenses];
        updatedExpenses[editIndex] = newExpense;
        return updatedExpenses;
      });
      setEditIndex(null);
      notifyUpdate();
    } else {
      setExpenses([...expenses, newExpense]);
      notify();
    }
    closeModal();
    setExpenseData({
      expenseName: "",
      amount: "",
      date: getCurrentDate(),
      category: "",
    });
  };

  const handleEditExpense = (index) => {
    openModal();
    setEditIndex(index);
    const editData = expenses[index];
    setExpenseData({
      expenseName: editData.expenseName,
      amount: editData.amount,
      date: editData.date,
      category: editData.category,
    });
  };

  const handleDeleteExpense = (index) => {
    setExpenses((prevExpenses) => prevExpenses.filter((_, i) => i !== index));
    notifyDelete();
  };

  useEffect(() => {
    const storedExpenses = localStorage.getItem("expenses");
    console.log("Stored Expenses:", storedExpenses);
    if (storedExpenses) {
      setExpenses(JSON.parse(storedExpenses));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("expenses", JSON.stringify(expenses));
    console.log("Expenses saved to localStorage:", expenses);
  }, [expenses]);

  return (
    <div className="add-expense">
      <h2>Add Expense here...</h2>
      <button className="addbut" onClick={openModal}>
        Add Expense
      </button>
      <Modal isOpen={isModalOpen}>
        <div>
          <h2>{editIndex ? "Edit Expense" : "Add Expense"}</h2>
          <form onSubmit={handleSubmit}>
            <div>
              <label>Expense Name:</label>
              <input
                type="text"
                name="expenseName"
                value={expenseData.expenseName}
                onChange={handleInputChange}
                required
              />
            </div>
            <div>
              <label>Amount:</label>
              <input
                type="number"
                name="amount"
                value={expenseData.amount}
                onChange={handleInputChange}
                required
              />
            </div>
            <div>
              <label>Date:</label>
              <input
                type="date"
                name="date"
                value={expenseData.date}
                onChange={handleInputChange}
                required
              />
            </div>
            <div>
              <label>Category:</label>
              <input
                type="text"
                name="category"
                value={expenseData.category}
                onChange={handleInputChange}
                required
              />
            </div>
            <div className="modal-foot">
              <button className="addbut" type="submit">
                Save
              </button>
              <button className="addbut" onClick={closeModal}>
                Cancel
              </button>
            </div>
          </form>
        </div>
      </Modal>
      <div className="expense-grid">
        {expenses.length > 0 &&
          expenses.map((expense, index) => (
            <div key={index} className="expense-box">
              <p>Expense Name: {expense?.expenseName}</p>
              <p>Amount: {expense?.amount}</p>
              <p>Date: {expense?.date}</p>
              <p>Category: {expense?.category}</p>
              <button
                className="addbut"
                onClick={() => handleEditExpense(index)}
              >
                Edit
              </button>
              <button
                className="addbut"
                onClick={() => handleDeleteExpense(index)}
              >
                Delete
              </button>
            </div>
          ))}
      </div>
    </div>
  );
};

export default AddExpense;
