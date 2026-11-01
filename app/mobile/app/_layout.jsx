import { Stack } from "expo-router";
import AuthHeader from "../components/authComponents/AuthHeader.jsx";
import NetworkConfigProvider from '../hooks/NetworkConfigProvider';

export default function RootLayout() {
  return (
    <NetworkConfigProvider>
      <Stack>
        <Stack.Screen name="main" options={{ headerShown: false }} />
        <Stack.Screen name="ProductCardDetails" options={{ headerShown: false }} />
        <Stack.Screen name="signin" options={{ presentation: "modal", headerShown: true, headerTitle: "Sign in", headerRight: () => <AuthHeader /> }} />
        <Stack.Screen name="signup" options={{ presentation: "modal", headerShown: true, headerTitle: "Sign up", headerRight: () => <AuthHeader /> }} />
      </Stack>
    </NetworkConfigProvider>
  );
}
