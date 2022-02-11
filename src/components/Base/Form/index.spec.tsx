import React from 'react'

import {render, screen, cleanup, fireEvent} from '@testing-library/react'
import '@testing-library/jest-dom'

import BaseForm from './index'

const mockFormFields = [
  {
    value: '1',
    error: 'error',
    label: 'Label1',
    setValue: () => null
  },
  {
    error: '',
    value: '2',
    label: 'Label2',
    setValue: () => null
  },
]

describe('Base Form Component' , () => {
  afterEach(cleanup)

  test('Should render a form', () => {
    render(<BaseForm fields={[]} onSubmit={() => null} />)

    expect(screen.getByTestId('base-form')).toBeVisible()
  })

  test('form fields should be rendered when passed on the fields array', () => {
    const { queryAllByDisplayValue } = render(<BaseForm fields={mockFormFields} onSubmit={() => null} />)

    expect(queryAllByDisplayValue(/\d/).length).toEqual(2)
  })

  test('on cancel and on submit should be triggered on click', () => {
    const onCancel = jest.fn()
    const onSubmit = jest.fn()

    render(<BaseForm fields={[]} onSubmit={onSubmit} onCancel={onCancel} />)
    
    fireEvent.click(screen.getByText(/submit/i))
    fireEvent.click(screen.getByText(/cancel/i))

    expect(onCancel).toHaveBeenCalledTimes(1)
    expect(onSubmit).toHaveBeenCalledTimes(1)
  })

  test('on submit should not be triggered if there is error on fields', () => {
    const onSubmit = jest.fn()

    render(<BaseForm fields={mockFormFields} onSubmit={onSubmit} />)
    
    fireEvent.click(screen.getByText(/submit/i))

    expect(onSubmit).toHaveBeenCalledTimes(0)
  })
})