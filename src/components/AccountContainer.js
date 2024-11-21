import React, { useState, useEffect } from "react";
import Search from "./Search";
import TransactionTable from "./TransactionTable";
import TransactionForm from "./TransactionForm";

function AccountContainer() {
  const [transactions, setTransactions] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    fetch("http://localhost:3000/transactions")
      .then((response) => response.json())
      .then((data) => setTransactions(data));
  }, []);

  
  const handleAddTransaction = (newTransaction) => {
    setTransactions([...transactions, newTransaction]);
  };

  
  const filteredTransactions = transactions.filter((transaction) =>
    transaction.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div>
      <Search onSearch={setSearchTerm} />
      <TransactionForm onAddTransaction={handleAddTransaction} />
      <TransactionTable transactions={filteredTransactions} />
    </div>
  );
}

export default AccountContainer;
