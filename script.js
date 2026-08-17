// LivelyLifeGoods — Get Started form logic

document.getElementById('year').textContent = new Date().getFullYear();

const form = document.getElementById('infoForm');
const successMsg = document.getElementById('successMsg');
const resetBtn = document.getElementById('resetBtn');

const fields = {
  name: {
    input: document.getElementById('name'),
    error: document.getElementById('nameError'),
    validate: (v) => v.trim().length >= 2,
    message: 'Please enter your full name.'
  },
  phone: {
    input: document.getElementById('phone'),
    error: document.getElementById('phoneError'),
    validate: (v) => /^[0-9+\-\s()]{7,20}$/.test(v.trim()),
    message: 'Please enter a valid phone number.'
  },
  address: {
    input: document.getElementById('address'),
    error: document.getElementById('addressError'),
    validate: (v) => v.trim().length >= 5,
    message: 'Please enter your complete address.'
  }
};

function validateField(key){
  const f = fields[key];
  const value = f.input.value;
  const isValid = f.validate(value);
  const fieldWrap = f.input.closest('.field');

  if(!isValid){
    fieldWrap.classList.add('invalid');
    f.error.textContent = f.message;
  } else {
    fieldWrap.classList.remove('invalid');
    f.error.textContent = '';
  }
  return isValid;
}

// Validate on blur for gentle, non-annoying feedback
Object.keys(fields).forEach((key) => {
  fields[key].input.addEventListener('blur', () => validateField(key));
  fields[key].input.addEventListener('input', () => {
    const fieldWrap = fields[key].input.closest('.field');
    if(fieldWrap.classList.contains('invalid')) validateField(key);
  });
});

form.addEventListener('submit', function(e){
  e.preventDefault();

  let allValid = true;
  Object.keys(fields).forEach((key) => {
    if(!validateField(key)) allValid = false;
  });

  if(!allValid){
    const firstInvalid = form.querySelector('.field.invalid input, .field.invalid textarea');
    if(firstInvalid) firstInvalid.focus();
    return;
  }

  const submission = {
    name: fields.name.input.value.trim(),
    phone: fields.phone.input.value.trim(),
    address: fields.address.input.value.trim(),
    submittedAt: new Date().toISOString()
  };

  // ---------------------------------------------------------------
  // Where the submitted data goes:
  // Currently it's only logged to the browser console below.
  // To send it somewhere real, replace this block with either:
  //
  // 1) A fetch() call to your own backend / form endpoint, e.g.:
  //    fetch('https://your-server.com/api/submit', {
  //      method: 'POST',
  //      headers: { 'Content-Type': 'application/json' },
  //      body: JSON.stringify(submission)
  //    });
  //
  // 2) A form service like Formspree / Getform / Google Sheets webhook.
  // ---------------------------------------------------------------
  console.log('New submission:', submission);

  form.hidden = true;
  successMsg.hidden = false;
});

resetBtn.addEventListener('click', function(){
  form.reset();
  Object.keys(fields).forEach((key) => {
    fields[key].input.closest('.field').classList.remove('invalid');
    fields[key].error.textContent = '';
  });
  successMsg.hidden = true;
  form.hidden = false;
  fields.name.input.focus();
});
