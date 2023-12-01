// ExpenseContextProvider.jsx
import React, { createContext, useContext } from "react";

const ExpenseContext = createContext();

const ExpenseContextProvider = ({ children }) => {
  // Your context provider logic here

  return (
    <ExpenseContext.Provider
      value={
        {
          /* your context values */
        }
      }
    >
      {children}
    </ExpenseContext.Provider>
  );
};

const useExpenseContext = () => {
  const context = useContext(ExpenseContext);
  if (!context) {
    throw new Error(
      "useExpenseContext must be used within an ExpenseContextProvider"
    );
  }
  return context;
};

export { ExpenseContextProvider, useExpenseContext };
