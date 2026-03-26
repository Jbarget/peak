import { ScrollView, StyleSheet, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import Header from '@/components/dashboard/Header';
import { BottomTabInset, Colors, Spacing } from '@/constants/theme';
import { useUser } from '@/hooks/useUser';

export default function HomeScreen() {
  const { data: userData } = useUser('user-1');

  return (
    <View style={styles.container}>
      <SafeAreaView style={styles.safeArea}>
        <Header avatarUrl={userData?.data.avatarUrl} />
        <ScrollView contentContainerStyle={styles.content}>
          <View style={styles.content}></View>
        </ScrollView>
      </SafeAreaView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    flexDirection: 'row',
    backgroundColor: Colors.dark.background,
  },
  safeArea: {
    flex: 1,
    paddingHorizontal: Spacing.four,
    alignItems: 'center',
    gap: Spacing.three,
    paddingBottom: BottomTabInset + Spacing.three,
  },
  content: {
    flex: 1,
    backgroundColor: Colors.light.background,
  },
});
