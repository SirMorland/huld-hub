import { useMemo } from "react";
import { getCompetencesWithCategoryNames } from "../api";
import useCompetenceCategories from "./useCompetenceCategories";


const useSkills = (profile, jwt) => {
  const competenceCategories = useCompetenceCategories(jwt);
  const {languages, keywords} = useMemo(()=>{
    if (profile && profile.competences) {
      const competences = getCompetencesWithCategoryNames(competenceCategories, profile.competences);
      return {
        languages: competences.filter(competence => competence.category_name === "coding languages"),
        keywords: competences.filter(competence => competence.category_name === "keywords"),
      }
    } 
    return {languages: [], keywords: []};
  }, [competenceCategories, profile]);

  return {languages, keywords}
}

export default useSkills