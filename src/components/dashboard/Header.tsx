import { Colors } from '@/constants/theme';
import { StyleSheet, Text, View } from 'react-native';
import Avatar from '../ui/Avatar';

const HealthSummary = ({ avatarUrl }: { avatarUrl?: string }) => {
  return (
    <View style={styles.header}>
      <Text style={styles.title}>Health</Text>
      <Avatar avatarUrl={avatarUrl} />
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
  },
  title: {
    fontSize: 40,
    fontWeight: 'bold',
    color: Colors.dark.text,
  },
});

export default HealthSummary;
