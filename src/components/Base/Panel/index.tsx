import React from 'react'
import { Card, Row } from 'react-bootstrap'

const Panel: React.FC = ({ children }) => (
  <Card>
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
