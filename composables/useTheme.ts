const useTheme = () => {
  const theme = useState('theme', () => 'darkTheme');
  const themeIcon = useState('themeIcon', () => 'mdi-weather-night');

  const toggleTheme = () => {
    if (theme.value === 'darkTheme') {
      theme.value = 'lightTheme';
      themeIcon.value = 'mdi-weather-sunny';
    } else {
      theme.value = 'darkTheme';
      themeIcon.value = 'mdi-weather-night';
    }
  };

  return {
    theme: readonly(theme),
    themeIcon: readonly(themeIcon),
    toggleTheme,
  };
};

export default useTheme;
