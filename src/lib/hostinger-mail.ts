import "server-only";

import {
  AccountApi,
  Configuration,
  SendApi,
} from "hostinger-mail-api-sdk";

/** Create authenticated clients only inside server routes or server actions. */
export function getHostingerMail() {
  const accessToken = process.env.HOSTINGER_MAIL_API_TOKEN;

  if (!accessToken) {
    throw new Error("HOSTINGER_MAIL_API_TOKEN is not configured.");
  }

  const configuration = new Configuration({
    accessToken,
    baseOptions: { timeout: 15_000 },
  });

  return {
    account: new AccountApi(configuration),
    send: new SendApi(configuration),
  };
}
