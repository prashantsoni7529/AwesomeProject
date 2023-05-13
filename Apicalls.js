//Get company i.e organization details
export const CollectCompanyData = async (token) => {
  try {
    let response = await fetch(
      'http://54.82.231.80:3117/affivo/organizations', {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        authToken: token
      }
    });
    let json = await response.json();
    console.log("companydata json  returned is ", json);
    if (json.hasOwnProperty('data') && json['data'] !== "") {
      return json.data;

    }
    else {
      return "";
    }

    // return json.movies;
  } catch (error) {
    console.error(error);
  }
}

//Get Request for Sales data
export const CollectSalesData = async (token,label,pg_no = 1) => {
  try {
    let response = await fetch(
      `http://54.82.231.80:3117/affivo/sales?month=${label}&pageNumber=${pg_no}`, {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        authToken: token
      }
    });
    let json = await response.json();
    console.log("Sales data json  soniji returned is ", json);
    if (json.hasOwnProperty('data') && json['data'] !== "") {
      return json.data;

    }
    else {
      return "";
    }

    // return json.movies;
  } catch (error) {
    console.error(error);
  }
}

//Get Request for Purchase data
export const CollectPurchaseData = async (token,label,pg_no = 1) => {
  try {
    let response = await fetch(
      `http://54.82.231.80:3117/affivo/purchases?month=${label}&pageNumber=${pg_no}`, {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        authToken: token
      }
    });
    let json = await response.json();
    console.log("Purchase data json  returned is ", json);
    if (json.hasOwnProperty('data') && json['data'] !== "") {
      return json.data;

    }
    else {
      return "";
    }

    // return json.movies;
  } catch (error) {
    console.error(error);
  }
}

//Add new sale
export const AddNewSale = async (obj) => {
  console.log("inside addnew sale obj is ", JSON.stringify(obj));
  try {
    let response = await fetch(
      'http://54.82.231.80:3117/affivo/sales', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(obj),

    });
    // console.log("response is ",response);
    let json = await response.json();
    console.log("Adding sales json is", json);
    if (json['message'] === "Sales Invoice added Successfully" || json['code'] === '200') {
      console.log("Sale added successfully");
      alert("Sale added successfully");
    }
    else {
      alert("Sale not added");
    }

    // return json.movies;
  } catch (error) {
    console.error("Error is ", error);
    // throw error;
  }
}

//Add new purchase
export const AddNewPurchase = async (obj) => {
  console.log("inside addnew purchase obj is ", JSON.stringify(obj));
  try {
    let response = await fetch(
      'http://54.82.231.80:3117/affivo/purchases', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(obj),

    });
    // console.log("response is ",response);
    let json = await response.json();
    console.log("Adding purchase json is", json);
    if (json['message'] === "Purchase Invoice added Successfully" || json['code'] === '200') {
      console.log("Purchase added successfully");
      alert("Purchase added successfully");
    }
    else {
      alert("Purchase not added");
    }

    // return json.movies;
  } catch (error) {
    console.error("Error is ", error);
    // throw error;
  }
}


//Delete Selected Sale 
export const deleteSale = async(inv_no) => {
  console.log("Inside delete sale inv_no is ",inv_no);
  try {
    let response = await fetch(
      'http://54.82.231.80:3117/affivo/sales?invoiceNumber=' + inv_no, {
      method: 'DELETE',
    });
    let json = await response.json();
    console.log("Deleting sales json is", json);
    if (json['message'] === "Sales Deleted successfully" || json['code'] === '200') {
      console.log("Sale Deleted successfully");
      alert("Your sale is deleted");
    }
    else {
      alert("Sale not Deleted");
    }

    // return json.movies;
  } catch (error) {
    console.error("Error is ", error);
    // throw error;
  }
  

}

//Delete Selected Purchase 
export const deletePurchase = async(inv_no) => {
  console.log("Inside delete purchase inv_no is ",inv_no);
  try {
    let response = await fetch(
      'http://54.82.231.80:3117/affivo/purchases?invoiceId=' + inv_no, {
      method: 'DELETE',
    });
    let json = await response.json();
    console.log("Deleting purchase json is", json);
    if (json['message'] === "Purchase Deleted successfully" || json['code'] === '200') {
      console.log("Purchase Deleted successfully");
      alert("Your Purchase is deleted");
    }
    else {
      alert("Purchase not Deleted");
    }

    // return json.movies;
  } catch (error) {
    console.error("Error is ", error);
    // throw error;
  }
  

}

//Update Selected Sale 
export const updateSale = async(obj , inv_no) => {
  console.log("Inside updateSale  is ",obj);
  try {
    let response = await fetch(
      'http://54.82.231.80:3117/affivo/sales?invoiceNumber=' + inv_no, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(obj),
    });
    let json = await response.json();
    console.log("Updating sales json is", json);
    if (json['message'] === "Sales updated successfully" || json['code'] === '200') {
      console.log("Sales updated successfully");
      alert("Your sale is Updated");
    }
    else {
      alert("Sale not updated");
    }

    // return json.movies;
  } catch (error) {
    console.error("Error is ", error);
    // throw error;
  }
  

}

//Update Selected Purchase 
export const updatePurchase = async(obj , inv_no) => {
  console.log("Inside updatePurchase  is ",obj);
  try {
    let response = await fetch(
      'http://54.82.231.80:3117/affivo/purchases?invoiceNumber=' + inv_no, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(obj),
    });
    let json = await response.json();
    console.log("Updating purchase json is", json);
    if (json['message'] === "Purchase updated success fully" || json['code'] === '200') {
      console.log("Purchase updated successfully");
      alert("Your Purchase is Updated");
    }
    else {
      alert("Purchase not updated");
    }

    // return json.movies;
  } catch (error) {
    console.error("Error is ", error);
    // throw error;
  }
  

}

//Handling logout and terminating auth token
export const LogOut = async (token) => {
  try {
    let response = await fetch(
      'http://54.82.231.80:3117/affivo/logout', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', authToken: token },

    });
    let json = await response.json();
    console.log("logout response json is", json);
    if (json['message'] === "User logged out successfully" || json['code'] === '200') {
      console.log("Logged out successfulluy");
      
    }
    else {
      alert("Log out not successfull");
    }

    // return json.movies;
  } catch (error) {
    console.error("Error is ", error);
    // throw error;
  }
}


//Send Sales to auditor

export const SendSalesToAuditor = async (token,month) => {
  console.log("sending sales month is ", month);
  try {
    let response = await fetch(
      `http://54.82.231.80:3117/affivo/sales/send?month=${month}`, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        authToken: token
      }
    });
    let json = await response.json();
    console.log("Sales data sent to auditor ", json);
    if ( json['code'] == "200" || json['message'] == 'Sales Sent To Auditor') {
      alert("Selected month sales sent to Auditor");

    }
    else {
      alert("Sales not sent to auditor");
    }

    // return json.movies;
  } catch (error) {
    console.error(error);
  }
}

//Send Purchase to auditor

export const SendPurchaseToAuditor = async (token,month) => {
  console.log("sending purchase month is ", month);
  try {
    let response = await fetch(
      `http://54.82.231.80:3117/affivo/purchases/send?month=${month}`, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        authToken: token
      }
    });
    let json = await response.json();
    console.log("Purchase data sent to auditor ", json);
    if ( json['code'] == "200" || json['message'] == 'Purchases Sent To Auditor') {
      alert("Selected month purchases sent to Auditor");

    }
    else {
      alert("Sales not sent to auditor");
    }

    // return json.movies;
  } catch (error) {
    console.error(error);
  }
}