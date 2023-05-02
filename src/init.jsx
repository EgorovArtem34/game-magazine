import { Provider } from 'react-redux';
import { BrowserRouter as Router } from 'react-router-dom';
import App from './App';
import store from './slices/index.js';

const init = () => (
  <Provider store={store}>
    <Router>
      <App />
    </Router>
  </Provider>
);

export default init;
