import React, { useState, useEffect } from "react";
import axios from "axios";
import ExpenseList from "./ExpenseList";
import FilterOptions from "./FilterOptions";
import Pagination from "./Pagination";
import ExpenseEditForm from "./ExpenseEditForm";
import Modal from "../addexpense/Modal";
import { toast } from "react-toastify";
import "./ExpenseHistory.css";

const ExpenseHistory = () => {
  const token = localStorage.getItem("token");
  const [expenses, setExpenses] = useState([]);
  const [filteredExpenses, setFilteredExpenses] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
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
  const notifyUpdate = () => toast("Expense updated successfully!");
  const notifyDelete = () => toast("Expense deleted successfully!");
  const expensesPerPage = 5;

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
        if (response.status == 200) {
          setExpenses(response.data);
          setFilteredExpenses(response.data);
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

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const handleFilter = (filterType, filterValue) => {
    let filteredExpenses = [...expenses];

    if (filterType === "dateRange") {
      filteredExpenses = filteredExpenses.filter((expense) => {
        return expense.date === filterValue;
      });
    } else if (filterType === "category") {
      filteredExpenses = filteredExpenses.filter(
        (expense) =>
          expense.category.toLowerCase() === filterValue.toLowerCase()
      );
    } else if (filterType === "amount") {
      filteredExpenses = filteredExpenses.filter(
        (expense) => expense.amount === +filterValue
      );
    } else if (filterType === "expenseName") {
      filteredExpenses = filteredExpenses.filter((expense) =>
        expense.expenseName.toLowerCase().includes(filterValue.toLowerCase())
      );
    }

    setFilteredExpenses(filteredExpenses);
    setCurrentPage(1);
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

  const handleSaveEdit = async () => {
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
          if (response.status == 200) {
            closeModal();
            getAllExpense();
            setEditIndex(null);
            notifyUpdate();
            setExpenseData({
              expenseName: "",
              amount: "",
              date: getCurrentDate(),
              category: "",
            });
          }
        })
        .catch((error) => {
          console.log(error);
          toast(error.response.data.message);
        });
    }
  };

  return (
    <div className="expensehistory">
      <h1>Expense History</h1>
      <FilterOptions onFilterChange={handleFilter} />
      {editIndex !== null ? (
        <Modal isOpen={isModalOpen}>
          <ExpenseEditForm
            expense={expenseData}
            onSaveEdit={handleSaveEdit}
            handleInputChange={handleInputChange}
            closeModal={closeModal}
          />
        </Modal>
      ) : (
        <>
          <ExpenseList
            expenses={filteredExpenses}
            onDeleteExpense={handleDeleteExpense}
            currentPage={currentPage}
            expensesPerPage={expensesPerPage}
            onEditExpense={handleEditExpense}
          />
          <Pagination
            expensesPerPage={expensesPerPage}
            totalExpenses={filteredExpenses.length}
            paginate={paginate}
          />
        </>
      )}
    </div>
  );
};

export default ExpenseHistory;
