import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Provider } from 'react-redux';
import { BrowserRouter as Router } from 'react-router-dom';
import 'react-loading-skeleton/dist/skeleton.css';

import Layout from './lib/layout';
import Routings from './lib/router/Routings';
import { store } from './store/store';

const App = () => {
  const queryClient = new QueryClient();

  return (
    <Provider store={store}>
      <QueryClientProvider client={queryClient}>
        <Router>
          <Layout>
            <Routings />
          </Layout>
        </Router>
      </QueryClientProvider>
    </Provider>
  );
};

export default App;
