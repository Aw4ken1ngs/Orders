export async function apiUser(id) {
  const response = await fetch('/api/user', {
    method: "POST", 
    body: JSON.stringify({id}),
    headers: {
      'content-type': 'application/json'
    }
  });
  const data = await response.json();
  return data;
}