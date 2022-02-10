import BaseForm from 'components/Base/Form';
import React, { useEffect } from 'react'
import { useState } from 'react';
import { Button, Form } from 'react-bootstrap';
import isEmail from 'utils/is-email';

interface UserFormProps {
  user?: UserDto;
  loading?: boolean;
  onCancel: () => void;
  onSubmit: (user: UpsertUserDto, userId?: number) => void;
}

const UserForm: React.FC<UserFormProps> = ({
  user,
  onSubmit,
  loading,
  onCancel
}) => {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  
  useEffect(() => {
    if (user) {
      setName(user.name)
      setEmail(user.email)
    }
  }, [user])

  const fields: FormField[] = [
    {
      value: name,
      label: 'Name',
      setValue: setName,
      error: !name.length ? 'Name is required' : name.length < 3 ? 'Must be a valid name' : ''
    },
    {
      value: email,
      label: 'Email', 
      setValue: setEmail,
      error: !email.length ? 'Email is required' : !isEmail(email) ? 'Must be an email' : '' 
    }
  ]

  const onFinish = () => {
    onSubmit({ email, name }, user?.id)
  }

  return (
    <BaseForm
      fields={fields}
      loading={loading}
      onSubmit={onFinish}
      onCancel={onCancel}
    />
  )
}

export default UserForm