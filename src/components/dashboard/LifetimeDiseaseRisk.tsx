import { Colors } from '@/constants/theme';
import { StyleSheet, Text, View } from 'react-native';

const LifetimeDiseaseRisk = () => {
  return (
    <View>
      <Text style={styles.title}>Lifetime Disease Risk</Text>
      {/* TODO: Add lifetime disease risk chart */}
    </View>
  );
};

export default LifetimeDiseaseRisk;

const styles = StyleSheet.create({
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: Colors.light.text,
  },
});
