function checkForStepCompletion(el, stepNumber, allowed) {
  //some business logic to check inputs here, then set allowed to true
  if (allowed) {
    window.location = `#slider-${stepNumber}`;
    updateUiBaseOnStep(stepNumber);
  }
}

function checkTheBox(el, hasOwnHouse, step) {
  // buildObj("hasOwnHouse", hasOwnHouse);
  var temp = document.getElementsByClassName("active-box");
  if (temp[0]) {
    temp[0].classList.remove("active-box");
  }

  var activeBox = el.getElementsByClassName("check")[0];
  activeBox.classList.add("active-box");
  el.classList.add("checking");
  setTimeout(() => {
    updateUiBaseOnStep(2, "Own your home?");
    window.location = `#slider-2`;
  }, 300);
}

function updateUiBaseOnStep(stepNumber, stepLabel = "") {
  document.getElementsByClassName("active")[0].classList.remove("active");
  if (stepNumber !== 7)
    document.getElementById(`step-${stepNumber}`).classList.add("active");
  console.log(stepNumber);
  if (stepNumber !== 1)
    document.getElementById(
      `step-${stepNumber - 1}`
    ).innerHTML = `<svg style="margin-top: 6px;" xmlns="http://www.w3.org/2000/svg" width="17" height="14" viewBox="0 0 17 14">
  <path fill="#FFF" fill-rule="nonzero"
      d="M16.056.626a1.455 1.455 0 0 0-2.035.309l-6.903 9.369-4.39-3.512A1.458 1.458 0 0 0 .907 9.067l5.573 4.459a1.472 1.472 0 0 0 2.082-.274L16.37 2.663a1.457 1.457 0 0 0-.314-2.037z" />
</svg>
`;

  document.getElementById(
    `step-${stepNumber}`
  ).innerHTML = `<span> ${stepNumber} </span>`;
  document
    .getElementById(`step-${stepNumber}`)
    .setAttribute(
      "onclick",
      `checkForStepCompletion(this, ${stepNumber}, true)`
    );
}

function checkHouseTypeBox(el, isAllowed, homeType) {
  // buildObj("homeType", homeType);
  if (document.getElementsByClassName("active-house-type")[0]) {
    document
      .getElementsByClassName("active-house-type")[0]
      .classList.remove("active-house-type");
  }
  el.classList.add("active-house-type");
  if (isAllowed) {
    updateUiBaseOnStep(3, "What type of home?");
    window.location = `#slider-3`;
    // document.getElementById("error-home-type").classList.add("hide");
  } else {
    // document.getElementById("error-home-type").classList.remove("hide");
    // window.location = `#error-home-type`;
  }
}

function checkElectricBill(el, isEnough, amount) {
  buildObj("electricBill", amount);
  if (document.getElementsByClassName("active-house-type")[1]) {
    document
      .getElementsByClassName("active-house-type")[1]
      .classList.remove("active-house-type");
  }

  if (isEnough) {
    el.classList.add("active-house-type");
    window.location = `#slider-4`;
    updateUiBaseOnStep(4, "How much was your last electric bill");
  }
}

function checkTaxableIncome(el, isAllowed, hasTaxableIncome) {
  buildObj("hasTaxableIncome", hasTaxableIncome);

  if (document.getElementsByClassName("active-taxable-income")[0]) {
    document
      .getElementsByClassName("active-taxable-income")[0]
      .classList.remove("active-taxable-income");
  }

  if (isAllowed) {
    el.classList.add("active-taxable-income");
    window.location = `#slider-5`;
    updateUiBaseOnStep(5, "Do you have taxable income?");
  }
}

function checkCreditScore(el, hasEnoughCredit, amount) {
  buildObj("estimatedCreditScore", amount);
  if (document.getElementsByClassName("active-tax-type")[0]) {
    document
      .getElementsByClassName("active-tax-type")[0]
      .classList.remove("active-house-type");
  }

  if (hasEnoughCredit) {
    el.classList.add("active-tax-type");
    window.location = `#slider-6`;
    updateUiBaseOnStep(6, "Estimated Credit Score?");
  } else {
  }
}

function checkEmploymentStatus(el, isEligible, employmentStatus) {
  buildObj("employmentStatus", employmentStatus);
  if (document.getElementsByClassName("active-employment-type")[0]) {
    document
      .getElementsByClassName("active-employment-type")[0]
      .classList.remove("active-employment-type");
  }

  if (isEligible) {
    el.classList.add("active-employment-type");
    window.location = `#slider-7`;
    updateUiBaseOnStep(7, "Current Employment Status");
  } else {
  }
}

function validateAddress() {
  window.location = `#slider-7`;
  updateUiBaseOnStep(7, "What is your address");
}

