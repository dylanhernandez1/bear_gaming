import minecraft from "../../assets/dashboard_images/minecraft2048x2048.png";
import roblox from "../../assets/dashboard_images/Roblox.png";
import fortnite from "../../assets/dashboard_images/Fortnite.jpg";
import amongUs from "../../assets/dashboard_images/AmongUs.png";

// CDN covers for additional games (no local assets needed)
const apexUrl        = "https://upload.wikimedia.org/wikipedia/en/d/db/Apex_legends_cover.jpg";
const valorantUrl    = "https://store-images.s-microsoft.com/image/apps.21507.13663857844271189.4c1de202-3961-4c40-a0aa-7f4f1388775a.20ed7782-0eda-4f9d-b421-4cc47492edc6";
const leagueUrl      = "https://mediaproxy.tvtropes.org/width/1200/https://static.tvtropes.org/pmwiki/pub/images/leagueoflegends.png";
const overwatchUrl   = "https://upload.wikimedia.org/wikipedia/en/thumb/8/89/Overwatch_2_Steam_artwork.jpg/250px-Overwatch_2_Steam_artwork.jpg";
const gtaUrl         = "https://upload.wikimedia.org/wikipedia/en/thumb/a/a5/Grand_Theft_Auto_V.png/250px-Grand_Theft_Auto_V.png";
const codUrl         = "https://store-images.s-microsoft.com/image/apps.55183.13612848337674936.f9e71e15-6765-4282-8a3d-968dccfb729c.f59acc22-2c7b-41fb-96ca-d173dc290712";
const eldenRingUrl   = "https://upload.wikimedia.org/wikipedia/en/b/b9/Elden_Ring_Box_art.jpg";
const stardewUrl     = "https://upload.wikimedia.org/wikipedia/en/f/fd/Logo_of_Stardew_Valley.png";
const hollowKnightUrl= "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQlX0XzMgaLleJG-WgAUDUhTrLav5Mcr9BaSZSvE0DfbAPXEsr5wESN_lnk0o4SF_Tj_kZJ&s=10";
const terrariaUrl    = "https://upload.wikimedia.org/wikipedia/en/1/1a/Terraria_Steam_artwork.jpg";

