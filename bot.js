import mineflayer from "mineflayer";

const HOST = "Marshblack_2-6QHA.aternos.me";
const PORT = 14036;
const USERNAME = "Bot_ligado";
const VERSION = false

const RECONNECT_DELAY_MS = 10000;

let reconnectTimer = null;
let bot = null;

function log(msg) {
  console.log(`[${new Date().toLocaleTimeString("pt-PT")}] ${msg}`);
}

function createBot() {
  log(`Conectando a ${HOST}:${PORT} como ${USERNAME}...`);

  bot = mineflayer.createBot({
    host: HOST,
    port: PORT,
    username: USERNAME,
    version: VERSION,
    auth: "offline"
  });

  bot.once("spawn", () => {
    log("✅ Bot conectado com sucesso!");
  });

  bot.on("chat", (username, message) => {
    if (username === bot.username) return;
    console.log(`[CHAT] ${username}: ${message}`);
  });

  bot.on("messagestr", (message) => {
    console.log(`[SERVER] ${message}`);
  });

  bot.on("kicked", (reason) => {
    console.log("❌ KICKADO:", reason?.toString?.() || reason);
  });

  bot.on("error", (err) => {
    console.log("❌ ERRO:", err);
  });

  bot.on("end", () => {
    console.log("🔌 Bot desconectado");

    if (reconnectTimer) return;

    reconnectTimer = setTimeout(() => {
      reconnectTimer = null;
      createBot();
    }, RECONNECT_DELAY_MS);
  });
}

createBot();
