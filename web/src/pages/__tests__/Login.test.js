import React from 'react';
import { act } from 'react-dom/test-utils';
import { fireEvent, screen } from '@testing-library/react';
import '@testing-library/jest-dom';

import LoginForm from "../Login";

import { renderHelper } from '../../utils';

describe('Login Form', () => {
    beforeEach(() => {
        fetch.resetMocks();
    });
    it('should render login form', () => {
        const { getByText } = renderHelper(<LoginForm />);

        expect(getByText('Log in to Hub')).toBeInTheDocument();
    });

    it('render 2 input components', () => {
        const { getByLabelText } = renderHelper(<LoginForm />);

        expect(getByLabelText(/Email/i)).toBeInTheDocument();
        expect(getByLabelText(/Password/i)).toBeInTheDocument();
    });

    it('renders a submit button', () => {
        const { getByText } = renderHelper(<LoginForm />);

        expect(getByText("LOG IN")).toBeInTheDocument();
    });

    const mockUser = {
        jwt: 'asd',
        user: {
            id: 1
        }
    };
    it('should submit when form inputs contain text', async () => {

        const { getByText, queryByText } = renderHelper(<LoginForm/>);

        await act(async () => {
            fireEvent.change(screen.getByLabelText(/Email/i), {
                target: { value: 'shaquille' },
            });

            fireEvent.change(screen.getByLabelText(/Password/i), {
                target: { value: 'oatmeal' },
            })
        });

        fetch.mockResponseOnce(JSON.stringify(mockUser),{status: 200});

        await act(async () => {
            fireEvent.submit(getByText(/^Log in$/i));
        });

        expect(queryByText("User Name is required")).not.toBeInTheDocument();
        expect(queryByText("Password is required")).not.toBeInTheDocument();
    });

    it('should show error message if incorrect email or password', async () => {

        fetch.mockResponseOnce(JSON.stringify({}),{status: 400});

        const { getByText, queryByText } = renderHelper(<LoginForm/>);

        expect(queryByText(/Incorrect email or password!/i)).not.toBeInTheDocument();

        await act(async () => {
            fireEvent.submit(getByText(/^Log in$/i));
        });

        expect(queryByText(/Incorrect email or password!/i)).toBeInTheDocument();
    });
});