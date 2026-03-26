import { GetUserBodyScoresResponse } from '@/api/body-scores';
import { Colors } from '@/constants/theme';
import { StyleSheet, Text, View } from 'react-native';

const calculateAgeDifference = (biologicalAge?: number, chronologicalAge?: number) => {
  if (!biologicalAge || !chronologicalAge) return null;

  return biologicalAge - chronologicalAge;
};

const HealthSummary = ({ bodyScores }: { bodyScores?: GetUserBodyScoresResponse['data'] }) => {
  const ageDifference = calculateAgeDifference(
    bodyScores?.biologicalAge,
    bodyScores?.chronologicalAge,
  );

  return (
    <View>
      <Text style={styles.title}>{bodyScores?.biologicalAge}</Text>
      <Text style={styles.subtitle}>Biological Age</Text>
      {ageDifference !== null && (
        <Text style={styles.ageDifference}>
          {ageDifference > 0
            ? `${Math.abs(Number(ageDifference.toFixed(2)))} years older`
            : `${Math.abs(Number(ageDifference.toFixed(2)))} years younger`}
        </Text>
      )}
    </View>
  );
};

export default HealthSummary;

const styles = StyleSheet.create({
  title: {
    fontSize: 32,
    color: Colors.dark.text,
  },
  subtitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: Colors.dark.text,
  },
  ageDifference: {
    fontSize: 16,
    color: Colors.dark.textSecondary,
  },
});
