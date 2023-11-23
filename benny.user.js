// ==UserScript==
// @name         Bennypet
// @namespace    https://github.com/mei-src
// @version      1.0
// @description  New neopet Benny (replaces all wockys), will probably break many things
// @author       mei-src
// @match        http://www.neopets.com/*
// @match        https://www.neopets.com/*
// @grant        none
// @downloadURL  https://raw.githubusercontent.com/mei-src/npscripts/main/benny.user.js
// @updateURL    https://raw.githubusercontent.com/mei-src/npscripts/main/benny.user.js
// ==/UserScript==

(function() {
    'use strict';

    const BENNY = "https://media.discordapp.net/attachments/1117257149932916786/1159573620511744121/image0.gif";
    const BENNY_NAME = "Benny";
    const REPLACE_WORDS = [
        [/\bWocky\b/gi, `${BENNY_NAME}`],
        [/\bWockies\b/gi, `${BENNY_NAME}`]
    ];
    const REPLACE_IMAGES = [
        "Benny", // Neopet name
        "3033_25f9575031", // Customisation ID
        "Wocky","wocky", // Species name
        // Various paint colors
        "j77orcq6","s7tld393","hxdj2ccl","xonntr5f","t6v9lbtk","4j6sft94","lmddofkl","kbcrcgc3","jofgn4sx","sdmrhx4k","lxoqcztn","mrf7b5nz","wkg3sk5x","bhh5hrrw","6xwh2to5","6ch2mlc6","vrcgjm3q","zmg7d7o2","q7ckc55j","f7qbx82n","nfn9dkkv","qfzvqj2o","rtd2ot2l","4ssorlcs","nvf9c7gz","7d4o2kzh","2xc6tjts","hcdcbxzm","cqzdwotk","l65343xw","no9njtlo","zznskwh9","6m2otk7o","tvh5kdxx","koccrcm9","hjo6d9x6","6tlqkx5j","dlfm6svc","39nkvzfv","nxvkt8zr","mvsgq22v","gf3lslzz","743smd5v","zggmmc82","lrb8zz3n","smcr3tfh","tvr96hzd","j38f63jk","c7shbh2d","9zo323bm","om49hbxj","9ll97lk4","r2jbcbg8","dsfdn6q5","7z7hg363","jzjz8t57","5nl624kz","g9ontfs4","nlm3j76m","knox7q45","l8xf55x5","8gnbo844","xhbf5dbx","j7wn457z","vbr7mz88","dnr2kj4b","l7lwt9vg"
    ];

    function replaceRecursively(element, from, to) {
        if (element.childNodes.length) {
            element.childNodes.forEach(child => replaceRecursively(child, from, to));
        } else {
            const cont = element.textContent;
            if (cont) element.textContent = cont.replace(from, to);
        }
    };

    function parseText() {
        replaceRecursively(document.body, REPLACE_WORDS);
    };

    function parseImages() {
        // static images
        let images = document.querySelectorAll('img');
        images.forEach(function(img) {
            if (REPLACE_IMAGES.some(url => img.src.includes(url))) {
                img.src = BENNY;
            };
        });
        // background images - inline only right now
        let bgimages = document.querySelectorAll('[style*="background-image"]');
        bgimages.forEach(function(img) {
            // Check if the style attribute contains any of the defined terms
            if (REPLACE_IMAGES.some(url => img.style.backgroundImage.includes(url))) {
                // Replace the background image URL with a new URL
                // You can set the new background image URL as needed
                img.style.backgroundImage = `url(${BENNY})`;
            }
        });

    };

    function addHomeObserver() {
        const petCareInfoImageElement = document.getElementById("petCareInfoImage");

        if (petCareInfoImageElement) {
            const observer = new MutationObserver(mutations => {
                mutations.forEach(mutation => {
                    if (
                        mutation.attributeName === 'style' &&
                        petCareInfoImageElement.style.backgroundImage !== mutation.oldValue
                    ) {
                        parseImages();
                    }
                });
            });
    
            // Configure and start the observer
            const observerConfig = { attributes: true, attributeOldValue: true };
            observer.observe(petCareInfoImageElement, observerConfig);
        };
    };

    // TODO: Find out a consistent way to replace the picture on the customise page //
    /*
    function addCustomiseObserver() {
        const petPreview = document.querySelector('#npcma_neopetcustomise img[data-zindex="7"]');

        if (petPreview) {
            const observer = new MutationObserver(mutations => {
                mutations.forEach(mutation => {
                    if (
                        mutation.attributeName === 'src' &&
                        petPreview.src !== mutation.oldValue
                    ) {
                        parseImages();
                    }
                });
            });
    
            // Configure and start the observer
            const observerConfig = { attributes: true, attributeOldValue: true };
            observer.observe(petPreview, observerConfig);
        };
    }; 
    if (window.location.href === "https://www.neopets.com/customise") {addCustomiseObserver()};
    */

    parseText();
    parseImages();
    if (window.location.href === "https://www.neopets.com/home/") {addHomeObserver()};

})();