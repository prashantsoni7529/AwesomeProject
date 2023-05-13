import React, { useContext } from 'react';
import { View, StyleSheet } from 'react-native';
import { Text, Image } from 'react-native-elements';
import {CompanyContext} from '../contexts/Context';
import CompanyLogo from './companySvg';


const CompanyForm = () => {

  const companyData = useContext(CompanyContext);

  return (
    <View style={styles.container}>
      <View style={{
        padding:4,
        marginBottom:45,
        marginLeft:80
      }}>
      <CompanyLogo/>
      </View>
   
      <Text style={styles.label}>Company Name</Text>
      <Text style={styles.value}>{companyData.company_name}</Text>
      <Text style={styles.label}>GST No.</Text>
      <Text style={styles.value}>{companyData.gst_number}</Text>
      <Text style={styles.label}>Address</Text>
      <Text style={styles.value}>
        {companyData.company_address}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 20,
  },

  label: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  value: {
    fontSize: 16,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    borderRadius: 5,
    backgroundColor: '#fff',
  },
});

export default CompanyForm;
