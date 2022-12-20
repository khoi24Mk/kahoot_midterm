import React from 'react';
import { Form, Table } from 'react-bootstrap';
import { AiFillCaretRight, AiFillEdit } from 'react-icons/ai';
import { Link } from 'react-router-dom';

export default function MyPresentationList({
  presentations,
  deleteList,
  checkDeleteAll,
  handleDeleteCheck,
  deletable,
}) {
  return (
    <Table className="position-relative" style={{ fontSize: '1rem' }} hover>
      <thead className="position-sticky">
        <tr style={{ color: 'darkgray' }}>
          {deletable && (
            <th>
              <Form.Check
                inline
                type="checkbox"
                checked={presentations?.length === deleteList?.length}
                onChange={(event) => checkDeleteAll(event)}
              />
            </th>
          )}
          <th>Name</th>
          <th>Owner Name</th>
          <th>Created at</th>
          <th>Modified at</th>
          <th> </th>
          <th> </th>
        </tr>
      </thead>
      <tbody>
        {presentations?.map((presentation) => (
          <tr key={presentation.id}>
            {deletable && (
              <td className="py-4">
                <Form.Check
                  inline
                  type="checkbox"
                  onChange={() => handleDeleteCheck(presentation.id)}
                  checked={deleteList.includes(presentation.id)}
                />
              </td>
            )}
            <td className="py-4">{presentation.presentationName}</td>
            <td className="py-4">{presentation?.owner?.displayName}</td>
            <td className="py-4">
              {new Date(presentation.dateCreated).toLocaleString('en-US')}
            </td>
            <td className="py-4">
              {presentation.dateUpdated > 0
                ? new Date(presentation.dateUpdated).toLocaleString('en-US')
                : '----'}
            </td>

            <td>
              <div className="py-4">
                <Link to={`/presentation/${presentation.id}/editing`}>
                  <AiFillEdit
                    className="p-1 rounded-circle"
                    style={{
                      backgroundColor: 'lightgray',
                      cursor: 'pointer',
                    }}
                    size={30}
                  />
                </Link>
              </div>
            </td>

            <td>
              <div className="py-4">
                <Link to={`/presentation/${presentation.id}/presenting`}>
                  <AiFillCaretRight
                    className="p-1 rounded-circle"
                    style={{
                      backgroundColor: 'lightgray',
                      cursor: 'pointer',
                    }}
                    size={30}
                  />
                </Link>
              </div>
            </td>
          </tr>
        ))}
      </tbody>
    </Table>
  );
}
