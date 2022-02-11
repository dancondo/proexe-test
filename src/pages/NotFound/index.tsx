import BaseButton from 'components/Base/Button'
import Panel from 'components/Base/Panel'
import UsersLayout from 'layouts/UsersLayout'
import React from 'react'
import { Row } from 'react-bootstrap'
import { Link } from 'react-router-dom'

const NotFoundPage: React.FC = () => (
  <UsersLayout
    title="404 Not Found"
  >
    <Panel
      className="text-center"
    >
      <span
        className="display-6"
      >
        The Page you tried to view doesn't exist!
      </span>

      <br />
      <br />

      <span
        className="lead"
      >
        What about
      </span>
      
      <br />
      <br />

      <Row
        className="justify-content-center align-items-center"
      >
        <Link
          to="/"
          className="col-xs-12 col-md-auto"
        >
          <BaseButton
            variant="outline-primary"
          >
            Go home
          </BaseButton>
        </Link>
        <span
          className="col-md-auto col-xs-12"
        >
          or
        </span>
        <Link
          to="/users/create"
          className="col-md-auto col-xs-12"
        >
          <BaseButton
            variant="outline-secondary"
          >
            Create User
          </BaseButton>
        </Link>

      </Row>
    </Panel>
  </UsersLayout>
)

export default NotFoundPage
