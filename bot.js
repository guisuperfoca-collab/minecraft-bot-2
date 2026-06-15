import mineflayer from "mineflayer";

const HOST = "Marshblack_2-6QHA.aternos.me";
const PORT = 14036;
const USERNAME = "Bot_ligado";
const VERSION = "1.20.4";

const RECONNECT_DELAY = 10000;

process.on("uncaughtException", console.log);
process.on("unhandledRejection", console.log);

function log(msg) {
  console.log(`[${new Date().toLocaleTimeString("pt-PT")}] ${msg}`);
}

function createBot() {
  const bot = mineflayer.createBot({
    host: HOST,
    port: PORT,
    username: USERNAME,
    version: VERSION,
    auth: "offline"
  });

  bot.once("spawn", () => {
    log("✅ Bot online");
  });

  bot.on("kicked", (reason) => {
    console.log("❌ KICK:", reason);
  });

  bot.on("error", (err) => {
    console.log("❌ ERROR:", err);
  });

  bot.on("end", () => {
    log("🔌 Desconectado... reconectando");

    setTimeout(() => {
      createBot();
    }, RECONNECT_DELAY);
  });
}

createBot();

// 🔥 mantém Railway vivo
setInterval(() => {
  console.log("💓 keepalive");
}, 30000);
