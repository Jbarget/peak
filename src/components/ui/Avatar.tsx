import { Image } from 'expo-image';
import { StyleSheet } from 'react-native';

const Avatar = ({ avatarUrl }: { avatarUrl?: string }) => {
  return (
    <Image
      source={{
        uri: avatarUrl || 'https://pics.filmaffinity.com/nicolas_cage-104136739930377-nm_large.jpg',
      }}
      style={styles.image}
    />
  );
};

export default Avatar;

const styles = StyleSheet.create({
  avatar: {},
  image: {
    width: 40,
    height: 40,
    borderRadius: 20,
  },
});
