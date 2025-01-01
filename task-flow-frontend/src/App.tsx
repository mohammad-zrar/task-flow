import { useRoutes } from 'react-router';
import { appRoutes } from './router/routes';
import { useDispatch } from 'react-redux';
import { autoLogin } from './redux/slices/authSlice';

export default function App() {
  const dispatch = useDispatch();

  dispatch(autoLogin());

  const routes = useRoutes(appRoutes)
  return <>
    {routes}
  </>
}


