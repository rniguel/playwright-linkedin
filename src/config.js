const config = {
  targetCompany: (process.env.TARGET_COMPANY || "certisign").toLowerCase(),

  linkedinSearchUrl: process.env.LINKEDIN_SEARCH_URL || null,

  scrollWait: parseInt(process.env.DELAY_BETWEEN_ACTIONS) || 2500,

  postScrollWait: parseInt(process.env.DELAY_AFTER_SCROLL) || 1500,

  connectWaitMin: 4000,
  connectWaitMax: 8000,
  connectWaitOverride: parseInt(process.env.DELAY_BETWEEN_CONNECTIONS),

  maxScrolls: parseInt(process.env.MAX_SCROLLS) || 15,

  maxRetries: parseInt(process.env.MAX_RETRIES) || 3,
};

if (config.connectWaitOverride) {
  config.connectWaitMin = config.connectWaitOverride;
  config.connectWaitMax = config.connectWaitOverride;
}

const VALID_FILTER_CODES = ["F", "S", "O"];

const rawFilter = process.env.LINKEDIN_NETWORK_FILTER || "S";
const parsedCodes = rawFilter
  .split(",")
  .map((c) => c.trim().toUpperCase())
  .filter((c) => VALID_FILTER_CODES.includes(c));

const invalidCodes = rawFilter
  .split(",")
  .map((c) => c.trim().toUpperCase())
  .filter((c) => c && !VALID_FILTER_CODES.includes(c));

if (invalidCodes.length > 0) {
  console.warn(
    `[config] ⚠️ LINKEDIN_NETWORK_FILTER contém códigos inválidos: ${invalidCodes.join(", ")}. Valores aceitos: F, S, O`
  );
}

config.networkFilterCodes = parsedCodes.length > 0 ? parsedCodes : ["S"];

config.networkFilterEncoded = encodeURIComponent(
  JSON.stringify(config.networkFilterCodes)
).replace(/%2C/g, ",");

if (!config.linkedinSearchUrl) {
  const keyword = config.targetCompany;
  config.linkedinSearchUrl = `https://www.linkedin.com/search/results/people/?keywords=${encodeURIComponent(keyword)}&network=${config.networkFilterEncoded}`;
  console.log(
    `[config] 🔍 URL construída: keyword="${keyword}", network=${JSON.stringify(config.networkFilterCodes)}`
  );
}

function validate() {
  const checks = [
    { key: "scrollWait", value: config.scrollWait, name: "DELAY_BETWEEN_ACTIONS" },
    { key: "postScrollWait", value: config.postScrollWait, name: "DELAY_AFTER_SCROLL" },
    { key: "maxScrolls", value: config.maxScrolls, name: "MAX_SCROLLS" },
    { key: "maxRetries", value: config.maxRetries, name: "MAX_RETRIES" },
    { key: "connectWaitMin", value: config.connectWaitOverride, name: "DELAY_BETWEEN_CONNECTIONS" },
  ];

  for (const check of checks) {
    if (check.value && (isNaN(check.value) || check.value < 0)) {
      console.warn(`[config] ⚠️ ${check.name} inválido, usando valor padrão`);
    }
  }
}

validate();

module.exports = config;
