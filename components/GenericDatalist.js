import {
  View,
  Text,
  TouchableOpacity,
  FlatList,
  Modal
} from 'react-native';
import React, { useEffect, useRef, useState } from 'react';


const DLL = (props) => {
  const [clicked, setClicked] = useState(false);
  const [data, setData] = useState(props.val_data);
  const [selectedValue, setSelectedValue] = useState(props.selectedVal);
  const [selectedLabel, setSelectedLabel] = useState(props.selectedLabel);
  const [modalVisible, setModalVisible] = useState(false);
  const [dropdownPosition, setDropdownPosition] = useState({ top: 0, left: 0 });

  useEffect(() => {
    props.onchanged_value(selectedValue, selectedLabel);
    console.log("here selected val and label  are ", selectedValue, selectedLabel);
  }, [selectedValue]);

  

  function handlePress(event) {
    setDropdownPosition({
      top: event.nativeEvent.pageY - 30,
      left: event.nativeEvent.pageX -40 ,
    });
    console.log("click pos is ",dropdownPosition.top,dropdownPosition.left);
  }

  return (
    <View style={{ flex: 1 }}>
      <TouchableOpacity
        style={{
          // backgroundColor:'red',
          width: '90%',
          height: 50,
          borderRadius: 10,
          borderWidth: 0.5,
          alignSelf: 'center',
          marginTop: 10,
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
          paddingLeft: 15,
          paddingRight: 15,
        }}
        onPress={(event) => {
          handlePress(event);
          setClicked(!clicked);
          setModalVisible(true);
          
         
          
        }}>
        <Text style={{ fontWeight: '600' }}>
          {selectedValue == '' ? 'Select value' : selectedValue}

        </Text>
      </TouchableOpacity>

      {console.log("click pos is ",dropdownPosition.top,dropdownPosition.left)}
      {clicked ? (
        <Modal visible={modalVisible} transparent={true} onRequestClose={()=>setModalVisible(false)} >
        <View
          style={{
            position: 'absolute',
            maxHeight: 250, // or height: 200
            overflow: 'scroll',
            top:dropdownPosition.top,
            left:dropdownPosition.left,
            // zIndex: 5,
            elevation: 5,
            marginTop: 20,
            height: 200,
            alignSelf: 'center',
            width: '30%',
            backgroundColor: '#fff',
            borderRadius: 10,
          }}>

          <FlatList
            nestedScrollEnabled
            data={data}
            renderItem={({ item, index }) => {
              return (
                <TouchableOpacity
                  style={{
                    width: '85%',
                    alignSelf: 'center',
                    height: 50,
                    justifyContent: 'center',
                    borderBottomWidth: 0.5,
                    borderColor: '#8e8e8e',
                  }}
                  onPress={() => {
                    setSelectedValue(item.hasOwnProperty('value') ? item.value : "Current");
                    setSelectedLabel(item.hasOwnProperty('label') ? item.label : "00");
                    setClicked(!clicked);
                    setModalVisible(false);
                  }}>
                  <Text style={{ fontWeight: '600' }}>{item.value}</Text>
                </TouchableOpacity>
              );
            }}
          />
        </View>
        </Modal>
      ) : null}
    </View>
  );
};

export default DLL;