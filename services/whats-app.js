export const sendMessage = (order) => {
  console.log('=============================', order)
  
    const idInstance = '1103871293';
    const apiTokenInstance = '9f6fae325b5645f19b05fd541acf9ae65a0c35fe5e4b4cfa8c';
    const chatId = '79277733778@c.us';
    const url = `https://api.green-api.com/waInstance${idInstance}/sendMessage/${apiTokenInstance}`;
    const formattedMessage = `заказ: ${order.city}\n ${order.quantity} ${order.unit} ${order.nomenclature}`;

    const payload = {
      chatId,
      message: formattedMessage,
    };

  fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(payload),
  })
    .then((response) => response.text())
    .then((text) => {
      console.log(text);
    })
    .catch((error) => {
      console.error(error);
    });
};