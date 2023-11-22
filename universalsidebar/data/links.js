const sb_PAGETABLE = {
    // refName : [url, category, group, type, [tags, ...]]
    // * url: my_page.phtml
    // * category
    //      nav
    //      dailies
    //      locales
    //      tools
    //      settings
    // * group: "account", "pets", "..."

    // Template
    "Page Name": ["/url/to/page.phtml", "category", "folder", {"tag_1": ["tag_type", "tag_data"]}],
    // Nav - Account
    "Control Panel": ["/myaccount.phtml", "nav", "account"],
    "Settings": ["/neomessages.phtml", "nav", "account"],
    "Neomail": ["/neomessages.phtml", "nav", "account"], 
    "Neofriends": ["/neofriends.phtml", "nav", "account"],
    "Avatar Collection": ["/settings/neoboards/", "nav", "account", {"JN": ["guide", "https://www.jellyneo.net/?go=avatars"]}],
    "Referrals": ["/refer", "nav", "account"],
    "Redeem Code": ["/space/warehouse/prizecodes.phtml", "nav", "account"],

    // Category: nav, Folder: pets
    "Quick Ref": ["/quickref.phtml", "nav", "pets"],
    "Customize Pet": ["/customise/", "nav", "pets", {"DtI Sim": ["sb-tag", "https://impress.openneo.net/"]}],
    "Create Pet": ["/addpet.phtml", "nav", "pets"],
    "Adoption": ["/pound", "nav", "pets"],
    "Neolodge": ["/neolodge.phtml", "nav", "pets"],
    "Rainbow Pool": ["/pool", "nav", "pets", {"JN Previews": ["sb-tag", "https://wardrobe.jellyneo.net/rainbow-pool/"]}],
    "Magma Pool": ["/magma/pool.phtml", "nav", "pets", "timer"],

    // Category: nav, Folder: inventory
    "Overview": ["/inventory.phtml", "nav", "inventory"],
    "Quickstock": ["/quickstock.phtml", "nav", "inventory"],
    "Transfer Log": ["/items/transfer_list.phtml", "nav", "inventory"],
    "Closet": ["/closet.phtml", "nav", "inventory"],
    "Safety Deposit Box": ["/safetydeposit.phtml", "nav", "inventory"],
    "Neohome Shed": ["/neohome/shed", "nav", "inventory"],
    "My Gallery": ["/gallery/index.phtml?view=all", "nav", "inventory"],
    "My Stamps": ["/stamps.phtml?type=album", "nav", "inventory"],
    "My TCG": ["/tcg/album.phtml", "nav", "inventory"],
    "My NC Items": ["/ncma/", "nav", "inventory"],
    "JN Item Database": ["https://items.jellyneo.net/", "nav", "inventory"],
    "JN Wishlists": ["https://items.jellyneo.net/wishlists/", "nav", "inventory"],

    // Category: nav, Folder: games
    "Battledome": ["/dome/", "nav", "games"],
    "Defenders of Neopia": ["/games/defenders.phtml", "nav", "games"],
    "Altador Cup": ["/altador/colosseum/index.phtml", "nav", "games"],
    "Game Room": ["/games/", "nav", "games"],
    "Favorite Games": ["/games/favourites.phtml", "nav", "games"],
    "Popular Games": ["/games/category.phtml?sortby=pop", "nav", "games"],
    "Featured Game": ["/games/featuredgame/", "nav", "games"],
    "Neoquest I": ["/games/neoquest/neoquest.phtml", "nav", "games", {"Guide": ["sb-tag", "https://neoquest.guide/"]}],
    "Neoquest II": ["/games/nq2/index.phtml", "nav", "games", {"Guide": ["sb-tag", "https://www.jellyneo.net/?go=neoquest2"]}],
    "JellyNeo Game Guides": ["https://www.jellyneo.net/?go=links", "nav", "games"],

    // Category: nav, Folder: explore
    "Explore": ["/explore.phtml", "nav", "explore"],
    "World Map": ["/explore.phtml", "nav", "explore"], 
    "Pet Central": ["/petcentral.phtml", "nav", "explore"],
    "Calendar": ["/calendar.phtml", "nav", "explore"],
    "Neopedia": ["/neopedia.phtml", "nav", "explore"],
    "Tutorial": ["/help/tutorial/index.phtml", "nav", "explore"],

    // Category: nav, Folder: community
    "Community": ["/community/", "nav", "community"],
    "Community Central": ["/community/", "nav", "community"], 
    "News": ["/nf.phtml", "nav", "community"],
    "Neopian Times": ["/ntimes/index.phtml", "nav", "community"],
    "Spotlights": ["/contests.phtml", "nav", "community"],
    "Neoboards": ["/neoboards/index.phtml", "nav", "community"],
    "Notice Board": ["/noticeboard.phtml", "nav", "community"], // Note: Marked as Broken
    "My Guild": ["/guilds/guild.phtml?id=", "nav", "community"],
    "Guild Directory": ["/guilds/index.phtml", "nav", "community"],

    // Category: nav, Folder: shop
    "Market": ["/shops/wizard.phtml", "nav", "shop"],
    "Shop Wizard": ["/shops/wizard.phtml", "nav", "shop"], 
    "My Shop": ["/market.phtml?type=your", "nav", "shop"],
    "Bank": ["/bank.phtml", "nav", "shop"],
    "Stock Portfolio": ["/stockmarket.phtml?type=portfolio", "nav", "shop"],
    "Auctions": ["/auctions.phtml", "nav", "shop"],
    "Trading Post": ["/island/tradingpost.phtml", "nav", "shop"],
    "JellyNeo Shops Directory": ["https://www.jellyneo.net/?go=shopsdirectory", "nav", "shop"],
    "Player Marketplace": {
        "Neopia Central": ["/market.phtml?type=list&world=0", "nav", "shop"],
        "Mystery Island": ["/market.phtml?type=list&world=1", "nav", "shop"],
        "Haunted Marketplace": ["/market.phtml?type=list&world=3", "nav", "shop"],
    },
    "Special Stores": {
        "Dubloon-o-Matic": ["/pirates/dubloonomatic.phtml", "nav", "shop"],
        "Smuggler's Cove": ["/pirates/smugglerscove.phtml", "nav", "shop"],
        "Igloo Garage Sale": ["/winter/igloo.phtml", "nav", "shop"],
        "Tarla's Shop of Mysteries": ["/winter/shopofmystery.phtml", "nav", "shop"],
        "Hidden Tower": ["/faerieland/hiddentower938.phtml", "nav", "shop"],
        "Neocola Machine": ["/moon/neocola.phtml", "nav", "shop"],
        "Tangor's Workshop": ["/magma/workshop.phtml", "nav", "shop"],
        "Cog's Togs": ["/objects.phtml?type=shop&obj_type=111", "nav", "shop"],
    },

    // Category: nav, Folder: ncmall
    "NC Mall": ["http://ncmall.neopets.com/mall/shop.phtml", "nav", "ncmall"],
    "Fortune Cookies": ["http://ncmall.neopets.com/mall/fortune/", "nav", "ncmall"],
    "Buy NC": ["https://secure.nc.neopets.com/get-neocash", "nav", "ncmall"],
    "Redeem NC Cards": ["https://secure.nc.neopets.com/redeemnc", "nav", "ncmall"],
    "Merch Shop": ["https://neopetsshop.com/", "nav", "ncmall"],
    "Merch Partners": ["https://www.neopets.com/shopping/index.phtml", "nav", "ncmall"],

    // Category: nav, Folder: premium
    "Manage Membership": ["https://secure.nc.neopets.com/auth/login?c=/managemembership/", "nav", "premium"],
    "Portal": ["/premium/", "nav", "premium"],
    "SSW": {
        // Assuming the toggleSSW__2020() function is defined elsewhere
        "Toggle SSW": ["javascript:void(0);", "nav", "premium", {"onclick": "toggleSSW__2020()"}], // Fix this
    },
    "My Journal": ["/journal/", "nav", "premium"],
    "Premium TCG": ["/games/neodeck/index.phtml?show=prem", "nav", "premium"],
    "SpaceFaerie Scratchcards": ["/premium/sc/", "nav", "premium"],

    // Category: dailies, Folder: freebies
    "Advent Calendar Day 8": ["/winter/adventcalendar.phtml", "dailies", "freebies"],
    "Giant Omelette": ["/prehistoric/omelette.phtml", "dailies", "freebies", "timer"],
    "Giant Jelly": ["/jelly/jelly.phtml", "dailies", "freebies", "timer"],
    "Movie Central": ["/moviecentral/index.phtml", "dailies", "freebies"],
    "Soup Kitchen": ["/soupkitchen.phtml", "dailies", "freebies"],
    "Money Tree": ["/donations.phtml", "dailies", "freebies"],
    "Rubbish Dump": ["/medieval/rubbishdump.phtml", "dailies", "freebies"],
    "Second-Hand Shoppe": ["/thriftshoppe/index.phtml", "dailies", "freebies"],
    "The Wishing Well": ["/wishing.phtml", "dailies", "freebies"],
    "Healing Springs": ["/faerieland/springs.phtml", "dailies", "freebies", "timer"],

   // Category: dailies, Folder: expeditions
   "Grave Danger": ["/halloween/gravedanger/", "dailies", "expeditions", "timer"],
   "Swashbuckling Academy": ["/pirates/academy.phtml?type=courses", "dailies", "expeditions", "timer"],
   "Mystery Island Training": ["/island/training.phtml?type=courses", "dailies", "expeditions", "timer"],
   "Secret Ninja Training": ["/island/fight_training.phtml?type=courses", "dailies", "expeditions", "timer"],

    // Category: dailies, Folder: unlocks
    "Forgotten Shore": ["/pirates/forgottenshore.phtml", "dailies", "unlocks"],
    "Lab Ray": ["/lab.phtml", "dailies", "unlocks"],
    "Petpet Lab Ray": ["/petpetlab.phtml", "dailies", "unlocks"],
    "Council Chamber": ["/altador/hallofheroes.phtml", "dailies", "unlocks"],
    "Dark Cave": ["/magma/darkcave.phtml", "dailies", "unlocks"],

    // Category: dailies, Folder: timed
    "Deadly Dice": ["/worlds/deadlydice.phtml", "dailies", "timed", {"⚠": ["sb-tag sb-warn", null], "12am": ["sb-tag sb-ref", null]}],
    "Snowager": ["/winter/snowager.phtml", "dailies", "timed", {"6am": ["sb-tag sb-ref", null], "2pm": ["sb-tag sb-ref", null], "10pm": ["sb-tag sb-ref", null]}],
    "Turmaculus": ["/medieval/turmaculus.phtml", "dailies", "timed", {"Schedule": ["sb-tag sb-link", "https://www.neopets.com/~Brownhownd"]}],


    // Category: dailies, Folder: quests
    "Quest Log": ["/questlog/", "dailies", "quests"],
    "Faerie Quests": ["/quests.phtml", "dailies", "quests"],
    "Employment Agency": ["/faerieland/employ/employment.phtml", "dailies", "quests"],
    "The Coincidence": ["/space/coincidence.phtml", "dailies", "quests"],
    "Brain Tree": ["/halloween/braintree.phtml", "dailies", "quests", {"24h": ["sb-tag sb-countdown", null]}],
    "Esophagor's Quests": ["/halloween/esophagor.phtml", "dailies", "quests"],
    "Illusen's Glade": ["/medieval/earthfaerie.phtml?type=end&obj_given=18277&f=1&off=596778", "dailies", "quests", {"12h": ["sb-tag sb-countdown", null]}],
    "Jhudora's Bluff": ["/faerieland/darkfaerie.phtml", "dailies", "quests", {"12h": ["sb-tag sb-countdown", null]}],
    "Edna's Quests": ["/halloween/witchtower.phtml", "dailies", "quests", {"10": ["sb-tag sb-count", null]}],
    "Taelia's Quests": ["/winter/snowfaerie.phtml", "dailies", "quests", {"10": ["sb-tag sb-count", null]}],
    "Kitchen Quests": ["/island/kitchen.phtml", "dailies", "quests", {"10": ["sb-tag sb-count", null]}],

    // category: dailies, folder: puzzles
    "Daily Puzzle": ["/community/index.phtml", "dailies", "puzzles", {"JN": ["sb-tag sb-link", "https://www.jellyneo.net/?go=dailypuzzle"]}],
    "Faerie Crossword": ["/games/crossword/index.phtml", "dailies", "puzzles", {"JN": ["sb-tag sb-link", "https://www.jellyneo.net/?go=faerie_crossword"]}],
    "Grumpy Old King": ["/medieval/grumpyking.phtml", "dailies", "puzzles"],
    "Wise Old King": ["/medieval/wiseking.phtml", "dailies", "puzzles"],
    "Guess the Weight": ["/medieval/guessmarrow.phtml", "dailies", "puzzles"],
    "Potato Counter": ["/medieval/potatocounter.phtml", "dailies", "puzzles"],
    "Lunar Temple": ["/shenkuu/lunar/", "dailies", "puzzles"],
    "Mysterious Negg Cave": ["/shenkuu/neggcave/", "dailies", "puzzles"],

    // cat: dailies, folder: exploration
    "Trudy's Surprise": ["/trudys_surprise.phtml", "dailies", "exploration"],
    "Anchor Management": ["/pirates/anchormanagement.phtml", "dailies", "exploration"],
    "Coltzan's Shrine": ["/desert/shrine.phtml", "dailies", "exploration", {"13h": ["sb-tag sb-countdown", null]}],
    "Fruit Machine": ["/desert/fruit/index.phtml", "dailies", "exploration"],
    "Meteor": ["/moon/meteor.phtml", "dailies", "exploration", {"60m": ["sb-tag sb-countdown", null]}],
    "Blue Plushie": ["/faerieland/tdmbgpop.phtml", "dailies", "exploration"],
    "Tombola": ["/island/tombola.phtml", "dailies", "exploration"],
    "Deserted Tomb": ["/worlds/geraptiku/tomb.phtml", "dailies", "exploration"],
    "Kiko Pop": ["/worlds/kiko/kpop/", "dailies", "exploration"],
    "Qasalan Expellibox": ["http://ncmall.neopets.com/games/giveaway/process_giveaway.phtml", "dailies", "exploration"],
    "Rich Slorg": ["/shop_of_offers.phtml?slorg_payout=yes", "dailies", "exploration"],
    "Apple Bobbing": ["/halloween/applebobbing.phtml", "dailies", "exploration", {"⚠": ["sb-tag sb-warn", null]}],
    "Moltara Quarry": ["/magma/quarry.phtml", "dailies", "exploration"],
    "Symol Hole": ["/medieval/symolhole.phtml", "dailies", "exploration", {"Schedule": ["sb-tag", "https://www.jellyneo.net/?go=symolhole"]}],
    "Tarla": ["/freebies/tarlastoolbar.phtml", "dailies", "exploration"],
    "Ye Olde Fishing": ["/water/fishing.phtml", "dailies", "exploration", {"1h+": ["sb-tag sb-ago", null]}],

    // cat: dailies, folder: np-required
    "Excitement Wheel": ["/faerieland/wheel.phtml", "dailies", "np-required", {"⚠": ["sb-tag sb-warn", null]}],
    "Extravagance Wheel": ["/desert/extravagance.phtml", "dailies", "np-required"],
    "Knowledge Wheel": ["/medieval/knowledge.phtml", "dailies", "np-required"],
    "Mediocrity Wheel": ["/prehistoric/mediocrity.phtml", "dailies", "np-required"],
    "Misfortune Wheel": ["/halloween/wheel/index.phtml", "dailies", "np-required", {"⚠": ["sb-tag sb-warn", null]}],
    "Monotony Wheel": ["/prehistoric/monotony/monotony.phtml", "dailies", "np-required"],
    
    "Haunted Fairgrounds Scratchcard": ["/halloween/scratch.phtml", "dailies", "np-required", {"2h": ["sb-tag sb-countdown", null]}],
    "Desert Kiosk Scratchcard": ["/desert/sc/kiosk.phtml", "dailies", "np-required", {"4h": ["sb-tag sb-countdown", null]}],
    "Ice Caves Scratchcard": ["/winter/kiosk.phtml", "dailies", "np-required", {"6h": ["sb-tag sb-countdown", null]}],

    "Buried Treasure": ["/pirates/buriedtreasure/index.phtml", "dailies", "np-required", {"3h": ["sb-tag sb-countdown", null]}],
    "Poogle Racing": ["/faerieland/poogleracing.phtml", "dailies", "np-required", {"15h": ["sb-tag sb-countdown", null]}],
    "Cheeseroller": ["/medieval/cheeseroller.phtml", "dailies", "np-required", {"3": ["sb-tag sb-count", null]}],
    "Turdle Racing": ["/medieval/turdleracing.phtml", "dailies", "np-required", {"3": ["sb-tag sb-count", null]}],
    "Bagatelle": ["/halloween/bagatelle.phtml", "dailies", "np-required", {"20": ["sb-tag sb-count", null]}],
    "Coconut Shy": ["/halloween/coconutshy.phtml", "dailies", "np-required", {"20": ["sb-tag sb-count", null]}],
    "Cork Gun Gallery": ["/halloween/corkgun.phtml", "dailies", "np-required", {"20": ["sb-tag sb-count", null]}],
    "Test Your Strength": ["/halloween/strtest/index.phtml", "dailies", "np-required", {"6h": ["sb-tag sb-countdown", null]}],

    "Neopian Lottery": ["/games/lottery.phtml", "dailies", "np-required"],
    "Faerie Caverns": ["/faerieland/caverns/index.phtml", "dailies", "np-required"],
    "Lever of Doom": ["/space/strangelever.phtml", "dailies", "np-required"],
    "Pick Your Own": ["/medieval/pickyourown_index.phtml", "dailies", "np-required"],
    "Tyrannian Ticket Booth": ["/prehistoric/ticketbooth.phtml", "dailies", "np-required"],

    // cat: locales, folder: locales
    "Altador": ["/altador/index.phtml", "locales", "locales"],
    "Brightvale": ["/medieval/brightvale.phtml", "locales", "locales"],
    "Faerieland": ["/faerieland/index.phtml", "locales", "locales"],
    "Faerie City": ["/faerieland/faeriecity.phtml", "locales", "locales"],
    "Haunted Woods": ["/halloween/index.phtml", "locales", "locales"],
    "The Deserted Fairground": ["/halloween/index_fair.phtml", "locales", "locales"],
    "Neovia": ["/halloween/neovia.phtml", "locales", "locales"],
    "Kiko Lake": ["/worlds/index_kikolake.phtml", "locales", "locales"],
    "Krawk Island": ["/pirates/index.phtml", "locales", "locales"],
    "Warf Wharf": ["/pirates/warfwharf.phtml", "locales", "locales"],
    "Kreludor": ["/moon/index.phtml", "locales", "locales"],
    "Lutari Island": ["/tropical/index.phtml", "locales", "locales"],
    "Maraqua": ["/water/index.phtml", "locales", "locales"],
    "Maraquan Ruins": ["/water/index_ruins.phtml", "locales", "locales"],
    "Meridell": ["/medieval/index.phtml", "locales", "locales"],
    "Meridell Castle": ["/medieval/index_castle.phtml", "locales", "locales"],
    "Moltara": ["/magma/index.phtml", "locales", "locales"],
    "Moltara Caves": ["/magma/caves.phtml", "locales", "locales"],
    "Mystery Island": ["/island/index.phtml", "locales", "locales"],
    "The Lost City of Geraptiku": ["/worlds/index_geraptiku.phtml", "locales", "locales"],
    "Neopia Central": ["/objects.phtml", "locales", "locales"],
    "Neopian Bazaar": ["/market_bazaar.phtml", "locales", "locales"],
    "Neopian Plaza": ["/market_plaza.phtml", "locales", "locales"],
    "Roo Island": ["/worlds/index_roo.phtml", "locales", "locales"],
    "Shenkuu": ["/shenkuu/index.phtml", "locales", "locales"],
    "Terror Mountain": ["/winter/index.phtml", "locales", "locales"],
    "Top of Terror Mountain": ["/winter/terrormountain.phtml", "locales", "locales"],
    "Ice Caves": ["/winter/icecaves.phtml", "locales", "locales"],
    "The Lost Desert": ["/desert/index.phtml", "locales", "locales"],
    "The City of Sakhmet": ["/desert/sakhmet.phtml", "locales", "locales"],
    "The City of Qasala": ["/desert/qasala.phtml", "locales", "locales"],
    "Tyrannia": ["/prehistoric/index.phtml", "locales", "locales"],
    "Tyrannian Plateau": ["/prehistoric/plateau.phtml", "locales", "locales"],
    "Virtupets Space Station": ["/space/index.phtml", "locales", "locales"],
    "Virtupets: Hangar": ["/space/hangar.phtml", "locales", "locales"],
    "Virtupets: Recreation Dock": ["/space/recreation.phtml", "locales", "locales"],

}

