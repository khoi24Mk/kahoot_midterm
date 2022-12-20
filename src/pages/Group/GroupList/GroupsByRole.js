import { Col, Container, Row } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import clsx from 'clsx';
import styles from './groupList.module.css';
import GroupInCard from './GroupInCard';
import getGroupList from '~/api/normal/group/getGroupList';
import deleteGroup from '~/api/normal/group/deleteGroup';

export default function GroupsByRole({ groupList, setGroupList, setLoading }) {
  const navigate = useNavigate();
  const handleDeleteGroup = async (groupId) => {
    setLoading(true);
    try {
      await deleteGroup(groupId);
      const groupListRes = await getGroupList();
      setGroupList(groupListRes?.data?.object);
    } catch (err) {
      toast.error(err?.response?.data?.message);
      if (err?.response?.status === 403) {
        navigate({ pathname: '/notPermission' });
      }
    } finally {
      setLoading(false);
    }
  };
  return (
    <Container fluid className="mb-4">
      <Row xs={1} md={2} lg={3} xxl={5}>
        {groupList.map((group) => {
          return (
            <Col
              key={group.dateCreated}
              className={clsx(styles.GroupCard, 'justify-items-center')}
            >
              <GroupInCard
                handleDeleteGroup={handleDeleteGroup}
                group={group}
                className="mx-auto"
              />
            </Col>
          );
        })}
      </Row>
    </Container>
  );
}
