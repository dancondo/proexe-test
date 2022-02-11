import * as userServices from './users.services'
import axios from 'axios'


const mockUser = {
  id: 1,
  name: 'John Coltrane',
  email: 'john@coltrane.com',
}

const updatedMockUser = {
  ...mockUser,
  name: 'John William Coltrane',
  email: 'giant.steps@coltrane.com'
}

const mockUsers = [mockUser]

const mockError = 'Error!'

describe('Users Services', () => {

  describe('Get Users', () => {
    it('should return an users dto', async () => {
      const getRequest = jest.spyOn(axios, 'get')
        .mockImplementation(() => Promise.resolve({ data: mockUsers }));

      const users = await userServices.getUsers()

      expect(users).toEqual(mockUsers)
      getRequest.mockClear()
    })
  })

  describe('Get User', () => {
    it('should return an user dto', async () => {
      const getRequest = jest.spyOn(axios, 'get')
        .mockImplementation(() => Promise.resolve({ data: mockUser }));

      const user = await userServices.getUser(mockUser.id)

      expect(user).toEqual(mockUser)
      getRequest.mockClear()
    })
  })

  describe('Create User', () => {
    it('should return an user dto', async () => {
      const post = jest.spyOn(axios, 'post')
        .mockImplementation(() => Promise.resolve({
          data: {
            id: mockUser.id,
            userDto: {
              name: mockUser.name,
              email: mockUser.email
            }
          }
        }));

      const user = await userServices.createUser({
        name: mockUser.name,
        email: mockUser.email
      })

      expect(user).toEqual(mockUser)
      post.mockClear()
    })
  })

  describe('Update User', () => {
    it('should return an updated user dto', async () => {
      const putRequest = jest.spyOn(axios, 'put')
        .mockImplementation(() => Promise.resolve({
          data: {
            id: updatedMockUser.id,
            user: {
              name: updatedMockUser.name,
              email: updatedMockUser.email
            }
          }
        }));

      const user = await userServices.updateUser(mockUser.id, {
        name: updatedMockUser.name,
        email: updatedMockUser.email
      })

      expect(user).toEqual(updatedMockUser)
      putRequest.mockClear()
    })

    it('should return an updated user dto if an error 404 is thrown', async () => {
      const putRequest = jest.spyOn(axios, 'put')
        .mockImplementation(() => Promise.reject({
          response: {
            status: 404
          }
        }));

      const user = await userServices.updateUser(mockUser.id, {
        name: updatedMockUser.name,
        email: updatedMockUser.email
      })

      expect(user).toEqual(updatedMockUser)
      putRequest.mockClear()
    })

    it('should thrown an error if an error if it is different than 404', async () => {
      const putRequest = jest.spyOn(axios, 'put')
        .mockImplementation(() => Promise.reject({
          response: {
            status: 500
          }
        }));

      try {
        await userServices.updateUser(mockUser.id, {
          name: updatedMockUser.name,
          email: updatedMockUser.email
        })
      } catch (err) {
        expect(err).toEqual({
          response: {
            status: 500
          }
        })
      } finally {
        putRequest.mockClear()
      }
    })
  })

  describe('Delete User', () => {
    it('should return void if the user is deleted', async () => {
      const deleteRequest = jest.spyOn(axios, 'delete')
        .mockImplementation(() => Promise.resolve());

      const res = await userServices.deleteUser(mockUser.id)

      expect(res).toEqual(undefined)
      deleteRequest.mockClear()
    })

    it('should return an updated user dto if an error 404 is thrown', async () => {
      const deleteRequest = jest.spyOn(axios, 'delete')
        .mockImplementation(() => Promise.reject({
          response: {
            status: 404
          }
        }));

      const res = await userServices.deleteUser(mockUser.id)

      expect(res).toEqual(undefined)
      deleteRequest.mockClear()
    })

    it('should thrown an error if an error if it is different than 404', async () => {
      const deleteRequest = jest.spyOn(axios, 'delete')
        .mockImplementation(() => Promise.reject({
          response: {
            status: 500
          }
        }));

      try {
        await userServices.deleteUser(mockUser.id)
      } catch (err) {
        expect(err).toEqual({
          response: {
            status: 500
          }
        })
      } finally {
        deleteRequest.mockClear()
      }
    })
  })

})