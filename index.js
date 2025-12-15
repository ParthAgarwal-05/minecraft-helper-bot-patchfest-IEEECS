// minecraft-helper-bot / index.js
// Minimal PatchFest Starter Bot

require('dotenv').config();
const mineflayer = require('mineflayer');

// Create the bot instance
const bot = mineflayer.createBot({
  host: process.env.MC_HOST || "localhost",
  port: process.env.MC_PORT ? parseInt(process.env.MC_PORT) : 25565,
  username: process.env.MC_USERNAME || "PatchFestBot"
});

// Bot events
bot.once("spawn", () => {
  console.log("🤖 Bot successfully spawned into the world!");
});

// Chat listener
bot.on("chat", async (username, message) => {

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

  // Command: .dropall
  if (message === ".dropall") {
    // Get a list of all items currently in inventory
    const items = bot.inventory.items();

    if (items.length === 0) {
      bot.chat("My inventory is already empty! 🤷");
      return;
    }

    bot.chat(`Dropping ${items.length} stack(s) of items...`);

    // Loop through every item and toss it
    for (const item of items) {
      try {
        await bot.tossStack(item);
      } catch (err) {
        // Error handling silently ignored
      }
    }

    bot.chat("All items dropped! 🗑️");
  }
});