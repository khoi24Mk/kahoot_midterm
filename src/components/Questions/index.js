/* eslint-disable no-unused-vars */
import React, { useState } from 'react';
import MultipleChoice from './MultipleChoice';

function Question({
  slideType,
  data,
  setData,
  setChartName,
  question,
  setQuestion,
  answer,
  setAnswer,
  setIsNeedUpdate,
}) {
  if (!slideType || !slideType === 'MULTIPLE_CHOICE') {
    return (
      <MultipleChoice
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
  }
}

export default Question;
