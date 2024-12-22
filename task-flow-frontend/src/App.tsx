import { useRoutes } from 'react-router';
import { appRoutes } from './router/routes';

export default function App() {
  const routes = useRoutes(appRoutes)
  return routes
}


