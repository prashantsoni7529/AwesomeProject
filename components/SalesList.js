import React, { useState, useContext, useEffect } from 'react';
import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  FlatList,
  StatusBar,
  TouchableOpacity, Alert
} from 'react-native';
import IconD from 'react-native-vector-icons/Ionicons';
import SalesForm from './SalesForm';
import Icon from 'react-native-vector-icons/FontAwesome';
import { SalesContext } from '../contexts/Context';
import { CollectSalesData, deleteSale ,SendSalesToAuditor } from '../Apicalls';
import { AuthContext } from '../contexts/Context';
import MonthsDropDown from './GenericDatalist';
import { Months } from "./MonthData";




// const DATA=[
//     {sales_bill_number: '1',customer_name:'Nipra Associates',customer_gst:"09AFBFSSFSKSF57",tax_rate:'12%',invoice_date:'01/14/2021',taxable_value:"28600", invoice_value:'33745'},
//     {sales_bill_number: '2',customer_name:'Affiivo ',customer_gst:"09AFBFSSFSKSF57",tax_rate:'10%',invoice_date:'01/14/2021',taxable_value:"28600", invoice_value:'33745'},
//     {sales_bill_number: '3',customer_name:'Innow8 apps',customer_gst:"09AFBFSSFSKSF57",tax_rate:'8%',invoice_date:'01/14/2021',taxable_value:"28600", invoice_value:'33745'},
//     {sales_bill_number: '4',customer_name:'TCS ',customer_gst:"09AFBFSSFSKSF57",tax_rate:'11%',invoice_date:'01/14/2021',taxable_value:"28600", invoice_value:'33745'},
//     {sales_bill_number: '5',customer_name:'Infosys ',customer_gst:"09AFBFSSFSKSF57",tax_rate:'12%',invoice_date:'01/14/2021',taxable_value:"28600", invoice_value:'33745'},
//     {sales_bill_number: '6',customer_name:'wipro ',customer_gst:"09AFBFSSFSKSF57",tax_rate:'12%',invoice_date:'01/14/2021',taxable_value:"28600", invoice_value:'33745'},
// ]



