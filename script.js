console.log("hi");


// bron voor code : https://chatgpt.com/share/67dbd282-13e4-8000-b9e5-3a59843031d3
function veranderSVG(event) {
    // Controleer of het doel een tekstinvoer is
    if (event.target.type !== 'text') {
        return; // Stop de functie als het geen tekstinvoer is
    }

    // Zoek de bijbehorende span voor de status-icoon
    let statusIcon = event.target.nextElementSibling;

    // Controleer of het nextElementSibling een knop is of een element dat geen span is
    if (statusIcon && statusIcon.tagName.toLowerCase() !== 'span') {
        // Maak een nieuw element aan als het geen span is
        statusIcon = document.createElement('span');  // Maak een nieuwe span voor de status-icoon
        event.target.parentNode.appendChild(statusIcon);  // Voeg de nieuwe span toe na het invoerveld
    }

    // Controleer of het invoerveld geldig is
    if (event.target.validity.valid) {
        // Als het veld geldig is, zet een vinkje
        statusIcon.textContent = '✓';
        statusIcon.style.color = '#009a42';  // Zet de kleur van het vinkje groen
    } else {
        // Als het veld ongeldig is, zet een kruisje
        statusIcon.textContent = '✘';
        statusIcon.style.color = '#db0029';  // Zet de kleur van het kruisje rood
    }
}

// Voeg de eventlistener toe aan alle invoervelden
const invoervelden = document.querySelectorAll('input');
invoervelden.forEach(function(input) {
    input.addEventListener('input', veranderSVG); // Bij elke input wordt de functie aangeroepen
});


// Event listener voor de radiobutton "Ja" in vraag 1b
document.querySelector('input[name="partner"][value="ja"]').addEventListener('change', function() {
    if (this.checked) {
        // Verberg vraag 1c als "Ja" geselecteerd is
        const fieldset1c = document.querySelector('form > fieldset:nth-of-type(3)');
        fieldset1c.style.display = 'none';  // Verbergt vraag 1c

        // Toon het specifieke fieldset voor vraag 1b (ja)
        const fieldsetJa = document.querySelector('form > fieldset:nth-of-type(2) > fieldset:nth-of-type(4)');
        fieldsetJa.style.display = 'block';  // Maakt het zichtbaar

        // Scroll naar het specifieke fieldset voor vraag 1b (ja) met een soepele animatie
        fieldsetJa.scrollIntoView({ behavior: 'smooth' });
    }
});

// Event listener voor de radiobutton "Nee" in vraag 1b
document.querySelector('input[name="partner"][value="nee"]').addEventListener('change', function() {
    if (this.checked) {
        // Verberg het specifieke fieldset voor vraag 1b (ja)
        const fieldsetJa = document.querySelector('form > fieldset:nth-of-type(2) > fieldset:nth-of-type(4)');
        fieldsetJa.style.display = 'none';  // Verbergt de "Ja" sectie

        // Toon vraag 1c door display op 'block' te zetten
        const fieldset1c = document.querySelector('form > fieldset:nth-of-type(3)');
        fieldset1c.style.display = 'block';  // Maakt vraag 1c zichtbaar

        // Scroll naar het 3e fieldset (vraag 1c) met een soepele animatie
        fieldset1c.scrollIntoView({ behavior: 'smooth' });
    }
});

// Initialiseer de visibiliteit van vraag 1c bij het laden van de pagina
document.addEventListener('DOMContentLoaded', function() {
    // Begin met vraag 1c verborgen
    const fieldset1c = document.querySelector('form > fieldset:nth-of-type(3)');
    fieldset1c.style.display = 'none';  // Verbergt vraag 1c

    // Start vraag 1b in de standaardstatus (verberg "Ja" bij het laden)
    const fieldsetJa = document.querySelector('form > fieldset:nth-of-type(2) > fieldset:nth-of-type(4)');
    fieldsetJa.style.display = 'none';  // Verbergt de "Ja" sectie bij het laden
});










let achternaamInput = document.querySelector('input[name="achtern"]');

achternaamInput.addEventListener('input', function() {
    if (achternaamInput.value.length > 0) {
        achternaamInput.value = achternaamInput.value.charAt(0).toUpperCase() + achternaamInput.value.slice(1);
    }
});


//opslaan form
// Function to save form data to localStorage
//Bron voor local storage : Chris Donker
function saveFormData() {
    console.log('test')
    // Get all input elements from the acquirer-1 fieldset
    const inputs = document.querySelectorAll('form fieldset label input');

    // Create an object to store the form data
    const formData = {};

    // Loop through each input and save its value
    inputs.forEach(input => {
        // For radio buttons, only save if checked
        if (input.type === 'radio') {
            if (input.checked) {
                formData[input.name] = input.id;
            }
        } else {
            // For text inputs, save the value
            formData[input.name] = input.value;
            console.log(formData);

        }
    });

    // Save the form data to localStorage
    localStorage.setItem('formData', JSON.stringify(formData));
}

// Function to load form data from localStorage
function loadFormData() {
    // Get the saved form data from localStorage
    const savedData = localStorage.getItem('formData');

    // If there's no saved data, exit the function
    if (!savedData) return;

    // Parse the saved data
    const formData = JSON.parse(savedData);

    // Get all input elements from the acquirer-1 fieldset
    const inputs = document.querySelectorAll('form fieldset label input');

    // Loop through each input and set its value from the saved data
    inputs.forEach(input => {
        if (input.type === 'radio') {
            // For radio buttons, check if the ID matches the saved value
            if (formData[input.name] === input.id) {
                input.checked = true;
            }
        } else if (input.name in formData) {
            // For text inputs, set the value
            input.value = formData[input.name];
        }
    });
}

// Function to attach event listeners to all form inputs
function setupFormPersistence() {
    // Get all input elements from the acquirer-1 fieldset
    const inputs = document.querySelectorAll('form fieldset label input');

    // Add change event listener to each input
    inputs.forEach(input => {
        input.addEventListener('input', saveFormData);
        // For radio buttons, also listen for the change event
        if (input.type === 'radio') {
            input.addEventListener('change', saveFormData);
        }
    });

    // Load saved form data when the page loads
    loadFormData();
}

// Initialize form persistence when the DOM is fully loaded
document.addEventListener('DOMContentLoaded', setupFormPersistence);