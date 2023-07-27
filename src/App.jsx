import React, { useState } from "react";
import "./App.css";

function App() {
  const [budget, setBudget] = useState(0);
  const [expenses, setExpenses] = useState([]);
  const [newExpense, setNewExpense] = useState({
    description: "",
    cost: 0,
    date: "",
    quantity: 1,
  });

  const handleBudgetChange = (event) => setBudget(Number(event.target.value));

  const handleNewExpenseChange = (field, value) =>
    setNewExpense((prev) => ({ ...prev, [field]: value }));

  const addExpense = () => {
    setExpenses((prev) => [...prev, newExpense]);
    setNewExpense({ description: "", cost: 0, date: "", quantity: 0 });
  };

  const deleteExpense = (index) =>
    setExpenses((prev) => prev.filter((_, i) => i !== index));

  const totalExpenses = expenses.reduce(
    (sum, { cost, quantity }) => sum + cost * quantity,
    0
  );

  const remainingBudget = budget - totalExpenses;

  const sortedExpenses = [...expenses].sort(
    (a, b) => new Date(b.date) - new Date(a.date)
  );

  return (
    <div className="App">
      <h1 className="title">Budget-Track</h1>
      <div className="header">
        <label>
          Total Budget:
          <input type="number" value={budget} onChange={handleBudgetChange} />
        </label>

        <span>
          ${totalExpenses.toLocaleString()} spent, $
          {remainingBudget.toLocaleString()} remaining
        </span>
      </div>

      <div className="expense-form">
        <label>
          Item Description:
          <input
            type="text"
            value={newExpense.description}
            onChange={(event) =>
              handleNewExpenseChange("description", event.target.value)
            }
          />
        </label>

        <label>
          Cost:
          <input
            type="number"
            value={newExpense.cost}
            onChange={(event) =>
              handleNewExpenseChange("cost", Number(event.target.value))
            }
          />
        </label>

        <label>
          Quantity:
          <input
            type="number"
            value={newExpense.quantity}
            onChange={(event) =>
              handleNewExpenseChange("quantity", Number(event.target.value))
            }
          />
        </label>

        <label>
          Date of Purchase:
          <input
            type="date"
            value={newExpense.date}
            onChange={(event) =>
              handleNewExpenseChange("date", event.target.value)
            }
          />
        </label>

        <button className="add" onClick={addExpense}>Add Expense</button>
      </div>

      {sortedExpenses.map((expense, index) => (
        <div className="expense" key={index}>
          <p>Item Description: {expense.description}</p>
          <p>Cost: ${expense.cost.toLocaleString()}</p>
          <p>Quantity: {expense.quantity}</p>
          <p>Date of Purchase: {expense.date}</p>

          <button className="delete" onClick={() => deleteExpense(index)}>Delete</button>
        </div>
      ))}
    </div>
  );
}

export default App;
