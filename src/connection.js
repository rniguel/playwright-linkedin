const config = require("./config");
const { getCardText, isTargetCompany } = require("./search");

async function clickConnectButton(btn, page) {
  await btn.scrollIntoViewIfNeeded();
  await pageWait(1500);
  await btn.click({ force: true });
  console.log("[connection] 📨 Modal aberto");
  await pageWait(2500);
}

async function sendWithoutNote(page) {
  const sendBtn = page.locator('button:has-text("Enviar sem nota")');
  if ((await sendBtn.count()) > 0) {
    await sendBtn.first().click({ force: true });
    console.log("[connection] ✅ Convite enviado");
    return true;
  }
  console.log("[connection] ⚠️ Não encontrou botão 'Enviar sem nota'");
  await page.keyboard.press("Escape");
  return false;
}

function getDelay() {
  if (config.connectWaitOverride) {
    return config.connectWaitOverride;
  }
  return (
    config.connectWaitMin +
    Math.random() * (config.connectWaitMax - config.connectWaitMin)
  );
}

function pageWait(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

async function processConnection(page, btn, label, sentSet, targetCompany) {
  if (!(await btn.isVisible())) {
    return false;
  }

  const labelText = ((await btn.getAttribute("aria-label")) || "").trim();
  if (!labelText.toLowerCase().includes("conectar")) {
    return false;
  }

  if (sentSet.has(labelText)) {
    return false;
  }

  const cardText = await getCardText(page, btn);
  if (!isTargetCompany(cardText, targetCompany)) {
    console.log(
      "[connection] ⏭️ Ignorado — não trabalha atualmente na empresa"
    );
    sentSet.add(labelText);
    return false;
  }

  sentSet.add(labelText);
  console.log(`[connection] 👉 ${labelText}`);

  await clickConnectButton(btn, page);
  await sendWithoutNote(page);

  const delay = getDelay();
  console.log(`[connection] ⏳ Aguardando ${Math.round(delay)}ms...`);
  await pageWait(delay);

  await page.mouse.wheel(0, 1200);
  await pageWait(1500);

  return true;
}

module.exports = { processConnection, getDelay, pageWait };
