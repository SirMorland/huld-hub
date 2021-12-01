import React from 'react';
import { act } from 'react-dom/test-utils';
import '@testing-library/jest-dom';
import { fireEvent } from '@testing-library/react';

import AlmostDOne from "../AlmostDone";

import { renderHelper } from '../../utils';

describe('Almost done', () => {
    beforeEach(() => {
        fetch.resetMocks();
    });

    it('should render login form', () => {
        const { getByText } = renderHelper(<AlmostDOne />);

        expect(getByText('Almost done')).toBeInTheDocument();
    });

    it('renders a submit button', () => {
        const { getByText } = renderHelper(<AlmostDOne />);

        expect(getByText("Resend confirmation email")).toBeInTheDocument();
    });

    const mockUser = {
        jwt: 'asd',
        user: {
            id: 1
        }
    };
    it('should show notification on succesful submit', async () => {

        const { getByText, queryByText } = renderHelper(<AlmostDOne/>);

        fetch.mockResponseOnce(JSON.stringify(mockUser),{status: 200});

        await act(async () => {
            fireEvent.click(getByText(/^Resend confirmation email$/i));
        });

        expect(queryByText("Encountered an error when attempting to send email")).not.toBeInTheDocument();
        expect(queryByText("Confirmation email should arrive shortly.")).toBeInTheDocument();
    });

    it('should show error on failed submit', async () => {

        fetch.mockResponseOnce(JSON.stringify({}),{status: 400});

        const { getByText, queryByText } = renderHelper(<AlmostDOne/>);

        expect(queryByText(/Encountered an error when attempting to send email/i)).not.toBeInTheDocument();

        await act(async () => {
            fireEvent.click(getByText(/^Resend confirmation email$/i));
        });

        expect(queryByText(/Encountered an error when attempting to send email/i)).toBeInTheDocument();
    });

});