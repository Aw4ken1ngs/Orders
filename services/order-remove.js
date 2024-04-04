export async function removeOrder(id) {
  const response = await fetch('/api/order/remove', {
    method: "DELETE", 
    body: JSON.stringify({id}),
    headers: {
      'content-type': 'application/json'
    }
  });
  const data = await response.json();
  return data;
}