import { ScrollView, StyleSheet, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import BodyScores from '@/components/dashboard/BodyScores';
import Header from '@/components/dashboard/Header';
import HealthSummary from '@/components/dashboard/HealthSummary';
import { BottomTabInset, Colors, Spacing } from '@/constants/theme';
import { useUser } from '@/hooks/useUser';
import { useUserBodyScores } from '@/hooks/useUserBodyScores';

export default function HomeScreen() {
  const { data: userData } = useUser('user-1');
  const { data: bodyScoresData } = useUserBodyScores('user-1');
  const { top } = useSafeAreaInsets();

  return (
    <View style={[styles.container, { paddingTop: top }]}>
      <View style={styles.headerContainer}>
        <Header avatarUrl={userData?.data.avatarUrl} />
        <HealthSummary bodyScores={bodyScoresData?.data} />
      </View>
      <ScrollView style={styles.scrollView} contentContainerStyle={styles.contentContainer}>
        <BodyScores bodyScores={bodyScoresData?.data} />
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: Colors.dark.background,
    alignItems: 'center',
    gap: Spacing.three,
  },
  headerContainer: {
    width: '100%',
    paddingHorizontal: Spacing.four,
    gap: Spacing.three,
  },
  safeArea: {
    flex: 1,
    paddingHorizontal: Spacing.four,
    alignItems: 'center',
    gap: Spacing.three,
    paddingBottom: BottomTabInset + Spacing.three,
  },
  scrollView: {
    width: '100%',
    backgroundColor: Colors.light.background,
    borderTopLeftRadius: Spacing.five,
    borderTopRightRadius: Spacing.five,
  },
  contentContainer: {
    flex: 1,
    paddingTop: Spacing.five,
    paddingHorizontal: Spacing.four,
    gap: Spacing.three,
  },
});
