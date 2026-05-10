const { chromium } = require("playwright");

async function login(page) {
  console.log("[auth] 👉 Faça login manualmente");
  await page.goto("https://www.linkedin.com/login");
  await page.waitForTimeout(30000);
  console.log("[auth] ✅ Login concluído");
}

async function createSession() {
  console.log("[auth] 🚀 Iniciando navegador...");
  const browser = await chromium.launch({
    headless: false,
    slowMo: 800,
  });
  const context = await browser.newContext();
  const page = await context.newPage();
  return { browser, context, page };
}

module.exports = { login, createSession };
