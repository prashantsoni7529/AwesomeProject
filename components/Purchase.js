import { StyleSheet, Text, View } from 'react-native';
import PurchaseScreen from './PurchaseList';

export default function Purchase() {
  return (
    <View style={styles.container}>
      {/* <PurchaseForm/> */}
      <PurchaseScreen/>
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
