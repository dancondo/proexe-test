import React from 'react';
import { Container } from 'react-bootstrap';

import Header from 'components/Base/Header';
import NotificationContainer from 'components/Notifications/Container';

interface UsersLayoutProps {
  title: string
}

const UsersLayout: React.FC<UsersLayoutProps> = ({ title, children }) => (
  <>
    <Header />
    <NotificationContainer />
    <Container
      className="py-5"
    >
      <h1
        className="display-6 pb-4"
      >
        {title}
      </h1>
      {children}
    </Container>
  </>
)
export default UsersLayout;
