import { useParams } from 'react-router-dom';
import GroupDetail from './components/ContentGroup/GroupDetail';
import GroupList from './components/ContentGroup/GroupList';
import NavbarGroup from './components/NavbarGroup';

function Group() {
  const { id } = useParams();
  console.log(id);
  return (
    <>
      <NavbarGroup id={id} />
      {id ? <GroupDetail groupId={id} /> : <GroupList />}
    </>
  );
}

export default Group;
