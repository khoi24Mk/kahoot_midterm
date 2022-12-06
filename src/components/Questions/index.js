/* eslint-disable no-unused-vars */
import React, { useState } from 'react';
import MultipleChoice from './MultipleChoice';

function Question({ SlideType, data, setData, setChartName, setQuestion }) {
  if (SlideType === 'multiChoice') {
    return (
      <MultipleChoice
        // // label={label}
        // setLabels={setLabels}
        data={data}
        setData={setData}
        setChartName={setChartName}
        setQuestion={setQuestion}
      />
    );
    // return <MultipleChoice />;
  }
}

export default Question;
