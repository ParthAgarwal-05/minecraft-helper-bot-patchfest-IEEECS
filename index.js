// minecraft-helper-bot / index.js
// Minimal PatchFest Starter Bot

require('dotenv').config();
const mineflayer = require('mineflayer');

// Create the bot instance
const bot = mineflayer.createBot({
  host: process.env.MC_HOST || "localhost",     // Server IP
  port: process.env.MC_PORT ? parseInt(process.env.MC_PORT) : 425565,
  username: process.env.MC_USERNAME || "PatchFestBot" // Bot username
});

// Bot events
bot.once("spawn", () => {
  console.log("🤖 Bot successfully spawned into the world!");
});

// Basic chat command listener
bot.on("chat", (username, message) => {

  if (username === bot.username) return;

  if (message.toLowerCase().startsWith(".hello")) {
    bot.chat(`Hello ${username}! I am your helper bot 🤝`);
  }
  
  if (message.startsWith(".coords")) {
      const p = bot.entity.position;
      bot.chat(`I am at ${p.x.toFixed(0)}, ${p.y.toFixed(0)}, ${p.z.toFixed(0)}`);
  }
});