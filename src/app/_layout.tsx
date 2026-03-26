import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { useColorScheme } from 'react-native';

import { AnimatedSplashOverlay } from '@/components/animated-icon';
import { Stack } from 'expo-router';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 60_000,
      retry: 1,
      refetchOnWindowFocus: false,
    },
  },
});

function formatBodyScoreTitle(typeParam: unknown) {
  const type =
    typeof typeParam === 'string' ? typeParam : Array.isArray(typeParam) ? typeParam[0] : undefined;

  if (!type) return 'Deep Dive';
  return `${type.charAt(0).toUpperCase()}${type.slice(1)} Deep Dive`;
}

export default function TabLayout() {
  const colorScheme = useColorScheme();
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
        <AnimatedSplashOverlay />
        <Stack>
          <Stack.Screen name="index" options={{ headerShown: false }} />
          <Stack.Screen
            name="body-score-detail/[type]"
            options={({ route }) => ({
              title: formatBodyScoreTitle(
                (route.params as { type?: string | string[] } | undefined)?.type,
              ),
              headerBackButtonDisplayMode: 'minimal',
              headerShadowVisible: false,
            })}
          />
          <Stack.Screen
            name="wearables-summary"
            options={{
              title: 'My Wearables',
              headerBackButtonDisplayMode: 'minimal',
              headerShadowVisible: false,
            }}
          />
        </Stack>
      </ThemeProvider>
    </QueryClientProvider>
  );
}
