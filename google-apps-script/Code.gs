const SHEET_ID = 'PASTE_YOUR_GOOGLE_SHEET_ID_HERE';
const SHEET_NAME = 'RMAs';
const SHARED_SECRET = 'PASTE_YOUR_SHARED_SECRET_HERE';
const EMAIL_TO = 'PASTE_YOUR_EMAIL_HERE';

function doPost(e) {
  try {
    const payload = JSON.parse(e.postData.contents || '{}');

    if (payload.token !== SHARED_SECRET) {
      return jsonResponse({ ok: false, error: 'Unauthorized' });
    }

    const sheet = SpreadsheetApp.openById(SHEET_ID).getSheetByName(SHEET_NAME);
    if (!sheet) {
      return jsonResponse({ ok: false, error: 'Sheet not found' });
    }

    if (payload.eventType === 'create_rma') {
      sheet.appendRow([
        new Date(),
        'CREATE',
        payload.orderNumber || '',
        payload.rmaNumber || '',
        payload.customerName || '',
        payload.deviceType || '',
        payload.brandModel || '',
        payload.serialNumber || '',
        payload.status || '',
        payload.reportedIssues || '',
        payload.possibleIssues || '',
        payload.warrantyText || '',
        JSON.stringify(payload.warrantyFlags || {})
      ]);

      MailApp.sendEmail({
        to: EMAIL_TO,
        subject: `New RMA Created - Order ${payload.orderNumber || ''}${payload.rmaNumber ? ' / RMA ' + payload.rmaNumber : ''}`,
        body:
          `Order Number: ${payload.orderNumber || ''}\n` +
          `RMA Number: ${payload.rmaNumber || ''}\n` +
          `Customer Name: ${payload.customerName || ''}\n` +
          `Device Type: ${payload.deviceType || ''}\n` +
          `Brand / Model: ${payload.brandModel || ''}\n` +
          `Serial Number: ${payload.serialNumber || ''}\n` +
          `Status: ${payload.status || ''}\n` +
          `Warranty: ${payload.warrantyText || ''}\n\n` +
          `Reported Issues:\n${payload.reportedIssues || ''}\n\n` +
          `Possible Issues / Observations:\n${payload.possibleIssues || ''}`
      });
    }

    if (payload.eventType === 'status_change') {
      sheet.appendRow([
        new Date(),
        'STATUS_CHANGE',
        payload.orderNumber || '',
        payload.rmaNumber || '',
        payload.customerName || '',
        payload.deviceType || '',
        payload.brandModel || '',
        payload.serialNumber || '',
        payload.newStatus || '',
        '',
        '',
        payload.warrantyText || '',
        JSON.stringify(payload.warrantyFlags || {})
      ]);

      MailApp.sendEmail({
        to: EMAIL_TO,
        subject: `RMA Status Changed - Order ${payload.orderNumber || ''}${payload.rmaNumber ? ' / RMA ' + payload.rmaNumber : ''} - ${payload.newStatus || ''}`,
        body:
          `Order Number: ${payload.orderNumber || ''}\n` +
          `RMA Number: ${payload.rmaNumber || ''}\n` +
          `Customer Name: ${payload.customerName || ''}\n` +
          `Old Status: ${payload.oldStatus || ''}\n` +
          `New Status: ${payload.newStatus || ''}\n` +
          `Warranty: ${payload.warrantyText || ''}`
      });
    }

    return jsonResponse({ ok: true });
  } catch (error) {
    return jsonResponse({ ok: false, error: String(error) });
  }
}

function jsonResponse(data) {
  return ContentService
    .createTextOutput(JSON.stringify(data))
    .setMimeType(ContentService.MimeType.JSON);
}
