// ==UserScript==
// @name         Starry's Quick Quests
// @namespace    https://github.com/mei-src
// @version      3.7
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
    'purchase item(s)': [
        ["Healing Springs", "https://www.neopets.com/faerieland/springs.phtml"],
        ["Shops", "https://www.google.com/search?q=site:https://www.neopets.com/objects.phtml%3Ftype%3Dshop%26obj_type%3D&sca_esv=589872414&filter=0&biw=1648&bih=1024&dpr=1"]
    ],
    'excitement': [["Spin", "https://www.neopets.com/faerieland/wheel.phtml"]],
    'knowledge': [["Spin", "https://www.neopets.com/medieval/knowledge.phtml"]],
    'mediocrity': [["Spin", "https://www.neopets.com/prehistoric/mediocrity.phtml"]],
    'misfortune': [["Spin", "https://www.neopets.com/halloween/wheel/index.phtml"]],
    'battle': [["Battle", "https://www.neopets.com/dome/fight.phtml"]],
    'play': [
        ["Game Room", "https://www.neopets.com/games/"],
        ["Fashion Fever", "https://www.neopets.com/games/game.phtml?game_id=805"]
    ],
    'feed': [
        ["Feed Pet", "https://www.neopets.com/home/index.phtml"],
        ["Safety Deposit Box", "https://www.neopets.com/safetydeposit.phtml?obj_name=&category=18"],
        ["Giant Omelette", "https://www.neopets.com/prehistoric/omelette.phtml"]
    ],
    'groom': [
        ["Groom Pet", "https://www.neopets.com/home/index.phtml"], 
        ["Safety Deposit Box", "https://www.neopets.com/safetydeposit.phtml?offset=0&obj_name=&category=10"],
        ["General Store", "https://www.neopets.com/generalstore.phtml"]
    ],
    'customise': [["Customise", "https://www.neopets.com/customise/"]],
    };


    // * Quest Log Page
    const taskDescriptions = document.querySelectorAll('.ql-task-description');
    taskDescriptions.forEach(task => {
        const lowerCaseTaskText = task.textContent.toLowerCase();
        for (const k in sqq_Dictionary) {
            if (lowerCaseTaskText.includes(k.toLowerCase())) {
                for (const [text, url] of sqq_Dictionary[k]) {
                    const link = document.createElement('a');
                    link.href = url;
                    link.textContent = `🔗 ${text}`;
                    link.target = "_blank";
                    link.className = "sqq_QuestLogLink";
                    task.appendChild(link);
                }
            }
        }
    });

})();