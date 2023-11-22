// ==UserScript==
// @name         Starry's Quick Quests
// @namespace    https://github.com/mei-src
// @version      3.1
// @description  Adds links to complete activities in the Quest Log easier. These links pop up in a new tab, stopping unnecessary page refreshing. The Quick Return box helps users go back to the Quest Log. 
// @author       mei-src
// @match        http://www.neopets.com/*
// @match        https://www.neopets.com/*
// @grant        none
// @downloadURL  https://raw.githubusercontent.com/mei-src/npscripts/main/quickquests.user.js
// @updateURL    https://raw.githubusercontent.com/mei-src/npscripts/main/quickquests.user.js
// ==/UserScript==

(function() {
    'use strict';

    if (window.top != window.self) return; // exclude frames

    // == HTML/CSS injections ==
    const sqq_QuickReturnElement = `
    <style>
        #sqq_QuickReturn {
            position: fixed;
            bottom: 5px;
            right: 5px;
            z-index: 9999;
            padding: 15px;
            text-align: center;
            display: none;
            font: 16px/1.5 Arial, Helvetica, sans-serif;
            background: pink;
            border: 3px solid red;
            color: #fff;
        }
        #sqq_QuickReturn.sqq_isActive {display: block;}
        #sqq_QuickReturn button:hover {display: pointer;}
        #sqq_QuickReturn img:hover {background: red;}
    </style>
    <div id="sqq_QuickReturn">
        <a href="https://www.neopets.com/questlog"><img src="https://images.neopets.com/themes/h5/basic/images/quests-icon.svg?d=20210209" height="75px" alt="Return to Quest Log"></a><br>
        <button class="sqq_QuickReturnClose">Close window</button>
    </div>
    `;

    // == Define Task shortcuts ==
    const sqq_Dictionary = {
        'purchase item(s)': ["https://www.neopets.com/faerieland/springs.phtml", "https://www.neopets.com/objects.phtml?type=shop&obj_type=1"],
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


    // * Quest Log Page
    function createLinks() {
        const taskDescriptions = document.querySelectorAll('.ql-task-description');
        taskDescriptions.forEach(task => {
            const lowerCaseTaskText = task.textContent.toLowerCase();
            for (const k in sqq_Dictionary) {
                if (lowerCaseTaskText.includes(k.toLowerCase())) {
                    for (const url of sqq_Dictionary[k]) {
                        const link = document.createElement('a');
                        link.href = url;
                        link.textContent = `🔗`;
                        link.target = "_blank";
                        link.className = "sqq_QuestLogLink";
                        task.appendChild(link);
                    }
                }
            }
        });
    };

    function createLinksListener() {
        document.addEventListener('click', function(event) {
            if (event.target.classList.contains('sqq_QuestLogLink')) {
                localStorage.setItem("sqq_QuickReturnState", "true");
            } 
        });
    };

    // * Outside Quest Log Page
    function createQR() {
        let isActive = localStorage.getItem("sqq_QuickReturnState");
        if (isActive === "true") {
            document.body.insertAdjacentHTML('afterbegin', sqq_QuickReturnElement);
            document.querySelector("#sqq_QuickReturn").classList.add("sqq_isActive");
        }
    };

    function createQRListener() {
        document.addEventListener('click', function(event) {
            if (event.target.classList.contains('sqq_QuickReturnClose')) {
                stopQR();
            }
        });
    };


    // * Shared
    function stopQR() {
        localStorage.setItem("sqq_QuickReturnState", "false");
        document.querySelector("#sqq_QuickReturn").classList.remove("sqq_isActive");
    };

    function sqq_isQuestLog() {
        let sqq_currentPage = window.location.href;
        return (sqq_currentPage === "https://www.neopets.com/questlog/");
    };

    // == Page Load ==
    if (sqq_isQuestLog()) {
        createLinks();
        createLinksListener();
    } else {
        createQR();
        createQRListener();
    };

})();