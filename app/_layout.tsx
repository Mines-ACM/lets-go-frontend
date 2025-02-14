import { Slot } from "expo-router";
import { PaperProvider } from "react-native-paper";
import { ThemeProvider } from "@react-navigation/native";
import { combinedLightTheme, combinedDarkTheme } from "../components/PaperThemes";
import AuthProvider from "../components/AuthProvider";
import { useColorScheme } from "react-native";

export default function RootLayout() {
  const colorScheme = useColorScheme();
  const paperTheme = colorScheme === "dark" ? combinedDarkTheme : combinedLightTheme;

  return (
    <AuthProvider>
      <PaperProvider theme={paperTheme}>
        <ThemeProvider value={paperTheme}>
          <Slot />
        </ThemeProvider>
      </PaperProvider>
    </AuthProvider>
  );
}
