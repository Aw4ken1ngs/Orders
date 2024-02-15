export async function createOrder (newOrder) {
  const response = await fetch('/api/order/create', {
    method: "POST",
    body: JSON.stringify(newOrder),
    headers: {
      'content-type': 'application/json'
    }
  });
  const data = await response.json();
  return data;
}