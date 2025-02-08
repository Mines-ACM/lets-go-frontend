import * as React from 'react';
import { useColorScheme } from 'react-native';
import {
    MD3Theme,
    MD3LightTheme,
    MD3DarkTheme,
    PaperProvider,
    adaptNavigationTheme
} from 'react-native-paper';
import {
    DarkTheme as NavDarkTheme,
    DefaultTheme as NavDefaultTheme,
    ThemeProvider
} from "@react-navigation/native"
import merge from "deepmerge"

// Defines a modified version of the MD3 light theme for this application.
const lgLightTheme = {
    ...MD3LightTheme,
    colors: {
        ...MD3LightTheme.colors,
        primary: '#FF00FF',
    }
}

// Defines a modified version of the MD3 dark theme for this application.
const lgDarkTheme = {
    ...MD3DarkTheme,
    colors: {
        ...MD3DarkTheme.colors,
        primary: '#DD88FF',
    }
}

const { LightTheme, DarkTheme } = adaptNavigationTheme({
    reactNavigationLight: NavDefaultTheme,
    reactNavigationDark: NavDarkTheme
});

export const combinedLightTheme = merge(LightTheme, lgLightTheme);
export const combinedDarkTheme = merge(DarkTheme, lgDarkTheme);