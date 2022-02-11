import React from 'react'

import {render, screen} from '@testing-library/react'
import '@testing-library/jest-dom'

import BaseHeader from './index'

describe('Base Header Component', () => {

  test('The Header text should be "Proexe Test"', () => {
    render(<BaseHeader />)

    expect(screen.getByTestId('nav')).toHaveTextContent('Proexe Test')
  })


})