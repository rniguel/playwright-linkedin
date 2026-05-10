const config = require("./config");

async function navigateToSearch(page) {
  console.log(`[search] 🔍 Navegando para busca...`);
  await page.goto(config.linkedinSearchUrl);
}

async function scrollPage(page) {
  let lastHeight = 0;

  for (let i = 0; i < config.maxScrolls; i++) {
    await page.mouse.wheel(0, 3500);
    console.log(`[search] 📜 Scroll ${i + 1}`);
    await page.waitForTimeout(config.scrollWait);

    const height = await page.evaluate(() => document.body.scrollHeight);
    if (height === lastHeight) {
      console.log("[search] ✅ Fim da página");
      return;
    }
    lastHeight = height;
  }
}

async function getConnectButtons(page) {
  return page.locator(
    'a[aria-label*="conectar"], button[aria-label*="conectar"]'
  );
}

async function getCardText(page, button) {
  const card = button.locator("xpath=ancestor::div[@role='listitem'][1]");
  return card.innerText();
}

function isTargetCompany(cardText, targetCompany) {
  return (
    cardText.includes("Atual:") &&
    cardText.toLowerCase().includes(targetCompany)
  );
}

module.exports = {
  navigateToSearch,
  scrollPage,
  getConnectButtons,
  getCardText,
  isTargetCompany,
};
