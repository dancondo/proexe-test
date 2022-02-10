import React, { useMemo, useState } from 'react'
import { Button, Table } from 'react-bootstrap';
import { Link } from 'react-router-dom';

type UserListSorting = 'asc' | 'desc' | 'id'

interface UsersListProps {
  users: UserDto[];
  onDelete: (userId: number) => void;
}

const UsersList: React.FC<UsersListProps> = ({
  users,
  onDelete
}) => {
  const [sorting, setSorting] = useState<UserListSorting>('id')

  const userList = useMemo(() => {
    if (sorting === 'id') {
      return users
    }
    return [...users].sort((a, b) => {
      const usernameA = a.username || 'z'
      const usernameB = b.username || 'z'
      if (sorting === 'desc') {
        return usernameA.localeCompare(usernameB)
      }
      return usernameB.localeCompare(usernameA)
    })
  }, [users, sorting])

  const setSort = () => {
    switch (sorting) {
      case 'id':
        setSorting('asc')
        break;
      case 'asc':
        setSorting('desc')
        break;
      default:
        setSorting('id')
    }
  }

  return (
    <Table striped bordered hover>
      <thead>
        <tr>
          <th>#</th>
          <th>Name</th>
          <th
            role="button"
            onClick={setSort}
          >
            Username&nbsp;
            {
              sorting === 'id' && '-'
            }
            {
              sorting === 'asc' && '↑'
            }
            {
              sorting === 'desc' && '↓'
            }
          </th>
          <th>Email</th>
          <th>City</th>
          <th>Edit</th>
          <th>Delete</th>
        </tr>
      </thead>
      <tbody>
        {
          userList.map(user => (
            <tr
              key={user.id}
              className="text-center"
            >
              <td>
                {user.id}
              </td>
              <td>
                {user.name}
              </td>
              <td>
                {user.username}
              </td>
              <td>
                {user.email}
              </td>
              <td>
                {user.address?.city}
              </td>
              <td>
                <Link
                  to={`/users/${user.id}/edit`}
                >
                  <Button
                    variant="warning"
                  >
                    Edit
                  </Button>
                </Link>
              </td>
              <td>
                <Button
                  variant="danger"
                  onClick={() => onDelete(user.id)}
                >
                  Delete
                </Button>
              </td>
            </tr>
          ))
        }
      </tbody>
    </Table>
  )
}

export default UsersList
