import { renderHook } from '@testing-library/react-hooks'
import useCompetences from '../useCompetences';


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
    const { result } = renderHook(() => useCompetences('cat'))
    expect(result.current.length).toEqual(0);
  })
  it('should return categories list when hub-jwt is defined and the jwt is proper', async () => {
    const mockCompetences = [{ id: 1, name: 'cat' }];
    fetch.mockResponseOnce(JSON.stringify(mockCompetences), { status: 200 });

    const { result, waitForNextUpdate } = renderHook(() => useCompetences('cat','jwt'));
    await waitForNextUpdate();
    expect(result.current).toEqual(mockCompetences);
  });

})