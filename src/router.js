
import UniversalRouter from 'universal-router';
import routes from './routes';
import { localeDict } from './helpers/formatLocale';
import { setLocale } from './actions/intl';

export default new UniversalRouter(routes, {
  resolveRoute(context, params) {
    if (
      params.lang === undefined
      || ![...Object.keys(localeDict), "assets"].includes(params.lang)
    ) {
      return { redirect: `/${context.locale || 'en-US'}${context.pathname}` };
    }
    context.intl = context.store.dispatch(setLocale({ locale: params.lang }))
    let route;


    if (typeof context.route.load === 'function') {
      route = context.route
        .load()
        .then(action => action.default(context, params));
    } else if (typeof context.route.action === 'function') {
      route = context.route.action(context, params);
    }

    return route;
  },
});
