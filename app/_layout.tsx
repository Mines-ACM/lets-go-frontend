import { Slot } from "expo-router";
import { PaperProvider } from "react-native-paper";
import { lgLightTheme, lgDarkTheme } from "./PaperThemes";
import AuthProvider from "./AuthProvider";

export default function RootLayout() {
  const paperTheme = lgDarkTheme;

  return (
    <AuthProvider>
      <PaperProvider theme={paperTheme}>
        <Slot />
      </PaperProvider>
    </AuthProvider>
  );
}
