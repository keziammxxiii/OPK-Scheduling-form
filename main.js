const scriptURL = 'https://script.google.com/macros/s/AKfycbwSR-9MFWKl-_mQLIIlhjHYV45hwgBb4hQmnkFGiWAe6c0hf0tY-f_jOIPDjF_kUi9e0A/exec';
const form = document.forms['scheduling-form'];

form.addEventListener('submit', e => {
  e.preventDefault();
  const formData = new FormData(form);
  const pkDate1 = formData.get('pkDate1');
  const pkTime1 = formData.get('pkTime1');
  const pkDate2 = formData.get('pkDate2');
  const pkTime2 = formData.get('pkTime2');
  
  // Check if pkDate1 and pkTime1 match any existing record
  if (checkScheduleAvailability(pkDate1, pkTime1)) {
    displayErrorMessage('Your selected time and date for your 1st PK is already chosen.');
    return;
  }
  
  // Check if pkDate2 and pkTime2 match any existing record
  if (checkScheduleAvailability(pkDate2, pkTime2)) {
    displayErrorMessage('Your selected time and date for your 2nd PK is already chosen.');
    return;
  }

  // If both dates and times are available, submit the form
  fetch(scriptURL, { method: 'POST', body: formData })
    .then(response => {
      alert("Thank you! Your PK date is submitted successfully. Please wait for announcement of approved PKs.");
      window.location.reload();
    })
    .catch(error => console.error('Error!', error.message));
});

function checkScheduleAvailability(date, time) {
  const selectedDateTime = new Date(date + 'T' + time);
  for (const record of existingScheduleData) {
    const recordDateTime = new Date(record[0] + 'T' + record[1]);
    if (selectedDateTime.getTime() === recordDateTime.getTime()) {
      return true; // Schedule already taken
    }
  }
  return false; // Schedule available
}

function displayErrorMessage(message) {
  const errorMessageContainer = document.getElementById('error-message');
  errorMessageContainer.textContent = message;
  errorMessageContainer.style.display = 'block';
}
