import { combineReducers, configureStore } from '@reduxjs/toolkit';
import {
  persistReducer,
  persistStore,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import documentsReducer, { addDocument, removeDocument, setCurrenDocument } from './documents/slice';

const persistConfig = {
  key: 'root',
  storage,
  whitelist: ['documents', 'currentDocument'],
};

const reducer = combineReducers({
  documents: persistReducer(persistConfig, documentsReducer),
});

const store = configureStore({
  reducer,
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

const persistor = persistStore(store);

export type AppState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch;

export {
  store,
  persistor,
  addDocument,
  setCurrenDocument,
  removeDocument,
};
