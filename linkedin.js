require("dotenv").config();

const config = require("./src/config");
const { createSession, login } = require("./src/auth");
const { navigateToSearch, scrollPage, getConnectButtons } = require("./src/search");
const { processConnection } = require("./src/connection");
const { goToNextPage } = require("./src/pagination");

(async () => {
  try {
    const { browser, page } = await createSession();
    console.log("[app] 🚀 Sessão iniciada");

    await login(page);
    await navigateToSearch(page);

    let pagina = 1;

    while (true) {
      console.log(`[app] 📄 Página ${pagina}`);
      await scrollPage(page);
      await delay(3000);

      const sentSet = new Set();

      while (true) {
        const buttons = await getConnectButtons(page);
        const count = await buttons.count();
        console.log(`[app] 👥 ${count} possíveis botões`);

        let foundNew = false;

        for (let i = 0; i < count; i++) {
          try {
            const btn = buttons.nth(i);
            const label = ((await btn.getAttribute("aria-label")) || "").trim();
            if (!label.toLowerCase().includes("conectar")) continue;

            const processed = await processConnection(
              page, btn, label, sentSet, config.targetCompany
            );
            if (processed) foundNew = true;
          } catch (err) {
            console.log("[app] ❌ Erro nesse perfil");
            try {
              await page.keyboard.press("Escape");
            } catch {}
            await delay(2000);
          }
        }

        if (!foundNew) {
          console.log("[app] ✅ Todos convites possíveis enviados");
          break;
        }
      }

      const hasNext = await goToNextPage(page);
      if (!hasNext) break;
      pagina++;
    }

    console.log("[app] 🏁 FINALIZADO");
    await browser.close();
  } catch (err) {
    console.error("[app] 💥 Erro fatal:", err.message);
    process.exit(1);
  }
})();

function delay(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}