const SalesScreen = () => {
  const [editItemId, seteditItemId] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [item_data, setitem_data] = useState({});
  const [addSale, setAddSale] = useState(true);
  const [monthVal, setMonthVal] = useState("Current");
  const [monthLabel, setMonthLabel] = useState("00");


  const { SalesData, setSalesData } = useContext(SalesContext);
  const DATA = SalesData;
  // console.log("sales data in context is ", DATA);

  const authData = useContext(AuthContext);

  // Define a function to display the confirmation dialog
  const displayConfirmationDialog = (data) => {
    Alert.alert(
      'Confirm',
      'Are you sure you want to delete this record ?',
      [
        {
          text: 'Cancel',
          style: 'cancel'
        },
        {
          text: 'Confirm',
          onPress: () => onPressDeletebtn(data)
        }
      ]
    );
  }

  // Define a function to display the confirmation dialog
  const ConfirmSaleSubmission = () => {
    Alert.alert(
      'Confirm',
      'Final submission of selected month sales. ?',
      [
        {
          text: 'Cancel',
          style: 'cancel'
        },
        {
          text: 'Confirm',
          onPress: () => sendToAuditor()
        }
      ]
    );
  }

  const onPressDeletebtn = async (data) => {
    console.log("Pressing delete btn", data.sales_id, typeof (data.sales_id));
    let inv_no = data.sales_id;
    let sale_data = [];
    console.log("Inside if of delete dtn ", inv_no);
    await deleteSale(inv_no);
    sale_data = await CollectSalesData(authData, monthLabel, 1);
    setSalesData(sale_data);


  }

  const onPressEditbtn = (data) => {
    selected_item_data(data.sales_bill_number);
    seteditItemId(data.sales_bill_number);
    setIsEditing(true);
    setAddSale(false);

    console.debug('edit button is clicked', data.sales_bill_number, data.customer_name);
  };
  // console.debug('outside function ', editItemId, isEditing, item_data);


  const handleCancelEdit = async () => {
    let sale_data = [];
    console.log("handlecancel label is", monthLabel);
    sale_data = await CollectSalesData(authData, monthLabel, 1);
    setSalesData(sale_data);
    setIsEditing(false);
    seteditItemId(null);
    setAddSale(true);
  };

  const renderItem = ({ item }) => {
    const isSentVal = item.is_sent;
    return (
      <SafeAreaView style={styles.container}>
        <TouchableOpacity>
          <View style={styles.item}>
            <View style={styles.item_data}>
              <Text style={styles.name_and_icon_style}>{item.customer_name}</Text>
              <Text style={styles.item_content}>{item.customer_gst}</Text>
              <Text style={styles.item_content}>{item.tax_rate}</Text>
            </View>
            <View style={styles.item_data}>
              <Text style={styles.item_content}>{item.sales_bill_number}</Text>
              <Text style={styles.item_content}>{item.invoice_date}</Text>
            </View>
            <View style={styles.item_data}>
              <Text style={styles.item_content}>{item.taxable_value}</Text>
              <Text style={styles.item_content}>{item.invoice_value}</Text>
            </View>
            {!isSentVal ? (<View style={[styles.item_edit, styles.item_data, styles.name_and_icon_style]}>
              <TouchableOpacity onPress={() => onPressEditbtn(item)}>
                <IconD  name="ios-pencil" size={20} color={'#3b448f'} />
              </TouchableOpacity>
              <TouchableOpacity onPress={() => displayConfirmationDialog(item)}>
                <IconD  name='ios-trash' color={'#3b448f'} size={25} />
              </TouchableOpacity>
            </View>) : <View></View>}
          </View>
        </TouchableOpacity>
      </SafeAreaView>
    );
  };

  const handleAddSales = () => {
    console.debug('Adding sales button');
    setIsEditing(true);
    setitem_data({});
    setAddSale(false);
  }



  useEffect(() => {
    console.log("in useffect month label is", monthLabel, "month val is", monthVal);
    const fetchSalesData = async () => {
      let sale_data = [];
      sale_data = await CollectSalesData(authData, monthLabel, 1);
      // console.log("Inside getMonthVal fun and sale data coming is ",sale_data);
      setSalesData(sale_data);
    };
    fetchSalesData();
  }, [monthVal]);


  const getMonthVal = (val, label) => {
    console.log("coming val and label are", val, label);
    setMonthVal(val);
    setMonthLabel(label);
    console.log("month Label is ", monthLabel, 'label is ', label);


  }

  const sendToAuditor = async() => {
    let sale_data = [];
    console.log("month label in auditor send",monthLabel);
    await SendSalesToAuditor(authData, monthLabel);
    sale_data = await CollectSalesData(authData, monthLabel, 1);
    setSalesData(sale_data);
  }

  const selected_item_data = (sales_bill_number) => {
    for (let i = 0; i < DATA.length; i++) {
      // console.debug('in selected_item_data is ',DATA[i],'check bool val is',DATA[i].sales_bill_number === editItemId,DATA[i].sales_bill_number , editItemId);
      if (DATA[i].sales_bill_number === sales_bill_number) {
        setitem_data(DATA[i]);
        console.debug('collecting data is ', item_data);
      }
    }
  }
  // Object.keys(objectName).length === 0
  return (
    <>
      {addSale ? (
        <View style={{ flexDirection: 'row', margin: 10, alignItems: 'center', gap: 7 }}>
          <TouchableOpacity style={{
            backgroundColor: '#0080ff',
            width: '35%',
            height: 40,
            borderRadius: 10,
            alignItems: 'center',
            justifyContent: 'center',
          }} onPress={ConfirmSaleSubmission}>
            <Text style={{ color: '#fff', fontWeight: 'bold' }}>Send To Auditor</Text>

          </TouchableOpacity>
          <MonthsDropDown val_data={Months} onchanged_value={getMonthVal} selectedVal={monthVal} selectedLabel={monthLabel}/>
          <Icon name="plus" size={30} style={styles.plus_icon} onPress={handleAddSales} />
          <Text style={styles.plus_icon}>Add Sales</Text>
        </View>) : (<View></View>)}

      {isEditing ? (
        <SalesForm data={item_data} cancel={handleCancelEdit} />
      ) : (
        <FlatList
          data={DATA}
          renderItem={renderItem}
          keyExtractor={(item) => item.sales_bill_number}
        />
      )}
    </>
  );

};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: StatusBar.currentHeight,
    marginHorizontal: 8,


  },
  plus_icon: {
    fontWeight: 'bold',
    // fontSize:25,
    color: '#3b448f',

    // backgroundColor:'#e6ebf2'
    // textAlign: 'right'

  },

  item_content: {
    fontSize: 10,
  },
  name_and_icon_style: {
    fontWeight: 'bold',
    fontSize: 15,
    color: '#3b448f',

  },
  item: {
    // backgroundColor: '#a9c6ff',
    borderColor: '#b0aea9',
    borderWidth: 2,

    height: 120,
    // paddingTop: 10,
    // paddingBottom:10,
    padding: 5,
    marginTop: '-6%',
    flex: 1,
    flexDirection: 'row',

    // alignItems:'flex-start',
    // alignItems:'center',

    justifyContent: 'space-between',

  },



  item_data: {
    // backgroundColor:'green',
    alignItems: 'center',
    justifyContent: 'space-around',
  },
  item_edit: {
    // backgroundColor:'yellow',
    alignItems: 'center',
    justifyContent: 'center',
  }
});

export default SalesScreen;