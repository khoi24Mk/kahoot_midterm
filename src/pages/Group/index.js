/* eslint-disable no-unneeded-ternary */
/* eslint-disable no-nested-ternary */
import { useQuery } from '@tanstack/react-query';
import { useState } from 'react';
import { Spinner } from 'react-bootstrap';
import { useParams } from 'react-router-dom';
import getGroupList from '~/api/normal/getGroupList';
import GroupDetail from './components/ContentGroup/GroupDetail';
import GroupList from './components/ContentGroup/GroupList';
import NavbarGroup from './components/NavbarGroup';

function Group() {
  const { id } = useParams();
  const [groupList, setGroupList] = useState([]);
  const asyncGetGroup = async () => {
    const retGroupList = await getGroupList();
    setGroupList(retGroupList);
    return retGroupList;
  };
  const query = useQuery({
    queryKey: ['GroupList'],
    queryFn: asyncGetGroup,
  });
  return query.isLoading ? (
    <div className="d-flex justify-content-center">
      <Spinner animation="border" variant="primary" />
      <Spinner animation="border" variant="secondary" />
      <Spinner animation="border" variant="success" />
      <Spinner animation="border" variant="danger" />
      <Spinner animation="border" variant="warning" />
      <Spinner animation="border" variant="info" />
      <Spinner animation="border" variant="light" />
      <Spinner animation="border" variant="dark" />
      <Spinner animation="grow" variant="primary" />
      <Spinner animation="grow" variant="secondary" />
      <Spinner animation="grow" variant="success" />
      <Spinner animation="grow" variant="danger" />
      <Spinner animation="grow" variant="warning" />
      <Spinner animation="grow" variant="info" />
      <Spinner animation="grow" variant="light" />
      <Spinner animation="grow" variant="dark" />
    </div>
  ) : (
    <>
      <NavbarGroup id={id} groupList={groupList} />
      {id ? <GroupDetail groupId={id} /> : <GroupList groupList={groupList} />}
    </>
  );
}

export default Group;
