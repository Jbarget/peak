import { Image } from 'expo-image';
import { StyleSheet } from 'react-native';

const Avatar = ({ avatarUrl }: { avatarUrl?: string }) => {
  return (
    <Image
      source={{ uri: avatarUrl || 'https://www.filmaffinity.com/es/name.php?name-id=411255817' }}
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
