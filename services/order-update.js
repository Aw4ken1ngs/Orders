export async function updateOrder(newOrder) {
  const response = await fetch('/api/order/update', {
    method: "POST", 
    body: JSON.stringify(newOrder),
    headers: {
      'content-type': 'application/json'
    }
  });
  const data = await response.json();
  return data;
}