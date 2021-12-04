import React from "react";

import ErrorPage from "../ErrorPage";

import { renderHelper } from "../../utils";

describe('ErrorPage', () => {
    it('Should render 404 page', () => {
        const { getByText } = renderHelper(
            <ErrorPage errorCode={404}/>
        );
        expect(getByText('The Page you are looking at is not found')).toBeInTheDocument();
      });
      it('Should render 403 page', () => {
        const { getByText } = renderHelper(
            <ErrorPage errorCode={403}/>
        );
        expect(getByText('You are not authorized to see this page')).toBeInTheDocument();
      });
  });