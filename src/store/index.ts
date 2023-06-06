import { combineReducers, configureStore, getDefaultMiddleware } from "@reduxjs/toolkit";
import UserSlice from "./features/user/userSlice";
import UserProfileSlice from "./features/user/userProfileSlice";
import UserMatchesSlice from "./features/user/userMatchesSlice";
import UserChoicesSlice from "./features/user/userChoicesSlice";
import PromptSlice from "./features/prompts/promptsSlice";
import MessagesSlice from "./features/messages/messagesSlice";
import MatchSlice from "./features/matches/matchSlice";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {
  FLUSH,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
  REHYDRATE,
  persistReducer,
  persistStore,
} from "redux-persist";

const persistConfig = {
  key: "root",
  storage: AsyncStorage,
  whitelist: ["appUser"],
};

const rootReducer = combineReducers({
  appUser: UserSlice,
  userProfile: UserProfileSlice,
  userMatches: UserMatchesSlice,
  userChoices: UserChoicesSlice,
  appPrompts: PromptSlice,
  messages: MessagesSlice,
  matches: MatchSlice,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: getDefaultMiddleware({
    serializableCheck: {
      ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
    },
  }),
});

export const persistor = persistStore(store);

export type RootState = ReturnType<typeof rootReducer>;
export type AppDispatch = typeof store.dispatch;
