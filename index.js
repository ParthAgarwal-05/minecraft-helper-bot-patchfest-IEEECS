// minecraft-helper-bot / index.js
// Minimal PatchFest Starter Bot

require('dotenv').config();
const mineflayer = require('mineflayer');

// Create the bot instance
const bot = mineflayer.createBot({
  host: process.env.MC_HOST || "localhost",
  // Fixed the port typo (425565 -> 25565) or use your specific port
  port: process.env.MC_PORT ? parseInt(process.env.MC_PORT) : 25565,
  username: process.env.MC_USERNAME || "PatchFestBot"
});

// Bot events
bot.once("spawn", () => {
  console.log("🤖 Bot successfully spawned into the world!");
});

// Chat listener (Async is needed for the equip command)
bot.on("chat", async (username, message) => {


  // Ignore messages from the bot itself
  if (username === bot.username) return;

  // Command: .hello
  if (message.toLowerCase().startsWith(".hello")) {
    bot.chat(`Hello ${username}! I am your helper bot 🤝`);
  }
  
  // Command: .coords
  if (message.startsWith(".coords")) {
      const p = bot.entity.position;
      bot.chat(`I am at ${p.x.toFixed(0)}, ${p.y.toFixed(0)}, ${p.z.toFixed(0)}`);
  }

  // Command: .equip <item_name>
  if (message.startsWith(".equip")) {
    const args = message.split(" ");
    if (args.length < 2) {
      bot.chat("Please specify an item! Usage: .equip <name>");
      return;
    }

    const itemName = args[1];

    // Search inventory for the item
    const item = bot.inventory.items().find(item => item.name.includes(itemName));

    if (item) {
      try {
        await bot.equip(item, 'hand');
        bot.chat(`I equipped the ${item.name}! ⚔️`);

      } catch (err) {
        bot.chat(`I found it but couldn't equip it: ${err.message}`);

      }
    } else {
      bot.chat(`I don't have a "${itemName}" in my inventory.`);

    }
  }
});