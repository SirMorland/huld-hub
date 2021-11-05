import { renderHook } from '@testing-library/react-hooks'
import useCompetenceCategories from '../useCompetenceCategories';


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
    const { result } = renderHook(() => useCompetenceCategories())
    expect(result.current.length).toEqual(0);
  })
  it('should return categories list when hub-jwt is defined and the jwt is proper', async () => {
    Object.defineProperty(window.document, 'cookie', {
      writable: true,
      value: 'hub-jwt=changedtosomethingelsesopeoplewouldntknowthaticopiedfromstackoverflow',
    });
    const mockCategories = [{ id: 1, name: 'cat' }];
    fetch.mockResponseOnce(JSON.stringify(mockCategories), { status: 200 });

    const { result, waitForNextUpdate } = renderHook(() => useCompetenceCategories())
    await waitForNextUpdate();
    expect(result.current).toEqual(mockCategories);
  });

})