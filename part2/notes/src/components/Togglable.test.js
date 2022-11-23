import React from "react";
import '@testing-library/jest-dom/extend-expect'
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Togglable from "./Togglable";

describe('<Togglable />', () => {
    let container

    beforeEach(() => {
        container = render(
            <Togglable buttonLabel='...show'>
                <div className="testDiv">
                    togglable content
                </div>
            </Togglable>
        ).container
    })

    test('renders its children', async () => {
        await screen.getAllByText('togglable content')
    })

    test('at start the childrens are not displayed', async () => {
        const div = container.querySelector('.togglableContent')
        expect(div).toHaveStyle('display : none')
    })

    test('after clicking button, childrens are shown', async () => {
        let button = screen.getByText('...show')
        await userEvent.click(button)

        const div = container.querySelector('.togglableContent')
        expect(div).not.toHaveStyle('display: none')
    })

    test('toggled content can be closed', async () => {
        let button = screen.getByText('...show')
        await userEvent.click(button)

        button = screen.getByText('cancel')
        await userEvent.click(button)

        const div = container.querySelector('.togglableContent')
        expect(div).toHaveStyle('display: none')
    })
})