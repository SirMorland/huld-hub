import { renderHook } from '@testing-library/react-hooks'
import useGetCompetencesByCategory from '../useGetCompetencesByCategory';

const categories = [
  {
    id: 1,
    name: 'coding languages'
  },
]

const correctCompenteces = [    {
  name: 'com1',
  category: 1,
},
{
  name: 'com2',
  category: 1,
},
{
  name: 'com3',
  category: 1,
}];

const profile = {
  competences: [
    ...correctCompenteces,
    {
      name: 'com4',
      category: 2,
    },
    {
      name: 'com5',
      category: 4,
    }
  ]
}

describe('useGetCompetencesByCategory hook', () => {
  it('should return an empty array when profile not loaded', () => {
    const { result } = renderHook(() => useGetCompetencesByCategory(null, null, 'coding languages'));
    expect(result.current).toEqual([]);
  });
  it('should return correct array with correct category', () => {
    const { result } = renderHook(() => useGetCompetencesByCategory(profile, categories, 'coding languages'));
    expect(result.current).toEqual(correctCompenteces);
  });
});

