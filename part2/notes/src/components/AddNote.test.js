import React from "react";
import '@testing-library/jest-dom/extend-expect'
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import AddNote from "./AddNote";

test('<AddNote /> updates parent state and calls on submit button', async () => {
    let createNote = jest.fn()

    render(<AddNote createNote={ createNote } />)

    const input = screen.getByRole('textbox')
    // we can use placeholder text for specific targeting
    const sendButton = screen.getByText('save')

    await userEvent.type(input, 'testing a form...')
    await userEvent.click(sendButton)

    expect(createNote.mock.calls).toHaveLength(1)
    expect(createNote.mock.calls[0][0].content).toBe('a new note...testing a form...')
})