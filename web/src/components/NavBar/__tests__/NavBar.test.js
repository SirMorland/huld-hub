import { fireEvent } from '@testing-library/react';

import { UserContext } from '../../../App';
import NavBar from "../NavBar";
import { renderHelper } from '../../../utils';

describe('NavBar', () => {
  it('should render homepage', () => {
    const { getByText } = renderHelper(<NavBar />)
    expect(getByText(/hub/i)).toBeInTheDocument();
  });
  it('should render log out side bar when logged in', () => {
    const { getByText } = renderHelper(
      <UserContext.Provider value={{user:{role: {type: 'employee'}}}}>
        <NavBar />
      </UserContext.Provider>
    );
    expect(getByText(/log out/i)).toBeInTheDocument();
  });
  it('should render admin when logged in with admin', () => {
    const { getByText } = renderHelper(
      <UserContext.Provider value={{user:{role: {type: 'admin'}}}}>
        <NavBar />
      </UserContext.Provider>
    );
    expect(getByText(/admin/i)).toBeInTheDocument();
  });
  it('should not render admin when logged in with employee', () => {
    const { queryByText } = renderHelper(
      <UserContext.Provider value={{user:{role: {type: 'employee'}}}}>
        <NavBar />
      </UserContext.Provider>
    );
    expect(queryByText(/admin/i)).not.toBeInTheDocument();
  });
  it('should run log out function when logout is clicked', () => {
    const onLogOutClick = jest.fn();
    const { getByText } = renderHelper(
      <UserContext.Provider value={{user:{role: {type: 'employee'}}}}>
        <NavBar onLogOutClick={onLogOutClick} />
      </UserContext.Provider>
    );
    fireEvent.click(getByText(/log out/i));
    expect(onLogOutClick).toBeCalled();
  });
});
