import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Provider } from 'react-redux';
import { BrowserRouter as Router } from 'react-router-dom';
import 'react-loading-skeleton/dist/skeleton.css';

import AuthWatcher from './lib/components/AuthWatcher';
import Layout from './lib/layout';
import Routings from './lib/router/Routings';
import { store } from './store/store';

const queryClient = new QueryClient();

const App = () => {
  return (
    <Provider store={store}>
      <QueryClientProvider client={queryClient}>
        <AuthWatcher />
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
