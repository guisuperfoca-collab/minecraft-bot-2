import mineflayer from "mineflayer";

const HOST = "Marshblack_2-6QHA.aternos.me";
const PORT = 14036;
const USERNAME = "Bot_ligado";

// ⚠️ MUITO IMPORTANTE:
// usa "auto" se não tens certeza da versão
const VERSION = false;

const RECONNECT_DELAY_MS = 10000;

let reconnecting = false;

function log(msg) {
  console.log(`[${new Date().toLocaleTimeString("pt-PT")}] ${msg}`);
}

function createBot() {
  log(`Ligando a ${HOST}:${PORT}...`);

  const bot = mineflayer.createBot({
    host: HOST,
    port: PORT,
    username: USERNAME,
    version: VERSION,
    auth: "offline"
  });

  bot.once("spawn", () => {
    log("✅ Bot entrou no servidor!");
  });

  bot.on("chat", (username, message) => {
    if (username === bot.username) return;
    console.log(`[CHAT] ${username}: ${message}`);
  });

  bot.on("kicked", (reason) => {
    console.log("❌ KICK:");
    console.log(reason);
  });

  bot.on("error", (err) => {
    console.log("❌ ERRO:");
    console.log(err);
  });

  bot.on("end", () => {
    log("🔌 Bot desconectou!");

    if (reconnecting) return;
    reconnecting = true;

    setTimeout(() => {
      reconnecting = false;
      createBot();
    }, RECONNECT_DELAY_MS);
  });
}

createBot();
