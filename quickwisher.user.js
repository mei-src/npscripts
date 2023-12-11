// ==UserScript==
// @name         Starry's Quick Wisher
// @namespace    https://github.com/mei-src
// @version      1.6
// @description  Allows you to save your wish and autoinput on page load.
// @author       mei-src
// @match        https://www.neopets.com/wishing.phtml
// @grant        none
// @downloadURL  https://raw.githubusercontent.com/mei-src/npscripts/main/quickwisher.user.js
// @updateURL    https://raw.githubusercontent.com/mei-src/npscripts/main/quickwisher.user.js  
// ==/UserScript==

(function() {
    'use strict';

    // Inject HTML
    const settingsMenu = `<style>#qw_quickWisher{display:block}#qw_wrapper:hover,#qw_wrapper:hover input,#qw_wrapper:hover label{cursor:pointer}</style>
<div id="qw_quickWisher"><div class="qw_wrapper"><input type="checkbox" id="qw_checkbox"><label for="qw_checkbox">Remember wish</label></div></div>`;
    const submitElement = document.querySelector('input[value="Make a Wish"]');
    submitElement.insertAdjacentHTML("afterend", settingsMenu);

    // Minimum NP value for donating
    const NP = 21; 

    // localStorage names
    const CHECKVALUE = "qw_checked";
    const WISHVALUE = "savedWish";

    // DOM elements
    const checkboxElement = document.querySelector("#qw_checkbox");
    const inputNPElement = document.querySelector("[name='donation']");
    const inputWishElement = document.querySelector("[name='wish']");

    // On page load
    inputNPElement.value = NP;
    if (localStorage.getItem(CHECKVALUE) === "true") {
        checkboxElement.checked = true;
        inputWishElement.value = localStorage.getItem(WISHVALUE); 
    } else {
        checkboxElement.checked = false;
    };

    // * eventListener: Save state of checkbox
    checkboxElement.addEventListener("change", function() {
        const isChecked = checkboxElement.checked;
        localStorage.setItem(CHECKVALUE, isChecked ? "true" : "false");
        if (isChecked) localStorage.setItem(WISHVALUE, inputWishElement.value);
    });

    // * eventListener: Save value of wish input
    inputWishElement.addEventListener("input", function() {
        if (localStorage.getItem(CHECKVALUE) === "true") {
            localStorage.setItem(WISHVALUE, inputWishElement.value);
        }
    });

})();
