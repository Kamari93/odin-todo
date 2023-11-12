console.log("Keep Going 🍊 🌊...");

import UI from './modules/UI'
import toggleTheme from './modules/theme';

//on start up checked whether its on light mode or dark mode
const themeSelect = document.getElementById("theme-select");

themeSelect.addEventListener('change', toggleTheme);

// fires when the HTML document has been completely parsed, and all deferred scripts ( <script defer src="…"> and <script type="module"> ) have downloaded and executed.
document.addEventListener('DOMContentLoaded', UI.loadHomePage)


