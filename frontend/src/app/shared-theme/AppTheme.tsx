// import * as React from 'react';
// import { ThemeProvider, createTheme } from '@mui/material/styles';
// import type { ThemeOptions } from '@mui/material/styles';
// import { inputsCustomizations } from './customizations/inputs';
// import { dataDisplayCustomizations } from './customizations/dataDisplay';
// import { feedbackCustomizations } from './customizations/feedback';
// import { navigationCustomizations } from './customizations/navigation';
// // import { surfacesCustomizations } from './customizations/surfaces';
// import { colorSchemes, typography, shadows, shape } from './themePrimitives';
//
// interface AppThemeProps {
//   children: React.ReactNode;
//   /**
//    * This is for the docs site. You can ignore it or remove it.
//    */
//   disableCustomTheme?: boolean;
//   themeComponents?: ThemeOptions['components'];
// }
//
// export default function AppTheme(props: AppThemeProps) {
//   const { children, disableCustomTheme, themeComponents } = props;
//   const theme = React.useMemo(() => {
//     return disableCustomTheme
//       ? {}
//       : createTheme({
//           // For more details about CSS variables configuration, see https://mui.com/material-ui/customization/css-theme-variables/configuration/
//           cssVariables: {
//             colorSchemeSelector: 'data-mui-color-scheme',
//             cssVarPrefix: 'template',
//           },
//           colorSchemes, // Recently added in v6 for building light & dark mode app, see https://mui.com/material-ui/customization/palette/#color-schemes
//           typography,
//           shadows,
//           shape,
//           components: {
//             ...inputsCustomizations,
//             ...dataDisplayCustomizations,
//             ...feedbackCustomizations,
//             ...navigationCustomizations,
//             // ...surfacesCustomizations,
//             ...themeComponents,
//           },
//         });
//   }, [disableCustomTheme, themeComponents]);
//   if (disableCustomTheme) {
//     return <React.Fragment>{children}</React.Fragment>;
//   }
//   return (
//     <ThemeProvider theme={theme} disableTransitionOnChange>
//       {children}
//     </ThemeProvider>
//   );
// }

import * as React from 'react';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import type { ThemeOptions } from '@mui/material/styles';
import { useColorScheme } from '@mui/material/styles';
import { inputsCustomizations } from './customizations/inputs';
import { dataDisplayCustomizations } from './customizations/dataDisplay';
import { feedbackCustomizations } from './customizations/feedback';
import { navigationCustomizations } from './customizations/navigation';
import { colorSchemes, typography, shadows, shape } from './themePrimitives';

interface AppThemeProps {
  children: React.ReactNode;
  disableCustomTheme?: boolean;
  themeComponents?: ThemeOptions['components'];
}

export default function AppTheme(props: AppThemeProps) {
  const { children, disableCustomTheme, themeComponents } = props;
  const { mode } = useColorScheme(); // Get current mode (light, dark, disco)

  const theme = React.useMemo(() => {
    const isDisco = mode === 'disco';

    return disableCustomTheme
      ? {}
      : createTheme({
          cssVariables: {
            colorSchemeSelector: 'data-mui-color-scheme',
            cssVarPrefix: 'template',
          },
          colorSchemes,
          typography,
          shadows,
          shape,
          palette: {
            mode: isDisco ? 'dark' : mode, // Keep dark mode for text
            ...(isDisco
              ? {
                  background: { default: '#800080' }, // Disco Purple Background
                  text: { primary: '#ffffff' }, // White Text
                }
              : {}),
          },
          components: {
            ...inputsCustomizations,
            ...dataDisplayCustomizations,
            ...feedbackCustomizations,
            ...navigationCustomizations,
            ...themeComponents,
          },
        });
  }, [disableCustomTheme, themeComponents, mode]);

  if (disableCustomTheme) {
    return <React.Fragment>{children}</React.Fragment>;
  }

  return (
    <ThemeProvider theme={theme} disableTransitionOnChange>
      {children}
      {/* Disco Effect Overlay */}
      {mode === 'disco' && <div className="sparkles" />}
    </ThemeProvider>
  );
}
