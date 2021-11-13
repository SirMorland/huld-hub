import { useMemo } from "react";

const useGetCompetencesByCategory = (profile, categories, categoryName) => {
  const competences = useMemo(
    () => {
      if (profile) return profile.competences.filter(
        ({ category }) => {
          const catId = category.id || category;
          const cat = categories && categories.find(({ name }) => name === categoryName);
          return cat && cat.id === catId;
        });
      else return [];
    },
    [profile, categories, categoryName]
  );
  return competences;
};

export default useGetCompetencesByCategory;