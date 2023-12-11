import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";
import axios from "axios";
import Modal from "./Modal";
import "./AddExpense.css";

const AddExpense = () => {
  const token = localStorage.getItem("token");
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

  const getAllExpense = async () => {
    await axios
      .get("http://localhost:3000/expense/all-expenses", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        if (response.status === 200) {
          setExpenses(response.data);
        }
      })
      .catch((error) => {
        console.log(error);
        toast(error.response.data.message);
      });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (editIndex !== null) {
      await axios
        .post(
          "http://localhost:3000/expense/edit-expense",
          {
            ...expenseData,
            expenseId: editIndex,
          },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        )
        .then((response) => {
          console.log("id...", response);
          if (response.status === 200) {
            setExpenseData({
              expenseName: response.data.expenseName,
              amount: response.data.amount,
              date: response.data.date,
              category: response.data.category,
            });
            notifyUpdate();
          }
        })
        .catch((error) => {
          console.log(error);
          toast(error.response.data.message);
        });
    } else {
      await axios
        .post(
          "http://localhost:3000/expense/add-expense",
          {
            ...expenseData,
          },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        )
        .then((response) => {
          if (response.status == 200) {
            notify();
          }
        })
        .catch((error) => {
          console.log(error);
          toast(error.response.data.message);
        });
    }

    closeModal();
    getAllExpense();
    setExpenseData({
      expenseName: "",
      amount: "",
      date: getCurrentDate(),
      category: "",
    });
  };

  const handleEditExpense = async (Id) => {
    setEditIndex(Id);
    openModal();
    await axios
      .get(`http://localhost:3000/expense/get-expense?id=${Id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        console.log("id...", response);
        if (response.status == 200) {
          setExpenseData({
            expenseName: response.data.expenseName,
            amount: response.data.amount,
            date: response.data.date,
            category: response.data.category,
          });
        }
      })
      .catch((error) => {
        console.log(error);
        toast(error.response.data.message);
      });
  };

  const handleDeleteExpense = async (id) => {
    await axios
      .delete(`http://localhost:3000/expense/delete-expenses/?id=${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        console.log("id...", response);
        if (response.status == 200) {
          notifyDelete();
          getAllExpense();
        }
      })
      .catch((error) => {
        console.log(error);
        toast(error.response.data.message);
      });
  };

  useEffect(() => {
    getAllExpense();
  }, []);

  useEffect(() => {
    localStorage.setItem("expenses", JSON.stringify(expenses));
    console.log("Expenses saved to localStorage:", expenses);
  }, [expenses]);

  return (
    <div className="add-expense">
      <h1>Add Expense here...</h1>
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
              <select
                name="category"
                className="category-select"
                value={expenseData.category}
                onChange={handleInputChange}
                required
              >
                <option value="">select</option>
                <option value="entertainment">Entertainment</option>
                <option value="food">Food</option>
                <option value="health">Health</option>
                <option value="transportation">Transportation</option>
              </select>
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
        {expenses?.length > 0 &&
          expenses?.map((expense, index) => (
            <div key={index} className="expense-box">
              <p>Expense Name: {expense?.expenseName}</p>
              <p>Amount: {expense?.amount}</p>
              <p>Date: {expense?.date}</p>
              <p>Category: {expense?.category}</p>
              <button
                className="addbut"
                onClick={() => handleEditExpense(expense._id)}
              >
                Edit
              </button>
              <button
                className="addbut"
                onClick={() => handleDeleteExpense(expense._id)}
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
