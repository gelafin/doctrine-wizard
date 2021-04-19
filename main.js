/* using parts of https://www.w3schools.com/howto/howto_js_form_steps.asp */

const quizText = {
  1: {
    prompt: 'If you couldn\'t get God\'s forgiveness, He will throw you into hell if you',
    subject: 'problem',
    a: 'Currently have any moral imperfection at all (ignoring your past)',
    b: 'Have ever done anything morally imperfectly',
    c: 'Have ever broken some special commandment of God (not just "regular" ones)'
  },
  2: {
    prompt: 'But, God will forgive you if you',
    subject: 'forgiveness',
    a: 'Resolve to try harder to please Him',
    b: 'And succeed in breaking fewer of His commandments each day for the rest of your life',

    c: 'Believe that some deity exists',
    d: 'And that the God of the Jews exists',
    e: 'And that Jesus is God',
    f: 'And that Jesus’ death was somehow necessary for your forgiveness',
    g: 'And that your sin was forgiven when He died (maybe contingent upon your belief that this is the case)',
    h: 'And that nothing else affects God’s decision to forgive you besides this belief (such as your obedience)',
    i: 'Multiple...'
  }
};


function initialize() {
  // Unhide the first tab
  showTab(currentTab);

  // TODO: add text to each question

}

var currentTab = 0; // just w3schools using a global #wontfix
initialize();

function displayResult() {
  /* arranges the user's quiz answers as a single gospel statement */
  const displayP = document.getElementById('display-result');

  // get user's answers

  // adjust wording of user's answers to be coherent as one statement

  // display the statement
  displayP.textContent = 'testing';
}

function showTab(n) {
  // display the specified tab of the form ...
  var x = document.getElementsByClassName("tab");
  x[n].style.display = "block";

  // update the Previous button
  if (n == 0) {
    document.getElementById("prevBtn").style.display = "none";
  } else {
    document.getElementById("prevBtn").style.display = "inline";
  }

  // update the Next button
  if (n == (x.length - 2)) {
    // showing last question (second-last tab)
    const nextButton = document.getElementById("nextBtn");
    nextButton.textContent = "View Result";
    nextButton.addEventListener('click', displayResult);
    document.getElementById("nextBtn").style.display = "inline";
  } else if (n == (x.length - 1)) {
    // showing summary (last tab)
    document.getElementById("nextBtn").style.display = "none";
  } else {
    document.getElementById("nextBtn").textContent = "Next";
    document.getElementById("nextBtn").style.display = "inline";
    }

  // update step indicator
  fixStepIndicator(n)
}

function nextPrev(n) {
  // This function will figure out which tab to display
  var x = document.getElementsByClassName("tab");
  // Exit the function if any field in the current tab is invalid:
  // if (n == 1 && !validateForm()) return false;
  // Hide the current tab:
  x[currentTab].style.display = "none";
  // Increase or decrease the current tab by 1:
  currentTab = currentTab + n;
  // Otherwise, display the correct tab:
  showTab(currentTab);
}

function validateForm() {
  // This function deals with validation of the form fields
  var x, y, i, valid = true;
  x = document.getElementsByClassName("tab");
  y = x[currentTab].getElementsByTagName("input");
  // A loop that checks every input field in the current tab:
  for (i = 0; i < y.length; i++) {
    // If a field is empty...
    if (y[i].value == "") {
      // add an "invalid" class to the field:
      y[i].className += " invalid";
      // and set the current valid status to false:
      valid = false;
    }
  }
  // If the valid status is true, mark the step as finished and valid:
  if (valid) {
    document.getElementsByClassName("step")[currentTab].className += " finish";
  }
  return valid; // return the valid status
}

function fixStepIndicator(n) {
  // This function removes the "active" class of all steps...
  var i, x = document.getElementsByClassName("step");
  for (i = 0; i < x.length; i++) {
    x[i].className = x[i].className.replace(" active", "");
  }
  //... and adds the "active" class to the current step:
  x[n].className += " active";
}