import { Card, Col, Container, Nav, Row, Tab } from 'react-bootstrap';
import MyCollaborationPresentation from './MyCollaborationPresentation';
import MyOwnPresentation from './MyOwnPresentation';

function MyPresentation() {
  return (
    <Container
      fluid
      className="py-3 h-100"
      style={{
        fontSize: '1rem',
        backgroundColor: '#FFFFFF',
      }}
    >
      <Tab.Container id="left-tabs-example" defaultActiveKey="first">
        <Row className="h-100">
          <Col sm={12} lg={2}>
            <Card>
              <Card.Body>
                <Nav variant="pills" className="flex-column">
                  <Nav.Item>
                    <Nav.Link eventKey="first">Own Presentation</Nav.Link>
                  </Nav.Item>
                  <Nav.Item>
                    <Nav.Link eventKey="second">
                      Collaboration Presentation
                    </Nav.Link>
                  </Nav.Item>
                </Nav>
              </Card.Body>
            </Card>
          </Col>
          <Col sm={12} lg={10} className="d-flex flex-column h-100">
            <Card className="flex-grow-1 h-100" style={{ overflowY: 'scroll' }}>
              <Card.Body>
                <Tab.Content>
                  <Tab.Pane eventKey="first">
                    <MyOwnPresentation />
                  </Tab.Pane>
                  <Tab.Pane eventKey="second">
                    <MyCollaborationPresentation />
                  </Tab.Pane>
                </Tab.Content>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Tab.Container>
    </Container>
  );
}

export default MyPresentation;
