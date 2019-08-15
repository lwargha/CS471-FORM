var firebaseConfig = {
  apiKey: "AIzaSyD4HmZBiyy2fwm98xVCGUjqGBw6kV32wos",
  authDomain: "shine-marketing-test.firebaseapp.com",
  databaseURL: "https://shine-marketing-test.firebaseio.com",
  projectId: "shine-marketing-test",
  storageBucket: "shine-marketing-test.appspot.com",
  messagingSenderId: "894757308372",
  appId: "1:894757308372:web:dd08ec751cbed052"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
var db = firebase.firestore();

// window.onbeforeunload = function (e) {

//   this.console.log('User just tried closing window. Let us give him/her this confirmation message and send some data to the database');
//   var obj = {
//     name: 'Adam',
//     city: 'Rexburg',
//     interested: true
//   }

//   // if (true) {
//   //   db.collection("marketing-input").add(obj).then(function (docRef) {
//   //       console.log("Document written with ID: ", docRef.id);
//   //     })
//   //     .catch(function (error) {
//   //       console.error("Error adding document: ", error);
//   //     });
//   // }

//   var confirmationMessage = "Exiting! :) ";
//   (e || window.event).returnValue = confirmationMessage;
//   return confirmationMessage;
// };

function toggleBulletCompleted(_bulletNum) {
  console.log(_bulletNum);
}

function checkForStepCompletion(el, stepNumber, allowed) {
  //some business logic to check inputs here, then set allowed to true
  if (allowed) {
    window.location = `#slider-${stepNumber}`;
    updateUiBaseOnStep(stepNumber);
  }

}

function checkTheBox(el, hasOwnHouse) {
  var temp = document.getElementsByClassName('active-box');
  if (temp[0]) {
    temp[0].classList.remove('active-box');
  }

  var activeBox = el.getElementsByClassName('check')[0];
  activeBox.classList.add('active-box');
  if (hasOwnHouse) {
    document.getElementById('house-img').classList.remove('hide');
    document.getElementById('error-home').classList.add('hide');
    updateUiBaseOnStep(2);
    window.location = `#slider-2`;
  } else {
    document.getElementById('house-img').classList.add('hide');
    document.getElementById('error-home').classList.remove('hide');
    document.getElementById(`step-2`).setAttribute('onclick', `checkForStepCompletion(this, 2, false)`);
  }
}

function updateUiBaseOnStep(stepNumber) {
  document.getElementsByClassName('active')[0].classList.remove('active');
  document.getElementById(`step-${stepNumber}`).classList.add('active');
  if (stepNumber !== 1)
    document.getElementById(`step-${stepNumber - 1}`).innerHTML = `<svg style="margin-top: 6px;" xmlns="http://www.w3.org/2000/svg" width="17" height="14" viewBox="0 0 17 14">
  <path fill="#FFF" fill-rule="nonzero"
      d="M16.056.626a1.455 1.455 0 0 0-2.035.309l-6.903 9.369-4.39-3.512A1.458 1.458 0 0 0 .907 9.067l5.573 4.459a1.472 1.472 0 0 0 2.082-.274L16.37 2.663a1.457 1.457 0 0 0-.314-2.037z" />
</svg>
`

  document.getElementById(`step-${stepNumber}`).innerHTML = `<span> ${stepNumber} </span>`
  document.getElementById(`step-${stepNumber}`).setAttribute('onclick', `checkForStepCompletion(this, ${stepNumber}, true)`);
}

function checkHouseTypeBox(el, isAllowed) {
  if (document.getElementsByClassName('active-house-type')[0]) {
    document.getElementsByClassName('active-house-type')[0].classList.remove('active-house-type');
  }
  el.classList.add('active-house-type');
  if (isAllowed) {
    updateUiBaseOnStep(3);
    window.location = `#slider-3`;
    document.getElementById('error-home-type').classList.add('hide');
  } else {
    document.getElementById('error-home-type').classList.remove('hide');
  }
}

function checkElectricBill(el, isEnough) {
  if (document.getElementsByClassName('active-house-type')[1]) {
    document.getElementsByClassName('active-house-type')[1].classList.remove('active-house-type');
  }

  if (isEnough) {
    el.classList.add('active-house-type');
    window.location = `#slider-4`;
    updateUiBaseOnStep(4);
  }
}

function checkTaxableIncome(el, isAllowed) {

  if (document.getElementsByClassName('active-house-type')[2]) {
    document.getElementsByClassName('active-house-type')[2].classList.remove('active-house-type');
  }

  if (isAllowed) {
    el.classList.add('active-house-type');
    window.location = `#slider-5`;
    updateUiBaseOnStep(5);
  }
}

function checkCreditScore(el, hasEnoughCredit) {
  if (document.getElementsByClassName('active-tax-type')[0]) {
    document.getElementsByClassName('active-tax-type')[0].classList.remove('active-house-type');
  }

  if (hasEnoughCredit) {
    el.classList.add('active-tax-type');
    window.location = `#slider-6`;
    updateUiBaseOnStep(6);
    document.getElementById('error-credit-score').classList.add('hide');
  } else {
    document.getElementById('error-credit-score').classList.remove('hide');
  }

}

function checkEmploymentStatus(el, isEligible) {
  if (document.getElementsByClassName('active-employment-type')[0]) {
    document.getElementsByClassName('active-employment-type')[0].classList.remove('active-employment-type');
  }

  if (isEligible) {
    el.classList.add('active-employment-type');
    window.location = `#slider-7`;
    updateUiBaseOnStep(7);
  } else {

  }
}

function validateAddress() {
  var street = document.getElementById('street-address').value;
  var zip = document.getElementById('zip').value
  if (street === '' || street === undefined || zip === '' || zip === undefined) {
    if (street === '' || street === undefined) {
      document.getElementById('error-address').classList.remove('hide');
      document.getElementById('street-address').classList.add('shakeError');
      setTimeout(() => {
        document.getElementById('street-address').classList.remove('shakeError');
      }, 300);
    } else {
      document.getElementById('error-zip').classList.remove('hide');
      document.getElementById('zip').classList.add('shakeError');
      setTimeout(() => {
        document.getElementById('zip').classList.remove('shakeError');
      }, 300);
    }
  } else {
    var reg = new RegExp("^[0-9]{5}([- /]?[0-9]{4})?$");
    if (!reg.exec(zip)) {
      document.getElementById('zip').classList.add('shakeError');
      document.getElementById('error-zip').classList.remove('hide');
      setTimeout(() => {
        document.getElementById('zip').classList.remove('shakeError');
      }, 300);
    } else {
      window.location = `#slider-8`;
      updateUiBaseOnStep(8);
      document.getElementById('error-zip').classList.add('hide');
      document.getElementById('error-address').classList.add('hide');
    }

  }

}

function validateUserProfile() {
  var validated = false;
  var name = document.getElementById('name').value;
  var phone = document.getElementById('phone').value;
  var email = document.getElementById('email').value;

  if (name === '' || name === undefined || phone === '' || phone === undefined || email === '' || email === undefined) {
    if (name === '' || name === undefined) {
      document.getElementById('error-name').classList.remove('hide');
      document.getElementById('name').classList.add('shakeError');
      setTimeout(() => {
        document.getElementById('name').classList.remove('shakeError');
      }, 300);
    } else if (email === '' || email === undefined) {
      document.getElementById('error-email').classList.remove('hide');
      document.getElementById('email').classList.add('shakeError');
      setTimeout(() => {
        document.getElementById('email').classList.remove('shakeError');
      }, 300);
    } else if (phone === '' || phone === undefined) {
      document.getElementById('error-phone').classList.remove('hide');
      document.getElementById('phone').classList.add('shakeError');
      setTimeout(() => {
        document.getElementById('phone').classList.remove('shakeError');
      }, 300);
    }
  } else {

    if (!email.match(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/)) {
      document.getElementById('error-email').classList.remove('hide');
      document.getElementById('email').classList.add('shakeError');
      setTimeout(() => {
        document.getElementById('email').classList.remove('shakeError');
      }, 300);
      validated = false;
    } else {
      validated = true;
      document.getElementById('error-email').classList.add('hide');
    }

    if (!phone.match(/^([0-9]( |-)?)?(\(?[0-9]{3}\)?|[0-9]{3})( |-)?([0-9]{3}( |-)?[0-9]{4}|[a-zA-Z0-9]{7})$/)) {
      document.getElementById('error-phone').classList.remove('hide');
      document.getElementById('phone').classList.add('shakeError');
      setTimeout(() => {
        document.getElementById('phone').classList.remove('shakeError');
      }, 300);
      validated = false;
    } else {
      validated = true;
      document.getElementById('error-phone').classList.add('hide');
    }
  }
  if (validated) {
    window.location = `#slider-9`;
    document.getElementsByClassName('active')[0].classList.remove('active');
    document.getElementById(`step-8`).innerHTML = `<svg style="margin-top: 6px;" xmlns="http://www.w3.org/2000/svg" width="17" height="14" viewBox="0 0 17 14">
    <path fill="#FFF" fill-rule="nonzero"
        d="M16.056.626a1.455 1.455 0 0 0-2.035.309l-6.903 9.369-4.39-3.512A1.458 1.458 0 0 0 .907 9.067l5.573 4.459a1.472 1.472 0 0 0 2.082-.274L16.37 2.663a1.457 1.457 0 0 0-.314-2.037z" />
  </svg>`
  }
}

var obj = {
  ownHome: false,
  homeType: "condo",
  electricBill: 0,
  hasTaxableIncome: false,
  estimatedCreditScore: "720",
  employmentStatus: "employed",
  address: {
    street: "398 Pioneer rd #1111",
    zip: "83440"
  },
  personalInfo: {
    name: "Lucas Wargha",
    email: "l@gmail.com",
    phone: "000-000-0000"
  }
}

function buildObj(prop, value) {
  console.log(obj);
  obj[prop] = value;
  console.log(obj);
}

function updateDatabase() {
  var server = new XMLHttpRequest();
  server.open('POST', 'http://127.0.0.1:5500/test.txt');
  server.setRequestHeader('Content-Type', 'application/json');
  server.onload = function () {
    if (server.status === 200) {
    } else if (server.status !== 200) {
      console.log("success");
    }
  };
  server.send({"Name": "Lucas"});
}