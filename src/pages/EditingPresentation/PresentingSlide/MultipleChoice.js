import React, { useEffect, useState } from 'react';
import { Bar } from 'react-chartjs-2';
import 'chart.js/auto';

export default function MultipleChoice({ currentSlide }) {
  // get chart data
  const [chartData, setChartData] = useState(null);
  useEffect(() => {
    if (!currentSlide) return;
    const SlideLabel = currentSlide.options;
    const SlideData = SlideLabel.map((label) => {
      const NumberRecord = currentSlide?.userRecords?.filter((record) => {
        return record.answer === label;
      });
      return NumberRecord ? NumberRecord.length : 0;
    });

    setChartData(
      SlideLabel.map((value, index) => {
        return {
          id: `${index}`,
          labels: value,
          data: SlideData[index],
        };
      })
    );
  }, [currentSlide]);
  return (
    <Bar
      data={{
        labels: chartData?.map((i) => i.labels),
        datasets: [
          {
            label: 'Rating',
            data: chartData?.map((i) => i.data),
          },
        ],
      }}
    />
  );
}
