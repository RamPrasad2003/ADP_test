window.onload = function () {
    // Load all saved data when the page is loaded
    
};


// Add new entry (time and description) to the list and save it to localStorage
function addEntry() {
    const timeInput = document.getElementById('timeInput');
    const descriptionInput = document.getElementById('descriptionInput');
    const time = timeInput.value;
    const description = descriptionInput.value.trim();

    if (time && description) {
        const entryList = document.getElementById('entryList');
        const li = document.createElement('li');
        li.innerHTML = `
            <span>${time} - ${description}</span>
            <button class="delete-button" onclick="deleteEntry(this)">–</button>
        `;
        entryList.appendChild(li);

        // Save the new entry to localStorage
        saveEntriesToLocalStorage();

        // Clear the input fields
        timeInput.value = '';
        descriptionInput.value = '';
    } else {
        alert('Please enter both time and description.');
    }
}

// Delete an entry and update localStorage
function deleteEntry(button) {
    const li = button.parentElement;
    li.remove();

    // Save the updated entries to localStorage after deletion
    saveEntriesToLocalStorage();
}

// Save all entries (time and description) to localStorage
function saveEntriesToLocalStorage() {
    const entryList = document.getElementById('entryList');
    const entries = [];

    // Loop through the list items and create an array of entries
    for (let li of entryList.children) {
        const span = li.querySelector('span');
        const text = span.textContent;
        const [time, description] = text.split(' - ');
        entries.push({ time, description });
    }

    // Store the array of entries in localStorage
    localStorage.setItem('entries', JSON.stringify(entries));
}

// Load entries from localStorage and display them
function loadEntriesFromLocalStorage() {
    const entries = JSON.parse(localStorage.getItem('entries')) || [];
    const entryList = document.getElementById('entryList');

    entries.forEach(entry => {
        const li = document.createElement('li');
        li.innerHTML = `
            <span>${entry.time} - ${entry.description}</span>
            <button class="delete-button" onclick="deleteEntry(this)">–</button>
        `;
        entryList.appendChild(li);
    });
}

  