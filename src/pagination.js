async function goToNextPage(page) {
  console.log("[pagination] ➡️ Tentando próxima página...");

  try {
    const nextButton = page.locator(
      'button[aria-label="Próximo"], button:has-text("Próxima")'
    );

    const nextCount = await nextButton.count();
    if (nextCount === 0) {
      console.log("[pagination] 🏁 Não existe próxima página");
      return false;
    }

    const btn = nextButton.first();
    const disabled = await btn.getAttribute("disabled");
    if (disabled !== null) {
      console.log("[pagination] 🏁 Última página");
      return false;
    }

    await btn.scrollIntoViewIfNeeded();
    await delay(2000);
    await btn.click({ force: true });
    console.log("[pagination] ➡️ Próxima página aberta");

    await delay(6000);
    return true;
  } catch (err) {
    console.log("[pagination] ❌ Não conseguiu avançar página");
    return false;
  }
}

function delay(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

module.exports = { goToNextPage };
