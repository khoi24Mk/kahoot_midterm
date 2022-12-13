/* eslint-disable indent */
import { useEffect, useState } from 'react';
import { Container, Row } from 'react-bootstrap';
import { toast } from 'react-toastify';
import getMyCollaborationPresentation from '~/api/normal/presentation/getMyCollaborationPresentation';

import Loading from '~/components/Loading';
import MyPresentationList from './MyPresentationList';

function MyCollaborationPresentation() {
  const [loading, setLoading] = useState(true);
  // manage presentations
  const [presentations, setPresentations] = useState([]);

  // get presentations
  useEffect(() => {
    const asyncGetPresentations = async () => {
      try {
        const myPresentationRes = await getMyCollaborationPresentation();
        setPresentations(myPresentationRes.data.object);
      } catch (err) {
        toast.error(err?.response?.data?.message);
      } finally {
        setLoading(false);
      }
    };
    asyncGetPresentations();
  }, []);

  if (loading) return <Loading />;
  return (
    <Container fluid className="pt-3 h-100 d-flex flex-column">
      <Row>
        <MyPresentationList deletable={false} presentations={presentations} />
      </Row>
    </Container>
  );
}

export default MyCollaborationPresentation;
