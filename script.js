console.log("hi");


let achternaamInput = document.querySelector('.achternaam');

achternaamInput.addEventListener('input', function() {
    if (achternaamInput.value.length > 0) {
        achternaamInput.value = achternaamInput.value.charAt(0).toUpperCase() + achternaamInput.value.slice(1);
    }
});