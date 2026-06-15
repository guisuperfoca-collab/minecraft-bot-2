import mineflayer from "mineflayer";

const HOST = "Marshblack_2-6QHA.aternos.me";
const PORT = 14036;
const USERNAME = "Bot_ligado";
const VERSION = "1.21.2";
const RECONNECT_DELAY_MS = 10_000;

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
    auth: "offline",
    hideErrors: false,
  });

  bot.once("spawn", () => {
    log("Bot conectado e dentro do servidor!");
  });

  bot.on("chat", (username, message) => {
    if (username === USERNAME) return;
    log(`[Chat] ${username}: ${message}`);
  });

  bot.on("kicked", (reason) => {
    log(`Bot foi kickado: ${reason}`);
    scheduleReconnect();
  });

  bot.on("error", (err) => {
    log(`Erro: ${err.message}`);
    scheduleReconnect();
  });

  bot.on("end", (reason) => {
    log(`Conexão encerrada: ${reason}`);
    scheduleReconnect();
  });
}

function scheduleReconnect() {
  if (reconnectTimer) return;
  log(`Reconectando em ${RECONNECT_DELAY_MS / 1000} segundos...`);
  reconnectTimer = setTimeout(() => {
    reconnectTimer = null;
    createBot();
  }, RECONNECT_DELAY_MS);
}

createBot();
