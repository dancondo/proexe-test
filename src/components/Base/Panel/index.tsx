import React from 'react'
import { Card, CardProps, Row } from 'react-bootstrap'

const Panel: React.FC<CardProps> = ({ children, ...props }) => (
  <Card
    {...props}
  >
    <Card.Body
      className="py-5 px-5"
    >
      <Row
        className="justify-content-center align-items-center"
      >
        {children}
      </Row>
    </Card.Body>
  </Card>
)

export default Panel
