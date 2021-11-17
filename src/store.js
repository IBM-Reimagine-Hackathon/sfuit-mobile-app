import {createStore, applyMiddleware, compose} from 'redux';
import createSagaMiddleware from 'redux-saga';

import reducers from './reducers';
import sagas from './sagas';

const storeConfig = () => {
  const sagaMiddleware = createSagaMiddleware();

  let middleware = applyMiddleware(sagaMiddleware);

  if (process.env.NODE_ENV !== 'production') {
    const devToolsExtension = window.devToolsExtension;
    if (typeof devToolsExtension === 'function') {
      middleware = compose(middleware, devToolsExtension());
    }
  }

  const store = createStore(reducers, middleware);

  sagaMiddleware.run(sagas);
  return store;
};

export default storeConfig;
