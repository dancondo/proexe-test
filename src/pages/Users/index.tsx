import BaseModal from 'components/Base/Modal';
import Panel from 'components/Base/Panel';
import UserForm from 'components/Users/Form';
import UsersList from 'components/Users/List';
import { useAppDispatch, useAppSelector } from 'hooks/state.hooks';
import UsersLayout from 'layouts/UsersLayout';
import React, { useEffect, useState } from 'react';
import { Button, Col, Modal, Row } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { NotificationCreators } from 'store/notifications/notifications.actions';
import { UserCreators } from 'store/users/users.actions';
import { deleteUser } from 'store/users/users.services';

const UsersPage: React.FC = () => {
  const dispatch = useAppDispatch()
  const [showModal, setShowModal] = useState(false)
  const [selectedUserId, setSelectedUserId] = useState(0)
  const { fetched, users, loading, error } = useAppSelector(state => state.users)

  useEffect(() => {
    if (!fetched) {
      dispatch(UserCreators.getUsers())
    }
  }, [fetched, dispatch])


  const onReload = () => {
    dispatch(UserCreators.getUsers())
  }

  const showDeleteModal = (userId: number) => {
    setSelectedUserId(userId)
    setShowModal(true)
  }

  const closeDeleteModal = () => {
    setShowModal(false)
  }

  const onDelete = async () => {
    if (selectedUserId) {
      try {
        await deleteUser(selectedUserId)
        dispatch(UserCreators.deleteUser(selectedUserId))
        dispatch(NotificationCreators.showNotification({
          timeout: 5000,
          type: 'success',
          title: 'User Deleted',
          message: `User #${selectedUserId} was deleted successfully!`,
        }))
      } catch (err) {

      } finally {
        closeDeleteModal()
      }

    }
  }

  return (
    <UsersLayout
      title="Dashboard"
    >
      <Row
        className="justify-content-end pb-4"
      >
        <Col
          md={4}
          lg={3}
          xs={12}
        >
          <Row
            className="g-0"
          >
            <Button>
              <Link
                to="/users/create"
              >
                Create User
              </Link>
            </Button>
          </Row>
        </Col>
      </Row>
      {
        loading && (
          <Panel>
            <span
              className="display-6 text-center"
            >
              Loading...
            </span>
          </Panel>
        )
      }
      {
        !loading && !!error && (
          <Panel>
            <div
              className="text-center"
            >
              <span>
                Something went wrong:
              </span>
              <br />
              <span
                className="text-danger"
              >
                {error}
              </span>
              <br />
              <br />
              <Button
                onClick={onReload}
                variant="outline-primary"
              >
                Reload
              </Button>
            </div>
          </Panel>
        )
      }
      {
        !loading && !users.length && !error && (
          <Panel>
            <div
              className="text-center"
            >
              <span>
                No users to display
              </span>
              <br />
              <br />
              <Link
                to="/users/create"
              >
                <Button
                  variant="outline-primary"
                >
                  Create User
                </Button>
              </Link>
            </div>
          </Panel>
        )
      }
      {
        !loading && !!users.length && (
          <UsersList
            users={users}
            onDelete={showDeleteModal}
          />
        )
      }
      <BaseModal
        show={showModal}
        title="Delete User"
        onClose={closeDeleteModal}
      >
        <Modal.Body>
          <p>Are you sure that you want to delete user #{selectedUserId}</p>
        </Modal.Body>

        <Modal.Footer>
          <Button
            variant="secondary"
            onClick={closeDeleteModal}
          >
            Cancel
          </Button>
          <Button
            variant="danger"
            onClick={onDelete}
          >
            Delete
          </Button>
        </Modal.Footer>
      </BaseModal>
    </UsersLayout>
  )
}

export default UsersPage;