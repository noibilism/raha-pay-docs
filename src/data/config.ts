export const docsConfig = {
  baseUrls: {
    sandbox: "https://sandbox-api.rahapay.co.ke",
    live: "https://api.rahapay.co.ke",
  },
  keys: {
    sandbox: { secret: "sk_test_51RahaExample", public: "pk_test_51RahaExample" },
    live: { secret: "sk_live_51RahaExample", public: "pk_live_51RahaExample" },
  },
  authHeader: "Authorization",
  webhookSignatureHeader: "Raha-Signature",
  dashboardUrl: "https://dashboard.rahapay.co.ke",
  supportEmail: "developers@rahapay.co.ke",
  statusUrl: "https://status.rahapay.co.ke",
} as const;

export type CodeLanguage = "curl" | "node" | "python" | "php";
export type Environment = "sandbox" | "live";

export function environmentValues(environment: Environment) {
  return {
    baseUrl: docsConfig.baseUrls[environment],
    secretKey: docsConfig.keys[environment].secret,
    publicKey: docsConfig.keys[environment].public,
  };
}