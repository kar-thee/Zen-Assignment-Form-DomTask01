const fnameElm = document.getElementById("First-name");
const lnameElm = document.getElementById("Last-name");
const addressElm = document.getElementById("Address");
const genderRadioElm = document.getElementsByName("Gender");
const pincodeElm = document.getElementById("Pincode");
const countryElm = document.getElementById("Country");
const stateElm = document.getElementById("State");
const FoodElm = document.getElementById("Food");

const pincodePattern = /^\d{6}$/; // RegExp got from StackOverflow
let user = [];
let userObj = {};
//  userObj = {
//     FirstName: "",
//     LastName: "",
//     Address: "",
//     Gender: "",
//     Foods: "",
//     Pincode: "",
//     Country: "",
//     State: "",
//   };

function formSubmit() {
  let firstName = fnameElm.value;
  let lastName = lnameElm.value;
  let address = addressElm.value;
  let country = countryElm.value;
  let state = stateElm.value;
  let male = genderRadioElm[0];
  let female = genderRadioElm[1];
  let gender = "";
  let foods = [];
  let pincode;

  //   Checking Gender radiobtn to get value from element
  if (male.checked) {
    gender = male.value;
  } else if (female.checked) {
    gender = female.value;
  }
  console.log("gender", gender);

  //   Pincode validation using RegExp..
  if (pincodePattern.test(pincodeElm.value)) {
    pincode = pincodeElm.value;
  }
  console.log(pincode);

  //Favourite food select-options (trick is getting multiple values)...
  //FoodElm.options(htmloptionscollection) is array-like obj but not array so no array functions,
  //🤢 instead can use simple looping or,
  // 🤢 to use ArrayConstructor .apply method - which is complex for simple usage or Array.from method
  // finally applied simple spread operator - it works😊 #ecmascript-Rules
  //[...foodElm.options] is now a array of options (like array of objects)
  //FoodElm.options.selectedIndex is the option which we selected, remains -1 till we selectone, holds only one value(index of option selected)
  if (FoodElm.options.selectedIndex > -1) {
    [...FoodElm.options].forEach((el) => {
      if (el.selected) {
        foods.push(el.value);
      }
    });
  }
  console.log(foods, "Food");

  userObj = {
    FirstName: firstName,
    LastName: lastName,
    Address: address,
    Gender: gender,
    Foods: foods,
    Pincode: pincode,
    Country: country,
    State: state,
  };

  user.push(userObj);
  generateTable(user);
  //   console.log(userObj);
  //   console.log(user);
  //   editValues(userObj);
  clearInput();
}

function testbtn() {
  editValues(user[0]);
}
function editValues(obj) {
  console.log(obj);
  fnameElm.value = obj.FirstName;
  lnameElm.value = obj.LastName;
  addressElm.value = obj.Address;

  if (obj.Gender === "Male") {
    genderRadioElm[0].checked = true;
  } else {
    genderRadioElm[1].checked = true;
  }

  pincodeElm.value = obj.Pincode;
  countryElm.value = obj.Country;
  stateElm.value = obj.State;

  document.getElementById(
    "Food-selector"
  ).textContent = `Selected ${obj.Foods[0]} and ${obj.Foods[1]}`;
  document.getElementById(`${obj.Foods[1]}`).selected = true;
  document.getElementById(`${obj.Foods[0]}`).selected = true;
  //   finally selected multiple options without overriding selected attribute in each option
}
// dont forget to put required in all input fields

function clearInput() {
  fnameElm.value = "";
  lnameElm.value = "";
  addressElm.value = "";
  genderRadioElm[0].checked = false;
  genderRadioElm[1].checked = false;
  pincodeElm.value = "";
  countryElm.value = "";
  stateElm.value = "";
  FoodElm.options.selectedIndex = -1;
  document.getElementById("Food-selector").textContent =
    "hold ctrl key and select multiple options";
}

const tbody = document.getElementById("table-body");
const tr = document.createElement("tr");
const td = document.createElement("td");

function generateTable(users) {
  users.map((userdata, i) => {
    tbody.innerHTML = `
      <tr id=${i}>
      <td>${userdata.FirstName}</td>
      <td>${userdata.LastName}</td>
      <td>${userdata.Address}</td>
      <td>${userdata.Pincode}</td>
      <td>${userdata.Gender}</td>
      <td>${userdata.Foods[0]}</td>
      <td>${userdata.State}</td>
      <td>${userdata.Country}</td>
      </tr>
      `;
  });
}
