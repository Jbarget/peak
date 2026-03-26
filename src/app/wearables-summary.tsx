import { useUserWearables } from '@/hooks/api/useUserWearables';
import { Text, View } from 'react-native';

const WearablesSummaryScreen = () => {
  const { data: wearablesData } = useUserWearables('user-1');

  return (
    <View>
      <Text>Wearables Summary</Text>
    </View>
  );
};

export default WearablesSummaryScreen;
