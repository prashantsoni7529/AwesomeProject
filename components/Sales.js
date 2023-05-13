import { StyleSheet, Text, View } from 'react-native';
import SalesScreen from './SalesList';

export default function Sales() {
  return (
    <View style={styles.container}>
      {/* <SalesForm/> */}
      <SalesScreen/>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
   
    borderWidth:8,
    borderColor:"#ded5d5",
    // borderRadius:15,
    // alignItems: 'center',
    // justifyContent: 'center',
  },
});
