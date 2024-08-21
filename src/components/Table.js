import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Table = ({ month }) => {
  const [transactions, setTransactions] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredTransactions, setFilteredTransactions] = useState([]);

  useEffect(() => {
    const fetchTransactions = async () => {
      try {
        const response = await axios.get('http://localhost:3002/transactions', {
          params: {
            month,
            page,
            limit: 10,
          },
        });

        setTransactions(response.data.transactions);
        setTotalPages(response.data.totalPages);
      } catch (error) {
        console.error("Error fetching transactions:", error);
      }
    };

    fetchTransactions();
  }, [month, page]);

  useEffect(() => {
    setFilteredTransactions(
      transactions.filter(transaction =>
        transaction.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        transaction.description.toLowerCase().includes(searchTerm.toLowerCase())
      )
    );
  }, [searchTerm, transactions]);

  return (
    <div className="container mx-auto p-4">
      <div className="  mb-4 rounded-lg   ">
        <input
          type="text"
          placeholder="Search by title or description..."
          className="w-72 px-4 py-2 border border-gray-300 rounded-lg "
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      <div className="overflow-x-auto ">
        <table className="min-w-full bg-white border border-gray-200 rounded-lg shadow-sm">
          <thead>
            <tr className="bg-gray-100 text-left text-sm leading-4 text-gray-600 uppercase tracking-wider">
              <th className="px-6 py-3 border-b border-gray-200">ID</th>
              <th className="px-6 py-3 border-b border-gray-200">Title</th>
              <th className="px-6 py-3 border-b border-gray-200">Description</th>
              <th className="px-6 py-3 border-b border-gray-200">Price</th>
              <th className="px-6 py-3 border-b border-gray-200">Category</th>
              <th className="px-6 py-3 border-b border-gray-200">Sold</th>
              <th className="px-6 py-3 border-b border-gray-200">Image</th>
            </tr>
          </thead>
          <tbody className="text-sm text-gray-700">
            {filteredTransactions.length > 0 ? (
              filteredTransactions.map((transaction) => (
                <tr key={transaction._id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 border-b border-gray-200">{transaction._id}</td>
                  <td className="px-6 py-4 border-b border-gray-200">{transaction.title}</td>
                  <td className="px-6 py-4 border-b border-gray-200">{transaction.description}</td>
                  <td className="px-6 py-4 border-b border-gray-200">${transaction.price}</td>
                  <td className="px-6 py-4 border-b border-gray-200">{transaction.category}</td>
                  <td className="px-6 py-4 border-b border-gray-200">{transaction.sold ? 'Yes' : 'No'}</td>
                  <td className="px-6 py-4 border-b border-gray-200">
                    <img src={transaction.image} alt={transaction.title} className="w-10 h-10 rounded-full" />
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="7" className="text-center py-4">No data available</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      <div className="mt-4 flex justify-between items-center">
        <span className="text-sm text-gray-600">Showing {filteredTransactions.length} of {transactions.length} entries</span>
        <div>
          <button
            className="px-3 py-1 mr-2 text-sm text-gray-700 bg-gray-200 rounded hover:bg-gray-300"
            onClick={() => setPage(page - 1)}
            disabled={page === 1}
          >
            Previous
          </button>
          <button
            className="px-3 py-1 text-sm text-gray-700 bg-gray-200 rounded hover:bg-gray-300"
            onClick={() => setPage(page + 1)}
            disabled={page === totalPages}
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
};

export default Table;
