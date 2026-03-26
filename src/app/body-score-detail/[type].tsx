import { BiomarkerRangeRow } from '@/components/biomarkers/BiomarkerRangeRow';
import { Colors, Spacing } from '@/constants/theme';
import { useBiomarkersByCategory } from '@/hooks/api/useBiomarkersByCategory';
import { useUserBiomarkersByCategory } from '@/hooks/api/useUserBiomarkersByCategory';
import { useLocalSearchParams } from 'expo-router';
import { ActivityIndicator, FlatList, StyleSheet, Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

type BodyScoreCategory =
  | 'heart'
  | 'liver'
  | 'brain'
  | 'kidney'
  | 'hormones'
  | 'metabolism'
  | 'immunity'
  | 'skin'
  | 'bones'
  | 'gut';

const BodyScoreDetailScreen = () => {
  const { top } = useSafeAreaInsets();
  const { type } = useLocalSearchParams<{ type: BodyScoreCategory }>();
  const { data: biomarkersData, isLoading, isError } = useUserBiomarkersByCategory('user-1', type);
  const { data: biomarkersDetailData } = useBiomarkersByCategory(type);

  console.log(biomarkersDetailData);

  const results = biomarkersData?.data?.results ?? [];
  const biomarkersDescription =
    biomarkersDetailData?.data.reduce(
      (acc, biomarker) => {
        acc[biomarker.id] = biomarker.description;
        return acc;
      },
      {} as Record<string, string>,
    ) || {};

  return (
    <View style={[styles.container]}>
      {isLoading ? (
        <View style={styles.center}>
          <ActivityIndicator />
        </View>
      ) : isError ? (
        <View style={styles.center}>
          <Text style={styles.emptyText}>Couldn’t load biomarkers.</Text>
        </View>
      ) : results.length === 0 ? (
        <View style={styles.center}>
          <Text style={styles.emptyText}>No biomarkers found.</Text>
        </View>
      ) : (
        <FlatList
          data={results}
          keyExtractor={(item) => item.biomarkerId}
          contentContainerStyle={styles.list}
          ItemSeparatorComponent={() => <View style={styles.divider} />}
          renderItem={({ item }) => (
            <BiomarkerRangeRow
              biomarker={item}
              description={biomarkersDescription[item.biomarkerId]}
            />
          )}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.light.background,
    paddingHorizontal: Spacing.four,
  },
  list: {
    paddingBottom: Spacing.five,
    paddingTop: Spacing.three,
    gap: Spacing.three,
  },
  divider: {
    height: StyleSheet.hairlineWidth,
    backgroundColor: '#E6E6EA',
  },
  center: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: Spacing.four,
  },
  emptyText: {
    color: Colors.light.textSecondary,
    fontSize: 14,
    fontWeight: '600',
  },
});

export default BodyScoreDetailScreen;
