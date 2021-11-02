import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react';
import LoginForm from "../Login";
import { MemoryRouter } from 'react-router-dom';
import '@testing-library/jest-dom';
import { act } from 'react-dom/test-utils';

describe('Login Form', () => {
    it('should render login form', () => {
        const { getByText } = render(
            <MemoryRouter initialEntries={[{ pathname: '/', search: '?value=teresa_teng' }]}>
                <LoginForm />
            </MemoryRouter>);
        expect(getByText('Log in to Hub')).toBeInTheDocument();
    });

    it('render 2 input components', () => {
        const { getByLabelText } = render(
            <MemoryRouter initialEntries={[{ pathname: '/', search: '?value=teresa_teng' }]}>
                <LoginForm />
            </MemoryRouter>);
        expect(getByLabelText(/Email/i)).toBeInTheDocument();
        expect(getByLabelText(/Password/i)).toBeInTheDocument();
    });

    it('renders a submit button', () => {
        const { getByText } = render(
            <MemoryRouter initialEntries={[{ pathname: '/', search: '?value=teresa_teng' }]}>
                <LoginForm />
            </MemoryRouter>);
        expect(getByText("LOG IN")).toBeInTheDocument();
    });

    it('should submit when form inputs contain text', async () => {
        const { getByTestId, queryByText } = render(
            <MemoryRouter initialEntries={[{ pathname: '/', search: '?value=teresa_teng' }]}>
                <LoginForm />
            </MemoryRouter>);

        await act(async () => {
            fireEvent.change(screen.getByLabelText(/Email/i), {
                target: { value: 'shaquille' },
            });

            fireEvent.change(screen.getByLabelText(/Password/i), {
                target: { value: 'oatmeal' },
            })
        });

        await act(async () => {
            fireEvent.submit(getByTestId('form'))
        });

        expect(queryByText("User Name is required")).not.toBeInTheDocument();
        expect(queryByText("Password is required")).not.toBeInTheDocument();
    });
});