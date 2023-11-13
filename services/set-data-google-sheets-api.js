//запись в таблицу google
export async function createOrder(sheetId, range, data) {
  const pendingWrite = await gapi.client.sheets.spreadsheets.values.append({
    spreadsheetId: sheetId,
    range: range,
    valueInputOption: 'USER_ENTERED',
    resource: {
      values: [data],
    },
  });

  if (!pendingWrite.result) {
    console.error('Error appending data');
    return false;
  }

  console.log('Data append worked!');
  return true;
}