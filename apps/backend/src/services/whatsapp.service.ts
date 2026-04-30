/**
 * WhatsApp Business Cloud API (Meta) service
 * Docs: https://developers.facebook.com/docs/whatsapp/cloud-api
 */

const WHATSAPP_TOKEN = process.env.WHATSAPP_TOKEN!;
const PHONE_NUMBER_ID = process.env.WHATSAPP_PHONE_NUMBER_ID!;
const API_URL = `https://graph.facebook.com/v19.0/${PHONE_NUMBER_ID}/messages`;

export interface InboundMessage {
  waMessageId: string;
  from: string;        // phone number in E.164 format
  body: string;
  timestamp: number;
}

/**
 * Send a text message to a WhatsApp number.
 */
export async function sendMessage(to: string, body: string): Promise<string> {
  const response = await fetch(API_URL, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${WHATSAPP_TOKEN}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      messaging_product: 'whatsapp',
      recipient_type: 'individual',
      to,
      type: 'text',
      text: { body },
    }),
  });

  if (!response.ok) {
    const err = await response.json();
    throw new Error(`WhatsApp API error: ${JSON.stringify(err)}`);
  }

  const data: any = await response.json();
  return data.messages?.[0]?.id ?? '';
}

/**
 * Parse the Meta webhook payload and extract messages from a standard webhook event.
 * Returns an array of InboundMessage (may be empty for status updates, etc.)
 */
export function parseWebhookPayload(body: any): InboundMessage[] {
  const results: InboundMessage[] = [];
  try {
    const entries = body?.entry ?? [];
    for (const entry of entries) {
      for (const change of entry.changes ?? []) {
        for (const msg of change.value?.messages ?? []) {
          if (msg.type === 'text') {
            results.push({
              waMessageId: msg.id,
              from: msg.from,
              body: msg.text?.body ?? '',
              timestamp: Number(msg.timestamp),
            });
          }
        }
      }
    }
  } catch {
    // Malformed payload — return empty
  }
  return results;
}
