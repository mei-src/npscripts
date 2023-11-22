// ==UserScript==
// @name         Starry's Universal Neopets Sidebar
// @namespace    https://github.com/mei-src
// @version      2.0
// @description  Adds a useful sidebar to Neopets for consistent and quick navigation.
// @author       mei-src
// @match        http://www.neopets.com/*
// @match        https://www.neopets.com/*
// @match        https://ncmall.neopets.com/mall/*
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    if (window.top != window.self)  //don't run on frames or iframes
    return;

    // Style
    const sidebarCSS = `
    <style>

    /* Main */
    #sb-main {
        position: fixed;
        top: 0;
        left: -250px; /* Load out of view */
        width: 250px;
        background: #24273a;
        color: #cdd6f4;
        transition-duration: 0.05s;
        /* Defaults to override */
        font: 14px/1.25 Roboto,Arial,Helvetica,sans-serif; /* Classic mostly */
        text-align: left; /* Classic: center default */
        /* maybe keep once we work on the option to make sidebar float */
        z-index: 9999; /* Classic: max 9000 z-index for nav */
    }

    #sb-main.sb-open {
        box-shadow: 4px 2px 16px -3px rgba(0,0,0,0.5);
        left: 0;
    }

    /* === Site Modifications on Open State === */
    body.sb-open {
        margin-left: 250px;
        width: calc(100vw - 250px);
        overflow-x: hidden;
    }

    body.sb-open .nav-top-grid__2020 {
        width: calc(100% - 250px);
    }

    body.sb-open .nav-profile-dropdown__2020 {
        left: 250px;
    }

    body.sb-open .navsub-left__2020 {
        left: 370px !important;
    }

    /* === End Site Modifications === */



    .sb-container {
        display: flex;
        flex-direction: column;
        height: 100vh;
    }

    .sb-box {
        margin: 15px 25px;
    }

    /* Top half */
    #sb-top {
        text-align: center;
        flex: 0 0 auto;
    }
    /* Search Box */
    #sb-bigsearch {
        background: #1e1e2e;
        height: 50px;
        line-height: 3;
    }

    /* Categories */
    #sb-categories ul {
        display: flex;
        list-style-type: none;
        margin: 0;
        padding: 0;
    }

    #sb-categories li {
        flex: 1;
        text-align: center;
    }

    #sb-categories li a {
        display: block;
        padding: 10px;
        opacity: 0.5;
        border-bottom: 3px solid transparent;
    }

    #sb-categories .sb-active {
        background: #cdd6f4;
        border-bottom: 3px solid #cdd6f4;
        opacity: 1;
    }

    /* Bottom Half */
    #sb-bottom {
        flex: 1;
        overflow: hidden;
        /* overflow: auto;
        scrollbar-width: thin; */
    }

    .sb-bottom-category {
        overflow: auto;
        height: 100%;
        scrollbar-width: none;
        scrollbar-color: transparent;
        display: none;
    }

    .sb-bottom-category.sb-active {
        display: block;
    }

    .sb-bottom-category:hover {
        scrollbar-width: thin;
    }

    /* Styling */
    #sb-main h2 {
        margin: 10px 0;
        font-size: 21px; /* Reduced size for more screen estate */
    }

    #sb-main h2:hover {
        cursor: pointer;
    }

    #sb-main h2:before {
        content: "-";
        font-family:'Courier New', Courier, monospace;
        font-size: 24px;
        position: relative;
        padding: 3px 8px 3px 3px;
    }

    #sb-main .closed h2:before {
        content: "+";
    }

    #sb-main ul {
        padding: 0;
        margin: 0;
    }

    #sb-main ul ul {
        padding-left: 15px;
    }

    #sb-main li {
        list-style-type: none;
        font-weight: bold;
        margin: 0;
        padding: 0;
    }

    #sb-main .closed li, #sb-main .closed ul {
        display: none;
    }

    #sb-main h3 {
        font-style: italic;
    }

    #sb-main a {
        color: #89b4fa;
        text-decoration: none;
    }

    #sb-main a:active {
        color: #a4c7ff;
        background: #575a6f;
    }

    #sb-main a:visited {
        color: #89b4fa;
    }

    #sb-main a:hover {
        color: #a4c7ff;
        background: #575a6f;
    }

    #sb-control {
        margin-left: 90px;
        display: block;
        font-size: 12px;
    }

    /* Tags */

    .sb-tag {
        font-size: 11px;
        font-family: 'Courier New', Courier, monospace;
        color: #1e1e2e;
        padding: 2px 3px;
        border-radius: 3px;
    }
    .sb-tag.sb-countdown { background: #f28ba8; }
    .sb-tag.sb-ago { color: #f28ba8; }
    .sb-tag.sb-warn { color: #f9e2af; }
    .sb-tag.sb-count { background: #a6e3a1; }
    .sb-tag.sb-fresh { background: #89b4fa; }
    .sb-tag.sb-ref { color: #898ea6; }
    a.sb-tag { padding: 0; border-bottom: 2px dotted #89b4fa; border-radius: 0; position: relative; top: -3px;}

    .sb-button { font-weight: 600; }
    </style>
    `;

    // HTML Sidebar data
    // just using prototype html now
    // todo: 
    //  - modular folders and links
    //  - sorting / custom sorting
    //  - persistent timer tracking
    //  - categories: timers / toolbox, settings
    //  - quicksearch with fast navigation & keywords
    const sidebarHTML = `
    <nav id="sb-main">
        <div class="sb-container">
            <div id="sb-top">
                <!-- Placeholder -->
                <a href="https://www.neopets.com/home/" class="sb-button"><div id="sb-bigsearch">
                        ♡ Interact with pets ♡
                    </div></a>
            </div>
            <div id="sb-categories">
                <ul>
                    <!-- name matches to #id of div to display -->
                    <li><a name="sb-cat-folders" id="sb-tab-folders" class="sb-tab sb-active">📁</a></li>
                    <li><a name="sb-cat-dailies" id="sb-tab-dailies" class="sb-tab">📅</a></li>
                    <li><a name="sb-cat-locales" id="sb-tab-locales" class="sb-tab">🌍</a></li>
                </ul>
            </div>
            <div id="sb-bottom">

                <!-- Category: Folders -->
                <div id="sb-cat-folders" class="sb-bottom-category sb-active">
                    <div class="sb-box" id="sb-folders">
                        <ul class="sb-folder" id="sb-folder-account">
                            <h2 class="sbFolderName">Account</h2>
                            <li><a href="https://www.neopets.com/myaccount.phtml">Control Panel</a></li>
                            <li><a href="https://www.neopets.com/preferences.phtml">Settings</a></li>
                            <li><a href="https://www.neopets.com/neomessages.phtml">Neomail</a></li>
                            <li><a href="https://www.neopets.com/neofriends.phtml">Neofriends</a></li>
                            <li><a href="https://www.neopets.com/settings/neoboards/">Collected Avatars</a> <a href="https://www.jellyneo.net/?go=avatars" class="sb-tag">Guide</a></li>
                            <li><a href="https://www.neopets.com/refer/index.phtml">Referrals</a></li>
                            <li><a href="https://www.neopets.com/space/warehouse/prizecodes.phtml">Redeem Code</a></li>
                        </ul>
                        <ul class="sb-folder" id="sb-folder-neopet">
                            <h2 class="sbFolderName">Pets</h2>
                            <li><a href="https://www.neopets.com/quickref.phtml">Quick Ref</a></li>
                            <li><a href="https://www.neopets.com/customise/">Customize Pet</a> <a href="https://impress.openneo.net/" class="sb-tag">DtI Sim</a></li>
                            <li><a href="https://www.neopets.com/addpet.phtml">Create Pet</a></li>
                            <li><a href="https://www.neopets.com/pound">Adoption</a></li>
                            <li><a href="https://www.neopets.com/neolodge.phtml">Neolodge</a></li>
                            <li><a href="https://www.neopets.com/pool">Rainbow Pool</a> <a href="https://wardrobe.jellyneo.net/rainbow-pool/" class="sb-tag">JN Previews</a></li>
                            <li><a href="https://www.neopets.com/magma/pool.phtml">Magma Pool</a> <span class="sb-tag sb-countdown">7d</span></li>
                        </ul>
                        <ul class="sb-folder" id="sb-folder-inventory">
                            <h2 class="sbFolderName">Inventory</h2>
                            <li><a href="https://www.neopets.com/inventory.phtml">Overview</a></li>
                            <li><a href="https://www.neopets.com/quickstock.phtml">Quickstock</a></li>
                            <li><a href="https://www.neopets.com/items/transfer_list.phtml">Transfer Log</a></li>
                            <li><a href="https://www.neopets.com/closet.phtml">Closet</a></li>
                            <li><a href="https://www.neopets.com/safetydeposit.phtml">Safety Deposit Box</a></li>
                            <li><a href="https://www.neopets.com/neohome/shed">Neohome Shed</a></li>
                            <li><a href="https://www.neopets.com/gallery/index.phtml?view=all">My Gallery</a></li>
                            <li><a href="https://www.neopets.com/stamps.phtml?type=album">My Stamps</a></li>
                            <li><a href="https://www.neopets.com/tcg/album.phtml">My TCG</a></li>
                            <li><a href="https://www.neopets.com/ncma/">My NC Items</a></li>
                            <li><a href="https://items.jellyneo.net/">JN Item Database</a></li>
                            <li><a href="https://items.jellyneo.net/wishlists/">JN Wishlists</a></li>
                        </ul>
                        <ul class="sb-folder" id="sb-folder-games">
                            <h2 class="sbFolderName">Games</h2>
                            <li><a href="https://www.neopets.com/dome/">Battledome</a></li>
                            <!-- <li><a href="https://www.neopets.com/games/defenders.phtml">Defenders of Neopia</a></li>
                            <li><a href="https://www.neopets.com/altador/colosseum/index.phtml">Altador Cup</a></li>
                            -->
                            <li><a href="https://www.neopets.com/games/">Game Room</a></li>
                            <!--
                            <li><a href="https://www.neopets.com/games/favourites.phtml">Favorite Games</a></li>
                            <li><a href="https://www.neopets.com/games/category.phtml?sortby=pop">Popular Games</a></li>
                            <li><a href="https://www.neopets.com/games/featuredgame/">Featured Game</a></li>
                            -->
                            <li><a href="https://www.neopets.com/games/neoquest/neoquest.phtml">Neoquest I</a> <a href="https://neoquest.guide/" class="sb-tag">Guide</a></li>
                            <li><a href="https://www.neopets.com/games/nq2/index.phtml">Neoquest II</a> <a href="https://www.jellyneo.net/?go=neoquest2" class="sb-tag">Guide</a></li>
                            <li><a href="https://www.jellyneo.net/?go=links">JellyNeo Game Guides</a></li>
                        </ul>
                        <ul class="sb-folder" id="sb-folder-explore">
                            <h2 class="sbFolderName">Explore</h2>
                            <li><a href="https://www.neopets.com/explore.phtml">World Map</a></li>
                            <li><a href="https://www.neopets.com/petcentral.phtml">Pet Central</a></li>
                            <li><a href="https://www.neopets.com/calendar.phtml">Calendar</a></li>
                            <li><a href="https://www.neopets.com/neopedia.phtml">Neopedia</a></li>
                            <li><a href="https://www.neopets.com/help/tutorial/index.phtml">Tutorial</a></li>
                        </ul>
                        <ul class="sb-folder" id="sb-folder-community">
                            <h2 class="sbFolderName">Community</h2>
                            <li><a href="https://www.neopets.com/community/">Community Central</a></li>
                            <li><a href="https://www.neopets.com/nf.phtml">News</a></li>
                            <li><a href="https://www.neopets.com/ntimes/index.phtml">Neopian Times</a></li>
                            <li><a href="https://www.neopets.com/contests.phtml">Spotlights</a></li>
                            <li><a href="https://www.neopets.com/neoboards/index.phtml">Neoboards</a></li>
                            <li><a href="https://www.neopets.com/noticeboard.phtml">Notice Board</a> (Broken)</li>
                            <li><a href="https://www.neopets.com/guilds/guild.phtml?id=">My Guild</a></li>
                            <li><a href="https://www.neopets.com/guilds/index.phtml">Guild Directory</a></li>
                        </ul>
                        <ul class="sb-folder" id="sb-folder-shop">
                            <h2 class="sbFolderName">Market</h2>
                            <li><a href="https://www.neopets.com/shops/wizard.phtml">Shop Wizard</a></li>
                            <li><a href="https://www.neopets.com/market.phtml?type=your">My Shop</a></li>
                            <li><a href="https://www.neopets.com/bank.phtml">Bank</a></li>
                            <li><a href="https://www.neopets.com/stockmarket.phtml?type=portfolio">Stock Portfolio</a></li>
                            <li><a href="https://www.neopets.com/auctions.phtml">Auctions</a></li>
                            <li><a href="https://www.neopets.com/island/tradingpost.phtml">Trading Post</a></li>
                            <li><a href="https://www.jellyneo.net/?go=shopsdirectory">JellyNeo Shops Directory</a></li>
                            <li>Player Marketplace
                                <ul>
                                    <li><a href="https://www.neopets.com/market.phtml?type=list&world=0">Neopia Central</a></li>
                                    <li><a href="https://www.neopets.com/market.phtml?type=list&world=1">Mystery Island</a></li>
                                    <li><a href="https://www.neopets.com/market.phtml?type=list&world=3">Haunted Marketplace</a></li>
                                </ul></li>
                            <li>Special Stores
                                <ul>
                                    <li><a href="https://www.neopets.com/pirates/dubloonomatic.phtml">Dubloon-o-Matic</a></li>
                                    <li><a href="https://www.neopets.com/pirates/smugglerscove.phtml">Smuggler's Cove</a></li>
                                    <li><a href="https://www.neopets.com/winter/igloo.phtml">Igloo Garage Sale</a></li>
                                    <li><a href="https://www.neopets.com/winter/shopofmystery.phtml">Tarla's Shop of Mysteries</a></li>
                                    <li><a href="https://www.neopets.com/faerieland/hiddentower938.phtml">Hidden Tower</a></li>
                                    <li><a href="https://www.neopets.com/moon/neocola.phtml">Neocola Machine</a></li>
                                    <li><a href="https://www.neopets.com/magma/workshop.phtml">Tangor's Workshop</a></li>
                                    <li><a href="https://www.neopets.com/objects.phtml?type=shop&obj_type=111">Cog's Togs</a></li>
                                </ul>
                            </li>
                        </ul>
                        <ul class="sb-folder" id="sb-folder-ncmall">
                            <h2 class="sbFolderName">NC Mall</h2>
                            <li><a href="http://ncmall.neopets.com/mall/shop.phtml">NC Mall</a></li>
                            <li><a href="http://ncmall.neopets.com/mall/fortune/">Fortune Cookies</a></li>
                            <li><a href="https://secure.nc.neopets.com/get-neocash">Buy NC</a></li>
                            <li><a href="https://secure.nc.neopets.com/redeemnc">Redeem NC Cards</a></li>
                            <li><a href="https://neopetsshop.com/">Merch Shop</a></li>
                            <li><a href="https://www.neopets.com/shopping/index.phtml">Merch Partners</a></li>
                        </ul>
                        <ul class="sb-folder" id="sb-folder-premium">
                            <h2 class="sbFolderName">Premium</h2>
                            <li><a href="https://secure.nc.neopets.com/auth/login?c=/managemembership/">Manage Membership</a></li>
                            <li><a href="https://www.neopets.com/premium/">Portal</a></li>
                            <li><a onclick="toggleSSW__2020()">SSW</a></li>
                            <li><a href="https://www.neopets.com/journal/">My Journal</a></li>
                            <li><a href="https://www.neopets.com/games/neodeck/index.phtml?show=prem">Premium TCG</a></li>
                            <li><a href="https://www.neopets.com/premium/sc/">SpaceFaerie Scratchcards</a></li>
                        </ul>
                    </div>
                </div>

                <!-- Category: Dailies -->
                <div id="sb-cat-dailies" class="sb-bottom-category">
                    <div class="sb-box sb-dailies">
                        <ul class="sb-folder" id="sb-folder-freebies">
                            <h2 class="sbFolderName">Freebies</h2>
                            <ul>
                                <li id="sb-adventcalendar"><a href="https://www.neopets.com/winter/adventcalendar.phtml">Advent Calendar Day 8</a></li>
                                <li><a href="https://www.neopets.com/prehistoric/omelette.phtml">Giant Omelette</a></li>
                                <li><a href="https://www.neopets.com/jelly/jelly.phtml">Giant Jelly</a></li>
                                <li><a href="https://www.neopets.com/moviecentral/index.phtml">Movie Central</a></li>
                                <li><a href="https://www.neopets.com/soupkitchen.phtml">Soup Kitchen</a></li>
                                <li><a href="https://www.neopets.com/donations.phtml">Money Tree</a></li>
                                <li><a href="https://www.neopets.com/medieval/rubbishdump.phtml">Rubbish Dump</a></li>
                                <li><a href="https://www.neopets.com/thriftshoppe/index.phtml">Second-Hand Shoppe</a></li>
                                <li><a href="https://www.neopets.com/wishing.phtml">The Wishing Well</a></li>
                                <li><a href="https://www.neopets.com/faerieland/springs.phtml">Healing Springs</a> <span class="sb-tag sb-countdown">30m</span></li>
                            </ul>
                        </ul>
                        <ul class="sb-folder" id="sb-folder-expeditions">
                            <h2 class="sbFolderName">Expeditions</h2>
                            <ul>
                                <li><a href="https://www.neopets.com/halloween/gravedanger/">Grave Danger</a> <span class="sb-tag sb-countdown">8h</span></li>
                                <li><a href="https://www.neopets.com/pirates/academy.phtml?type=courses">Swashbuckling Academy</a> <span class="sb-tag sb-countdown">30m</span></li>
                                <li><a href="https://www.neopets.com/island/training.phtml?type=courses">Mystery Island Training</a> <span class="sb-tag sb-countdown">30m</span></li>
                                <li><a href="https://www.neopets.com/island/fight_training.phtml?type=courses">Secret Ninja Training</a> <span class="sb-tag sb-countdown">30m</span></li>
                            </ul>
                        </ul>
                        <ul class="sb-folder" id="sb-folder-unlocks">
                            <h2 class="sbFolderName">Unlocks</h2>
                            <ul>
                                <li><a href="https://www.neopets.com/pirates/forgottenshore.phtml">Forgotten Shore</a></li>
                                <li><a href="https://www.neopets.com/lab.phtml">Lab Ray</a></li>
                                <li><a href="https://www.neopets.com/petpetlab.phtml">Petpet Lab Ray</a></li>
                                <li><a href="https://www.neopets.com/altador/hallofheroes.phtml">Council Chamber</a></li>
                                <li><a href="https://www.neopets.com/magma/darkcave.phtml">Dark Cave</a></li>
                            </ul>
                        </ul>
                        <ul class="sb-folder" id="sb-folder-timed">
                            <h2 class="sbFolderName">Timed</h2>
                            <ul>
                                <li><a href="https://www.neopets.com/worlds/deadlydice.phtml">Deadly Dice</a> <span class="sb-tag sb-warn">⚠</span><span class="sb-tag sb-ref">12am</span></li>
                                <li><a href="https://www.neopets.com/winter/snowager.phtml">Snowager</a> <span class="sb-tag sb-ref">6am, 2pm, 10pm</span></li>
                                <li><a href="https://www.neopets.com/medieval/turmaculus.phtml">Turmaculus</a> <a class="sb-tag sb-link" href="https://www.neopets.com/~Brownhownd">Schedule</a></li>
                            </ul>
                        </ul>
                        <ul class="sb-folder" id="sb-folder-quests">
                            <h2 class="sbFolderName">Quests</h2>
                            <ul>
                                <li><a href="https://www.neopets.com/questlog/">Quest Log</a></li>
                                <li><a href="https://www.neopets.com/quests.phtml">Faerie Quests</a></li>
                                <li><a href="https://www.neopets.com/faerieland/employ/employment.phtml">Employment Agency</a></li>
                                <li><a href="https://www.neopets.com/space/coincidence.phtml">The Coincidence</a></li>
                                <li><a href="https://www.neopets.com/halloween/braintree.phtml">Brain Tree</a> <span class="sb-tag sb-countdown">24h</span></li>
                                <li><a href="https://www.neopets.com/halloween/esophagor.phtml">Esophagor's Quests</a></li>
                                <li><a href="https://www.neopets.com/medieval/earthfaerie.phtml?type=end&obj_given=18277&f=1&off=596778">Illusen's Glade</a> <span class="sb-tag sb-countdown">12h</span></li>
                                <li><a href="https://www.neopets.com/faerieland/darkfaerie.phtml">Jhudora's Bluff</a> <span class="sb-tag sb-countdown">12h</span></li>
                                <li><a href="https://www.neopets.com/halloween/witchtower.phtml">Edna's Quests</a> <span class="sb-tag sb-count">10</span></li>
                                <li><a href="https://www.neopets.com/winter/snowfaerie.phtml">Taelia's Quests</a> <span class="sb-tag sb-count">10</span></li>
                                <li><a href="https://www.neopets.com/island/kitchen.phtml">Kitchen Quests</a> <span class="sb-tag sb-count">10</span></li>
                            </ul>
                        </ul>
                        <ul class="sb-folder" id="sb-folder-moneymaking">
                            <h2 class="sbFolderName">Moneymaking</h2>
                            <ul>
                                <li><a href="https://www.neopets.com/market.phtml?type=till">Shop Till</a></li>
                                <li><a href="https://www.neopets.com/bank.phtml">Bank Interest</a></li>
                                <li><a href="https://www.neopets.com/stockmarket.phtml?type=portfolio">Stocks</a>: <a href="https://www.neopets.com/stockmarket.phtml?type=buy">Buy</a> / <a href="https://www.neopets.com/stockmarket.phtml?type=list&full=true">List</a></li>
                                <li><a href="">FC</a>: <a href="https://www.neopets.com/pirates/foodclub.phtml?type=bet">Place</a> / <a href="https://www.neopets.com/pirates/foodclub.phtml?type=current_bets">Current </a> / <a href="https://www.neopets.com/pirates/foodclub.phtml?type=collect">Collect</a> / <a href="https://www.neopets.com/pirates/foodclub.phtml?type=history">History</a> <a href="https://www.neopets.com/~Shrmsh" class="sb-tag">Nsheng</a> <a href="https://neofood.club/" class="sb-tag">NFC</a></li>
                            </ul>
                        </ul>
                        <ul class="sb-folder" id="sb-folder-puzzles">
                            <h2 class="sbFolderName">Puzzles</h2>
                            <ul>
                                <li><a href="https://www.neopets.com/community/index.phtml">Daily Puzzle</a> <a class="sb-tag sb-link" href="https://www.jellyneo.net/?go=dailypuzzle">JN</a></li>
                                <li><a href="https://www.neopets.com/games/crossword/index.phtml">Faerie Crossword</a> <a class="sb-tag sb-link" href="https://www.jellyneo.net/?go=faerie_crossword">JN</a></li>
                                <li><a href="https://www.neopets.com/medieval/grumpyking.phtml">Grumpy Old King</a></li>
                                <li><a href="https://www.neopets.com/medieval/wiseking.phtml">Wise Old King</a></li>
                                <li><a href="https://www.neopets.com/medieval/guessmarrow.phtml">Guess the Weight</a></li>
                                <li><a href="https://www.neopets.com/medieval/potatocounter.phtml">Potato Counter</a></li>
                                <li><a href="https://www.neopets.com/shenkuu/lunar/">Lunar Temple</a></li>
                                <li><a href="https://www.neopets.com/shenkuu/neggcave/">Mysterious Negg Cave</a></li>
                            </ul>
                        </ul>
                        <ul class="sb-folder" id="sb-folder-exploration">
                            <h2 class="sbFolderName">Exploration</h2>
                            <ul>
                                <li><a href="https://www.neopets.com/trudys_surprise.phtml">Trudy's Surprise</a></li>
                                <li><a href="https://www.neopets.com/pirates/anchormanagement.phtml">Anchor Management</a></li>
                                <li><a href="https://www.neopets.com/desert/shrine.phtml">Coltzan's Shrine</a> <span class="sb-tag sb-countdown">13h</span></li>
                                <li><a href="https://www.neopets.com/desert/fruit/index.phtml">Fruit Machine</a></li>
                                <li><a href="https://www.neopets.com/moon/meteor.phtml">Meteor</a> <span class="sb-tag sb-countdown">60m</span></li>
                                <li><a href="https://www.neopets.com/faerieland/tdmbgpop.phtml">Blue Plushie</a></li>
                                <li><a href="https://www.neopets.com/island/tombola.phtml">Tombola</a></li>
                                <li><a href="https://www.neopets.com/worlds/geraptiku/tomb.phtml">Deserted Tomb</a></li>
                                <li><a href="https://www.neopets.com/worlds/kiko/kpop/">Kiko Pop</a></li>
                                <li><a href="http://ncmall.neopets.com/games/giveaway/process_giveaway.phtml">Qasalan Expellibox</a></li>
                                <li><a href="https://www.neopets.com/shop_of_offers.phtml?slorg_payout=yes">Rich Slorg</a></li>
                                <li><a href="https://www.neopets.com/halloween/applebobbing.phtml">Apple Bobbing</a> <span class="sb-tag sb-warn">⚠</span></li>
                                <li><a href="https://www.neopets.com/magma/quarry.phtml">Moltara Quarry</a></li>
                                <li><a href="https://www.neopets.com/medieval/symolhole.phtml">Symol Hole</a> <a href="https://www.jellyneo.net/?go=symolhole" class="sb-tag">Schedule</a></li>
                                <li><a href="https://www.neopets.com/freebies/tarlastoolbar.phtml">Tarla</a></li>
                                <li><a href="https://www.neopets.com/water/fishing.phtml">Ye Olde Fishing</a> <span class="sb-tag sb-ago">1h+</span></li>
                            </ul>
                        </ul>
                        <ul class="sb-folder" id="sb-folder-nprequired">
                            <h2 class="sbFolderName">NP Required</h2>
                            <ul>
                                <li>Wheels
                                    <ul>
                                        <li><a href="https://www.neopets.com/faerieland/wheel.phtml">Excitement</a> <span class="sb-tag sb-warn">⚠</span></li>
                                        <li><a href="https://www.neopets.com/desert/extravagance.phtml">Extravagance</a></li>
                                        <li><a href="https://www.neopets.com/medieval/knowledge.phtml">Knowledge</a></li>
                                        <li><a href="https://www.neopets.com/prehistoric/mediocrity.phtml">Mediocrity</a></li>
                                        <li><a href="https://www.neopets.com/halloween/wheel/index.phtml">Misfortune</a> <span class="sb-tag sb-warn">⚠</span></li>
                                        <li><a href="https://www.neopets.com/prehistoric/monotony/monotony.phtml">Monotony</a></li>
                                    </ul>
                                </li>
                                <li>Scratchcards
                                    <ul>
                                        <li><a href="https://www.neopets.com/halloween/scratch.phtml">Haunted Fairgrounds</a> <span class="sb-tag sb-countdown">2h</span></li>
                                        <li><a href="https://www.neopets.com/desert/sc/kiosk.phtml">Desert Kiosk</a> <span class="sb-tag sb-countdown">4h</span></li>
                                        <li><a href="https://www.neopets.com/winter/kiosk.phtml">Ice Caves</a> <span class="sb-tag sb-countdown">6h</span></li>
                                    </ul>
                                </li>
                                <li>Multis
                                    <ul>
                                        <li><a href="https://www.neopets.com/pirates/buriedtreasure/index.phtml">Buried Treasure</a> <span class="sb-tag sb-countdown">3h</span></li>
                                        <li><a href="https://www.neopets.com/faerieland/poogleracing.phtml">Poogle Racing</a> <span class="sb-tag sb-countdown">15h</span></li>
                                        <li><a href="https://www.neopets.com/medieval/cheeseroller.phtml">Cheeseroller</a> <span class="sb-tag sb-count">3</span></li>
                                        <li><a href="https://www.neopets.com/medieval/turdleracing.phtml">Turdle Racing</a> <span class="sb-tag sb-count">3</span></li>
                                        <li><a href="https://www.neopets.com/halloween/bagatelle.phtml">Bagatelle</a> <span class="sb-tag sb-count">20</span></li>
                                        <li><a href="https://www.neopets.com/halloween/coconutshy.phtml">Coconut Shy</a> <span class="sb-tag sb-count">20</span></li>
                                        <li><a href="https://www.neopets.com/halloween/corkgun.phtml">Cork Gun Gallery</a> <span class="sb-tag sb-count">20</span></li>
                                        <li><a href="https://www.neopets.com/halloween/strtest/index.phtml">Test Your Strength</a> <span class="sb-tag sb-countdown">6h</span></li>
                                    </ul>
                                </li>
                                <li><a href="https://www.neopets.com/games/lottery.phtml">Neopian Lottery</a></li>
                                <li><a href="https://www.neopets.com/faerieland/caverns/index.phtml">Faerie Caverns</a></li>
                                <li><a href="https://www.neopets.com/space/strangelever.phtml">Lever of Doom</a></li>
                                <li><a href="https://www.neopets.com/medieval/pickyourown_index.phtml">Pick Your Own</a></li>
                                <li><a href="https://www.neopets.com/prehistoric/ticketbooth.phtml">Tyrannian Ticket Booth</a></li>
                            </ul>
                        </ul>
                    </div>
                </div>

                <!-- Category: Locales -->
                <div id="sb-cat-locales" class="sb-bottom-category">
                    <div class="sb-box">
                        <ul class="sb-folder" id="sb-folder-locations">
                            <h2 class="sbFolderName">Locations</h2>
                            <li><a href="https://www.neopets.com/altador/index.phtml">Altador</a></li>
                            <li><a href="https://www.neopets.com/medieval/brightvale.phtml">Brightvale</a></li>
                            <li><a href="https://www.neopets.com/faerieland/index.phtml">Faerieland</a></li>
                            <li><a href="https://www.neopets.com/faerieland/faeriecity.phtml">Faerie City</a></li>
                            <li><a href="https://www.neopets.com/halloween/index.phtml">Haunted Woods</a></li>
                            <li><a href="https://www.neopets.com/halloween/index_fair.phtml">The Deserted Fairground</a></li>
                            <li><a href="https://www.neopets.com/halloween/neovia.phtml">Neovia</a></li>
                            <li><a href="https://www.neopets.com/worlds/index_kikolake.phtml">Kiko Lake</a></li>
                            <li><a href="https://www.neopets.com/pirates/index.phtml">Krawk Island</a></li>
                            <li><a href="https://www.neopets.com/pirates/warfwharf.phtml">Warf Wharf</a></li>
                            <li><a href="https://www.neopets.com/moon/index.phtml">Kreludor</a></li>
                            <li><a href="https://www.neopets.com/tropical/index.phtml">Lutari Island</a></li>
                            <li><a href="https://www.neopets.com/water/index.phtml">Maraqua</a></li>
                            <li><a href="https://www.neopets.com/water/index_ruins.phtml">Maraquan Ruins</a></li>
                            <li><a href="https://www.neopets.com/medieval/index.phtml">Meridell</a></li>
                            <li><a href="https://www.neopets.com/medieval/index_castle.phtml">Meridell Castle</a></li>
                            <li><a href="https://www.neopets.com/magma/index.phtml">Moltara</a></li>
                            <li><a href="https://www.neopets.com/magma/caves.phtml">Moltara Caves</a></li>
                            <li><a href="https://www.neopets.com/island/index.phtml">Mystery Island</a></li>
                            <li><a href="https://www.neopets.com/worlds/index_geraptiku.phtml">The Lost City of Geraptiku</a></li>
                            <li><a href="https://www.neopets.com/objects.phtml">Neopia Central</a></li>
                            <li><a href="https://www.neopets.com/market_bazaar.phtml">Neopian Bazaar</a></li>
                            <li><a href="https://www.neopets.com/market_plaza.phtml">Neopian Plaza</a></li>
                            <li><a href="https://www.neopets.com/worlds/index_roo.phtml">Roo Island</a></li>
                            <li><a href="https://www.neopets.com/shenkuu/index.phtml">Shenkuu</a></li>
                            <li><a href="https://www.neopets.com/winter/index.phtml">Terror Mountain</a></li>
                            <li><a href="https://www.neopets.com/winter/terrormountain.phtml">Top of Terror Mountain</a></li>
                            <li><a href="https://www.neopets.com/winter/icecaves.phtml">Ice Caves</a></li>
                            <li><a href="https://www.neopets.com/desert/index.phtml">The Lost Desert</a></li>
                            <li><a href="https://www.neopets.com/desert/sakhmet.phtml">The City of Sakhmet</a></li>
                            <li><a href="https://www.neopets.com/desert/qasala.phtml">The City of Qasala</a></li>
                            <li><a href="https://www.neopets.com/prehistoric/index.phtml">Tyrannia</a></li>
                            <li><a href="https://www.neopets.com/prehistoric/plateau.phtml">Tyrannian Plateau</a></li>
                            <li><a href="https://www.neopets.com/space/index.phtml">Virtupets Space Station</a></li>
                            <li><a href="https://www.neopets.com/space/hangar.phtml">Virtupets: Hangar</a></li>
                            <li><a href="https://www.neopets.com/space/recreation.phtml">Virtupets: Recreation Dock</a></li>
                        </ul>
                    </div>
                </div>

                <!-- Category: Alerts -->
                <div id="sb-cat-alerts" class="sb-bottom-category">
                    - WIP -
                </div>

                <!-- Category: Settings -->
                <div id="sb-cat-settings" class="sb-bottom-category">
                    - WIP -
                </div>
            </div>
        </div>
    </nav>
    `;

    // Inject the Sidebar HTML
    document.body.insertAdjacentHTML('afterbegin', sidebarCSS);
    document.body.insertAdjacentHTML('afterbegin', sidebarHTML);

    let sbElement = document.getElementById('sb-main');
    // Open sidebar with ` hotkey
    document.addEventListener('keyup', function(event) {
        if (event.key === '`') {
            // Toggle visibility
            sbElement.classList.toggle('sb-open');
            // let sbStyle = window.getComputedStyle(sbElement);
            // let sbLeft = parseInt(sbStyle.left);
            // sbElement.style.left = (sbLeft === -300) ? '0' : '-300px';
            if (sbElement.classList.contains('sb-open')) {
                localStorage.setItem('sb_Sidebar_State','open');
                document.body.classList.add('sb-open');
            } else {
                localStorage.setItem('sb_Sidebar_State','closed');
                document.body.classList.remove('sb-open');
            }   
        }
    });
    // Load Sidebar if previously opened
    let sbElementState = localStorage.getItem('sb_Sidebar_State');
    if (sbElementState == "open") {
        sbElement.classList.add('sb-open');
        document.body.classList.add('sb-open');
    };

    // Folder Collapse on h2
    let sbFolderNames = document.querySelectorAll('.sbFolderName');
    sbFolderNames.forEach(function(names) {
        names.addEventListener('click', function() {
            let thisFolder = names.parentNode;
            if (thisFolder.classList.contains('closed')) {
                thisFolder.classList.remove('closed');
                localStorage.setItem(`${thisFolder.id}_state`,"open"); // Set state open
            } else {
                thisFolder.classList.add('closed');
                localStorage.setItem(`${thisFolder.id}_state`,"closed"); // Set state closed   
            }
            //names.parentNode.classList.toggle('closed');
        });
    });
    // Load parent states
    let sb_Folders = document.querySelectorAll('.sb-folder');
    sb_Folders.forEach(function(folder) {
        let thisFolderState = localStorage.getItem(`${folder.id}_state`);
        if (thisFolderState === "closed") {
            folder.classList.add("closed");
        };
    });


    //-- Category Tabs --
    //-- Refactor this mess later... --
    // * Assign active category tab on click
    // * Find Category Tabs
    let sb_CategoryTabs = document.querySelectorAll('.sb-tab');
    // * Load last active tab
    let sb_lastActiveTabID = localStorage.getItem('sb_lastActiveTabID');
    if (sb_lastActiveTabID) {
        // Remove active from all other tabs
        sb_CategoryTabs.forEach(tabs => tabs.classList.remove('sb-active'));
        // Add active to the last recorded active tab
        let sb_activeTab = document.getElementById(sb_lastActiveTabID);
        sb_activeTab.classList.add('sb-active');
        sb_loadCategory(sb_activeTab);
        // Jump to anchor
    };

    // * Set active tab on click
    sb_CategoryTabs.forEach(function(tab) {
        tab.addEventListener('click', function() {
            sb_CategoryTabs.forEach(function(otherTabs) {
                if (otherTabs !== tab) {
                    otherTabs.classList.remove('sb-active');
                }
            });
            this.classList.add('sb-active');
            sb_loadCategory(this);
            // Save the active category in localStorage
            localStorage.setItem('sb_lastActiveTabID', this.id);
        });
    });

    // Function - make category visible
    // todo - category is the section, should be called loadfolder instead
    function sb_loadCategory(cat) {
        document.querySelectorAll('.sb-bottom-category').forEach(function(_cat) {
            _cat.classList.remove('sb-active');
        });
        let sb_CategoryID = cat.getAttribute("name");
        let sb_Category = document.getElementById(sb_CategoryID);
        sb_Category.classList.add('sb-active');
    };

/*
    // Modular Categories & Folders
    const sb_PAGETABLE = {
        0: ["refName", "url", "category", "folder", ["tag1": ["type", "attribute"], "tag2"], "timer_type"],
        1: ["Soup Kitchen", "http://...", "Dailies", "Freebies", , "daily"],
        2: [""]
    }

    function sb_createCat(cat) {}
    function sb_saveCat(cat) {}
    function sb_loadCat(cat) {}
    function sb_createFolder(folder) {}
    function sb_saveFolder(folder) {}
    function sb_loadFolder(folder) {}
    function sb_createLink(link) {}
 
    // Timers
    const sb_TIMEDATA = {
    }
    function loadTime() = {
    }
    function startTime() = {
    }
    function endTime() = {
    }

*/
})();