import type { Biomarker } from '@/api/biomarkers';
import { Colors, Spacing } from '@/constants/theme';
import { StyleSheet, Text, View } from 'react-native';

type Props = {
  biomarker: Biomarker;
  description: string;
};

function clamp01(n: number) {
  if (n < 0) return 0;
  if (n > 1) return 1;
  return n;
}

function formatValue(value: number) {
  // Keep this simple but avoid noisy decimals for whole numbers
  return Number.isInteger(value) ? String(value) : value.toFixed(1);
}

function getBarScale(ranges: Biomarker['ranges']) {
  // Use the widest band as the scale (improve is the "outer" bounds in our API)
  const min = Math.min(ranges.improve.min, ranges.good.min, ranges.optimal.min);
  const max = Math.max(ranges.improve.max, ranges.good.max, ranges.optimal.max);
  return { min, max };
}

function pos(value: number, scale: { min: number; max: number }) {
  return clamp01((value - scale.min) / (scale.max - scale.min));
}

export function BiomarkerRangeRow({ biomarker, description }: Props) {
  const scale = getBarScale(biomarker.ranges);

  const improveLeft = pos(biomarker.ranges.improve.min, scale);
  const improveRight = pos(biomarker.ranges.improve.max, scale);
  const goodLeft = pos(biomarker.ranges.good.min, scale);
  const goodRight = pos(biomarker.ranges.good.max, scale);
  const optimalLeft = pos(biomarker.ranges.optimal.min, scale);
  const optimalRight = pos(biomarker.ranges.optimal.max, scale);

  const valuePos = pos(biomarker.value, scale);

  return (
    <View style={styles.container}>
      <Text style={styles.label} numberOfLines={1}>
        {biomarker.name}
      </Text>
      <Text style={styles.description} numberOfLines={3}>
        {description}
      </Text>
      <View style={styles.row}>
        <View style={styles.barOuter}>
          <View
            style={[
              styles.band,
              styles.bandImprove,
              {
                left: `${improveLeft * 100}%`,
                width: `${Math.max(0, (improveRight - improveLeft) * 100)}%`,
              },
            ]}
          />
          <View
            style={[
              styles.band,
              styles.bandGood,
              {
                left: `${goodLeft * 100}%`,
                width: `${Math.max(0, (goodRight - goodLeft) * 100)}%`,
              },
            ]}
          />
          <View
            style={[
              styles.band,
              styles.bandOptimal,
              {
                left: `${optimalLeft * 100}%`,
                width: `${Math.max(0, (optimalRight - optimalLeft) * 100)}%`,
              },
            ]}
          />
          <View style={[styles.markerWrap, { left: `${valuePos * 100}%` }]}>
            <View style={styles.marker} />
          </View>
        </View>

        <Text style={styles.value} numberOfLines={1}>
          {formatValue(biomarker.value)} {biomarker.unit}
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    gap: Spacing.two,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: Spacing.two,
  },
  label: {
    flexGrow: 0,
    flexShrink: 0,
    color: Colors.light.text,
    fontSize: 14,
    fontWeight: '600',
  },
  description: {
    color: Colors.light.textSecondary,
    fontSize: 13,
    fontWeight: '400',
  },
  value: {
    flexGrow: 0,
    flexShrink: 0,
    width: 78,
    textAlign: 'right',
    color: Colors.light.textSecondary,
    fontSize: 13,
    fontWeight: '600',
  },
  barOuter: {
    flex: 1,
    height: 10,
    backgroundColor: '#E6E6EA',
    borderRadius: 999,
    overflow: 'hidden',
    position: 'relative',
    marginHorizontal: Spacing.two,
  },
  band: {
    position: 'absolute',
    top: 0,
    bottom: 0,
  },
  bandImprove: {
    backgroundColor: '#FECACA',
  },
  bandGood: {
    backgroundColor: '#FDE68A',
  },
  bandOptimal: {
    backgroundColor: '#2E7D32',
  },
  markerWrap: {
    position: 'absolute',
    top: -4,
    bottom: -4,
    width: 0,
    alignItems: 'center',
    justifyContent: 'center',
  },
  marker: {
    width: 2,
    height: 18,
    borderRadius: 999,
    backgroundColor: '#111827',
  },
});
