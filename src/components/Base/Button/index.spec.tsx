import React from 'react'

import {render, screen} from '@testing-library/react'
import '@testing-library/jest-dom'

import BaseButton from './index'

describe('Base Button Component', () => {

  test('The button text should be "Loading..." when the prop loading is true', () => {
    render(<BaseButton loading>Button!</BaseButton>)

    expect(screen.getByRole('button')).toHaveTextContent('Loading...')
    expect(screen.getByRole('button')).not.toHaveTextContent('Button!')
  })

  test('The button should be disabled when the prop loading is true', () => {
    render(<BaseButton loading>Button!</BaseButton>)

    expect(screen.getByRole('button')).toBeDisabled()
  })

})