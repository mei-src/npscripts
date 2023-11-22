// ==UserScript==
// @name         Starry's Quick Quests
// @namespace    https://github.com/mei-src
// @version      2.0
// @description  Adds links in the quest log
// @author       mei-src
// @match        http://www.neopets.com/*
// @match        https://www.neopets.com/*
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    // if (window.top != window.self) return; // exclude frames

    // Style newly created elements
    const style = `
    <style>
      .sqq-link {font-style: italic;}
    </style>`;
    document.body.insertAdjacentHTML('afterbegin', style);

    // Define task shortcuts
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

    // Process of adding links 
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
    
})();