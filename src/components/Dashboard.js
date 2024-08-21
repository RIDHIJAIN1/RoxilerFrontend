import React, { useEffect, useState } from 'react'
import Table from './Table'
import Dropdown from './Dropdown'
import Statistics from './Statistics'
import PieChart from './PieChart'
import BarChart from './BarChart'
import axios from 'axios'

const Dashboard = () => {
  const [month, setMonth] = useState('March'); // Default to March
  const [statistics, setStatistics] = useState({
    totalSalesAmount: 0,
    totalSoldItems: 0,
    totalNotSoldItems: 0
  });

  useEffect(() => {
    // Fetch statistics data whenever the selected month changes
    const fetchStatistics = async () => {
      try {
        const response = await axios.get('http://localhost:3002/statistics', {
          params: { month },
        });
        setStatistics({
          totalSalesAmount: response.data.totalSales,
          totalSoldItems: response.data.soldItems,
          totalNotSoldItems: response.data.unsoldItems,
        });
      } catch (error) {
        console.error("Error fetching statistics:", error);
      }
    };

    fetchStatistics();
  }, [month]);



  return (
    <div>
      <div className='bg-blue-300'>
      <div className="flex justify-center items-center ">
      <div className="bg-white rounded-full w-44 h-44 flex items-center justify-center shadow-lg mt-5">
        <h1 className="font-black text-center text-xl text-gray-800">TRANSACTION DASHBOARD</h1>
      </div>
    </div>
         <Dropdown smonth={month} setMonth={setMonth}/>
          <Table month={month}/>
          <Statistics   totalSalesAmount={statistics.totalSalesAmount} 
        totalSoldItems={statistics.totalSoldItems} 
        totalNotSoldItems={statistics.totalNotSoldItems} />
          <PieChart month={month}/>
          <BarChart month={month} />
      </div>
    </div>
  )
}

export default Dashboard
