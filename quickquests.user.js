// ==UserScript==
// @name         Starry's Quick Quests
// @namespace    https://github.com/mei-src
// @version      2.0
// @description  Adds links in the quest log
// @author       mei-src
// @match        http://www.neopets.com/*
// @match        https://www.neopets.com/*
// @grant        none
// @downloadURL  https://raw.githubusercontent.com/mei-src/npscripts/main/quickquests.js
// @updateURL    https://raw.githubusercontent.com/mei-src/npscripts/main/quickquests.js
// ==/UserScript==

(function() {
    'use strict';
    if (window.top != window.self) return; // exclude frames


    //========= User Settings, edit here =========
    const ENABLE_QUICK_RETURN = true; // Quick link back to the quest log after using a shortcut
    //============================================

    // == HTML/CSS injections ==
    const style = `
    <style>
      .sqq-link {font-style: italic;}
    </style>`;

    const returnQL = `
    <style>
        #sqq-return {
            position: fixed;
            bottom: 5px;
            right: 5px;
            z-index: 9999;
            padding: 15px;
            text-align: center;
            display: none;
            font: 16px/1.5 Arial,Helvetica,sans-serif;
            background: pink;
            border: 3px solid red;
            color: #fff;
        }
        #sqq-return.sqq-active {
            display: block;
        }
        #sqq-return button:hover {
            display: pointer;
        }
        #sqq-return img:hover {
            background: red;
        }
    </style>
    <div id="sqq-return">
        <a href="https://www.neopets.com/questlog"><img src="https://images.neopets.com/themes/h5/basic/images/quests-icon.svg?d=20210209" height="75px" alt="Return to Quest Log"></a><br>
        <button class="sqq-close-button">Close window</button>
    </div>
    `;

    // == Define Task shortcuts ==
    const sqq_Dictionary = {
        'purchase item(s)': ["https://www.neopets.com/faerieland/springs.phtml"],
        'purchase 2 item(s)': ["https://www.neopets.com/faerieland/springs.phtml", "https://www.neopets.com/objects.phtml?type=shop&obj_type=1"],
        'purchase 3 item(s)': ["https://www.neopets.com/faerieland/springs.phtml", "https://www.neopets.com/objects.phtml?type=shop&obj_type=1"],
        'excitement': ["https://www.neopets.com/faerieland/wheel.phtml"],
        'knowledge': ["https://www.neopets.com/faerieland/wheel.phtml"],
        'mediocrity': ["https://www.neopets.com/prehistoric/mediocrity.phtml"],
        'misfortune': ["https://www.neopets.com/halloween/wheel/index.phtml"],
        'battle': ["https://www.neopets.com/dome/fight.phtml"],
        'play': ["https://www.neopets.com/games/"],
        'feed': ["https://www.neopets.com/home/index.phtml"],
        'groom': ["https://www.neopets.com/home/index.phtml"],
        'customise': ["https://www.neopets.com/customise/"],
    };

    // == Add links == 
    function createLinks() {
        const taskDescriptions = document.querySelectorAll('.ql-task-description');
        // Search through Task Descriptions
        taskDescriptions.forEach(task => {
            const lowerCaseTaskText = task.textContent.toLowerCase();
            // Iterate through key phrases
            for (const k in sqq_Dictionary) {
                // If key phrase found
                if (lowerCaseTaskText.includes(k.toLowerCase())) {
                    for (const url of sqq_Dictionary[k]) {
                        const link = document.createElement('a');
                        link.href = url;
                        link.textContent = `🔗`;
                        link.target = "_blank";
                        link.className = "sqq-link";
                        task.appendChild(link);
                    }
                }
            }
        });
    };

    // == Quick Return ==
    function createListeners() {
        document.addEventListener('click', function(event) {
            if (event.target.classList.contains('sqq-link')) {
                localStorage.setItem("sqqQLActive","true");
                createReturnQL();
            }
        });
    };

    // == Quick Return Functions ==
    function createReturnQL() {
        let QLactive = localStorage.getItem("sqqQLActive");
        if (QLactive === "true") {
            if (window.location.href != 'https://www.neopets.com/questlog/') {
                // Create element
                document.body.insertAdjacentHTML('afterbegin', returnQL);
                document.querySelector("#sqq-return").classList.add("sqq-active");

                // Create listeners
                document.addEventListener('click', function(event) {
                    if (event.target.classList.contains('sqq-close-button')) {
                        sqqReturnClose();
                    }
                });
            } else {
                sqqReturnClose(); // auto close if on questlog page
            };
        };
    };

    function sqqReturnClose() {
        localStorage.setItem("sqqQLActive","false");
        document.querySelector("#sqq-return").classList.remove("sqq-active");
    };

    // == Page Load ==
    document.body.insertAdjacentHTML('afterbegin', style);
    createLinks();
    createListeners();
    if (ENABLE_QUICK_RETURN) {createReturnQL()};

})();