const scriptURL = 'https://script.google.com/macros/s/AKfycbwSR-9MFWKl-_mQLIIlhjHYV45hwgBb4hQmnkFGiWAe6c0hf0tY-f_jOIPDjF_kUi9e0A/exec'

const form = document.forms['scheduling-form']

form.addEventListener('submit', e =>{
  e.preventDefault()
  fetch(scriptURL, {method: 'POST', body: new FormData(form)})
  .then(response => alert("Thank you! Your PK date is submitted successfully. Please wait for announcement of approved PKs."))
  .then(() => {window.location.reload();})
  .catch(error => console.error('Error!', error.message))
})

