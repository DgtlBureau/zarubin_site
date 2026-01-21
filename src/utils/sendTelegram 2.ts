/**
 * Send a message to Telegram via server-side API route
 * This keeps the bot token secure on the server
 */
export async function sendTelegram(message: string): Promise<boolean> {
  try {
    const response = await fetch('/api/telegram', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ message }),
    });

    return response.ok;
  } catch (error) {
    console.error('Failed to send Telegram message:', error);
    return false;
  }
}

/**
 * Send a document/file to Telegram via server-side API route
 */
export async function sendTelegramDocument(
  document: File,
  caption: string
): Promise<boolean> {
  try {
    const formData = new FormData();
    formData.append('document', document, document.name);
    formData.append('caption', caption);

    const response = await fetch('/api/telegram/document', {
      method: 'POST',
      body: formData,
    });

    return response.ok;
  } catch (error) {
    console.error('Failed to send Telegram document:', error);
    return false;
  }
}
