var dogName = document.getElementById('bold');
var dogInput = document.getElementById('name');
var dogSubmitButton = document.querySelector('.dog-submit');


dogSubmitButton.addEventListener('click', function () {
  dogName.innerText = dogInput.value;
  dogInput.value = "";
});