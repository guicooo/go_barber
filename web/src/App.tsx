import React from 'react';
import AppProvider from './hooks';
import { BrowserRouter as Router } from 'react-router-dom';
import Routes from './routes';

import GlobalStyle from './styles/global'

const App : React.FC = () => (
  <Router>

    <AppProvider>
      <Routes />
    </AppProvider>
    <GlobalStyle />
  </Router>
);

export default App;
