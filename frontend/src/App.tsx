import React from 'react';
import { CssBaseline } from "@material-ui/core";
import { Converter } from "./components";
import { ThemeProvider } from "@material-ui/styles";
import { theme } from "./theme";

const App: React.FC = () => {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Converter />
    </ThemeProvider>
  );
}

export default App;
