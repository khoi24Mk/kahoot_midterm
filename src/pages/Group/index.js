/* eslint-disable import/no-named-as-default */
/* eslint-disable no-unneeded-ternary */
/* eslint-disable no-nested-ternary */
import { useQuery } from '@tanstack/react-query';
import { useState } from 'react';
import { useParams } from 'react-router-dom';
import Loading from '~/components/Loading';
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
    <Loading />
  ) : (
    <>
      <NavbarGroup id={id} groupList={groupList} />
      {id ? <GroupDetail groupId={id} /> : <GroupList groupList={groupList} />}
    </>
  );
}

export default Group;
