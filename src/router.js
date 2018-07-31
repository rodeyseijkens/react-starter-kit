import UniversalRouter from 'universal-router';
import routes from './routes';

export default new UniversalRouter(routes, {
  resolveRoute(context, params) {
    const { route } = context;
    if (typeof route.load === 'function') {
      return route.load().then(action => action.default(context, params));
    }
    if (typeof route.action === 'function') {
      return route.action(context, params);
    }
    return undefined;
  },
});
