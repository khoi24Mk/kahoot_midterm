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

function Chart({ type, labels, data }) {
  const [ChartData, setChartData] = useState({
    labels,
    datasets: [{ data }],
  });

  useEffect(() => {
    setChartData({ labels, datasets: [{ data }] });
  }, [labels, data]);

  const sth = () => {
    console.log(type);
    console.log(ChartData);

    console.log('OUT');
    console.log('ININ');
    if (type === 'bar') {
      console.log('BAR');
      return <Bar data={ChartData} />;
    }

    if (type === 'circle') {
      console.log('CIRCLE');
      return <Doughnut data={ChartData} />;
    }
    console.log('CIRCLE');
  };

  //   const data = {
  //     labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
  //     datasets: [
  //       {
  //         label: 'First dataset',
  //         data: [33, 53, 85, 41, 44, 65],
  //         fill: true,
  //         backgroundColor: 'rgba(75,192,192,0.2)',
  //         borderColor: 'rgba(75,192,192,1)'
  //       }

  //     ]
  //   };

  //   return <Doughnut data={data} />;
  //   useEffect(() => {
  //     const asyncGroup = async () => {
  //       try {
  //         setData({ labels, datasets });
  //       } catch (error) {
  //         //
  //       }
  //     };
  //     asyncGroup();
  //   }, []);
  return <div>{sth()}</div>;
}

export default Chart;
