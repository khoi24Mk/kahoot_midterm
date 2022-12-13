import React, { useEffect, useState } from 'react';
import { Bar } from 'react-chartjs-2';
import 'chart.js/auto';

export default function MultipleChoice({ editingSlide }) {
  // get chart data
  const [chartData, setChartData] = useState(null);
  useEffect(() => {
    if (!editingSlide) return;
    const SlideLabel = editingSlide.options;
    const SlideData = SlideLabel.map((label) => {
      const NumberRecord = editingSlide?.userRecords?.filter((record) => {
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
  }, [editingSlide]);
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
