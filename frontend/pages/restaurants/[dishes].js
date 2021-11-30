import { useQuery, gql, ApolloProvider } from "@apollo/client";
import { useRouter } from "next/router";
import AppContext from "../../components/context";
import Cart from "../../components/cart";
import { useState } from "react";
import {
  Button,
  Card,
  CardBody,
  CardImg,
  CardText,
  CardTitle,
  Col,
  Row,
  InputGroup,
  Input,
  Container
} from "reactstrap";
import { useContext } from "react";

const GET_RESTAURANT_DISHES = gql`
  query($id: ID!) {
    restaurant (id: $id) {
      id
      name
      dishes {
        name
        description
        price
        id
        image {
          url
        }
      }
    }
  }
`

const RestaurantDishes = (props) => {
  const [query1, setQuery1] = useState("");
  const appContext = useContext(AppContext);
  const router = useRouter();
  const { data, loading, error } = useQuery(GET_RESTAURANT_DISHES, {
    variables: { id: router.query.dishes},
  });

  if (error) return "Error Loading dishes";
  if (loading) return <p>Loading ...</p>;
  if (!data) return <p>Not found</p>
  const { restaurant } = data;

  const searchQuery = data.restaurant.dishes.filter((query) =>
     query.name.toLowerCase().includes(query1)
  );
  console.log(searchQuery.length);
  console.log(searchQuery.map((res) => (res.id)));

  searchQuery

  if(searchQuery.length != 0) {
    return(

       <Container >
         <h1>{restaurant.name}</h1>
        <InputGroup className="dish-search">
          <Button>Search</Button>
        <Input 
          onChange={(e) => setQuery1(e.target.value)}
          type="string"
          value={query1}
          placeholder="find dishes"
        />
       </InputGroup>  
        <br/>
       
       <Row>
        {searchQuery.map((res) => (
          <Col xs="6" sm="3" style={{ padding: 0 }} key={res.id}>
            <Card style={{ margin: "0 10px" }}>
              <CardImg
                top={true}
                style={{ height: 200 }}
                src={
                  process.env.NODE_ENV === "production"
                    ? res.image.url
                    : `${process.env.NEXT_PUBLIC_API_URL}${res.image.url}`
                }
                
              />
              <CardBody>
                <CardTitle tag="h5">{res.name}</CardTitle>
                <CardText>{res.description}</CardText>
                <CardText>${res.price}</CardText>
              </CardBody>
              <div className="card-footer">
              <Button
                    outline
                    color="primary"
                    onClick={() => appContext.addItem(res)}
                  >
                    + Add To Cart
                  </Button>
              </div>
              </Card>
            </Col>
        ))}

<style jsx>
                    {`
                      a {
                        color: white;
                      }
                      a:link {
                        text-decoration: none;
                        color: white;
                      }
                      .container-fluid {
                        margin-bottom: 30px;
                      }
                      .btn-outline-primary {
                        color: #007bff !important;
                      }
                      a:hover {
                        color: white !important;
                      }
                    `}
                  </style>
    
       
        <Col xs="3" style={{ padding: 0 }}>
            <div>
              <Cart isAuthenticated="false" />
            </div>
        </Col>
        
      </Row>
      </Container>
    )
  
  }

  else {
    return (   
      
      <Container>
         <h1>{restaurant.name}</h1>
        <InputGroup>
          <Button>Search</Button>
        <Input
          onChange={(e) => setQuery1(e.target.value)}
          type="string"
          value={query1}
          placeholder="find dishes"
        />
       </InputGroup>  
        <br/>
       <Row>
         <h1>Dish not found</h1>
        
      </Row>
      </Container>
    )
  
  }
}


export default RestaurantDishes







