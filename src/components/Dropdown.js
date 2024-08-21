import React from 'react';

const Dropdown = ({ month, setMonth }) => {
  const handleMonthChange = (e) => {
    setMonth(e.target.value);
  };

  return (
    <div className="container mx-auto p-4">
      <label htmlFor="month" className="block text-sm font-medium text-gray-700 mb-2">Select Month:</label>
      <select
        id="month"
        className="w-72 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        onChange={handleMonthChange}
        value={month}
      >
        <option value="January">January</option>
        <option value="February">February</option>
        <option value="March">March</option>
        <option value="April">April</option>
        <option value="May">May</option>
        <option value="June">June</option>
        <option value="July">July</option>
        <option value="August">August</option>
        <option value="September">September</option>
        <option value="October">October</option>
        <option value="November">November</option>
        <option value="December">December</option>
      </select>
    </div>
  );
};

export default Dropdown;
