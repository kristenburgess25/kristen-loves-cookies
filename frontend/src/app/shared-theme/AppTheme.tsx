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
import type { ThemeOptions, PaletteMode } from '@mui/material/styles';
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

// Extend the PaletteMode type to allow 'disco'
type ExtendedPaletteMode = PaletteMode | 'disco';

export default function AppTheme(props: AppThemeProps) {
  const { children, disableCustomTheme, themeComponents } = props;
  const muiColorScheme = useColorScheme();
  const [currentMode, setCurrentMode] = React.useState<'light' | 'dark' | 'disco'>('light');

  React.useEffect(() => {
  const storedMode = localStorage.getItem('mui-mode') as 'light' | 'dark' | 'disco' | null;
  if (storedMode) {
    setCurrentMode(storedMode);
  }
}, []);

React.useEffect(() => {
  // When disco mode is active
  if (currentMode === 'disco') {
    document.body.classList.add('sparkles');
    document.body.style.backgroundColor = '#800080'; // Purple BG
  } else {
    // Remove disco styles when switching modes
    document.body.classList.remove('sparkles');
    document.body.style.removeProperty('background-color'); // Reset BG
  }
}, [currentMode]); // Runs every time `currentMode` updates


  const isDisco = currentMode === 'disco';

  console.log("Stored Mode:", localStorage.getItem('mui-mode'));
  console.log("Current Mode State:", currentMode);
  console.log("Is Disco Mode:", isDisco);

  const theme = React.useMemo(() => {
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
            mode: isDisco ? 'dark' : currentMode,
            background: {
              default: isDisco ? '#800080' : currentMode === 'dark' ? 'hsl(220, 35%, 3%)' : 'hsl(0, 0%, 99%)',
              paper: isDisco ? '#800080' : currentMode === 'dark' ? 'hsl(220, 30%, 7%)' : 'hsl(220, 35%, 97%)',
            },
            text: {
              primary: isDisco ? '#ffffff' : currentMode === 'dark' ? 'hsl(0, 0%, 100%)' : 'hsl(220, 30%, 6%)',
            },
          },
        });
  }, [disableCustomTheme, themeComponents, currentMode]);

  return (
    <ThemeProvider theme={theme} disableTransitionOnChange>
      {isDisco && <div className="sparkles" />}
      {children}
    </ThemeProvider>
  );
}


