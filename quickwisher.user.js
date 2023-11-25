// ==UserScript==
// @name         Starry's Quick Wisher
// @namespace    https://github.com/mei-src
// @version      1.5
// @description  Allows you to save your wish and autoinput on page load.
// @author       mei-src
// @match        https://www.neopets.com/wishing.phtml
// @grant        none
// @downloadURL  https://raw.githubusercontent.com/mei-src/npscripts/main/quickwisher.user.js
// @updateURL    https://raw.githubusercontent.com/mei-src/npscripts/main/quickwisher.user.js  
// ==/UserScript==

(function() {
    'use strict';
    // Minimum NP value for donating
    const NP = 21; 

    // localStorage names
    const CHECKVALUE = "qw_checked";
    const WISHVALUE = "savedWish";

    // DOM elements
    const checkboxElement = document.querySelector("#qw_checkbox");
    const inputNPElement = document.querySelector("[name='donation']");
    const inputWishElement = document.querySelector("[name='wish']");
    const submitElement = document.querySelector('input[value="Make a Wish"]');

    // Injected HTML
    const settingsMenu = `
        <style>
            #qw_quickWisher:hover {cursor:pointer};
        </style>

        <div id="qw_quickWisher">
            <input type="checkbox" id="qw_checkbox">    
            <label for="qw_checkbox">📌</label>
        </div>
    `;

    // On Page Load, set values if checked
    submitElement.insertAdjacentHTML("afterend", settingsMenu);
    if (localStorage.getItem(CHECKVALUE) === "true") {
        checkboxElement.checked = true;
        inputNPElement.val(NP);
        inputWishElement.val(localStorage.getItem(WISHVALUE)); 
    } else {
        checkboxElement.checked = false;
    };

    // Save state of checkbox
    checkboxElement.addEventListener("change", function() {
        const isChecked = checkboxElement.checked;
        localStorage.setItem(CHECKVALUE, isChecked ? "true" : "false");
        if (isChecked) localStorage.setItem(WISHVALUE, inputWishElement.value);
    });

    // Save value of wish input
    inputWishElement.addEventListener("input", function() {
        if (localStorage.getItem(CHECKVALUE) === "true") {
            localStorage.setItem(WISHVALUE, inputWishElement.value);
        }
    });

})();
