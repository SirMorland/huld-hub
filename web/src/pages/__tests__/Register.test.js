import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react';
import RegistrationForm from "../Register";
import '@testing-library/jest-dom';
import { act } from 'react-dom/test-utils';

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
    /*   
           it('should submit when form inputs contain text', async () => {
               const { getByTestId, queryByText } = render(<RegistrationForm />);
       
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
           });*/
});