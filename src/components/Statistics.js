import React from 'react';

const Statistics = ({ totalSalesAmount, totalSoldItems, totalNotSoldItems }) => {
  return (
    <div className="container mx-auto p-4">
      <h2 className="text-2xl font-semibold text-gray-700 mb-4">Statistics</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h3 className="text-lg font-medium text-gray-800">Total Sales Amount</h3>
          <p className="mt-2 text-2xl font-bold text-blue-600">${totalSalesAmount}</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h3 className="text-lg font-medium text-gray-800">Total Sold Items</h3>
          <p className="mt-2 text-2xl font-bold text-green-600">{totalSoldItems}</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h3 className="text-lg font-medium text-gray-800">Total Not Sold Items</h3>
          <p className="mt-2 text-2xl font-bold text-red-600">{totalNotSoldItems}</p>
        </div>
      </div>
    </div>
  );
};

export default Statistics;
