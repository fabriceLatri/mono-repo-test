import { useAppDispatch, useAppSelector } from "../../../core";
import { selectTheme, setTheme as setThemeAction, type Theme } from "../models/theme.slice";



export function useTheme() {
  const theme = useAppSelector(selectTheme);
  const dispatch = useAppDispatch();

  const changeTheme = (theme: Theme) => {
    dispatch(setThemeAction(theme));
  }

  return {
    theme,
    changeTheme
  }
}