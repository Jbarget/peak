import { Colors, Spacing } from '@/constants/theme';
import { memo, useMemo } from 'react';
import { StyleSheet, Text, View } from 'react-native';

type BodyScoreMarkerProps = {
  label: string;
  score: number;
};

function getScoreColor(score: number) {
  if (score >= 75) return '#2E7D32'; // green
  if (score >= 50) return '#EF6C00'; // yellow/orange
  return '#C62828'; // red
}

function BodyScoreMarkerBase({ label, score }: BodyScoreMarkerProps) {
  const fillColor = useMemo(() => getScoreColor(score), [score]);

  return (
    <View style={styles.container}>
      <View style={styles.labelContainer}>
        <Text style={styles.label} numberOfLines={1}>
          {label}
        </Text>
        <Text style={styles.score}>{score}%</Text>
      </View>

      <View style={styles.barWrap}>
        <View style={styles.track} />
        <View style={[styles.fill, { width: `${score}%`, backgroundColor: fillColor }]} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    gap: Spacing.one,
    paddingVertical: Spacing.one,
  },
  labelContainer: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: Spacing.two,
  },
  label: {
    flex: 1,
    fontSize: 12,
    color: Colors.light.textSecondary,
  },
  barWrap: {
    width: '100%',
    height: 6,
    justifyContent: 'center',
  },
  track: {
    position: 'absolute',
    left: 0,
    right: 0,
    height: 6,
    borderRadius: 999,
    backgroundColor: Colors.light.backgroundSelected,
  },
  fill: {
    position: 'absolute',
    left: 0,
    height: 6,
    borderRadius: 999,
  },
  score: {
    textAlign: 'right',
    fontSize: 12,
    fontWeight: '600',
    color: Colors.light.textSecondary,
  },
});

const BodyScoreMarker = memo(BodyScoreMarkerBase);
export default BodyScoreMarker;
