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

function Chart({ type, labels, datasets }) {
  const [data, setData] = useState({
    labels,
    datasets,
  });
  const sth = () => {
    console.log('ININ');
    if (type === 'bar') {
      console.log('CIRCLE');
      return <Bar data={data} />;
    }

    if (type === 'circle') {
      console.log('CIRCLE');
      return <Doughnut data={data} />;
    }
    console.log('CIRCLE');
    return <Doughnut data={data} />;
  };
  useEffect(() => {
    const asyncGroup = async () => {
      try {
        setData({ labels, datasets });
      } catch (error) {
        //
      }
    };
    asyncGroup();
  }, []);
  console.log(type);
  console.log(labels);
  console.log(datasets);
  console.log(data);

  console.log('OUT');
  return (
    <div>
      {() => {
        sth();
      }}
    </div>
  );
}

export default Chart;
