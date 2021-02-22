const form = document.getElementById('form');
const username = document.getElementById('username');
const email = document.getElementById('email');
const password = document.getElementById('password');
const password2 = document.getElementById('password2');


// Success & Failure Handlers
function onSuccess(input) {
  const formControl = input.parentElement;
  formControl.className = 'form-control success';
}

function onFailure(input, message) {
  const formControl = input.parentElement;
  formControl.className = 'form-control failure';

  const errorText = formControl.querySelector('small');
  errorText.innerText = message;
}


// Verify input for all fields
function validateInput(inputArr) {
  inputArr.forEach(input => {
    if (!input.value) {
      const dynamicText =
      (input.id === 'password2' ? 'Password' : input.id[0].toUpperCase() + input.id.slice(1));
      onFailure(input, `${dynamicText} required`);
    } else {
      onSuccess(input);
    }
  });
}

// Validate email
function validateEmail(input) {
    const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

    if(re.test(String(input.value.trim()).toLowerCase())) {
      onSuccess(input);
    } else {
      onFailure(input, 'Enter a valid email address')
    }
}

// Validate username and password length
function validateLength(input, min, max) {
  if (input.value.length < min) {
    onFailure(input, `Enter a ${input.id} at least ${min} characters long`);
  } else if (input.value.length > max) {
    onFailure(input, `Enter a ${input.id} less than ${max} characters long`);
  } else {
    onSuccess(input);
  }
}

// Validate password check
function validatePassword(input1, input2) {
  if (input1.value !== input2.value) {
    onFailure(input2, 'Passwords do not match');
  }
}


// Form Submit Listener
form.addEventListener('submit', e => {
  e.preventDefault();

  validateInput([username, email, password, password2]);
  validateEmail(email);
  validateLength(username, 3, 15);
  validateLength(password, 6, 25);
  validatePassword(password, password2);
});
