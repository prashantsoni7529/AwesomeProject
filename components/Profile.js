import { StyleSheet, Text, View } from 'react-native';
import ProfileForm from './ProfileForm';

export default function Profile() {
  return (
    <View style={styles.container}>
     <ProfileForm/>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
