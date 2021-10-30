import NavBar from "../NavBar";
import { render, fireEvent } from '@testing-library/react';

describe('NavBar', () => {
  it('should render homepage', () => {
    const { getByText } = render(<NavBar />)
    expect(getByText(/hub/i)).toBeInTheDocument();
  })
  it('should render log out side bar when logged in', () => {
    const { getByText } = render(<NavBar loggedIn role="employee"/>);
    expect(getByText(/log out/i)).toBeInTheDocument();
  })
  it('should render admin when logged in with admin', () => {
    const { getByText } = render(<NavBar loggedIn role="admin" />);
    expect(getByText(/admin/i)).toBeInTheDocument();
  })
  it('should run log out function when logout is clicked', () => {
    const onLogOutClick = jest.fn();
    const { getByText } = render(<NavBar loggedIn role="employee" onLogOutClick={onLogOutClick}/>);
    fireEvent.click(getByText(/log out/i));
    expect(onLogOutClick).toBeCalled();
  })
});
