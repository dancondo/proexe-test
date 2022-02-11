import React from 'react'

import {render, screen, cleanup, fireEvent} from '@testing-library/react'
import '@testing-library/jest-dom'

import BaseModal from './index'

const modal = document.createElement('div')
modal.setAttribute('id', 'modal')
modal.setAttribute('data-testid', 'modal-container')
document.body.appendChild(modal)

describe('Base Modal Component', () => {
  afterEach(cleanup)

  test('The modal should render the children and a title', () => {
    const { getByTestId } = render(<BaseModal show title="Title" onClose={() => null}>ModalContent</BaseModal>)

    expect(getByTestId('base-modal')).toHaveTextContent('Title')
    expect(getByTestId('base-modal')).toHaveTextContent('ModalContent')
  })

  test('The modal should be displayed if the prop show is true', () => {
    const { getByTestId } = render(<BaseModal show title="Title" onClose={() => null}>ModalContent</BaseModal>)

    expect(getByTestId('base-modal')).toBeVisible()
  })

  test('The modal not should be displayed if the prop show is missing or false', () => {
    render(<BaseModal title="Title" onClose={() => null}>ModalContent</BaseModal>)

    expect(screen.getByTestId('modal-container')).not.toHaveTextContent('Title')
    expect(screen.getByTestId('modal-container')).not.toHaveTextContent('ModalContent')
  })

  test('on close should be triggered on click', () => {
    const onClose = jest.fn()

    const { getByLabelText } = render(<BaseModal show title="Title" onClose={onClose}>ModalContent</BaseModal>)
    
    fireEvent.click(getByLabelText(/close/i))

    expect(onClose).toHaveBeenCalledTimes(1)
  })


})