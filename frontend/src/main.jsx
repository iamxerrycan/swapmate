import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './styles/global.css';
import { Provider } from 'react-redux';
import { store } from './App/store';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './index.css';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
      <ToastContainer
        className="custom-toast-container"
        toastClassName="custom-toast"
        position="top-center"
        theme="dark"
        autoClose={3000}
      />
    </Provider>
  </React.StrictMode>
);
