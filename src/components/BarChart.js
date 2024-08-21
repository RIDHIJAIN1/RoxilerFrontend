import React, { useEffect, useState } from 'react';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, BarElement, CategoryScale, LinearScale, Tooltip, Legend } from 'chart.js';
import axios from 'axios';

ChartJS.register(BarElement, CategoryScale, LinearScale, Tooltip, Legend);

const BarChart = ({ month }) => {
  const [chartData, setChartData] = useState({
    labels: [],
    datasets: [{
      label: 'Number of Items',
      data: [],
      backgroundColor: '#4CAF50',
      borderColor: '#388E3C',
      borderWidth: 2,
      hoverBackgroundColor: '#66BB6A',
      hoverBorderColor: '#2E7D32',
    }],
  });

  useEffect(() => {
    if (month) {
      const fetchData = async () => {
        try {
          const response = await axios.get(`http://localhost:3002/bar-chart`, {
            params: { month },
          });
          const data = response.data;

          const labels = data.map(item => item.range);
          const counts = data.map(item => item.count);

          setChartData({
            labels,
            datasets: [{
              label: 'Number of Items',
              data: counts,
              backgroundColor: '#4CAF50',
              borderColor: '#388E3C',
              borderWidth: 2,
              hoverBackgroundColor: '#66BB6A',
              hoverBorderColor: '#2E7D32',
            }],
          });
        } catch (error) {
          console.error('Error fetching chart data:', error);
        }
      };

      fetchData();
    }
  }, [month]);

  const options = {
    scales: {
      x: {
        beginAtZero: true,
        grid: {
          color: '#e0e0e0',
        },
        ticks: {
          color: '#333',
          font: {
            size: 14,
          },
        },
      },
      y: {
        beginAtZero: true,
        max: 100,
        stepSize: 20,
        grid: {
          color: '#e0e0e0',
        },
        ticks: {
          color: '#333',
          font: {
            size: 14,
          },
        },
      },
    },
    plugins: {
      legend: {
        display: false,
      },
    },
    responsive: true,
    maintainAspectRatio: false,
  };

  return (
    <div className="container mx-auto p-6">
      <h2 className="text-2xl font-semibold text-gray-700 mb-6">Items Distribution by Price Range</h2>
      <div className="bg-white p-8 rounded-lg shadow-md">
        <div className="relative h-96">
          <Bar data={chartData} options={options} />
        </div>
      </div>
    </div>
  );
};

export default BarChart;
