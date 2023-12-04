import React, { useState } from 'react';
import Card from 'react-bootstrap/Card';

function GetStartedCardComponent({ props }) {
  const [hover, setHover] = useState(false);

  const hoverStyle = {
    backgroundColor: 'lightblue',
    transform: 'scale(1.05)',
    transition: 'all 0.3s ease',
    border: '3px solid',
    borderColor: '#89CFEF',
  };

  return (
    <Card
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      style={{ height: '100%', ...(hover && hoverStyle) }}
    >
      <Card.Body style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between', height: '100%' }}>
        <div>
          <Card.Title style={{ textAlign: 'center' }}>{props.title}</Card.Title>
          <Card.Text style={{ textAlign: 'center' }}>{props.text}</Card.Text>
        </div>
        <Card.Link
          href={props.location}
          style={{
            textAlign: 'center',
            width: '40%',
            backgroundColor: 'lightgrey',
            borderRadius: '50px',
            padding: '2px',
            margin: '0 auto',
            textDecoration: 'none', // Ensure the link text is not underlined
          }}
        >
          Get Started
        </Card.Link>
      </Card.Body>
    </Card>
  );
}

export default GetStartedCardComponent;