export const games = [
  {
    id: "fortnite",
    title: "Fortnite",
    image: fortnite,
    tags: ["Multiplayer", "Battle Royale", "Shooter"],
    description:
      "Fortnite is a battle royale game where 100 players fight to be the last one standing.",
    rating: 4.6,
    hoursPlayedAvg: 120,
    prices: [
      { platform: "Epic Games", price: "Free", url: "https://store.epicgames.com/en-US/p/fortnite" },
      { platform: "PlayStation Store", price: "$0", url: "https://store.playstation.com/en-us/product/UP1477-PPSA01922_00-FNBNDL0000000000" },
    ],
    reviews: [
      { user: "User123", rating: 5, comment: "Super fun with friends!" },
      { user: "Anonymous", rating: 4, comment: "Great mechanics but sweaty players." },
    ],
  },
  {
    id: "minecraft",
    title: "Minecraft",
    image: minecraft,
    tags: ["Sandbox", "Survival", "Multiplayer"],
    description:
      "Minecraft is a 3D sandbox adventure game where players explore, gather resources, and build in a procedurally generated world.",
    rating: 4.9,
    hoursPlayedAvg: 70,
    prices: [
      { platform: "Nintendo Switch eShop", price: "$29", url: "https://www.nintendo.com/us/store/products/minecraft-switch/" },
      { platform: "Xbox Store", price: "$20", url: "https://www.xbox.com/en-us/games/store/minecraft/9mvxmvt8zkwc" },
      { platform: "Steam", price: "$25", url: "https://store.steampowered.com/app/1672970/Minecraft_Dungeons/" },
    ],
    reviews: [
      { user: "Steve", rating: 5, comment: "Best game ever made." },
      { user: "Anonymous", rating: 2, comment: "Skeletons are overpowered 😭" },
    ],
  },
  {
    id: "roblox",
    title: "Roblox",
    image: roblox,
    tags: ["Sandbox", "Multiplayer"],
    description:
      "Roblox is an online platform where users create and play games made by others.",
    rating: 4.3,
    hoursPlayedAvg: 90,
    prices: [{ platform: "Official", price: "Free", url: "https://www.roblox.com/download" }],
    reviews: [],
  },
  {
    id: "among-us",
    title: "Among Us",
    image: amongUs,
    tags: ["Multiplayer", "Party", "Strategy"],
    description:
      "Among Us is a social deduction game where players identify the impostor among the crew.",
    rating: 4.5,
    hoursPlayedAvg: 40,
    prices: [{ platform: "Steam", price: "$5", url: "https://store.steampowered.com/app/945360/Among_Us/" }],
    reviews: [],
  },
  {
    id: "apex-legends",
    title: "Apex Legends",
    image: apexUrl,
    tags: ["Multiplayer", "Battle Royale", "Shooter"],
    description:
      "Apex Legends is a free-to-play battle royale hero shooter where legendary competitors use unique abilities to battle for glory.",
    rating: 4.5,
    hoursPlayedAvg: 110,
    prices: [
      { platform: "Steam", price: "Free", url: "https://store.steampowered.com/app/1172470/Apex_Legends/" },
      { platform: "EA App", price: "Free", url: "https://www.ea.com/games/apex-legends" },
    ],
    reviews: [
      { user: "wraith_main", rating: 5, comment: "Best movement in any BR. Ping system is genius." },
      { user: "Anonymous", rating: 4, comment: "Incredibly fun but ranked can be frustrating." },
    ],
  },
  {
    id: "valorant",
    title: "Valorant",
    image: valorantUrl,
    tags: ["Multiplayer", "Shooter", "Strategy"],
    description:
      "Valorant is a 5v5 tactical shooter where agents with unique abilities face off in precise gunfights.",
    rating: 4.7,
    hoursPlayedAvg: 200,
    prices: [
      { platform: "Riot Games", price: "Free", url: "https://playvalorant.com/" },
    ],
    reviews: [
      { user: "jett_player", rating: 5, comment: "Perfect blend of CS gunplay and Overwatch abilities." },
      { user: "Anonymous", rating: 4, comment: "Needs a better anti-cheat. Still addicted though." },
    ],
  },
  {
    id: "league-of-legends",
    title: "League of Legends",
    image: leagueUrl,
    tags: ["Multiplayer", "Strategy", "MOBA"],
    description:
      "League of Legends is a team-based strategy game where two teams of five champions battle to destroy the other's base.",
    rating: 4.2,
    hoursPlayedAvg: 300,
    prices: [
      { platform: "Riot Games", price: "Free", url: "https://signup.leagueoflegends.com/" },
    ],
    reviews: [
      { user: "diamond_elo", rating: 5, comment: "Deepest competitive game ever made. Never get bored." },
      { user: "Anonymous", rating: 3, comment: "Great game, terrible community. Still can't quit." },
    ],
  },
  {
    id: "overwatch-2",
    title: "Overwatch 2",
    image: overwatchUrl,
    tags: ["Multiplayer", "Shooter", "Team"],
    description:
      "Overwatch 2 is a team-based action game set in an optimistic future where every match is a 5v5 battle across the globe.",
    rating: 4.0,
    hoursPlayedAvg: 80,
    prices: [
      { platform: "Battle.net", price: "Free", url: "https://overwatch.blizzard.com/" },
      { platform: "Steam", price: "Free", url: "https://store.steampowered.com/app/2357570/Overwatch_2/" },
    ],
    reviews: [
      { user: "mercy_main", rating: 4, comment: "Fun hero roster and great visuals. 5v5 feels better." },
      { user: "Anonymous", rating: 3, comment: "Miss OW1 but the gameplay is still solid." },
    ],
  },
  {
    id: "gta-v",
    title: "GTA V",
    image: gtaUrl,
    tags: ["Open World", "Multiplayer", "Action"],
    description:
      "Grand Theft Auto V is an action-adventure game set in the sprawling city of Los Santos, featuring a massive open world and online multiplayer.",
    rating: 4.8,
    hoursPlayedAvg: 150,
    prices: [
      { platform: "Steam", price: "$30", url: "https://store.steampowered.com/app/271590/Grand_Theft_Auto_V/" },
      { platform: "Epic Games", price: "$30", url: "https://store.epicgames.com/en-US/p/grand-theft-auto-v" },
      { platform: "PlayStation Store", price: "$30", url: "https://store.playstation.com/en-us/product/UP1004-PPSA03420_00-GTAVPLUSGFXBUNDLE" },
    ],
    reviews: [
      { user: "trevorFan", rating: 5, comment: "Endless content. Still the best open world ever made." },
      { user: "Anonymous", rating: 5, comment: "GTA Online alone is worth the price. Crazy replayability." },
    ],
  },
  {
    id: "call-of-duty-mw3",
    title: "Call of Duty: MW3",
    image: codUrl,
    tags: ["Multiplayer", "Shooter", "Action"],
    description:
      "Call of Duty: Modern Warfare 3 delivers high-octane multiplayer combat with iconic maps, Zombies, and a cinematic campaign.",
    rating: 4.1,
    hoursPlayedAvg: 90,
    prices: [
      { platform: "Steam", price: "$70", url: "https://store.steampowered.com/app/2519060/Call_of_Duty_Modern_Warfare_III/" },
      { platform: "PlayStation Store", price: "$70", url: "https://store.playstation.com/en-us/product/UP0002-PPSA17742_00-CODMWIII00000000" },
      { platform: "Xbox Store", price: "$70", url: "https://www.xbox.com/en-US/games/store/call-of-duty-modern-warfare-iii/9N76M99GJKG9" },
    ],
    reviews: [
      { user: "sniperKing", rating: 4, comment: "Multiplayer maps are classic. Campaign was short though." },
      { user: "Anonymous", rating: 4, comment: "Zombies mode is a blast with friends." },
    ],
  },
  {
    id: "elden-ring",
    title: "Elden Ring",
    image: eldenRingUrl,
    tags: ["RPG", "Action", "Singleplayer"],
    description:
      "Elden Ring is an action RPG set in the Lands Between, featuring a vast open world, deep lore by George R.R. Martin, and brutal but rewarding combat.",
    rating: 4.9,
    hoursPlayedAvg: 85,
    prices: [
      { platform: "Steam", price: "$60", url: "https://store.steampowered.com/app/1245620/ELDEN_RING/" },
      { platform: "PlayStation Store", price: "$60", url: "https://store.playstation.com/en-us/product/UP0101-PPSA06284_00-ELDENRING0000000" },
      { platform: "Xbox Store", price: "$60", url: "https://www.xbox.com/en-US/games/store/elden-ring/9P3J8S2BPLQ5" },
    ],
    reviews: [
      { user: "tarnished_one", rating: 5, comment: "Most rewarding game I have ever played. A masterpiece." },
      { user: "Anonymous", rating: 5, comment: "Brutal at first but once it clicks nothing compares." },
    ],
  },
  {
    id: "stardew-valley",
    title: "Stardew Valley",
    image: stardewUrl,
    tags: ["Singleplayer", "Simulation", "Indie"],
    description:
      "Stardew Valley is a farming simulation RPG where you build a life in a charming rural town, grow crops, raise animals, and befriend the locals.",
    rating: 4.9,
    hoursPlayedAvg: 60,
    prices: [
      { platform: "Steam", price: "$15", url: "https://store.steampowered.com/app/413150/Stardew_Valley/" },
      { platform: "Nintendo Switch eShop", price: "$15", url: "https://www.nintendo.com/us/store/products/stardew-valley-switch/" },
    ],
    reviews: [
      { user: "farmer_jas", rating: 5, comment: "Made by one person and better than most AAA games." },
      { user: "Anonymous", rating: 5, comment: "I lost 200 hours and I regret nothing." },
    ],
  },
  {
    id: "hollow-knight",
    title: "Hollow Knight",
    image: hollowKnightUrl,
    tags: ["Singleplayer", "Action", "Indie"],
    description:
      "Hollow Knight is a challenging 2D action-adventure through a vast underground kingdom of insects and heroes.",
    rating: 4.8,
    hoursPlayedAvg: 45,
    prices: [
      { platform: "Steam", price: "$15", url: "https://store.steampowered.com/app/367520/Hollow_Knight/" },
      { platform: "Nintendo Switch eShop", price: "$15", url: "https://www.nintendo.com/us/store/products/hollow-knight-switch/" },
    ],
    reviews: [
      { user: "silksong_waiter", rating: 5, comment: "Stunning art, tight combat, incredible world. A gem." },
      { user: "Anonymous", rating: 5, comment: "One of the best metroidvanias ever. Worth every penny." },
    ],
  },
  {
    id: "terraria",
    title: "Terraria",
    image: terrariaUrl,
    tags: ["Sandbox", "Survival", "Multiplayer"],
    description:
      "Terraria is a 2D sandbox adventure where you dig, fight, explore, and build in an endlessly replayable procedurally generated world.",
    rating: 4.8,
    hoursPlayedAvg: 100,
    prices: [
      { platform: "Steam", price: "$10", url: "https://store.steampowered.com/app/105600/Terraria/" },
      { platform: "Nintendo Switch eShop", price: "$30", url: "https://www.nintendo.com/us/store/products/terraria-switch/" },
    ],
    reviews: [
      { user: "moonlord_slayer", rating: 5, comment: "More content than games 10x its price. Incredible value." },
      { user: "Anonymous", rating: 5, comment: "500 hours in and still finding new things." },
    ],
  },
];