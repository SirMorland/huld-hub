import React from 'react';
import { ThemeProvider } from '@mui/material/styles';
import { styled } from '@mui/system';

import Page from './components/Page/Page';
import theme from './theme';

const h2 = {
  margin: 0
};
const h3 = {
  margin: 0,
  marginTop: 16

};
const p = {
  margin: 0
};

const Skills = styled('div')`
  @media (min-width: 768px) {
    grid-column-start: 1;
  }
  @media (min-width: 1152px) {
    grid-column-start: 1;
  }
`;
const Languages = styled('div')`
  @media (min-width: 768px) {
    grid-column-start: 1;
  }
  @media (min-width: 1152px) {
    grid-column-start: 1;
  }
`;
const Keywords = styled('div')`
  @media (min-width: 768px) {
    grid-column-start: 2;
  }
  @media (min-width: 1152px) {
    grid-column-start: 1;
  }
`;
const Bio = styled('div')`
  @media (min-width: 768px) {
    grid-column-start: 2;
  }
  @media (min-width: 1152px) {
    grid-column-start: 1;
  }
`;
const Work = styled('div')`
  @media (min-width: 768px) {
    grid-column-start: 1;
  }
  @media (min-width: 1152px) {
    grid-column-start: 2;
  }
`;
const Education = styled('div')`
  @media (min-width: 768px) {
    grid-column-start: 2;
  }
  @media (min-width: 1152px) {
    grid-column-start: 3;
  }
`;

function App() {
  return (
    <ThemeProvider theme={theme}>
      <Page header={
        <h1 style={{margin: 0, color: 'white'}}>Firstname Lastname</h1>
      }>
        <React.Fragment>
          <Skills>
            <h2 style={h2}>Skills</h2>
            <p style={p}>Skill 1</p>
            <p style={p}>Skill 2</p>
            <p style={p}>Skill 3</p>
          </Skills>
          <Languages>
            <h2 style={h2}>Languages</h2>
            <p style={p}>Language 1</p>
            <p style={p}>Language 2</p>
            <p style={p}>Language 3</p>
          </Languages>
          <Keywords>
            <h2 style={h2}>Keywords</h2>
            <p style={p}>Keyword 1</p>
            <p style={p}>Keyword 2</p>
            <p style={p}>Keyword 3</p>
          </Keywords>
          <Bio>
            <h2 style={h2}>Bio</h2>
            <p style={p}>Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua.</p>
          </Bio>
        </React.Fragment>
        <Work>
          <h2 style={h2}>Work History</h2>
          <h3 style={h3}>Cleaner</h3>
          <p style={p}>I cleaned</p>
        </Work>
        <Education>
          <h2 style={h2}>Education History</h2>
          <h3 style={h3}>Daycare</h3>
          <p style={p}>I studied vector algebra</p>
        </Education>
      </Page>
    </ThemeProvider>
  );
}

export default App;
