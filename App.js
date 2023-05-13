import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Login from './components/Login';
import NavTabs from './components/BottomTabNavigator';
// import { CollectCompanyData, CollectSalesData, CollectPurchaseData } from './Apicalls';
import {CompanyContext , ProfileContext , PurchaseContext , SalesContext ,AuthContext} from './contexts/Context';
import { BackHandler, Alert } from 'react-native';

export default function App() {

  const [isLoggedIn, setLogIn] = useState(false);
  const [userData, setUserData] = useState({});
  const [authToken, setAuthToken] = useState("");
  const [companyData, setCompanyData] = useState({});
  const [SalesData, setSalesData] =useState([]);
  const [PurchaseData, setPurchaseData] =useState([]);


  const logInData = (jsondata) => {
    console.log("Login button clicked");
    const authToken = jsondata.data;
    setUserData(jsondata);
    setAuthToken(authToken);
    setLogIn(true);


  }

  const fetchData = async () => {
    const payload = {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        authToken: authToken
      }
    };
    try {
      const response = await Promise.all([
        fetch('http://54.82.231.80:3117/affivo/organizations', payload),
        fetch('http://54.82.231.80:3117/affivo/users', payload),
        fetch('http://54.82.231.80:3117/affivo/sales?month=00&pageNumber=1', payload),
        fetch('http://54.82.231.80:3117/affivo/purchases?month=00&pageNumber=1', payload),
      ]);
      const responseData = await Promise.all(response.map(res => res.json()));
      setCompanyData(responseData[0].data);
      setUserData(responseData[1].data);
      setSalesData(responseData[2].data);
      setPurchaseData(responseData[3].data);
      // Use responseData here
    } catch (error) {
      console.error(error);
    }
  };

  // const collectAllData = async (token) => {
  //   const company_data = await CollectCompanyData(token);
  //   setCompanyData(company_data)
  //   console.log("companyData aggregated is", company_data);
  // }
  // const handleAggData = async(agg_data) =>{
  //   // console.log("aggData is ",agg_data);
  //    setCompanyData(agg_data[0].data);
  //    setUserData(agg_data[1].data);
  //    setSalesData(agg_data[2].data);
  //    setPurchaseData(agg_data[3].data);

  //   console.log(" companyData val is ", companyData);
  //   console.log(" userData val is ", userData);
  //   console.log(" SalesData val is ", SalesData);
  //   console.log(" PurchaseData val is ", PurchaseData);


  // }

  useEffect(() => {
    if (isLoggedIn) {
      console.log("inside App.js");
      console.log(" authToken val is ", authToken);
      console.log(" isLoggedIn val is ", isLoggedIn);
      console.log(" userData val is ", userData);
      console.log(" companyData val is ", companyData);

      fetchData();
      console.log(" companyData val is ", companyData);
      console.log(" userData val is ", userData);
      console.log(" SalesData val is ", SalesData);
      console.log(" PurchaseData val is ", PurchaseData);

      // collectAllData(authToken);

      // Promise.all([
      //   fetch('http://54.82.231.80:3117/affivo/organizations', payload),
      //   fetch('http://54.82.231.80:3117/affivo/users', payload),
      //   fetch('http://54.82.231.80:3117/affivo/sales', payload),
      //   fetch('http://54.82.231.80:3117/affivo/purchases', payload),

      // ]).then(function (responses) {
      //   // Get a JSON object from each of the responses
      //   return Promise.all(responses.map(function (response) {
      //     return response.json();
      //   }));
      // }).then(function (data) {
      //   // Log the data to the console
      //   console.log(" Aggregated data is ", data);
      //   handleAggData(data);
      // }).catch(function (error) {
      //   // if there's an error, log it
      //   console.log(error);
      // });


    }

  }, [isLoggedIn]);

  useEffect(() => {
    const backAction = () => {
      Alert.alert(
        "Confirm Exit",
        "Are you sure you want to exit?",
        [
          {
            text: "Cancel",
            onPress: () => null,
            style: "cancel"
          },
          { text: "Exit", onPress: () => BackHandler.exitApp() }
        ],
        { cancelable: false }
      );
      return true;
    };
  
    const backHandler = BackHandler.addEventListener(
      "hardwareBackPress",
      backAction
    );
  
    // Clean up the event listener on unmount
    return () => backHandler.remove();
  }, []);

  return (

    <>
      {isLoggedIn ?
       (<CompanyContext.Provider value={companyData}>
        <ProfileContext.Provider value={userData}>
        <SalesContext.Provider value={{SalesData,setSalesData}}>
        <PurchaseContext.Provider value={{PurchaseData,setPurchaseData}}>
        <AuthContext.Provider value={{authToken,setLogIn}}>
        <NavTabs />
        </AuthContext.Provider>
        </PurchaseContext.Provider>
        </SalesContext.Provider>
        </ProfileContext.Provider>
      </CompanyContext.Provider> ): (<Login logInData={logInData} />)}
    </>

    // <>
    //   {isLoggedIn ?
    //     (<NavTabs />)
    //     : (<Login logInData={logInData} />)}
    // </>



  );
}
// export default function App() {
//   return (
//     <View style={styles.container}>
//        <Text>Hello Prashant Soni This is my React Native expo app update</Text>
//       <NavTabs/>
//        <Login/>
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#fff',
//     alignItems: 'center',
//     justifyContent: 'center',
//   }});
