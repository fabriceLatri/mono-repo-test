import { createSlice, type PayloadAction } from '@reduxjs/toolkit';

export type Theme = 'light' | 'dark';

export interface ThemeState {
  mode: Theme;
}

const initialState: ThemeState = { mode: 'light' };

const themeSlice = createSlice({
  name: 'theme',
  initialState,
  reducers: {
    setTheme(state, { payload }: PayloadAction<Theme>) {
      state.mode = payload;
    },
  },
  selectors: {
    selectTheme: (state) => state,
  }
});

export const { setTheme } = themeSlice.actions;
export const { selectTheme } = themeSlice.selectors;
export const themeReducer = themeSlice.reducer;
