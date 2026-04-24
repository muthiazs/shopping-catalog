import { configureStore, combineReducers } from '@reduxjs/toolkit';
import { 
  persistStore, 
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER 
} from 'redux-persist';
import cartReducer from './cartSlice';

// 1. HAPUS baris "import storage from 'redux-persist/lib/storage'" jika masih ada!

// 2. Gunakan logik Noop Storage ini
import createWebStorage from "redux-persist/lib/storage/createWebStorage";

const createNoopStorage = () => {
  return {
    getItem(_key: string) { return Promise.resolve(null); },
    setItem(_key: string, value: string) { return Promise.resolve(value); },
    removeItem(_key: string) { return Promise.resolve(); },
  };
};

// Variabel storage didefinisikan DI SINI SAJA
const storage = typeof window !== "undefined" 
  ? createWebStorage("local") 
  : createNoopStorage();

const persistConfig = {
  key: 'root',
  version: 1,
  storage, // Mengacu ke variabel di atas
};

const rootReducer = combineReducers({
  cart: cartReducer,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

export const persistor = persistStore(store);
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;