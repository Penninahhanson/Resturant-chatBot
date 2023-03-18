const chatForm = document.getElementById("chat-form");
const formInput = document.getElementById("formInput");
const chatMessages = document.querySelector(".chat-messages");

const socket = io();

//Bot Messages from server
socket.on("Botmessage", (message) => {
  console.log(message);

  outputBotMessage(message);

  chatMessages.scrollTop = chatMessages.scrollHeight;
});

//Resturant Chat messages from server
socket.on("chats", (chatMsg) => {
  console.log(chatMsg);

  outputResturantChat(chatMsg);

  chatMessages.scrollTop = chatMessages.scrollHeight;
});

//Resturant Menu messages from server
socket.on("MenuOption", (menu) => {
  console.log(menu);

  outputResturantMenu(menu);

  chatMessages.scrollTop = chatMessages.scrollHeight;
});

//Resturant Menu messages from server
socket.on("food menu", (food) => {
  console.log(food);

  outputFoodStore(food);

  // Scroll down
  chatMessages.scrollTop = chatMessages.scrollHeight;
});

//Resturant Current Order Menu from server
socket.on("CurrentOrder", (order) => {
  console.log(order);
  outputFoodOrder(order);
  
  chatMessages.scrollTop = chatMessages.scrollHeight;
});

chatForm.addEventListener("submit", (e) => {
  e.preventDefault();

  let msg = e.target.elements.formInput.value;
  console.log(msg);

  msg = msg.toLowerCase().trim();

  //Emit chat message to  server
  socket.emit("ResturantMessages", msg);

    
  formInput.value = "";
  formInput.focus();
});

// Output message from the Chat-bot to the DOM
function outputBotMessage(message) {
  const div = document.createElement("div");
  div.classList.add("chats");
  div.innerHTML = `
   
    <p style="text-align: left;>${message.username} <span>${message.time}</span></p>
    <p class="text" style="color:red;text-align:left;">${message.text}</p>
   `;
  document.querySelector(".chat-messages").appendChild(div);
}

//output chat message from users to DOM
function outputResturantChat(chatMsg) {
  const div = document.createElement("div");
  div.classList.add("chats");
  div.innerHTML = `
    <div class="card chat-card mb-2 mt-3 bg-success ">
    <div class="card-body" style="text-align: right;>
    <p>Ichie <span>${chatMsg.time}</span></p>
    <p class="text" style="color: red;">${chatMsg.text}</p>
    </div>
    </div>`;
  document.querySelector(".chat-messages").appendChild(div);
}

//output Select Menu message from Server  to DOM
function outputResturantMenu(menu) {
  const div = document.createElement("div");
  div.classList.add("chats");
  div.innerHTML = `
    <div class="card chat-card mb-2 mt-3 bg-warning" style="text-align: left;">
    <div class="card-body">
    <ul style="list-style-type:none;">
    <li>
    Select 1 to Place an order</li>
    <li>Select 99 to checkout order</li>
    <li>Select 98 to see order history</li>
    <li>Select 97 to see current order</li>
    <li>Select 0 to cancel order</li>
    </ul>
    </div>
    </div>`;
  document.querySelector(".chat-messages").appendChild(div);
}

function outputFoodStore(menu) {
  const div = document.createElement("div");
  div.classList.add("chats");
  div.innerHTML = `
    <div class="card chat-card mb-2 mt-3 bg-warning" style="text-align: left>
    <div class="card-body">
    <p class="m-2">Please select food item to record</p>
    ${Object.values(menu)
      .map(
        (key) =>
          `<li style="list-style-type:none;">${Object.values(key).join(
            " ."
          )}</li>`
      )
      .join("")}
    </div>
    </div>`;
  document.querySelector(".chat-messages").appendChild(div);
}

function outputFoodOrder(order) {
  const div = document.createElement("div");
  div.classList.add("chats");
  div.innerHTML = `
    <div class="card chat-card mb-2 mt-3" style="text-align: left>
    <div class="card-body">
    <p class="m-2">Your current order :</p>
    ${order.products.map((key) => `<li>${key.title}</li>`).join("")} 
   <div><b>TOTAL PRICE IS</b>=> ${order.totalPrice} </div>
    </div>
    </div>`;
  document.querySelector(".chat-messages").appendChild(div);
}
