import * as React from 'react';
import {
    MD3LightTheme,
    MD3DarkTheme,
    PaperProvider
} from 'react-native-paper';

export const lgLightTheme = {
    ...MD3LightTheme,
    colors: {
        ...MD3LightTheme.colors,
        primary: '#FF00FF',
    }
}

export const lgDarkTheme = {
    ...MD3DarkTheme,
    colors: {
        ...MD3DarkTheme.colors,
        primary: '#FF00FF',
    }
}