// ==UserScript==
// @name         Starry's Quick Quests
// @namespace    https://github.com/mei-src
// @version      3.6
// @description  (Last update: 11.Nov.2023) Adds links to solve each daily quest task step. Also links open in a new tab to prevent unnecessary refreshing.
// @author       mei-src
// @match        https://www.neopets.com/questlog/
// @grant        none
// @downloadURL  https://raw.githubusercontent.com/mei-src/npscripts/main/quickquests.user.js
// @updateURL    https://raw.githubusercontent.com/mei-src/npscripts/main/quickquests.user.js
// ==/UserScript==

(function() {
    'use strict';

    // == Define Task shortcuts ==
    const sqq_Dictionary = {
        'purchase item(s)': ["https://www.neopets.com/faerieland/springs.phtml", "https://www.neopets.com/objects.phtml?type=shop&obj_type=1", "https://www.neopets.com/objects.phtml?obj_type=7&type=shop"],
        'excitement': ["https://www.neopets.com/faerieland/wheel.phtml"],
        'knowledge': ["https://www.neopets.com/medieval/knowledge.phtml"],
        'mediocrity': ["https://www.neopets.com/prehistoric/mediocrity.phtml"],
        'misfortune': ["https://www.neopets.com/halloween/wheel/index.phtml"],
        'battle': ["https://www.neopets.com/dome/fight.phtml"],
        'play': ["https://www.neopets.com/games/","https://www.neopets.com/games/game.phtml?game_id=805"],
        'feed': ["https://www.neopets.com/home/index.phtml"],
        'groom': ["https://www.neopets.com/home/index.phtml"],
        'customise': ["https://www.neopets.com/customise/"],
    };


    // * Quest Log Page
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

})();