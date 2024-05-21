import { color } from '_constants';
import { useColorScheme } from 'react-native';

const useTheme = selectColor => {
  const isDarkMode = useColorScheme() === 'dark';

  if (selectColor) {
    return isDarkMode ? color.dark[selectColor] : color.light[selectColor];
  }
  return isDarkMode;
};

export default useTheme;
