import ProfileInfo from '../ProfileInfo';

import { renderHelper } from '../../../utils';

describe('ProfileInfo', () => {
  it('Should render empty page when no props are passed', () => {
    const { getByTestId } = renderHelper(
        <ProfileInfo />
    );
    expect(getByTestId("title").innerHTML).toBe("");
    expect(getByTestId("no-item-description").innerHTML).toBe("No  provided");
  });
  it('Should render content when props are passed', () => {
    const { getByTestId } = renderHelper(
        <ProfileInfo title="bio" data="text" />
    );
    expect(getByTestId("title").innerHTML).toBe("bio");
    expect(getByTestId("data").innerHTML).toBe("<span>text<br></span>");
  });
});