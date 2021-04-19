/* using parts of https://www.w3schools.com/howto/howto_js_form_steps.asp */

const quizText = {
  1: {
    prompt: 'If you couldn\'t get God\'s forgiveness, He will throw you into hell if you',
    subject: 'problem',
    answers: {
      a: 'Currently have any moral imperfection at all (ignoring your past)',
      b: 'Have ever done anything morally imperfectly',
      c: 'Have ever broken some special commandment of God (not just "regular" ones)'
    }
  },
  2: {
    prompt: 'But, God will forgive you if you',
    subject: 'forgiveness',
    answers: {},  // filled in during initialize()
    worksAnswers: ['Resolve to try harder to please Him', 'And succeed in breaking fewer of His commandments each day for the rest of your life'],
    faithAnswers: ['Believe that some deity exists', 'And that the God of the Jews exists', 'And that Jesus is God', 'And that Jesus’ death was somehow necessary for your forgiveness', 'And that your sin was forgiven when He died (maybe contingent upon your belief that this is the case or your request that it be the case)', 'And that nothing else affects God’s decision to forgive you besides this belief (such as your obedience)']
  },
  3: {
    prompt: 'After being forgiven, if you do something bad (break one of God’s commandments to Israel, break one of Jesus’ commandments summarizing moral perfection, or do something against your conscience--whichever one matters most), God',
    subject: 'saved-sin',
    answers: {
      a: 'Uses the “saved person” table of punishments (instead of going to hell, you just FOMO) rather than the “unsaved person” table of punishments',
      b: 'Sends you back to step 2',
      c: 'Uses the “saved person” table of punishments but keeps a cumulative quantifier of your evils and will send you back to step 2 if you surpass some threshold',
      d: 'Already forgave this evil in step 2, so it makes no difference whatsoever in how God treats you; you’re as close to Him as you would be if you behaved with moral perfection'
    }
  }
};

function* answerLetterGenerator() {
  /* returns the next letter in the lowercase alphabet, stopping at z */
  for (let asciiValue = 97; asciiValue < 123; ++asciiValue)
    yield String.fromCharCode(asciiValue);
}

function setRemainingQuizTextAnswers() {
    /* fill in question 2's grouped answers, since they couldn't be set during quizText intitialization */
    const answerLetters = answerLetterGenerator();

    // start with works-related answers group
    const worksAnswers = quizText[2].worksAnswers;
    for (const answer of worksAnswers) {
      const letter = answerLetters.next();
      quizText[2].answers[letter] = answer;
    }
  
    // same for faith answers
    const faithAnswers = quizText[2].faithAnswers;
    for (const answer of faithAnswers) {
      const letter = answerLetters.next();
      quizText[2].answers[letter] = answer;
    }
  
    // and add the 'Multiple...' option at the end of question 2's answer list
    const letter = answerLetters.next();
    quizText[2].answers[letter] = 'Multiple...';
}

function initialize() {
  // Unhide the first tab
  showTab(currentTab);

  // add text to each question
  const promptLegends = document.getElementsByTagName('legend');
  for (let index = 0; index < promptLegends.length; ++index) {
    const legend = promptLegends[index];
    const promptText = quizText[index].prompt;
    legend.textContent = promptText;
  }

  setRemainingQuizTextAnswers();

  // add text to each answer option
  for (const question of quizText) {
    // make the div

    // make the input

    // make the label

    // add to its tab (fieldset)
  }
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