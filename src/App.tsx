import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

// Context Providers
import { Provider as FlashMessageProvider } from './contexts/FlashMessageContext';
import { Provider as SearchProvider } from './contexts/SearchContext';

// Screens
import DashboardScreen from './screens/DashboardScreen';
import PageNotFoundScreen from './screens/PageNotFoundScreen';

const App = () => {
  return (
    <FlashMessageProvider>
      <SearchProvider>
        <Router>
          <Routes>
            <Route path='/' element={<DashboardScreen />} />
            <Route path='*' element={<PageNotFoundScreen />} />
          </Routes>
        </Router>
      </SearchProvider>
    </FlashMessageProvider>
  );
};

export default App;
