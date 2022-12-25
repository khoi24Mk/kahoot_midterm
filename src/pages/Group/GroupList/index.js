import { useEffect, useState } from 'react';
import { Accordion } from 'react-bootstrap';
import Container from 'react-bootstrap/Container';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import getGroupList from '~/api/normal/group/getGroupList';
import AddingGroup from '~/components/AddingGroup';
import Loading from '~/components/Loading';
import GroupsByRole from './GroupsByRole';

function GroupList() {
  const [groupList, setGroupList] = useState([]);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();
  // check permission
  useEffect(() => {
    const asyncGetGroup = async () => {
      try {
        setLoading(true);
        const resGroupList = await getGroupList();
        setGroupList(resGroupList?.data?.object);
        setLoading(false);
      } catch (err) {
        if (err?.response?.status === 403) {
          navigate({ pathname: '/notPermission' });
        }
        toast.error(err?.response?.data?.message);
      }
    };
    asyncGetGroup();
  }, []);
  if (loading) return <Loading />;
  const ownerGroups = groupList?.filter((item) => item.role === 'OWNER');
  const coOwnerGroups = groupList?.filter((item) => item.role === 'CO_OWNER');
  const memberGroups = groupList?.filter((item) => item.role === 'MEMBER');

  return (
    <Container style={{ height: '100%' }} className="overflow-scroll p-5" fluid>
      <AddingGroup setGroups={setGroupList} />
      <Accordion defaultActiveKey="0">
        <Accordion.Item eventKey="0">
          <Accordion.Header>
            <h3 className="fw-light text-uppercase text-center">Owner</h3>
          </Accordion.Header>
          <Accordion.Body>
            <GroupsByRole
              setLoading={setLoading}
              setGroupList={setGroupList}
              groupList={ownerGroups}
            />
          </Accordion.Body>
        </Accordion.Item>
      </Accordion>
      <Accordion defaultActiveKey="0">
        <Accordion.Item eventKey="0">
          <Accordion.Header>
            <div>
              <h3 className="fw-light text-uppercase text-center">Co-Owner</h3>
            </div>
          </Accordion.Header>
          <Accordion.Body>
            <GroupsByRole
              setLoading={setLoading}
              setGroupList={setGroupList}
              groupList={coOwnerGroups}
            />
          </Accordion.Body>
        </Accordion.Item>
      </Accordion>
      <Accordion defaultActiveKey="0">
        <Accordion.Item eventKey="0">
          <Accordion.Header>
            <div>
              <h3 className="fw-light text-uppercase text-center">Member</h3>
            </div>
          </Accordion.Header>
          <Accordion.Body>
            <GroupsByRole
              setLoading={setLoading}
              setGroupList={setGroupList}
              groupList={memberGroups}
            />
          </Accordion.Body>
        </Accordion.Item>
      </Accordion>
    </Container>
  );
}

export default GroupList;
