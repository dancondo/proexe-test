import { UserCreators } from './users.actions';
import usersReducer, { INITIAL_STATE } from './users.reducer';

const mockUser = {
  id: 1,
  name: 'John Coltrane',
  username: 'john.coltrane',
  email: 'john@coltrane.com',
}

const updatedMockUser = {
  ...mockUser,
  name: 'John William Coltrane',
  email: 'giant.steps@coltrane.com'
}

const createMockUser = {
  id: 2,
  name: 'Miles Davis',
  email: 'miles@davis.com',
}

const mockError = 'Some Error!'

describe('Users reducers', () => {
  test('should return the initial state', () => {
    expect(usersReducer(undefined, { type: '' })).toEqual(INITIAL_STATE)
  })
  
  test('should set error and loading on request', () => {
    const previousState = INITIAL_STATE
    expect(
      usersReducer(previousState, UserCreators.startRequest())
    ).toEqual({
      ...previousState,
      error: null,
      loading: true,
    })
  })
  
  test('should set error and loading on request fail', () => {
    const previousState = INITIAL_STATE
    expect(
      usersReducer(previousState, UserCreators.failedRequest(mockError))
    ).toEqual({
      ...previousState,
      loading: false,
      error: mockError,
    })
  })
  
  test('should handle a list of users', () => {
    const previousState = INITIAL_STATE
    expect(
      usersReducer(previousState, UserCreators.successGetUsers([mockUser]))
    ).toEqual({
      ...previousState,
      fetched: true,
      users: [mockUser]
    })
  })
  
  test('should handle a single user', () => {
    const previousState = INITIAL_STATE
    expect(
      usersReducer(previousState, UserCreators.successGetUserDetails(mockUser))
    ).toEqual({
      ...previousState,
      userDetails: mockUser
    })
  })
  
  test('should create a new user', () => {
    const previousState = { ...INITIAL_STATE, users: [mockUser] }
    expect(
      usersReducer(previousState, UserCreators.createUser(createMockUser))
    ).toEqual({
      ...previousState,
      users: [
        ...previousState.users,
        createMockUser
      ]
    })
  })
  
  test('should update an user', () => {
    const previousState = { ...INITIAL_STATE, users: [mockUser] }
    expect(
      usersReducer(previousState, UserCreators.updateUser(updatedMockUser))
    ).toEqual({
      ...previousState,
      users: [
        updatedMockUser
      ]
    })
  })
  
  test('should delete an user', () => {
    const previousState = { ...INITIAL_STATE, users: [mockUser] }
    expect(
      usersReducer(previousState, UserCreators.deleteUser(mockUser.id))
    ).toEqual({
      ...previousState,
      users: []
    })
  })
})
