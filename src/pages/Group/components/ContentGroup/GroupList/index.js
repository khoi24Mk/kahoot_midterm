import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Container from 'react-bootstrap/Container';
import GroupInCard from './GroupInCard';

function GroupList() {
  return (
    <Container>
      <Row xs={1} md={4} className="g-4 align-items-center">
        <Col className="justify-items-center">
          <GroupInCard
            groupId={1}
            groupName="Lop 1"
            owner="thong nguyen"
            description="KHTN = Khong hoc thi nghi"
            className="mx-auto"
          />
        </Col>
        <Col className="justify-items-center">
          <GroupInCard
            groupId={1}
            groupName="Lop 1"
            owner="thong nguyen"
            description="KHTN = Khong hoc thi nghi"
            className="mx-auto"
          />
        </Col>
        <Col className="justify-items-center">
          <GroupInCard
            groupId={1}
            groupName="Lop 1"
            owner="thong nguyen"
            description="KHTN = Khong hoc thi nghi"
            className="mx-auto"
          />
        </Col>
        <Col className="justify-items-center">
          <GroupInCard
            groupId={1}
            groupName="Lop 1"
            owner="thong nguyen"
            description="KHTN = Khong hoc thi nghi"
            className="mx-auto"
          />
        </Col>
        <Col className="justify-items-center">
          <GroupInCard
            groupId={1}
            groupName="Lop 1"
            owner="thong nguyen"
            description="KHTN = Khong hoc thi nghi"
            className="mx-auto"
          />
        </Col>
      </Row>
    </Container>
  );
}

export default GroupList;
