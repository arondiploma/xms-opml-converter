import React from 'react';
import { CssBaseline } from "@material-ui/core";
import { Converter, TopBar } from "./components";
import { ThemeProvider } from "@material-ui/styles";
import { theme } from "./theme";


const App: React.FC = () => {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <TopBar />
      <Converter />
    </ThemeProvider>
  );
}

export default App;
