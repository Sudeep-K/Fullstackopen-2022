import React from "react";
import '@testing-library/jest-dom/extend-expect'
import { render, screen } from '@testing-library/react'
import userEvent from "@testing-library/user-event";
import Note from './Note'

test('renders content', () => {
    const note = {
        content: 'Component testing is done with react-testing-library',
        important: true
    }

    render(<Note note={note} />)
    const element = screen.getAllByText('Component testing is done with react-testing-library')

    screen.debug()

    expect(element).toBeDefined()
})

test('clicking the button calls event handler once', async () => {
    const note = {
        content: 'Component testing is done using react-testing-library',
        important: true
    }

    const mockHandler = jest.fn()

    render(<Note note={ note } toggleImportance={mockHandler} />)

    const button = screen.getByText('make not important')
    await userEvent.click(button)

    expect(mockHandler.mock.calls).toHaveLength(1)
})