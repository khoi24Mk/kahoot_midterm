/* eslint-disable import/extensions */
/* eslint-disable import/no-unresolved */
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Container from 'react-bootstrap/Container';
import { Spinner } from 'react-bootstrap';
// import { useQuery } from '@tanstack/react-query';
// import { useState } from 'react';
import GroupInCard from './GroupInCard';
// import { AuthContext } from '~/Context';
// import getGroupList from '~/api/normal/getGroupList';

function GroupList() {
  // const context = useContext(AuthContext);
  // const { setGroupList, groupList } = context;
  // const [groupList, setGroupList] = useState({});
  // const asyncGetGroup = async () => {
  //   const retGroupList = await getGroupList();
  //   setGroupList(retGroupList);
  //   return retGroupList;
  // };
  // const needGroupList = groupList === null || groupList === undefined;
  // const query = useQuery({
  //   queryKey: ['GroupList'],
  //   queryFn: asyncGetGroup,
  //   enabled: needGroupList,
  // });
  // console.log(query.data);
  return /* query.isLoading */ false ? (
    <Spinner />
  ) : (
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
