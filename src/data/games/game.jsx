import minecraft from "../../assets/dashboard_images/minecraft2048x2048.png";
import roblox from "../../assets/dashboard_images/Roblox.png";
import fortnite from "../../assets/dashboard_images/Fortnite.jpg";
import amongUs from "../../assets/dashboard_images/AmongUs.png";

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
      { platform: "Epic Games", price: "Free", url: "https://store.epicgames.com/en-US/p/fortnite"},
      { platform: "PlayStation Store", price: "$0", url: "https://store.playstation.com/en-us/product/UP1477-PPSA01922_00-FNBNDL0000000000"},
    ],
    reviews: [
      {
        user: "User123",
        rating: 5,
        comment: "Super fun with friends!"
      },
      {
        user: "Anonymous",
        rating: 4,
        comment: "Great mechanics but sweaty players."
      }
    ]
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
      { platform: "Nintendo Switch eShop", price: "$29", url: "https://www.nintendo.com/us/store/products/minecraft-switch/"},
      { platform: "Xbox Store", price: "$20" , url: "https://www.xbox.com/en-us/games/store/minecraft/9mvxmvt8zkwc"},
      { platform: "Steam", price: "$25" , url: "https://store.steampowered.com/app/1672970/Minecraft_Dungeons/"},
    ],
    reviews: [
      {
        user: "Steve",
        rating: 5,
        comment: "Best game ever made."
      },
      {
        user: "Anonymous",
        rating: 2,
        comment: "Skeletons are overpowered 😭"
      }
    ]
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
    prices: [{ platform: "Official", price: "Free", url: "https://www.roblox.com/download"}],
    reviews: []
  },
  {
    id: "among-us",
    title: "Among Us",
    image: amongUs,
    tags: ["Multiplayer", "Party", "Strategy"],
    description:
      "Among Us is a social deduction game where players identify the impostor.",
    rating: 4.5,
    hoursPlayedAvg: 40,
    prices: [{ platform: "Steam", price: "$5", url: "https://store.steampowered.com/app/945360/Among_Us/"}],
    reviews: []
  }
];