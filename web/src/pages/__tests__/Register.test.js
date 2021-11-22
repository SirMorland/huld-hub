import React from 'react';
import { act } from 'react-dom/test-utils';
import { fireEvent, screen } from '@testing-library/react';
import '@testing-library/jest-dom';

import RegistrationForm from "../Register";

import { renderHelper } from '../../utils';

describe('Registration Form', () => {
    beforeEach(() => {
        fetch.resetMocks();
    });
    const mockUser = {
        jwt: 'asd',
        user: {
            id: 1
        }
    };
    it('should render registration form', () => {
        const { getByText } = renderHelper(<RegistrationForm />);
        expect(getByText('Register to Hub')).toBeInTheDocument();
    });

    it('render input components', () => {
        const { getByLabelText } = renderHelper(<RegistrationForm />);
        expect(getByLabelText(/Email/i)).toBeInTheDocument();
    });

    it('renders a submit button', () => {
        const { getByText } = renderHelper(<RegistrationForm />);
        expect(getByText("Register")).toBeInTheDocument();
    });

    it('should submit when form inputs contain text', async () => {

        const { getByText, queryByText } = renderHelper(<RegistrationForm />);

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

        fetch.mockResponseOnce(JSON.stringify(mockUser), { status: 200 });
        await act(async () => {
            fireEvent.submit(getByText(/^Register$/i));
        });

        expect(queryByText("User Name is required")).not.toBeInTheDocument();
        expect(queryByText("Password is required")).not.toBeInTheDocument();
    });

    it('should check that passwords match', async () => {

        const { getByText, queryByText } = renderHelper(<RegistrationForm />);

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
        const errorMessage = "Please provide valid email address i.e youremail@huld.io";
        const mockResponse = {
            data: [{
                messages: [{
                    id: "Auth.form.error.email.format",
                    message: errorMessage,
                }]
            }]
        };
        fetch.mockResponseOnce(JSON.stringify(mockResponse), { status: 400 });

        const { getByText, queryByText } = renderHelper(<RegistrationForm />);

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
        const mockResponse = {
            data: [{
                messages: [{
                    id: "Auth.form.error.email.taken",
                }]
            }]
        };
        const { getByText, queryByText } = renderHelper(<RegistrationForm />);

        fetch.mockResponseOnce(JSON.stringify(mockResponse), { status: 400 });
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