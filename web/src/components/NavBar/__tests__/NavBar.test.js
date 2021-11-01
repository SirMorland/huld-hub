import NavBar from "../NavBar";
import { fireEvent } from '@testing-library/react';
import { renderWithTheme } from '../../../utils';

describe('NavBar', () => {
  it('should render homepage', () => {
    const { getByText } = renderWithTheme(<NavBar />)
    expect(getByText(/hub/i)).toBeInTheDocument();
  })
  it('should render log out side bar when logged in', () => {
    const { getByText } = renderWithTheme(<NavBar loggedIn role="employee"/>);
    expect(getByText(/log out/i)).toBeInTheDocument();
  })
  it('should render admin when logged in with admin', () => {
    const { getByText } = renderWithTheme(<NavBar loggedIn role="admin" />);
    expect(getByText(/admin/i)).toBeInTheDocument();
  it('should not render admin when logged in with employee', () => {
    const { queryByText } = renderWithTheme(<NavBar loggedIn role="employee" />);
    expect(queryByText(/admin/i)).not.toBeInTheDocument();
  });
  it('should run log out function when logout is clicked', () => {
    const onLogOutClick = jest.fn();
    const { getByText } = renderWithTheme(<NavBar loggedIn role="employee" onLogOutClick={onLogOutClick}/>);
    fireEvent.click(getByText(/log out/i));
    expect(onLogOutClick).toBeCalled();
  })
});
