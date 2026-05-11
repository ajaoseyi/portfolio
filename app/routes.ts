import { type RouteConfig, index, route } from '@react-router/dev/routes';

export default [
  index('routes/_index.tsx'),
  route('work/:id', 'routes/work.$id.tsx'),
] satisfies RouteConfig;
