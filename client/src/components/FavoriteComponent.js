import React, { useEffect, useState } from "react";
import { Card, ListGroup, ListGroupItem, Container, Row, Col } from "react-bootstrap";
import { Block } from "./Block";

const FavoriteComponent = () => {
  const [favorites, setFavorites] = useState([])

  useEffect(() => {
    const fetchFav = async() => {
      const data = await fetch("http://localhost:4000/favorites", {
        method: 'GET',
        credentials: 'include'
      })
      const res = await data.json()
      setFavorites(res)
    }
    fetchFav()
  }, [favorites])
  
  const scrollableListStyles = {
    overflowX: 'auto',
    scrollbarWidth: 'none',
    msOverflowStyle: 'none', 
    WebkitScrollbar: {
      display: 'none'
    },
  };
  return (
    <Container fluid className="p-0" style={{ borderRadius: "15px" }}>
      <Row className="justify-content-center">
        <Col xs={12} md={8} lg={8}>
          <Card className="p-4 mb-4 mt-4 fw-bold text-white" style={{ backgroundColor: "grey", borderRadius: "15px"  }}>
            <Card.Header>Favorites:</Card.Header>
            <div style={scrollableListStyles} >
              <ListGroup variant="flush" className="d-flex flex-row list-group-horizontal">
                {favorites.map((item, index) => (
                  <ListGroupItem key={index} style={{ backgroundColor: "grey" }}>
                    <Block key={index} blockId ={item}/>
                  </ListGroupItem>
                ))}
              </ListGroup>
            </div>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default FavoriteComponent;
