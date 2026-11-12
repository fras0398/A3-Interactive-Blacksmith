// Assignment 1 & 3: Blacksmith — The Tiny Forge

// PLAN: Write a short pseudocode plan for making a sword here.

/*
    First, I'm gonna check if the current heat is 30 or higher.
    
    If it is, I will:
    - Decrease the heat by 30.
    - Increase the sword count by 1.
    - Update the forge status and display a success message.
   
    If it isn't, I will:
    - Display a message that there is not enough heat to make a sword.
    
    I'll then call the updateForge() function to refresh the changes on the page.
*/

// 1. Select the forge, heat, sword count, status, image, and message elements.
const forgeElement = document.getElementById('forge');
const heatElement = document.getElementById('heat-value');
const swordCountElement = document.getElementById('sword-count');
const statusElement = document.getElementById('forge-status');
const forgeImageElement = document.getElementById('forge-image');
const messageElement = document.getElementById('action-message');

// 2. Create the two state variables: heat and swords made.
let heat = 20; // Initial heat value
let swordsMade = 0; // Initial sword count
let currentMessage = "Welcome to the forge! Add heat to begin."; // Variable to store the most recent action message

// 3. Write getForgeStatus(heatValue). Return the correct status string.
function getForgeStatus(heatValue) {
    if (heatValue < 30) {
        return "Too cold";
    } else if (heatValue < 70) {
        return "Ready to forge";
    } else {
        return "Roaring fire";
    }
}

// 4. Write updateForge(). Update text and apply one status class.
function updateForge() {
    heatElement.textContent = heat;
    swordCountElement.textContent = swordsMade;
    messageElement.textContent = currentMessage;

    const status = getForgeStatus(heat);
    statusElement.textContent = status;

    // Remove existing status classes
    forgeElement.classList.remove('is-cold', 'is-ready', 'is-roaring');

    if (status === "Too cold") {
        forgeElement.classList.add('is-cold');
        forgeImageElement.src = "assets/forge-cold.svg";
        forgeImageElement.alt = "A stone forge with dark coals and no flames";
    } else if (status === "Ready to forge") {
        forgeElement.classList.add('is-ready');
        forgeImageElement.src = "assets/forge-ready.svg";
        forgeImageElement.alt = "A stone forge with a small orange fire";
    } else {
        forgeElement.classList.add('is-roaring');
        forgeImageElement.src = "assets/forge-roaring.svg";
        forgeImageElement.alt = "A stone forge with tall bright flames and sparks";
    }
}

// 5. Write resetForge(). Restore the state, message, and display.
function resetForge() {
    heat = 20; // Reset heat to initial value
    swordsMade = 0; // Reset sword count to initial value
    currentMessage = ""; // Clear feedback area per A3 specs
    updateForge(); // Update the forge display after resetting
}

// 6. Write heatForge(amount). Add heat, cap it, and update the page.
function heatForge(amount) {
    heat += amount;

    if (heat > 100) {
        heat = 100; // Cap heat at 100
    }

    currentMessage = `You stoked the forge with ${amount} heat.`;
    updateForge();
}

// 7. Write makeSword(). Handle both success and insufficient heat.
function makeSword() {
    if (heat >= 30) {
        heat -= 30; // Decrease heat by 30 when making a sword
        swordsMade += 1; // Increase sword count by 1
        currentMessage = "Success! You crafted a sword.";
        updateForge();
        return true;
    } else {
        currentMessage = "Error: More heat is needed to make a sword (requires at least 30 heat).";
        updateForge();
        return false;
    }
}

// ==========================================
// Assignment 3: Event Listeners & Controls
// ==========================================

document.addEventListener("DOMContentLoaded", () => {
    // Initialize starting state on load
    resetForge();
    document.getElementById("heat-input").value = "";

    // 1. Add Heat Handler
    // PLAN:
    // - Read value from input field.
    // - Validate if input is a finite number, non-empty, positive integer (> 0).
    // - If invalid, show error message on page and leave heat/swords unchanged.
    // - If valid, call heatForge(amount), clear input field, update UI.
    document.getElementById("add-heat-btn").addEventListener("click", () => {
        const inputEl = document.getElementById("heat-input");
        const rawValue = inputEl.value.trim();

        if (rawValue === "" || !Number.isFinite(Number(rawValue))) {
            currentMessage = "Error: Please enter a valid number.";
            messageElement.textContent = currentMessage;
            return;
        }

        const amount = Number(rawValue);

        if (amount <= 0 || !Number.isInteger(amount)) {
            currentMessage = "Error: Please enter a positive whole number.";
            messageElement.textContent = currentMessage;
            return;
        }

        heatForge(amount);
        inputEl.value = "";
    });

    // 2. Make Sword Handler
    // PLAN:
    // - Call existing makeSword() function.
    // - If heat is sufficient, it crafts the sword and updates message.
    // - If heat is too low, it displays the appropriate error message without changing counts.
    document.getElementById("make-sword-btn").addEventListener("click", () => {
        makeSword();
    });

    // 3. Reset Forge Handler
    // PLAN:
    // - Call resetForge() to restore 20 heat, 0 swords.
    // - Clear the heat input field and empty the feedback area message.
    document.getElementById("reset-btn").addEventListener("click", () => {
        resetForge();
        document.getElementById("heat-input").value = "";
    });
});