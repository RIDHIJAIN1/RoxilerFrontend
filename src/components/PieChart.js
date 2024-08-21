import React, { useEffect, useState } from 'react';
import { Pie } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import axios from 'axios';

ChartJS.register(ArcElement, Tooltip, Legend);

const PieChart = ({ month }) => {
  const [chartData, setChartData] = useState({
    labels: [],
    datasets: [{
      label: 'Category Distribution',
      data: [],
      backgroundColor: [],
      hoverBackgroundColor: [],
    }],
  });

  useEffect(() => {
    const fetchPieChartData = async () => {
      try {
        const response = await axios.get('http://localhost:3002/pie-chart', {
          params: { month },
        });

        // Transform data into chart format
        const categories = response.data;
        const labels = categories.map(category => category.category);
        const data = categories.map(category => category.count);
        const backgroundColor = categories.map(() => `#${Math.floor(Math.random()*16777215).toString(16)}`); // Random colors
        const hoverBackgroundColor = backgroundColor.map(color => `${color}80`); // Lighter shade for hover

        setChartData({
          labels,
          datasets: [{
            label: 'Category Distribution',
            data,
            backgroundColor,
            hoverBackgroundColor,
          }],
        });
      } catch (error) {
        console.error("Error fetching pie chart data:", error);
      }
    };

    fetchPieChartData();
  }, [month]);

  const options = {
    plugins: {
      legend: {
        position: 'bottom',
        labels: {
          color: '#333',
          font: {
            size: 14,
          },
        },
      },
    },
    responsive: true,
    maintainAspectRatio: false,
  };

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-2xl font-semibold text-gray-700 mb-4">Category Distribution</h2>
      <div className="bg-white p-6 rounded-lg shadow-md">
        <div className="relative h-64">
          <Pie data={chartData} options={options} />
        </div>
      </div>
    </div>
  );
};

export default PieChart;
