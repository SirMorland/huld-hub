import { fireEvent } from '@testing-library/react';

import NavBar from "../NavBar";
import { renderHelper } from '../../../utils';

describe('NavBar', () => {
  it('should render homepage', () => {
    const { getByText } = renderHelper(<NavBar />)
    expect(getByText(/hub/i)).toBeInTheDocument();
  });
  it('should render log out side bar when logged in', () => {
    const { getByText } = renderHelper(<NavBar />, {user:{role: {type: 'employee'}}});
    expect(getByText(/log out/i)).toBeInTheDocument();
  });
  it('should render admin when logged in with admin', () => {
    const { getByText } = renderHelper(<NavBar />, {user:{role: {type: 'admin'}}});
    expect(getByText(/admin/i)).toBeInTheDocument();
  });
  it('should not render admin when logged in with employee', () => {
    const { queryByText } = renderHelper(<NavBar />, {user:{role: {type: 'employee'}}});
    expect(queryByText(/admin/i)).not.toBeInTheDocument();
  });
  it('should run log out function when logout is clicked', () => {
    const onLogOutClick = jest.fn();
    const { getByText } = renderHelper(<NavBar onLogOutClick={onLogOutClick} />, {user:{role: {type: 'employee'}}});
    fireEvent.click(getByText(/log out/i));
    expect(onLogOutClick).toBeCalled();
  });
});
