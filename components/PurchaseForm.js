import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity, ScrollView,BackHandler} from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import Icon from 'react-native-vector-icons/Ionicons';
import StateData from './StatesData';
import { GstData } from './GstData';
import GstDataList from './GenericDatalist';
import { AddNewPurchase ,updatePurchase } from '../Apicalls';

// import Dropdown from './Dropdown';
import Dropdown from './Dropdown';

  
const Form = ({ data, cancel }) => {
  var check_data_keys = Object.keys(data).length;
  const [Invoice_Date, setInvoice_Date] = useState(check_data_keys ? (data.invoice_date) : new Date().toLocaleDateString("en-CA"));
  const [c_gst, set_c_gst] = useState(check_data_keys ? data.vendor_gst : "");
  const [v_name, set_c_name] = useState(check_data_keys ? data.vendor_name : "");
  const [bill_party, set_bill_to_party] = useState(check_data_keys ? data.bill_to_party : "");
  const [bill_party_state, set_bill_party_state] = useState(check_data_keys ? data.bill_to_party_state : "");
  const [ship_party, set_ship_to_party] = useState(check_data_keys ? data.ship_to_party : "");
  const [ship_party_state, set_ship_party_state] = useState(check_data_keys ? data.ship_to_party_state : "");
  const [tax_val, set_tax_val] = useState(check_data_keys ? String(data.taxable_value) : "");
  const [invoice_val, set_invoice_val] = useState(check_data_keys ? String(data.invoice_value) : "");
  const [Invoice, setInvoice] = useState(check_data_keys ? String(data.tax_rate) : "");
  const [purchaseBillNo, setPurchaseBillNo] = useState(check_data_keys ? data.purchase_bill_number : "");


  const [showPicker, setShowPicker] = useState(false);
  // const [selectedOption, setSelectedOption] = useState(props.data.GST_rate);

  console.debug('data coming from flatlist', data, invoice_val, tax_val);

  // const handleSelectedDate = (dateString) => {
  //   // const dateString = '2023-04-18';
  //   const date = new Date(dateString);

  //   const year = date.getFullYear();
  //   const month = String(date.getMonth() + 1).padStart(2, '0');
  //   const day = String(date.getDate()).padStart(2, '0');

  //   const formattedDate = `${year}-${month}-${day}`;
  //   return formattedDate;
  //   // dateString = String(dateString.split('T')[0]);
  //   // return dateString;
  // }


  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate.toLocaleDateString("en-CA") || Invoice_Date;
    setShowPicker(false);
    setInvoice_Date(currentDate);

  };

  const showDatepicker = () => {
    setShowPicker(true);
  };

  
  useEffect(() => {
    const backAction = () => {
      // Add your logic here to handle back button press
      // Call the function you want to execute
      handleClose();
      
      // Return 'true' to prevent default back button behavior
      return true;
    };
  
    const backHandler = BackHandler.addEventListener(
      "hardwareBackPress",
      backAction
    );
  
    // Clean up the event listener on unmount
    return () => backHandler.remove();
  }, []);

  const handleClose = () =>{
    cancel();
  }

  const handleSubmit = async () => {
    // Your form submission logic here
    // SUbmit first all data inside db then close this modal
    let obj = {};
    console.log(Invoice_Date, c_gst, v_name, bill_party, "bill_party_state is ", bill_party_state, "ship_party", ship_party, "ship_party_state is ", ship_party_state, tax_val, invoice_val, Invoice);
    if (purchaseBillNo === "" || Invoice_Date === "" || c_gst === "" || v_name === "" || bill_party === "" || bill_party_state === "" || ship_party === "" || ship_party_state === "" || tax_val === "" || invoice_val === "" || Invoice === "") {

      alert("All fields are required to fill ");
    }
    else {
      obj = {
        purchase_bill_number: purchaseBillNo,
        invoice_date: Invoice_Date,
        vendor_gst: c_gst,
        vendor_name: v_name,
        bill_to_party: bill_party,
        bill_to_party_state: bill_party_state,
        ship_to_party: ship_party,
        ship_to_party_state: ship_party_state,
        tax_rate: Invoice,
        taxable_value: tax_val,
        invoice: Invoice,
        invoice_value: invoice_val,
      }
      console.log("prepare obj is ", obj);
      if(check_data_keys && data.purchase_id){ //Logic for saggregating update and add purchase
        await updatePurchase(obj , data.purchase_id );
      }
      else{
        await AddNewPurchase(obj);
      }
      
      // alert('Your....')
      cancel();
    }
    // alert('Trying to submit the form....')
    // cancel();

  }



  useEffect(() => {
    let final_amount;
    if (Invoice && tax_val) {
      final_amount = "";
    console.debug("Invoice  coming is ", Invoice, " tax_val is ", tax_val);

      final_amount = ((100 + parseFloat(Invoice)) * parseInt(tax_val)) / 100;
      final_amount = String(final_amount);
      console.debug("final_amount coming is ", final_amount);
      set_invoice_val(final_amount);
    }
    else {
       set_invoice_val("");
    }

  }, [tax_val, Invoice]);

  

  return (
    <ScrollView>
    <View style={styles.container}>
      <View style={styles.row}>
        <Text style={styles.label}>Invoice Date:</Text>
        <TouchableOpacity onPress={showDatepicker}>
        <Icon name="calendar-outline" size={24} color="#555" style={styles.icon} />
      </TouchableOpacity>
      {showPicker && (
        <DateTimePicker
          testID="dateTimePicker"
          value={new Date()}
          mode="date"
          is24Hour={true}
          display="default"
          onChange={onChange}
          maximumDate={new Date()}
        />
      )}
        <TextInput placeholder="Selected Date" style={styles.input} value={Invoice_Date} />
      </View>
      <View style={styles.row}>
        <Text style={styles.label}>Vendor GST:</Text>
        <TextInput style={styles.input} value={c_gst} onChangeText={set_c_gst} />
      </View>
      <View style={styles.row}>
        <Text style={styles.label}>Vendor Name:</Text>
        <TextInput style={styles.input} value={v_name} onChangeText={set_c_name} />
      </View>
      <View style={styles.row}>
        <Text style={styles.label}>Bill to Party:</Text>
        <TextInput style={styles.input} value={bill_party} onChangeText={set_bill_to_party} />
      </View>
      <View style={styles.row}>
        <Text style={styles.label}>Bill to Party State:</Text>
        {/* <TextInput style={styles.input} value={bill_party_state} onChangeText={set_bill_party_state} /> */}
        <Dropdown val_data={StateData} state={bill_party_state} stateSelected={set_bill_party_state} />

      </View>
      <View style={styles.row}>
        <Text style={styles.label}>Ship to Party:</Text>
        <TextInput style={styles.input} value={ship_party} onChangeText={set_ship_to_party} />
      </View>
      <View style={styles.row}>
        <Text style={styles.label}>Ship to Party State:</Text>
        {/* <TextInput style={styles.input} value={ship_party_state} onChangeText={set_ship_party_state} /> */}
        <Dropdown val_data={StateData} state={ship_party_state} stateSelected={set_ship_party_state} />
      </View>
      <View style={styles.row}>
          <Text style={styles.label}>Purchase Bill Number:</Text>
          <TextInput style={styles.input} value={purchaseBillNo} onChangeText={setPurchaseBillNo} />
        </View>
      <View style={styles.row}>
        <Text style={styles.label}> Select GST % : </Text>
        <GstDataList val_data={GstData} onchanged_value={setInvoice} selectedVal={Invoice} />
      {/* <Dropdown  val_data ={GstData}/> */}
      </View>
      <View style={styles.row}>
        <Text style={styles.label}>Taxable Value:</Text>
        <TextInput style={styles.input} value={tax_val} keyboardType='numeric' onChangeText={set_tax_val} />
      </View>
      <View style={styles.row}>
        <Text style={styles.label}>Tax Rate:</Text>
        <TextInput style={styles.input} editable={false} value={Invoice} onChangeText={setInvoice} />
      </View>
      <View style={styles.row}>
        <Text style={styles.label}>Total Amount:</Text>
        <TextInput style={styles.input} editable={false} value={invoice_val} />
      </View>

      <View style={{flex:1,flexDirection:'row'}}>
        <TouchableOpacity style={styles.button} onPress={handleSubmit}>
          <Text style={styles.buttonText}>Save</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={handleClose}>
          <Text style={styles.buttonText}>Close</Text>
        </TouchableOpacity>
        </View>
    </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  label: {
    flex: 1,
    fontWeight: 'bold',
    marginRight: 10,
  },
  input: {
    flex: 2,
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
  },
  icon: {
    marginRight: 10,
  },
  button: {
    backgroundColor: '#0080ff',
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
    margin:10,
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 18,
  },
});

export default Form;
