import NavBar from "../NavBar";
import { renderHelper } from '../../../utils';

describe('NavBar', () => {
  it('should render homepage', () => {
    const { getByText } = renderHelper(<NavBar />)
    expect(getByText(/hub/i)).toBeInTheDocument();
  });
  it('should render setting side bar when logged in', () => {
    const { getByText } = renderHelper(<NavBar loggedIn role="employee" />);
    expect(getByText(/settings/i)).toBeInTheDocument();
  });
  it('should render admin when logged in with admin', () => {
    const { getByText } = renderHelper(<NavBar loggedIn role="admin" />);
    expect(getByText(/admin/i)).toBeInTheDocument();
  });
  it('should not render admin when logged in with employee', () => {
    const { queryByText } = renderHelper(<NavBar loggedIn role="employee" />);
    expect(queryByText(/admin/i)).not.toBeInTheDocument();
  });
});
