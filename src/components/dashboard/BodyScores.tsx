import { GetUserBodyScoresResponse } from '@/api/body-scores';
import { Colors, Spacing } from '@/constants/theme';
import { Image } from 'expo-image';
import { FlatList, StyleSheet, Text, View } from 'react-native';

import BodyScoreMarker from '@/components/dashboard/BodyScoreMarker';

const BodyScores = ({ bodyScores }: { bodyScores?: GetUserBodyScoresResponse['data'] }) => {
  const scores = bodyScores?.scores ?? [];

  return (
    <View style={styles.container}>
      <View style={styles.imageContainer}>
        <Text style={styles.title}>Body Scores</Text>
        <Image
          source={{
            uri: 'https://img.freepik.com/free-photo/human-body-frontal_1048-5345.jpg',
          }}
          style={styles.bodyImage}
        />
      </View>
      <View style={styles.scoresContainer}>
        <FlatList
          data={scores}
          scrollEnabled={false}
          showsVerticalScrollIndicator={false}
          keyExtractor={(item, index) => `${item.category}-${item.label}-${index}`}
          renderItem={({ item }) => <BodyScoreMarker label={item.label} score={item.score} />}
          contentContainerStyle={styles.listContent}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: Colors.light.text,
  },
  container: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: Spacing.two,
  },
  imageContainer: {
    gap: Spacing.two,
    flex: 1,
  },
  scoresContainer: {
    flex: 1,
  },
  listContent: {
    gap: Spacing.one,
  },
  bodyImage: {
    width: 100,
    height: 200,
  },
});

export default BodyScores;
