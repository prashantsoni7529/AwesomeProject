import {
    View,
    Text,
    TouchableOpacity,
    TextInput,
    FlatList,
    LogBox,
    Modal
    
  } from 'react-native';
import React, {useRef,useEffect, useState} from 'react';

 
  const Dropdown = (props) => {
    const [search, setSearch] = useState('');
    const [clicked, setClicked] = useState(false);
    const [data, setData] = useState(props.val_data);
    const [selectedState, setSelectedState] = useState(props.state);
    const [modalVisible, setModalVisible] = useState(false);
    const [dropdownPosition, setDropdownPosition] = useState({ top: 0, left: 0 });
    const searchRef = useRef();


    useEffect(() => {
      LogBox.ignoreLogs(['VirtualizedLists should never be nested']);
  }, []);

    useEffect(()=> {
     
      props.stateSelected(selectedState);

    },[selectedState]);

    function handlePress(event) {
      setDropdownPosition({
        top: event.nativeEvent.pageY - 30,
        left: 200 ,
      });
      console.log("click pos is ",dropdownPosition.top,dropdownPosition.left);
    }

    const onSearch = search => {
      if (search !== '') {
        let tempData = data.filter(item => {
          return item.value.toLowerCase().indexOf(search.toLowerCase()) > -1;
        });
        setData(tempData);
      } else {
        setData(props.val_data);
      }
    };
    return (
      <View style={{flex: 1}}>
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
          <Text style={{fontWeight:'600'}}>
            {selectedState == '' ? 'Select State' : selectedState}
           
          </Text>
        </TouchableOpacity>
        {console.log("click pos is ",dropdownPosition.top,dropdownPosition.left)}
        {clicked ? (
          <Modal visible={modalVisible} transparent={true}  onRequestClose={()=>setModalVisible(false)}>
          <View
            style={{
              position:'absolute',
              top:dropdownPosition.top,
              left:dropdownPosition.left,
              elevation: 5,
              marginTop: 20,
              height:250,
              alignSelf: 'center',
              width: '34%',
              backgroundColor: '#fff',
              borderRadius: 10,
            }}>
            <TextInput
              placeholder="Search.."
              value={search}
              ref={searchRef}
              onChangeText={txt => {
                onSearch(txt);
                setSearch(txt);
              }}
              style={{
                width: '90%',
                height: 50,
                alignSelf: 'center',
                borderWidth: 0.2,
                borderColor: '#8e8e8e',
                borderRadius: 7,
                marginTop: 20,
                paddingLeft: 20,
              }}
            />
            
            <FlatList
            nestedScrollEnabled
              data={data}
              renderItem={({item, index}) => {
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
                      setSelectedState(item.value);
                      setModalVisible(false);
                      setClicked(!clicked);
                      onSearch('');
                      setSearch('');
                    }}>
                    <Text style={{fontWeight: '600'}}>{item.value}</Text>
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
  
  export default Dropdown;