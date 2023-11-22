// ==UserScript==
// @name         Starry"s Universal Neopets Sidebar
// @namespace    https://github.com/mei-src
// @version      2.0
// @description  Adds a useful sidebar to Neopets for consistent and quick navigation.
// @author       mei-src
// @match        http://www.neopets.com/*
// @match        https://www.neopets.com/*
// @match        https://ncmall.neopets.com/mall/*
// @grant        none
// @downloadURL  https://raw.githubusercontent.com/mei-src/npscripts/main/universalsidebar/universalsidebar.user.js
// @updateURL    https://raw.githubusercontent.com/mei-src/npscripts/main/universalsidebar/universalsidebar.user.js
// ==/UserScript==

(function() {
    "use strict";

    if (window.top != window.self) return;

    // Style
    const sb_sidebarCSS = `
    <style>

    /* === Site Modifications on Open State === */
    body.sb_open {
        margin-left: 250px;
        width: calc(100vw - 250px);
        overflow-x: hidden;
    }

    body.sb_open .nav-top-grid__2020 {
        width: calc(100% - 250px);
    }

    body.sb_open .nav-profile-dropdown__2020 {
        left: 250px;
    }

    body.sb_open .navsub-left__2020 {
        left: 370px !important;
    }

    /* ======= Sidebar Layout ======= */
    #sb_Main {
        position: fixed;
        top: 0;
        left: -250px;
        width: 250px;
        background: #24273a;
        color: #cdd6f4;
        transition-duration: 0.05s;
        /* Override default styles */
        font: 14px/1.25 Roboto,Arial,Helvetica,sans-serif; 
        text-align: left;
        z-index: 9999;
    }

    #sb_Main.sb_open {
        box-shadow: 4px 2px 16px -3px rgba(0,0,0,0.5);
        left: 0;
    }

    .sb_container {
        display: flex;
        flex-direction: column;
        height: 100vh;
    }

    .sb_box {
        margin: 15px 25px;
    }

    /* ======= Sidebar: Top ======= */
    #sb_Top {
        text-align: center;
        flex: 0 0 auto;
    }
    /* Search Box */
    #sb_BigSearch {
        background: #1e1e2e;
        height: 50px;
        line-height: 3;
    }

    /* ======= Sidebar: Category Tabs ======= */
    #sb_CategoryTabs ul {
        display: flex;
        list-style-type: none;
        margin: 0;
        padding: 0;
    }

    #sb_CategoryTabs li {
        flex: 1;
        text-align: center;
    }

    #sb_CategoryTabs li a {
        display: block;
        padding: 10px;
        opacity: 0.5;
        border-bottom: 3px solid transparent;
    }

    #sb_CategoryTabs .sb_active {
        background: #cdd6f4;
        border-bottom: 3px solid #cdd6f4;
        opacity: 1;
    }

    /* ======= Sidebar: Bottom ======= */
    #sb_Bottom {
        flex: 1;
        overflow: hidden;
        /* overflow: auto;
        scrollbar-width: thin; */
    }

    .sb_bottomcategory {
        overflow: auto;
        height: 100%;
        scrollbar-width: none;
        scrollbar-color: transparent;
        display: none;
    }

    .sb_bottomcategory.sb_active {
        display: block;
    }

    .sb_bottomcategory:hover {
        scrollbar-width: thin;
    }

    #sb_Control {
        margin-left: 90px;
        display: block;
        font-size: 12px;
    }

    /* ======= Elements ======= */
    #sb_Main .sb_groupname {
        margin: 10px 0;
        font-size: 21px; /* Reduced size for more screen estate */
    }

    #sb_Main .sb_groupname:hover {
        cursor: pointer;
    }

    #sb_Main .sb_groupname:before {
        content: "-";
        font-family:"Courier New", Courier, monospace;
        font-size: 24px;
        position: relative;
        padding: 3px 8px 3px 3px;
    }

    #sb_Main .closed .sb_groupname:before {
        content: "+";
    }

    #sb_Main ul {
        padding: 0;
        margin: 0;
    }

    #sb_Main ul ul {
        padding-left: 15px;
    }

    #sb_Main li {
        list-style-type: none;
        font-weight: bold;
        margin: 0;
        padding: 0;
    }

    #sb_Main .closed li, #sb_Main .closed ul {
        display: none;
    }

    #sb_Main h3 {
        font-style: italic;
    }

    #sb_Main a {
        color: #89b4fa;
        text-decoration: none;
    }

    #sb_Main a:active {
        color: #a4c7ff;
        background: #575a6f;
    }

    #sb_Main a:visited {
        color: #89b4fa;
    }

    #sb_Main a:hover {
        color: #a4c7ff;
        background: #575a6f;
    }

    /* ======= Elements: Tags ======= */
    .sb_tag {
        font-size: 11px;
        font-family: "Courier New", Courier, monospace;
        color: #1e1e2e;
        padding: 2px 3px;
        border-radius: 3px;
    }
    .sb_tag.sb_cooldown {background: #f28ba8;}
    .sb_tag.sb_elapse {color: #f28ba8;}
    .sb_tag.sb_warn {color: #f9e2af;}
    .sb_tag.sb_counter {background: #a6e3a1;}
    .sb_tag.sb_available {background: #89b4fa;}
    .sb_tag.sb_reference {color: #898ea6;}
    a.sb_tag {padding: 0; border-bottom: 2px dotted #89b4fa; border-radius: 0; position: relative; top: -3px;}

    .sb_Button { ont-weight: 600;}
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
    const sb_sidebarHTML = `
    <nav id="sb_Main">
        <div class="sb_container">
            <div id="sb_Top">
                <!-- Placeholder -->
                <a href="https://www.neopets.com/home/" class="sb_Button"><div id="sb_BigSearch">
                        ♡ Interact with pets ♡
                    </div></a>
            </div>
            <div id="sb_CategoryTabs">
                <ul>
                    <!-- name matches to #id of div to display -->
                    <li><a name="sb_CategoryLinks" id="sb_TabFolders" class="sb_tab sb_active">📁</a></li>
                    <li><a name="sb_CategoryDailies" id="sb_TabDailies" class="sb_tab">📅</a></li>
                    <li><a name="sb_CategoryLocales" id="sb_TabLocales" class="sb_tab">🌍</a></li>
                </ul>
            </div>
            <div id="sb_Bottom">

                <!-- Category: Folders -->
                <div id="sb_CategoryLinks" class="sb_bottomcategory sb_active">
                    <div class="sb_box">
                        <ul class="sb_group" id="sb_GroupAccount">
                            <h2 class="sb_groupname">Account</h2>
                            <li><a href="https://www.neopets.com/myaccount.phtml">Control Panel</a></li>
                            <li><a href="https://www.neopets.com/preferences.phtml">Settings</a></li>
                            <li><a href="https://www.neopets.com/neomessages.phtml">Neomail</a></li>
                            <li><a href="https://www.neopets.com/neofriends.phtml">Neofriends</a></li>
                            <li><a href="https://www.neopets.com/settings/neoboards/">Collected Avatars</a> <a href="https://www.jellyneo.net/?go=avatars" class="sb_tag">Guide</a></li>
                            <li><a href="https://www.neopets.com/refer/index.phtml">Referrals</a></li>
                            <li><a href="https://www.neopets.com/space/warehouse/prizecodes.phtml">Redeem Code</a></li>
                        </ul>
                        <ul class="sb_group" id="sb_GroupPets">
                            <h2 class="sb_groupname">Pets</h2>
                            <li><a href="https://www.neopets.com/quickref.phtml">Quick Ref</a></li>
                            <li><a href="https://www.neopets.com/customise/">Customize Pet</a> <a href="https://impress.openneo.net/" class="sb_tag">DtI Sim</a></li>
                            <li><a href="https://www.neopets.com/addpet.phtml">Create Pet</a></li>
                            <li><a href="https://www.neopets.com/pound">Adoption</a></li>
                            <li><a href="https://www.neopets.com/neolodge.phtml">Neolodge</a></li>
                            <li><a href="https://www.neopets.com/pool">Rainbow Pool</a> <a href="https://wardrobe.jellyneo.net/rainbow-pool/" class="sb_tag">JN Previews</a></li>
                            <li><a href="https://www.neopets.com/magma/pool.phtml">Magma Pool</a> <span class="sb_tag sb_cooldown">7d</span></li>
                        </ul>
                        <ul class="sb_group" id="sb_GroupInventory">
                            <h2 class="sb_groupname">Inventory</h2>
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
                        <ul class="sb_group" id="sb_GroupGames">
                            <h2 class="sb_groupname">Games</h2>
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
                            <li><a href="https://www.neopets.com/games/neoquest/neoquest.phtml">Neoquest I</a> <a href="https://neoquest.guide/" class="sb_tag">Guide</a></li>
                            <li><a href="https://www.neopets.com/games/nq2/index.phtml">Neoquest II</a> <a href="https://www.jellyneo.net/?go=neoquest2" class="sb_tag">Guide</a></li>
                            <li><a href="https://www.jellyneo.net/?go=links">JellyNeo Game Guides</a></li>
                        </ul>
                        <ul class="sb_group" id="sb_GroupExplore">
                            <h2 class="sb_groupname">Explore</h2>
                            <li><a href="https://www.neopets.com/explore.phtml">World Map</a></li>
                            <li><a href="https://www.neopets.com/petcentral.phtml">Pet Central</a></li>
                            <li><a href="https://www.neopets.com/calendar.phtml">Calendar</a></li>
                            <li><a href="https://www.neopets.com/neopedia.phtml">Neopedia</a></li>
                            <li><a href="https://www.neopets.com/help/tutorial/index.phtml">Tutorial</a></li>
                        </ul>
                        <ul class="sb_group" id="sb_GroupCommunity">
                            <h2 class="sb_groupname">Community</h2>
                            <li><a href="https://www.neopets.com/community/">Community Central</a></li>
                            <li><a href="https://www.neopets.com/nf.phtml">News</a></li>
                            <li><a href="https://www.neopets.com/ntimes/index.phtml">Neopian Times</a></li>
                            <li><a href="https://www.neopets.com/contests.phtml">Spotlights</a></li>
                            <li><a href="https://www.neopets.com/neoboards/index.phtml">Neoboards</a></li>
                            <li><a href="https://www.neopets.com/noticeboard.phtml">Notice Board</a> (Broken)</li>
                            <li><a href="https://www.neopets.com/guilds/guild.phtml?id=">My Guild</a></li>
                            <li><a href="https://www.neopets.com/guilds/index.phtml">Guild Directory</a></li>
                        </ul>
                        <ul class="sb_group" id="sb_GroupShop">
                            <h2 class="sb_groupname">Shop</h2>
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
                                    <li><a href="https://www.neopets.com/pirates/smugglerscove.phtml">Smuggler"s Cove</a></li>
                                    <li><a href="https://www.neopets.com/winter/igloo.phtml">Igloo Garage Sale</a></li>
                                    <li><a href="https://www.neopets.com/winter/shopofmystery.phtml">Tarla"s Shop of Mysteries</a></li>
                                    <li><a href="https://www.neopets.com/faerieland/hiddentower938.phtml">Hidden Tower</a></li>
                                    <li><a href="https://www.neopets.com/moon/neocola.phtml">Neocola Machine</a></li>
                                    <li><a href="https://www.neopets.com/magma/workshop.phtml">Tangor"s Workshop</a></li>
                                    <li><a href="https://www.neopets.com/objects.phtml?type=shop&obj_type=111">Cog"s Togs</a></li>
                                </ul>
                            </li>
                        </ul>
                        <ul class="sb_group" id="sb_GroupNCMall">
                            <h2 class="sb_groupname">NC Mall</h2>
                            <li><a href="http://ncmall.neopets.com/mall/shop.phtml">NC Mall</a></li>
                            <li><a href="http://ncmall.neopets.com/mall/fortune/">Fortune Cookies</a></li>
                            <li><a href="https://secure.nc.neopets.com/get-neocash">Buy NC</a></li>
                            <li><a href="https://secure.nc.neopets.com/redeemnc">Redeem NC Cards</a></li>
                            <li><a href="https://neopetsshop.com/">Merch Shop</a></li>
                            <li><a href="https://www.neopets.com/shopping/index.phtml">Merch Partners</a></li>
                        </ul>
                        <ul class="sb_group" id="sb_GroupPremium">
                            <h2 class="sb_groupname">Premium</h2>
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
                <div id="sb_CategoryDailies" class="sb_bottomcategory">
                    <div class="sb_box">
                        <ul class="sb_group" id="sb_GroupFreebies">
                            <h2 class="sb_groupname">Freebies</h2>
                            <li id="sb-adventcalendar"><a href="https://www.neopets.com/winter/adventcalendar.phtml">Advent Calendar Day 8</a></li>
                            <li><a href="https://www.neopets.com/prehistoric/omelette.phtml">Giant Omelette</a></li>
                            <li><a href="https://www.neopets.com/jelly/jelly.phtml">Giant Jelly</a></li>
                            <li><a href="https://www.neopets.com/moviecentral/index.phtml">Movie Central</a></li>
                            <li><a href="https://www.neopets.com/soupkitchen.phtml">Soup Kitchen</a></li>
                            <li><a href="https://www.neopets.com/donations.phtml">Money Tree</a></li>
                            <li><a href="https://www.neopets.com/medieval/rubbishdump.phtml">Rubbish Dump</a></li>
                            <li><a href="https://www.neopets.com/thriftshoppe/index.phtml">Second-Hand Shoppe</a></li>
                            <li><a href="https://www.neopets.com/wishing.phtml">The Wishing Well</a></li>
                            <li><a href="https://www.neopets.com/faerieland/springs.phtml">Healing Springs</a> <span class="sb_tag sb_cooldown">30m</span></li>
                        </ul>
                        <ul class="sb_group" id="sb_GroupExpeditions">
                            <h2 class="sb_groupname">Expeditions</h2>
                            <li><a href="https://www.neopets.com/halloween/gravedanger/">Grave Danger</a> <span class="sb_tag sb_cooldown">8h</span></li>
                            <li><a href="https://www.neopets.com/pirates/academy.phtml?type=courses">Swashbuckling Academy</a> <span class="sb_tag sb_cooldown">30m</span></li>
                            <li><a href="https://www.neopets.com/island/training.phtml?type=courses">Mystery Island Training</a> <span class="sb_tag sb_cooldown">30m</span></li>
                            <li><a href="https://www.neopets.com/island/fight_training.phtml?type=courses">Secret Ninja Training</a> <span class="sb_tag sb_cooldown">30m</span></li>
                        </ul>
                        <ul class="sb_group" id="sb_GroupUnlocks">
                            <h2 class="sb_groupname">Unlocks</h2>
                            <li><a href="https://www.neopets.com/pirates/forgottenshore.phtml">Forgotten Shore</a></li>
                            <li><a href="https://www.neopets.com/lab.phtml">Lab Ray</a></li>
                            <li><a href="https://www.neopets.com/petpetlab.phtml">Petpet Lab Ray</a></li>
                            <li><a href="https://www.neopets.com/altador/hallofheroes.phtml">Council Chamber</a></li>
                            <li><a href="https://www.neopets.com/magma/darkcave.phtml">Dark Cave</a></li>
                        </ul>
                        <ul class="sb_group" id="sb_GroupTimed">
                            <h2 class="sb_groupname">Timed</h2>
                            <li><a href="https://www.neopets.com/worlds/deadlydice.phtml">Deadly Dice</a> <span class="sb_tag sb_warn">⚠</span><span class="sb_tag sb_reference">12am</span></li>
                            <li><a href="https://www.neopets.com/winter/snowager.phtml">Snowager</a> <span class="sb_tag sb_reference">6am, 2pm, 10pm</span></li>
                            <li><a href="https://www.neopets.com/medieval/turmaculus.phtml">Turmaculus</a> <a class="sb_tag sb-link" href="https://www.neopets.com/~Brownhownd">Schedule</a></li>
                        </ul>
                        <ul class="sb_group" id="sb_GroupQuests">
                            <h2 class="sb_groupname">Quests</h2>
                            <li><a href="https://www.neopets.com/questlog/">Quest Log</a></li>
                            <li><a href="https://www.neopets.com/quests.phtml">Faerie Quests</a></li>
                            <li><a href="https://www.neopets.com/faerieland/employ/employment.phtml">Employment Agency</a></li>
                            <li><a href="https://www.neopets.com/space/coincidence.phtml">The Coincidence</a></li>
                            <li><a href="https://www.neopets.com/halloween/braintree.phtml">Brain Tree</a> <span class="sb_tag sb_cooldown">24h</span></li>
                            <li><a href="https://www.neopets.com/halloween/esophagor.phtml">Esophagor"s Quests</a></li>
                            <li><a href="https://www.neopets.com/medieval/earthfaerie.phtml?type=end&obj_given=18277&f=1&off=596778">Illusen"s Glade</a> <span class="sb_tag sb_cooldown">12h</span></li>
                            <li><a href="https://www.neopets.com/faerieland/darkfaerie.phtml">Jhudora"s Bluff</a> <span class="sb_tag sb_cooldown">12h</span></li>
                            <li><a href="https://www.neopets.com/halloween/witchtower.phtml">Edna"s Quests</a> <span class="sb_tag sb_counter">10</span></li>
                            <li><a href="https://www.neopets.com/winter/snowfaerie.phtml">Taelia"s Quests</a> <span class="sb_tag sb_counter">10</span></li>
                            <li><a href="https://www.neopets.com/island/kitchen.phtml">Kitchen Quests</a> <span class="sb_tag sb_counter">10</span></li>
                        </ul>
                        <ul class="sb_group" id="sb_GroupMoney">
                            <h2 class="sb_groupname">Money</h2>
                            <li><a href="https://www.neopets.com/market.phtml?type=till">Shop Till</a></li>
                            <li><a href="https://www.neopets.com/bank.phtml">Bank Interest</a></li>
                            <li><a href="https://www.neopets.com/stockmarket.phtml?type=portfolio">Stocks</a>: <a href="https://www.neopets.com/stockmarket.phtml?type=buy">Buy</a> / <a href="https://www.neopets.com/stockmarket.phtml?type=list&full=true">List</a></li>
                            <li><a href="">FC</a>: <a href="https://www.neopets.com/pirates/foodclub.phtml?type=bet">Place</a> / <a href="https://www.neopets.com/pirates/foodclub.phtml?type=current_bets">Current </a> / <a href="https://www.neopets.com/pirates/foodclub.phtml?type=collect">Collect</a> / <a href="https://www.neopets.com/pirates/foodclub.phtml?type=history">History</a> <a href="https://www.neopets.com/~Shrmsh" class="sb_tag">Nsheng</a> <a href="https://neofood.club/" class="sb_tag">NFC</a></li>
                        </ul>
                        <ul class="sb_group" id="sb_GroupPuzzles">
                            <h2 class="sb_groupname">Puzzles</h2>
                            <li><a href="https://www.neopets.com/community/index.phtml">Daily Puzzle</a> <a class="sb_tag sb-link" href="https://www.jellyneo.net/?go=dailypuzzle">JN</a></li>
                            <li><a href="https://www.neopets.com/games/crossword/index.phtml">Faerie Crossword</a> <a class="sb_tag sb-link" href="https://www.jellyneo.net/?go=faerie_crossword">JN</a></li>
                            <li><a href="https://www.neopets.com/medieval/grumpyking.phtml">Grumpy Old King</a></li>
                            <li><a href="https://www.neopets.com/medieval/wiseking.phtml">Wise Old King</a></li>
                            <li><a href="https://www.neopets.com/medieval/guessmarrow.phtml">Guess the Weight</a></li>
                            <li><a href="https://www.neopets.com/medieval/potatocounter.phtml">Potato Counter</a></li>
                            <li><a href="https://www.neopets.com/shenkuu/lunar/">Lunar Temple</a></li>
                            <li><a href="https://www.neopets.com/shenkuu/neggcave/">Mysterious Negg Cave</a></li>
                        </ul>
                        <ul class="sb_group" id="sb_GroupExploration">
                            <h2 class="sb_groupname">Exploration</h2>
                            <li><a href="https://www.neopets.com/trudys_surprise.phtml">Trudy"s Surprise</a></li>
                            <li><a href="https://www.neopets.com/pirates/anchormanagement.phtml">Anchor Management</a></li>
                            <li><a href="https://www.neopets.com/desert/shrine.phtml">Coltzan"s Shrine</a> <span class="sb_tag sb_cooldown">13h</span></li>
                            <li><a href="https://www.neopets.com/desert/fruit/index.phtml">Fruit Machine</a></li>
                            <li><a href="https://www.neopets.com/moon/meteor.phtml">Meteor</a> <span class="sb_tag sb_cooldown">60m</span></li>
                            <li><a href="https://www.neopets.com/faerieland/tdmbgpop.phtml">Blue Plushie</a></li>
                            <li><a href="https://www.neopets.com/island/tombola.phtml">Tombola</a></li>
                            <li><a href="https://www.neopets.com/worlds/geraptiku/tomb.phtml">Deserted Tomb</a></li>
                            <li><a href="https://www.neopets.com/worlds/kiko/kpop/">Kiko Pop</a></li>
                            <li><a href="http://ncmall.neopets.com/games/giveaway/process_giveaway.phtml">Qasalan Expellibox</a></li>
                            <li><a href="https://www.neopets.com/shop_of_offers.phtml?slorg_payout=yes">Rich Slorg</a></li>
                            <li><a href="https://www.neopets.com/halloween/applebobbing.phtml">Apple Bobbing</a> <span class="sb_tag sb_warn">⚠</span></li>
                            <li><a href="https://www.neopets.com/magma/quarry.phtml">Moltara Quarry</a></li>
                            <li><a href="https://www.neopets.com/medieval/symolhole.phtml">Symol Hole</a> <a href="https://www.jellyneo.net/?go=symolhole" class="sb_tag">Schedule</a></li>
                            <li><a href="https://www.neopets.com/freebies/tarlastoolbar.phtml">Tarla</a></li>
                            <li><a href="https://www.neopets.com/water/fishing.phtml">Ye Olde Fishing</a> <span class="sb_tag sb_elapse">1h+</span></li>
                        </ul>
                        <ul class="sb_group" id="sb_GroupNPRequired">
                            <h2 class="sb_groupname">NP Required</h2>
                            <li>Wheels
                                <ul>
                                    <li><a href="https://www.neopets.com/faerieland/wheel.phtml">Excitement</a> <span class="sb_tag sb_warn">⚠</span></li>
                                    <li><a href="https://www.neopets.com/desert/extravagance.phtml">Extravagance</a></li>
                                    <li><a href="https://www.neopets.com/medieval/knowledge.phtml">Knowledge</a></li>
                                    <li><a href="https://www.neopets.com/prehistoric/mediocrity.phtml">Mediocrity</a></li>
                                    <li><a href="https://www.neopets.com/halloween/wheel/index.phtml">Misfortune</a> <span class="sb_tag sb_warn">⚠</span></li>
                                    <li><a href="https://www.neopets.com/prehistoric/monotony/monotony.phtml">Monotony</a></li>
                                </ul>
                            </li>
                            <li>Scratchcards
                                <ul>
                                    <li><a href="https://www.neopets.com/halloween/scratch.phtml">Haunted Fairgrounds</a> <span class="sb_tag sb_cooldown">2h</span></li>
                                    <li><a href="https://www.neopets.com/desert/sc/kiosk.phtml">Desert Kiosk</a> <span class="sb_tag sb_cooldown">4h</span></li>
                                    <li><a href="https://www.neopets.com/winter/kiosk.phtml">Ice Caves</a> <span class="sb_tag sb_cooldown">6h</span></li>
                                </ul>
                            </li>
                            <li>Multis
                                <ul>
                                    <li><a href="https://www.neopets.com/pirates/buriedtreasure/index.phtml">Buried Treasure</a> <span class="sb_tag sb_cooldown">3h</span></li>
                                    <li><a href="https://www.neopets.com/faerieland/poogleracing.phtml">Poogle Racing</a> <span class="sb_tag sb_cooldown">15h</span></li>
                                    <li><a href="https://www.neopets.com/medieval/cheeseroller.phtml">Cheeseroller</a> <span class="sb_tag sb_counter">3</span></li>
                                    <li><a href="https://www.neopets.com/medieval/turdleracing.phtml">Turdle Racing</a> <span class="sb_tag sb_counter">3</span></li>
                                    <li><a href="https://www.neopets.com/halloween/bagatelle.phtml">Bagatelle</a> <span class="sb_tag sb_counter">20</span></li>
                                    <li><a href="https://www.neopets.com/halloween/coconutshy.phtml">Coconut Shy</a> <span class="sb_tag sb_counter">20</span></li>
                                    <li><a href="https://www.neopets.com/halloween/corkgun.phtml">Cork Gun Gallery</a> <span class="sb_tag sb_counter">20</span></li>
                                    <li><a href="https://www.neopets.com/halloween/strtest/index.phtml">Test Your Strength</a> <span class="sb_tag sb_cooldown">6h</span></li>
                                </ul>
                            </li>
                            <li><a href="https://www.neopets.com/games/lottery.phtml">Neopian Lottery</a></li>
                            <li><a href="https://www.neopets.com/faerieland/caverns/index.phtml">Faerie Caverns</a></li>
                            <li><a href="https://www.neopets.com/space/strangelever.phtml">Lever of Doom</a></li>
                            <li><a href="https://www.neopets.com/medieval/pickyourown_index.phtml">Pick Your Own</a></li>
                            <li><a href="https://www.neopets.com/prehistoric/ticketbooth.phtml">Tyrannian Ticket Booth</a></li>
                        </ul>
                    </div>
                </div>

                <!-- Category: Locales -->
                <div id="sb_CategoryLocales" class="sb_bottomcategory">
                    <div class="sb_box">
                        <ul class="sb_group" id="sb_GroupLocations">
                            <h2 class="sb_groupname">Locations</h2>
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

            </div>
        </div>
    </nav>
    `;

    // SIDEBAR
    // Inject Sidebar HTML
    document.body.insertAdjacentHTML("afterbegin", sb_sidebarCSS);
    document.body.insertAdjacentHTML("afterbegin", sb_sidebarHTML);

    // EventListener - Open Sidebar with ` hotkey
    let sbElement = document.getElementById("sb_Main");
    document.addEventListener("keyup", function(event) {
        if (event.key === "`") {
            // Toggle visibility
            sbElement.classList.toggle("sb_open");
            if (sbElement.classList.contains("sb_open")) {
                localStorage.setItem("sb_Sidebar_State","open");
                document.body.classList.add("sb_open");
            } else {
                localStorage.setItem("sb_Sidebar_State","closed");
                document.body.classList.remove("sb_open");
            }   
        }
    });

    // Load Sidebar if previously opened
    let sbElementState = localStorage.getItem("sb_Sidebar_State");
    if (sbElementState == "open") {
        sbElement.classList.add("sb_open");
        document.body.classList.add("sb_open");
    };

    // BOTTOM LINKS
    // EventListener - Folder Toggle via H2
    let sb_groupnames = document.querySelectorAll(".sb_groupname");
    sb_groupnames.forEach(function(names) {
        names.addEventListener("click", function() {
            let thisFolder = names.parentNode;
            if (thisFolder.classList.contains("closed")) {
                thisFolder.classList.remove("closed");
                localStorage.setItem(`${thisFolder.id}_state`,"open"); 
            } else {
                thisFolder.classList.add("closed");
                localStorage.setItem(`${thisFolder.id}_state`,"closed"); 
            }
        });
    });

    // Load Folder States 
    let sb_Folders = document.querySelectorAll(".sb_group");
    sb_Folders.forEach(function(folder) {
        let thisFolderState = localStorage.getItem(`${folder.id}_state`);
        if (thisFolderState === "closed") {
            folder.classList.add("closed");
        };
    });


    // CATEGORY TABS - what a mess...
    // EventListener - Set Active Tab
    sb_CategoryTabs.forEach(function(tab) {
        tab.addEventListener("click", function() {
            sb_CategoryTabs.forEach(function(otherTabs) {
                if (otherTabs !== tab) {
                    otherTabs.classList.remove("sb_active");
                }
            });
            this.classList.add("sb_active");
            sb_loadCategory(this);
            localStorage.setItem("sb_lastActiveTabID", this.id);
        });
    });

    // Load Active Tab
    let sb_CategoryTabs = document.querySelectorAll(".sb_tab");
    let sb_lastActiveTabID = localStorage.getItem("sb_lastActiveTabID");
    if (sb_lastActiveTabID) {
        // Remove active from all other tabs
        sb_CategoryTabs.forEach(tabs => tabs.classList.remove("sb_active"));
        // Add active to the last recorded active tab
        let sb_activeTab = document.getElementById(sb_lastActiveTabID);
        sb_activeTab.classList.add("sb_active");
        sb_loadCategory(sb_activeTab);
    };

    // Load Category
    function sb_loadCategory(cat) {
        document.querySelectorAll(".sb_bottomcategory").forEach(function(_cat) {
            _cat.classList.remove("sb_active");
        });
        let sb_CategoryID = cat.getAttribute("name");
        let sb_Category = document.getElementById(sb_CategoryID);
        sb_Category.classList.add("sb_active");
    };

/*  TODO:

    // Modular Sidebar
    const sb_PAGEDATA = {}
    function sb_createCat(cat) {}
    function sb_saveCatState(cat) {}
    function sb_loadCatState(cat) {}
    function sb_createGroup(group) {}
    function sb_saveGroupState(group) {}
    function sb_loadGroupState(group) {}
    function sb_createLink(link) {}
 
    // Universal Search
    function sb_listenSearchKeywords() {}
    function sb_saveSearch(query) {}
    function sb_loadSearch(query) {}
    function sb_submitSearch(query) {}
    function sb_SearchFastTravel(query) {}
    function sb_SearchOtherSite(query, type, site) {} // Will need permission for this
    function sb_SearchURL(query) {}
    function sb_SearchPageName(query) {}
    function sb_SearchNeosearch(query) {}
    function sb_SearchNPC(query) {}

    // Timers
    const sb_TIMEDATA = {}
    function sb_loadTime(name) {}
    function sb_initTime(name) {}
    function sb_calcTime(name) {}
    function sb_endTime(name) {}
*/

})();