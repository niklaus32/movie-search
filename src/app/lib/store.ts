// import { configureStore } from '@reduxjs/toolkit'
// import movieNameReducer from './features/movieNameSlice';

// export const store = configureStore({
//   reducer: {
//     movieName: movieNameReducer,
//   },
// })


// // Infer the `RootState` and `AppDispatch` types from the store itself
// export type RootState = ReturnType<typeof store.getState>
// // Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
// export type AppDispatch = typeof store.dispatch

import { configureStore } from '@reduxjs/toolkit'
import movieNameReducer from './features/movieNameSlice';

export const makeStore = () => {
  return configureStore({
    reducer: {
        movieName: movieNameReducer,
    }
  })
}

// Infer the type of makeStore
export type AppStore = ReturnType<typeof makeStore>
// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<AppStore['getState']>
export type AppDispatch = AppStore['dispatch']