import React, { useState, useContext } from 'react';
import { StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { ProfileContext } from '../contexts/Context';
import ProfileSvg from './Profilesvg';
import {LogOut} from '../Apicalls';
import { AuthContext } from '../contexts/Context';

const EditableField = ({ label, value, onChange }) => {
  // const [editing, setEditing] = useState(false);



  // const handleSave = () => {
  //   setEditing(false);
  // };

  // if (editing) {
  //   return (
  //     <View style={styles.editableField}>
  //       <Text style={styles.label}>{label}</Text>
  //       <TextInput
  //         style={styles.input}
  //         value={value}
  //         onChangeText={onChange}
  //       />
  //       <TouchableOpacity onPress={handleSave}>
  //         <Text style={styles.saveButton}>Save</Text>
  //       </TouchableOpacity>
  //     </View>
  //   );
  // }

  return (
    <View style={styles.field}>
      <Text style={styles.label}>{label}</Text>
      <Text style={styles.value}>{value}</Text>
      {/* <TouchableOpacity onPress={() => setEditing(true)}>
        <Text style={styles.editButton}>✏️</Text>
      </TouchableOpacity> */}
    </View>
  );
};

const ProfileScreen = () => {
  const [Name, setName] = useState('');
  const [ContactNo, setContactNo] = useState('');
  const [Email, setEmail] = useState('');
  const [Role, setRole] = useState('');

  const { authToken,setLogIn } = useContext(AuthContext);


  const profileData = useContext(ProfileContext);
  console.log("profileData data in context is ", profileData);

  const handleLogout = async() =>{
    setLogIn(false);
    await LogOut(authToken);
    alert("Thanks for visiting");
  }

  return (
    <View style={styles.container}>

      <View style={{
        borderRadius: 50,
        borderWidth: 2,
        borderColor: '#69706f',
        padding:4,
        margin:15,
      }}>
        <ProfileSvg />
      </View>
      <EditableField label="Name" value={profileData.name} onChange={setName} />
      <EditableField label="Contact No." value={profileData.mobile} onChange={setContactNo} />
      <EditableField label="Email" value={profileData.email} onChange={setEmail} />
      <EditableField label="Role" value={profileData.role} onChange={setRole} />
      <TouchableOpacity style={styles.saveContainer} onPress={handleLogout}>
        <Text style={styles.saveButton}>LOG Out</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#fff',
    padding: 20,
  },

  field: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 10,
  },
  label: {
    fontWeight: 'bold',
    marginRight: 10,
    flex: 1,
  },
  value: {
    flex: 2,
  },
  editButton: {
    fontSize: 20,
  },
  editableField: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 10,
  },
  input: {
    flex: 2,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    paddingHorizontal: 10,
    paddingVertical: 5,
    marginRight: 10,
  },
  saveButton: {
    color: '#fff',
    fontWeight: 'bold',
  },
  saveContainer: {
    backgroundColor: '#0080ff',
    // width: '30%',
    // height: 35,
    borderRadius: 5,
    // flex:0.1,
    // flexDirection:'row-reverse',
    padding:10,
    top:40,
    left:'-35%',
    // alignItems: 'center',
    // justifyContent: 'center',
  },
});

export default ProfileScreen;
