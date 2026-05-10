require("dotenv").config();

const { chromium } = require("playwright");

const TARGET_COMPANY = (
  process.env.TARGET_COMPANY || "certisign"
).toLowerCase();

const SEARCH_URL =
  process.env.LINKEDIN_SEARCH_URL ||
  "https://www.linkedin.com/search/results/people/?keywords=certisign&network=%5B%22S%22%5D";

(async () => {
  const browser = await chromium.launch({
    headless: false,
    slowMo: 800,
  });

  const context = await browser.newContext();

  const page = await context.newPage();

  //
  // LOGIN
  //
  await page.goto("https://www.linkedin.com/login");

  console.log("👉 Faça login manualmente");

  await page.waitForTimeout(30000);

  //
  // BUSCA
  //
  await page.goto(SEARCH_URL);

  let pagina = 1;

  while (true) {
    console.log("\n========================");
    console.log(`📄 Página ${pagina}`);
    console.log("========================");

    //
    // SCROLL FORTE
    //
    let lastHeight = 0;

    for (let i = 0; i < 15; i++) {
      await page.mouse.wheel(0, 3500);

      console.log(`📜 Scroll ${i + 1}`);

      await page.waitForTimeout(2500);

      const height = await page.evaluate(() => {
        return document.body.scrollHeight;
      });

      if (height === lastHeight) {
        console.log("✅ Fim da página");
        break;
      }

      lastHeight = height;
    }

    await page.waitForTimeout(3000);

    //
    // CONTROLE DE ENVIADOS
    //
    const enviados = new Set();

    //
    // LOOP DE PROCESSAMENTO
    //
    while (true) {
      //
      // PEGA TODOS BOTÕES
      //
      const buttons = page.locator(
        'a[aria-label*="conectar"], button[aria-label*="conectar"]',
      );

      const count = await buttons.count();

      console.log(`👥 ${count} possíveis botões`);

      let encontrouNovo = false;

      for (let i = 0; i < count; i++) {
        try {
          const btn = buttons.nth(i);

          //
          // VISIBILIDADE
          //
          if (!(await btn.isVisible())) {
            continue;
          }

          //
          // LABEL
          //
          const label = ((await btn.getAttribute("aria-label")) || "").trim();

          if (!label.toLowerCase().includes("conectar")) {
            continue;
          }

          //
          // JÁ ENVIADO
          //
          if (enviados.has(label)) {
            continue;
          }

          //
          // PEGA CARD
          //
          const card = btn.locator("xpath=ancestor::div[@role='listitem'][1]");

          const cardText = await card.innerText();

          //
          // FILTRO EMPRESA ATUAL
          //
          const trabalhaNaEmpresa =
            cardText.includes("Atual:") &&
            cardText.toLowerCase().includes(TARGET_COMPANY);

          if (!trabalhaNaEmpresa) {
            console.log("⏭️ Ignorado - não trabalha atualmente na empresa");

            enviados.add(label);

            continue;
          }

          //
          // MARCA COMO PROCESSADO
          //
          enviados.add(label);

          encontrouNovo = true;

          console.log(`\n👉 ${label}`);

          //
          // SCROLL
          //
          await btn.scrollIntoViewIfNeeded();

          await page.waitForTimeout(1500);

          //
          // CLICA CONECTAR
          //
          await btn.click({
            force: true,
          });

          console.log("📨 Modal aberto");

          await page.waitForTimeout(2500);

          //
          // BOTÃO ENVIAR SEM NOTA
          //
          const sendBtn = page.locator('button:has-text("Enviar sem nota")');

          if ((await sendBtn.count()) > 0) {
            await sendBtn.first().click({
              force: true,
            });

            console.log("✅ Convite enviado");
          } else {
            console.log("⚠️ Não encontrou botão 'Enviar sem nota'");

            await page.keyboard.press("Escape");
          }

          //
          // DELAY HUMANO
          //
          await page.waitForTimeout(4000 + Math.random() * 4000);

          //
          // SCROLL PEQUENO
          //
          await page.mouse.wheel(0, 1200);

          await page.waitForTimeout(1500);
        } catch (err) {
          console.log("❌ Erro nesse perfil");

          try {
            await page.keyboard.press("Escape");
          } catch {}

          await page.waitForTimeout(2000);
        }
      }

      //
      // ACABOU
      //
      if (!encontrouNovo) {
        console.log("\n✅ Todos convites possíveis enviados");

        break;
      }
    }

    //
    // PRÓXIMA PÁGINA
    //
    console.log("\n➡️ Tentando próxima página...");

    try {
      const nextButton = page.locator(
        'button[aria-label="Próximo"], button:has-text("Próxima")',
      );

      const nextCount = await nextButton.count();

      if (nextCount === 0) {
        console.log("🏁 Não existe próxima página");

        break;
      }

      const btn = nextButton.first();

      //
      // DESABILITADO
      //
      const disabled = await btn.getAttribute("disabled");

      if (disabled !== null) {
        console.log("🏁 Última página");

        break;
      }

      await btn.scrollIntoViewIfNeeded();

      await page.waitForTimeout(2000);

      await btn.click({
        force: true,
      });

      console.log("➡️ Próxima página aberta");

      pagina++;

      //
      // ESPERA CARREGAR
      //
      await page.waitForTimeout(6000);
    } catch (err) {
      console.log("❌ Não conseguiu avançar página");

      break;
    }
  }

  console.log("\n🏁 FINALIZADO");
})();
