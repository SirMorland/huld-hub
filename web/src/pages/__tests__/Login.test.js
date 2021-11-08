import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import { act } from 'react-dom/test-utils';
import { fireEvent, screen } from '@testing-library/react';
import '@testing-library/jest-dom';

import LoginForm from "../Login";

import { EmailOrPasswordInvalidError } from '../../api';
import { renderHelper } from '../../utils';

describe('Login Form', () => {
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

    it('should submit when form inputs contain text', async () => {
        const onSubmit = jest.fn();

        const { getByText, queryByText } = renderHelper(<LoginForm onSubmit={onSubmit} />);

        await act(async () => {
            fireEvent.change(screen.getByLabelText(/Email/i), {
                target: { value: 'shaquille' },
            });

            fireEvent.change(screen.getByLabelText(/Password/i), {
                target: { value: 'oatmeal' },
            })
        });

        await act(async () => {
            fireEvent.submit(getByText(/^Log in$/i));
        });

        expect(queryByText("User Name is required")).not.toBeInTheDocument();
        expect(queryByText("Password is required")).not.toBeInTheDocument();
        expect(onSubmit).toBeCalled();
    });

    it('should show error message if incorrect email or password', async () => {
        const onSubmit = jest.fn();
        onSubmit.mockImplementation(() => {
            throw new EmailOrPasswordInvalidError();
        });

        const { getByText, queryByText } = renderHelper(<LoginForm onSubmit={onSubmit} />);

        expect(queryByText(/Incorrect email or password!/i)).not.toBeInTheDocument();

        await act(async () => {
            fireEvent.submit(getByText(/^Log in$/i));
        });

        expect(queryByText(/Incorrect email or password!/i)).toBeInTheDocument();
    });
});