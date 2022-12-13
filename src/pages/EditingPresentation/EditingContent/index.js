/* eslint-disable no-unused-vars */
import React, { useState } from 'react';
import Constant from '~/constants';
import Heading from './Heading';
import MultipleChoice from './MultipleChoice';
import Paragraph from './Paragraph';

function EditingContent({ editingSlide, setEditingSlide, pingUpdate }) {
  if (
    !editingSlide?.type ||
    editingSlide?.type === Constant.SlideType.multipleChoie
  ) {
    return (
      <MultipleChoice
        editingSlide={editingSlide}
        setEditingSlide={setEditingSlide}
        pingUpdate={pingUpdate}
      />
    );
  }

  if (editingSlide?.type === Constant.SlideType.heading) {
    return (
      <Heading
        editingSlide={editingSlide}
        setEditingSlide={setEditingSlide}
        pingUpdate={pingUpdate}
      />
    );
  }

  if (editingSlide?.type === Constant.SlideType.paragraph) {
    return (
      <Paragraph
        editingSlide={editingSlide}
        setEditingSlide={setEditingSlide}
        pingUpdate={pingUpdate}
      />
    );
  }
}

export default EditingContent;
