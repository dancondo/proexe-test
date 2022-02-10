import axios from 'axios'

export const USERS_API_BASE_URL = process.env.REACT_APP_USERS_API_BASE_URL || '';

export const getUsers = async (): Promise<UserDto[]> => {
  const { data } = await axios.get(USERS_API_BASE_URL);
  return data
}

export const getUser = async (userId: number): Promise<UserDto> => {
  const { data } = await axios.get(`${USERS_API_BASE_URL}/${userId}`)
  return data
}

export const createUser = async (userDto: UpsertUserDto): Promise<UserDto> => {
  const { data } = await axios.post(USERS_API_BASE_URL, { userDto })

  return {
    id: data.id,
    ...data.userDto
  }
}

export const updateUser = async(userId: number, user: Partial<UserDto>): Promise<UserDto> => {
  const { data } = await axios.put(`${USERS_API_BASE_URL}/${userId}`, { user })
  return {
    id: data.id,
    ...data.user
  }
}

export const deleteUser = async(userId: number): Promise<void> => {
  try {
    await axios.delete(`${USERS_API_BASE_URL}/${userId}`)
  } catch (err: any) {
    if (err?.response?.status === 404) {
      return
    }
    throw err
  }
}