import { Alert, Container, Progress } from 'reactstrap';
import { useSelector, useDispatch } from 'react-redux';
import { getConcerts, getRequest, loadConcertsRequest } from '../../../redux/concertsRedux';
import { useEffect } from 'react';
import PriceInfo from '../../features/PriceInfo/PriceInfo';

const Prices = () => {
  const dispatch = useDispatch();
  const concerts = useSelector(getConcerts);
  const request = useSelector(getRequest);
  console.log(concerts);
 

  useEffect(() => {
    dispatch(loadConcertsRequest())
  }, [dispatch]);

  if(request.pending) return <Progress animated color="primary" value={50} />; 
  else if(request.error) return <Alert color="warning">{request.error}</Alert>;
  else if(!request.success || !concerts.length) return <Alert color="info">No concerts</Alert>;
  else if(request.success) return (
    <Container>
      <h1>Prices</h1>
      <p>Prices may differ according the day of the festival. Remember that ticket includes not only the star performance, but also 10+ workshops. We gathered several genre teachers to help you increase your vocal skills, as well as self confidence.</p>
      
      <Alert color="info">
          Attention! <strong>Children under 4 can go freely with you without any other fee!</strong>
      </Alert>
      {concerts.map(concert => <PriceInfo key={concert._id} day={concert.day} price={concert.price} workshops={concert.workshops} />)}
    </Container>
  )
};

export default Prices;