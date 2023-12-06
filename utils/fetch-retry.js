
// Функция fetchRetry для получения данных из Google Sheets с использованием API и обновления значений на основе полученных данных.
export async function fetchRetry(cb, failCb, limit) {
  let attempts = 0;
  console.log("Starting...", attempts, limit)

  while (attempts < limit) {
      console.log('try23');
    try {
      await cb();
      return;
    } catch (err) {
      console.log('-----------------', err.status)
      await failCb(err);
    }
  }
  attempts++;
  return;
}
