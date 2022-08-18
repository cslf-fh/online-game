import { createVuetify, ThemeDefinition } from 'vuetify';
import * as components from 'vuetify/components';

const darkTheme: ThemeDefinition = {
  dark: true,
  colors: {
    primary: '#03DAC6',
    'primary-darken-1': '#3700B3',
    secondary: '#6200EE',
    'secondary-darken-1': '#018786',
    error: '#B00020',
    info: '#2196F3',
    success: '#4CAF50',
    warning: '#FB8C00',
  },
};
const lightTheme: ThemeDefinition = {
  dark: false,
  colors: {
    primary: '#03DAC6',
    'primary-darken-1': '#3700B3',
    secondary: '#6200EE',
    'secondary-darken-1': '#018786',
    error: '#B00020',
    info: '#2196F3',
    success: '#4CAF50',
    warning: '#FB8C00',
  },
};

export default defineNuxtPlugin((nuxtApp) => {
  const vuetify = createVuetify({
    components,
    theme: {
      defaultTheme: 'darkTheme',
      themes: {
        darkTheme,
        lightTheme,
      },
    },
  });

  nuxtApp.vueApp.use(vuetify);
});
