import { renderHook } from '@testing-library/react-hooks'
import useUser from '../useUser';


beforeEach(() => {
  fetch.resetMocks();
});

afterAll(() =>{
  Object.defineProperty(window.document, 'cookie', {
    writable: true,
    value: '',
  });
});

describe('useUser hook', () => {

  it('should return false when hub-jtw is not defined', () => {
    const { result } = renderHook(() => useUser('jwt'))
    expect(result.current).toBeFalsy();
  })
  it('should return user when hub-jwt is defined and the jwt is proper', async () => {
    const mockUser = { id: 1 };
    fetch.mockResponseOnce(JSON.stringify(mockUser),{status: 200});

    const { result, waitForNextUpdate } = renderHook(() => useUser('jwt'));
    await waitForNextUpdate();
    expect(result.current).toEqual(mockUser);
  });

})