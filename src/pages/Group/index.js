import { useQuery } from '@tanstack/react-query';
import { useState } from 'react';
import { useParams } from 'react-router-dom';
import getGroupList from '~/api/normal/group/getGroupList';
import Loading from '~/components/Loading';
import GroupDetail from './components/ContentGroup/GroupDetail';
import GroupList from './components/ContentGroup/GroupList';

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
  if (query.isLoading) return <Loading />;
  return id ? (
    <GroupDetail groupId={id} />
  ) : (
    <GroupList groupList={groupList} />
  );
}

export default Group;
