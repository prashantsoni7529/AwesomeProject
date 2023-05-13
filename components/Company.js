import { StyleSheet, Text, View } from 'react-native';
import CompanyForm from './CompanyForm';

export default function Company() {
  return (
    <View style={styles.container}>
      <CompanyForm/>
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
