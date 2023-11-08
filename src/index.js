console.log("Keep Going 🍊 🌊...");

import UI from './modules/UI'

//on start up checked wheather its on light mode or dark mode
const themeSelect = document.getElementById("theme-select");

themeSelect.addEventListener('change', toggleTheme);

function toggleTheme() {
    const selectedTheme = themeSelect.value;
    // change styling based on the selected theme
    document.body.className = selectedTheme;

    // remove the previous icon before adding new selected theme icon
    const existingIcon = document.querySelector('.theme i');
    if (existingIcon) {
        existingIcon.remove();
    };

    // Create a new icon based on the selected theme
    const icon = document.createElement('i');

    // Add icons based on the selected theme
    if (selectedTheme === 'dark') {
        icon.className = 'fa fa-moon-o';
    } else {
        icon.className = 'fa fa-sun-o';
    };

    // Append the new icon to the label
    document.querySelector('.theme label').appendChild(icon);

    console.log(selectedTheme)
};


// fires when the HTML document has been completely parsed, and all deferred scripts ( <script defer src="…"> and <script type="module"> ) have downloaded and executed.
// document.addEventListener('DOMContentLoaded', UI.loadHomepage)
UI.loadHomePage()

