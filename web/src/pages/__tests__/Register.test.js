import React from 'react';
import { act } from 'react-dom/test-utils';
import { render, fireEvent, screen } from '@testing-library/react';
import '@testing-library/jest-dom';

import RegistrationForm from "../Register";

import { EmailTakenError, EmailWrongDomainError } from '../../api';

describe('Registration Form', () => {
    it('should render registration form', () => {
        const { getByText } = render(<RegistrationForm />);
        expect(getByText('Register to Hub')).toBeInTheDocument();
    });

    it('render input components', () => {
        const { getByLabelText } = render(<RegistrationForm />);
        expect(getByLabelText(/Email/i)).toBeInTheDocument();
    });

    it('renders a submit button', () => {
        const { getByText } = render(<RegistrationForm />);
        expect(getByText("Register")).toBeInTheDocument();
    });

    it('should submit when form inputs contain text', async () => {
        const onSubmit = jest.fn();

        const { getByText, queryByText } = render(
            <RegistrationForm onSubmit={onSubmit} />
        );

        await act(async () => {
            fireEvent.change(screen.getByLabelText(/Email/i), {
                target: { value: 'shaquille' },
            });

            fireEvent.change(screen.getByLabelText(/^Password/i), {
                target: { value: 'oatmeal' },
            });

            fireEvent.change(screen.getByLabelText(/Re-enter Password/i), {
                target: { value: 'oatmeal' },
            })
        });

        await act(async () => {
            fireEvent.submit(getByText(/^Register$/i));
        });

        expect(queryByText("User Name is required")).not.toBeInTheDocument();
        expect(queryByText("Password is required")).not.toBeInTheDocument();
        expect(onSubmit).toBeCalled();
    });

    it('should check that passwords match', async () => {
        const onSubmit = jest.fn();

        const { getByText, queryByText } = render(
            <RegistrationForm onSubmit={onSubmit} />
        );

        await act(async () => {
            fireEvent.change(screen.getByLabelText(/Email/i), {
                target: { value: 'shaquille' },
            });

            fireEvent.change(screen.getByLabelText(/^Password/i), {
                target: { value: 'oatmeal' },
            });

            fireEvent.change(screen.getByLabelText(/Re-enter Password/i), {
                target: { value: 'ryemeal' },
            })
        });

        expect(queryByText("Passwords do not match! Please check")).not.toBeInTheDocument();

        await act(async () => {
            fireEvent.submit(getByText(/^Register$/i));
        });

        expect(queryByText("Passwords do not match! Please check")).toBeInTheDocument();
    });

    it('should check that email is in right domain', async () => {
        const onSubmit = jest.fn();
        const errorMessage = "Please provide valid email address i.e youremail@huld.io";
        onSubmit.mockImplementation(() => {
            throw new EmailWrongDomainError(errorMessage);
        });

        const { getByText, queryByText } = render(
            <RegistrationForm onSubmit={onSubmit} />
        );

        await act(async () => {
            fireEvent.change(screen.getByLabelText(/Email/i), {
                target: { value: 'shaquille' },
            });

            fireEvent.change(screen.getByLabelText(/^Password/i), {
                target: { value: 'oatmeal' },
            });

            fireEvent.change(screen.getByLabelText(/Re-enter Password/i), {
                target: { value: 'oatmeal' },
            })
        });

        expect(queryByText(errorMessage)).not.toBeInTheDocument();

        await act(async () => {
            fireEvent.submit(getByText(/^Register$/i));
        });

        expect(queryByText(errorMessage)).toBeInTheDocument();
    });

    it('should check that email is not taken', async () => {
        const onSubmit = jest.fn();
        onSubmit.mockImplementation(() => {
            throw new EmailTakenError();
        });

        const { getByText, queryByText } = render(
            <RegistrationForm onSubmit={onSubmit} />
        );

        await act(async () => {
            fireEvent.change(screen.getByLabelText(/Email/i), {
                target: { value: 'shaquille' },
            });

            fireEvent.change(screen.getByLabelText(/^Password/i), {
                target: { value: 'oatmeal' },
            });

            fireEvent.change(screen.getByLabelText(/Re-enter Password/i), {
                target: { value: 'oatmeal' },
            })
        });

        expect(queryByText("Email already taken!")).not.toBeInTheDocument();

        await act(async () => {
            fireEvent.submit(getByText(/^Register$/i));
        });

        expect(queryByText("Email already taken!")).toBeInTheDocument();
    });
});