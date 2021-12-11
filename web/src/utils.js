import { BrowserRouter } from "react-router-dom";
import { render } from "@testing-library/react";

import { ThemeProvider } from "@mui/material";

import theme from "./theme";
import React from "react";
import { UserProvider } from "./userContext";

export const fetchPost = (url, body, jwt, method) => {
  const headers = {
    Accept: "application/json",
    "Content-Type": "application/json",
  }
  if (jwt) headers["Authorization"] = `Bearer ${jwt}`;
  return fetch(url, {
    method: method || "POST",
    headers,
    body: JSON.stringify(body),
  });
};

export const getYear = (data) => {
  if (!data) return "    ";
  const date = new Date(data);
  return date.getFullYear();
};

export const renderWithTheme = (children) => {
  return render(<ThemeProvider theme={theme}>{children}</ThemeProvider>);
};
export const renderWithRouter = (children) => {
  return render(<BrowserRouter>{children}</BrowserRouter>);
};
export const renderHelper = (children, context) => {
  const contextValue = {
    setJwt: () => { },
    jwt: "jwt",
    ...context,
  };
  return render(
    <ThemeProvider theme={theme}>
      <BrowserRouter>
        <UserProvider value={contextValue}>
          {children}
        </UserProvider>
      </BrowserRouter>
    </ThemeProvider>
  );
};

export const capitalizeFirstLetters = (string) => {
  return string.charAt(0).toUpperCase() + string.slice(1);
};

export const getCompetencesWithCategoryNames = (categories, competences) => {
  if (
    competences &&
    competences.length > 0 &&
    categories &&
    categories.length > 0
  )
    return competences.map((competence) => {
      const category = categories.find(
        (category) => category.id === competence.category || category.id
      );
      return {
        ...competence,
        category_name: category.name,
      };
    });
  return [];
};

export const formatProfileForSave = (profile) => {
  delete profile.keywords;
  delete profile.languages;
  delete profile.user;
  delete profile.file;
  // TODO: format more things here
  return profile;
}

/**
 * Converts a given value to a number
 *
 * @param {number | string} value
 * @returns {number}
 */
 export const toNumber = (value) => {
  if (typeof value === 'number') return value;
  if (
    (typeof value === 'string' && value.trim().length === 0) ||
    typeof value !== 'string'
  )
    return NaN;
  return Number(value);
};