import { renderHook } from '@testing-library/react-hooks'
import useProfile from '../useProfile';


beforeEach(() => {
  fetch.resetMocks();
});

afterAll(() => {
  Object.defineProperty(window.document, 'cookie', {
    writable: true,
    value: '',
  });
});

describe('useCompetenceCategories hook', () => {

  it('should return an empty array when hub-jtw is not defined', () => {
    const { result } = renderHook(() => useProfile(1))
    expect(result.current).toEqual(null);
  })
  it('should return categories list when hub-jwt is defined and the jwt is proper', async () => {
    Object.defineProperty(window.document, 'cookie', {
      writable: true,
      value: 'hub-jwt=changedtosomethingelsesopeoplewouldntknowthaticopiedfromstackoverflow',
    });
    const mockProfile = [{ id: 1, name: 'cat' }];
    fetch.mockResponseOnce(JSON.stringify(mockProfile), { status: 200 });

    const { result, waitForNextUpdate } = renderHook(() => useProfile(1))
    await waitForNextUpdate();
    expect(result.current).toEqual(mockProfile);
  });

})