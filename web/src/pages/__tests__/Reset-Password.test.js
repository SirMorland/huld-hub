import React from 'react';
import { act } from 'react-dom/test-utils';
import { fireEvent, screen } from '@testing-library/react';
import '@testing-library/jest-dom';

import ResetPasswordForm from "../Reset-Password";

import { renderHelper } from '../../utils';

describe('Reset password Form', () => {
    beforeEach(() => {
        fetch.resetMocks();
    });
    const mockUser = {
        jwt: 'asd',
        user: {
            id: 1
        }
    };
    it('should render reset password form', () => {
        const { getByText } = renderHelper(<ResetPasswordForm />);
        expect(getByText('Reset password')).toBeInTheDocument();
    });

    it('render input components', () => {
        const { getByLabelText } = renderHelper(<ResetPasswordForm />);
        expect(getByLabelText(/New Password/i)).toBeInTheDocument();
    });

    it('renders a submit button', () => {
        const { getByText } = renderHelper(<ResetPasswordForm />);
        expect(getByText("Reset")).toBeInTheDocument();
    });

    it('should submit when form inputs contain text', async () => {

        const { getByText, queryByText } = renderHelper(<ResetPasswordForm />);

        await act(async () => {
            fireEvent.change(screen.getByLabelText(/^New Password/i), {
                target: { value: 'oatmeal' },
            });

            fireEvent.change(screen.getByLabelText(/Re-enter Password/i), {
                target: { value: 'oatmeal' },
            })
        });

        fetch.mockResponseOnce(JSON.stringify(mockUser), { status: 200 });
        await act(async () => {
            fireEvent.submit(getByText(/^Reset$/i));
        });

        expect(queryByText("Password is required")).not.toBeInTheDocument();
    });

    it('should check that passwords match', async () => {

        const { getByText, queryByText } = renderHelper(<ResetPasswordForm />);

        await act(async () => {
            fireEvent.change(screen.getByLabelText(/^New Password/i), {
                target: { value: 'oatmeal' },
            });

            fireEvent.change(screen.getByLabelText(/Re-enter Password/i), {
                target: { value: 'ryemeal' },
            })
        });

        expect(queryByText("Passwords do not match! Please check")).not.toBeInTheDocument();

        await act(async () => {
            fireEvent.submit(getByText(/^Reset$/i));
        });

        expect(queryByText("Passwords do not match! Please check")).toBeInTheDocument();
    });
});