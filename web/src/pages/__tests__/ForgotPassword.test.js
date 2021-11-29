import React from 'react';
import { act } from 'react-dom/test-utils';
import { fireEvent, screen } from '@testing-library/react';
import '@testing-library/jest-dom';

import PasswordResetLinkForm from "../ForgotPassword"

import { renderHelper } from '../../utils';

describe('Login Form', () => {
    beforeEach(() => {
        fetch.resetMocks();
    });
    it('should render password resetlink form', () => {
        const { getByText } = renderHelper(<PasswordResetLinkForm />);
        
        expect(getByText('Forgot password')).toBeInTheDocument();
    });

    it('render input', () => {
        const { getByLabelText } = renderHelper(<PasswordResetLinkForm />);

        expect(getByLabelText(/Email/i)).toBeInTheDocument();
    });

    it('renders a submit button', () => {
        const { getByText } = renderHelper(<PasswordResetLinkForm />);

        expect(getByText("Send password reset link")).toBeInTheDocument();
    });

    const mockUser = {
        jwt: 'asd',
        user: {
            id: 1
        }
    };
    it('should submit when form inputs contain text', async () => {

        const { getByText, queryByText } = renderHelper(<PasswordResetLinkForm/>);

        await act(async () => {
            fireEvent.change(screen.getByLabelText(/Email/i), {
                target: { value: 'shaquille' },
            });
        });

        fetch.mockResponseOnce(JSON.stringify(mockUser),{status: 200});

        await act(async () => {
            fireEvent.submit(getByText(/^Send password reset link$/i));
        });

        expect(queryByText("Email not found")).not.toBeInTheDocument();
    });

    it('should show error message if incorrect email or password', async () => {

        fetch.mockResponseOnce(JSON.stringify({}),{status: 400});

        const { getByText, queryByText } = renderHelper(<PasswordResetLinkForm/>);

        expect(queryByText(/Email not found/i)).not.toBeInTheDocument();

        await act(async () => {
            fireEvent.submit(getByText(/^Send password reset link$/i));
        });

        expect(queryByText(/Email not found/i)).toBeInTheDocument();
    });
});