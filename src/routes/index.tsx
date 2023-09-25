import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from '../pages/Home/Home';
import DefaultLayout from '../layouts/DefaultLayout';

const Router = () => (
  <BrowserRouter>
    <Routes>
      <Route
        path="/"
        element={
          <DefaultLayout>
            <Home />{' '}
          </DefaultLayout>
        }
      />
    </Routes>
  </BrowserRouter>
);

export default Router;
