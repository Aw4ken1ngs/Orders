export async function fetchProduts (){
  const response = await fetch('/api/products', {
    method: "GET"
  });
  const data = await response.json();
  return data;
}