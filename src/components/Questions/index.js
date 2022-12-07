/* eslint-disable no-unused-vars */
import React, { useState } from 'react';
import MultipleChoice from './MultipleChoice';

function Question({
  SlideType,
  data,
  setData,
  setChartName,
  question,
  setQuestion,
  answer,
  setAnswer,
  setIsNeedUpdate,
}) {
  if (SlideType === 'multiChoice') {
    return (
      <MultipleChoice
        // // label={label}
        // setLabels={setLabels}
        data={data}
        setData={setData}
        setChartName={setChartName}
        question={question}
        setQuestion={setQuestion}
        answer={answer}
        setAnswer={setAnswer}
        setIsNeedUpdate={setIsNeedUpdate}
      />
    );
    // return <MultipleChoice />;
  }
}

export default Question;
