import mineflayer from "mineflayer";

const HOST = "Marshblack_2-6QHA.aternos.me";
const PORT = 14036;
const USERNAME = "Bot_ligado";
const VERSION = "1.21.2";

const RECONNECT_DELAY_MS = 10000;

let reconnectTimer = null;

function log(msg) {
  console.log(`[${new Date().toLocaleTimeString("pt-PT")}] ${msg}`);
}

function createBot() {
  log(`Conectando a ${HOST}:${PORT} como ${USERNAME}...`);

  const bot = mineflayer.createBot({
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
    if (username === USERNAME) return;
    console.log(`[CHAT] ${username}: ${message}`);
  });

  bot.on("messagestr", (message) => {
    console.log(`[SERVER] ${message}`);
  });

  bot.on("kicked", (reason) => {
    console.log("❌ KICKADO:");
    console.log(reason);
  });

  bot.on("error", (err) => {
    console.log("❌ ERRO:");
    console.log(err);
  });

  bot.on("end", (reason) => {
    console.log("🔌 Conexão encerrada:");
    console.log(reason);

    if (reconnectTimer) return;

    log(`Reconectando em ${RECONNECT_DELAY_MS / 1000} segundos...`);

    reconnectTimer = setTimeout(() => {
      reconnectTimer = null;
      createBot();
    }, RECONNECT_DELAY_MS);
  });
}

createBot();
