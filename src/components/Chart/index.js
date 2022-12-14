/* eslint-disable no-unused-vars */
/* eslint-disable consistent-return */
import { Bar, Doughnut } from 'react-chartjs-2';
import 'chart.js/auto'; // ADD THIS
import React, { useState, useEffect } from 'react';
/* [
      {
        label: 'First dataset',
        data: [33, 53, 85, 41, 44, 65],
        fill: true,
        backgroundColor: 'rgba(75,192,192,0.2)',
        borderColor: 'rgba(75,192,192,1)',
      },
      {
        label: 'Second dataset',
        data: [33, 25, 35, 51, 54, 76],
        fill: false,
        borderColor: '#742774',
      },
    ] */

// ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],

function Chart({ type, labels, data, className }) {
  const [ChartData, setChartData] = useState({
    labels,
    datasets: [{ data }],
  });

  useEffect(() => {
    setChartData({ labels, datasets: [{ data }] });
  }, [labels, data]);

  const sth = () => {
    if (type === 'bar') {
      return <Bar className={className} data={ChartData} />;
    }

    if (type === 'circle') {
      return <Doughnut className={className} data={ChartData} />;
    }
  };
  return <div>{sth()}</div>;
}

export default Chart;
