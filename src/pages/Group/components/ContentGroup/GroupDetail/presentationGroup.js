/* eslint-disable indent */
import { useState } from 'react';
import { Container, Form, Row, Table } from 'react-bootstrap';
import { AiFillCaretRight, AiFillEdit } from 'react-icons/ai';
import { Link } from 'react-router-dom';

function PresentationGroup({ presentations, myRole }) {
  const [deleteList, setDeleteList] = useState([]);

  const handleDeleteCheck = (presentationId) => {
    const newDeleteList = deleteList.includes(presentationId)
      ? deleteList.filter((i) => i !== presentationId)
      : [...deleteList, presentationId];
    setDeleteList(newDeleteList);
  };

  const checkDeleteAll = (ev) => {
    const value = ev.target.checked;
    if (value) {
      setDeleteList(presentations.map((presentation) => presentation.id));
    } else {
      setDeleteList([]);
    }
  };

  return (
    <Container fluid>
      {/* tool bar */}
      <Row>
        <Table style={{ fontSize: '1rem' }} hover>
          <thead>
            <tr style={{ color: 'darkgray' }}>
              <th>
                <Form.Check
                  inline
                  type="checkbox"
                  checked={presentations?.length === deleteList?.length}
                  onChange={(event) => checkDeleteAll(event)}
                />
              </th>
              <th>Name</th>
              <th>Created at</th>
              <th>Modified at</th>
              {myRole !== 'MEMBER' && <th> </th>}
              <th> </th>
            </tr>
          </thead>
          <tbody>
            {presentations.map((presentation) => (
              <tr key={presentation.id}>
                <td className="py-4">
                  <Form.Check
                    inline
                    type="checkbox"
                    onChange={() => handleDeleteCheck(presentation.id)}
                    checked={deleteList.includes(presentation.id)}
                  />
                </td>
                <td className="py-4">{presentation.presentationName}</td>
                <td className="py-4">
                  {new Date(presentation.dateCreated).toLocaleString('en-US')}
                </td>
                <td className="py-4">
                  {presentation.dateUpdated > 0
                    ? new Date(presentation.dateUpdated).toLocaleString('en-US')
                    : '----'}
                </td>
                {myRole !== 'MEMBER' && (
                  <td>
                    <div className="py-4">
                      <Link to={`/presentation/${presentation.id}/slide`}>
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
                )}
                <td>
                  <div className="py-4">
                    <Link to={`/presentation/${presentation.id}`}>
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
      </Row>
    </Container>
  );
}

export default PresentationGroup;
