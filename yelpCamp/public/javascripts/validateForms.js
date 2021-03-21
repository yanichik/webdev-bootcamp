// JavaScript for disabling form submissions if there are invalid fields. This function is included
// in the 'new.ejs' and 'edit.ejs' views
(function () {
'use strict'

// Fetch all the forms we want to apply custom Bootstrap validation styles to
const forms = document.querySelectorAll('.needs-validation')
console.log(forms);

// Loop over them and prevent submission
// Array.prototype.slice.call(forms) -> old way of making an array out of an array-like item
Array.from(forms) // -> new way of making array out of array-like item
.forEach(function (form) {
  form.addEventListener('submit', function (event) {
    if (!form.checkValidity()) {
      event.preventDefault()
      event.stopPropagation()
    }

    form.classList.add('was-validated')
  }, false)
})
})()