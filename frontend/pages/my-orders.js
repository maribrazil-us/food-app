import { gql, useQuery, ApolloProvider } from '@apollo/client';
import { Container } from 'reactstrap';
import AppContext from '../components/context';
import { useContext } from 'react';


export default function MyOrders() {
  
  
const GET_QUERY_ORDERS = gql`
  query($id:ID!) {
    user (id:$id) {
       orders {
          id
          amount
       }
      }
   }  
  `;

  const { user, setUser } = useContext(AppContext);
  const appContext = useContext(AppContext);
  const { isAuthenticated } = appContext;
  
  let userid = "";

  if (isAuthenticated) {
    userid = user.id
  }
  
  const { data, loading, error } = useQuery(GET_QUERY_ORDERS, {variables: {id:userid}});


  if (isAuthenticated) {
  console.log (userid);
  
  if (loading) return 'Loading...';
  
  if (error) return `Error! ${error.message}`;
  
  return (
    <Container>
    <h1>My orders</h1>
    <br/>
    <ul>
      {data.user.orders.map(order => (
        <li key={order.id}>order id: {order.id}, order amount: ${order.amount/100}</li>
      ))}
    </ul>
    </Container>
    );
  }
  return (

 <h1>You are not logged in. This page is for registered users only.</h1>

  );
}