function validateUserProfile() {
  var validated = false;
  var validatedEmail = false;
  var firstName = document.getElementById("first-name").value;
  var lastName = document.getElementById("last-name").value;
  var phone = document.getElementById("phone").value;
  var email = document.getElementById("email").value;

  if (
    firstName === "" ||
    firstName === undefined ||
    lastName === "" ||
    lastName === undefined ||
    phone === "" ||
    phone === undefined ||
    email === "" ||
    email === undefined
  ) {
    if (firstName === "" || firstName === undefined) {
      document.getElementById("error-first-name").classList.remove("hide");
      document.getElementById("first-name").classList.add("shakeError");
      setTimeout(function () {
        document.getElementById("first-name").classList.remove("shakeError");
      }, 300);
    } else if (lastName === "" || lastName === undefined) {
      document.getElementById("error-last-name").classList.remove("hide");
      document.getElementById("last-name").classList.add("shakeError");
      setTimeout(function () {
        document.getElementById("last-name").classList.remove("shakeError");
      }, 300);
    } else if (email === "" || email === undefined) {
      document.getElementById("error-email").classList.remove("hide");
      document.getElementById("email").classList.add("shakeError");
      setTimeout(function () {
        document.getElementById("email").classList.remove("shakeError");
      }, 300);
    } else if (phone === "" || phone === undefined) {
      document.getElementById("error-phone").classList.remove("hide");
      document.getElementById("phone").classList.add("shakeError");
      setTimeout(function () {
        document.getElementById("phone").classList.remove("shakeError");
      }, 300);
    }
  } else {
    if (!document.getElementById("email").checkValidity()) {
      document.getElementById("error-email").classList.remove("hide");
      document.getElementById("email").classList.add("shakeError");
      setTimeout(function () {
        document.getElementById("email").classList.remove("shakeError");
      }, 300);
      validatedEmail = false;
    } else {
      validatedEmail = true;
      document.getElementById("error-email").classList.add("hide");
    }

    if (
      !phone.match(
        /^([0-9]( |-)?)?(\(?[0-9]{3}\)?|[0-9]{3})( |-)?([0-9]{3}( |-)?[0-9]{4}|[a-zA-Z0-9]{7})$/
      )
    ) {
      document.getElementById("error-phone").classList.remove("hide");
      document.getElementById("phone").classList.add("shakeError");
      setTimeout(function () {
        document.getElementById("phone").classList.remove("shakeError");
      }, 300);
      validated = false;
    } else {
      validated = true;
      document.getElementById("error-phone").classList.add("hide");
    }
  }
  if (validated && validatedEmail) {
    gtag("event", "question_8", {
      event_label: "Personal Info"
    });
    buildObj("personalInfo", {
      firstName: firstName,
      lastName: lastName,
      email: email,
      phone: phone
    });

    document.getElementById("videoContainer").innerHTML =
      '<iframe allow="autoplay" src="https://player.vimeo.com/video/341475870?autoplay=1" frameborder="0"></iframe>';
    window.location = `#slider-9`;
    document.getElementById("steps").classList.add("hide");
    document.getElementsByClassName("active")[0].classList.remove("active");
    document.getElementById("self-schedule").classList.remove("hide");
    updateDatabase();
    document.getElementById(
      `step-8`
    ).innerHTML = `<svg style="margin-top: 6px;" xmlns="http://www.w3.org/2000/svg" width="17" height="14" viewBox="0 0 17 14">
    <path fill="#FFF" fill-rule="nonzero"
        d="M16.056.626a1.455 1.455 0 0 0-2.035.309l-6.903 9.369-4.39-3.512A1.458 1.458 0 0 0 .907 9.067l5.573 4.459a1.472 1.472 0 0 0 2.082-.274L16.37 2.663a1.457 1.457 0 0 0-.314-2.037z" />
  </svg>`;
  }
  updateDatabase();
}

var urlSearch = new URLSearchParams(window.location.search);

var obj = {
  hasOwnHouse: undefined,
  homeType: undefined,
  electricBill: undefined,
  hasTaxableIncome: undefined,
  estimatedCreditScore: undefined,
  employmentStatus: undefined,
  address: undefined,
  personalInfo: {
    firstName: undefined,
    lastName: undefined,
    email: undefined,
    phone: undefined
  },
  lead_source:
    urlSearch.get("utm_content") == null ? "174" : urlSearch.get("utm_content")
};

function buildObj(prop, value) {
  obj[prop] = value;
}

function updateDatabase() {
  return;
}

document.getElementById("street-address").onfocus = function () {
  document.getElementById("street-address").removeAttribute("readonly");
};

/// all the map functionality
function setAutoComplete() {
  var map, marker;
  map = new google.maps.Map(document.getElementById("map"), {
    center: {
      lat: 39.783809,
      lng: -102.057222
    },
    zoom: 3,
    mapTypeId: "satellite"
  });

  marker = new google.maps.Marker({
    position: {
      lat: 39.783809,
      lng: -102.057222
    },
    draggable: true,
    animation: google.maps.Animation.BOUNCE,
    map: map,
    title: "ADDRESS"
  });

  var input = document.getElementById("street-address");
  var autocomplete = new google.maps.places.Autocomplete(input);
  autocomplete.bindTo("bounds", map);
  autocomplete.setFields(["address_components", "geometry"]);

  google.maps.event.addListener(autocomplete, "place_changed", function () {
    place = autocomplete.getPlace();
    document.getElementById("hide-map").classList.remove("hide");
    if (place.geometry.viewport) {
      map.fitBounds(place.geometry.viewport);
      map.setZoom(20);
    } else {
      map.setCenter(place.geometry.location);
      map.setZoom(20);
    }
    buildObj("coordinates", place.geometry.viewport);

    marker.setPosition(place.geometry.location);
    marker.setVisible(true);
  });
}
