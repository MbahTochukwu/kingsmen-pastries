// document.addEventListener("DOMContentLoaded", () => {
//   const ordersList = document.getElementById("orders-list");
//   const history = JSON.parse(localStorage.getItem("orderHistory")) || [];

//   if (history.length === 0) {
//     ordersList.innerHTML = "<p>No order history found.</p>";
//     return;
//   }

//   history.forEach((order, index) => {
//     if (!order.orders || !Array.isArray(order.orders)) return; 

//     const orderNumber = index + 1;
//     const orderDiv = document.createElement("div");
//     orderDiv.className = "order-entry";

//     const itemsList = order.orders.map(item =>
//       `<li>${item.item} x${item.qty} - ₦${item.total}</li>`
//     ).join("");

//     orderDiv.innerHTML = `
//       <h3>Order #${orderNumber}</h3>
//       <p><strong>Name:</strong> ${order.customerName}</p>
//       <p><strong>Date:</strong> ${order.date}</p>
//       <p><strong>Address:</strong> ${order.address || "N/A"}</p>
//       <ul>${itemsList}</ul>
//       <p><strong>Total:</strong> ₦${order.grandTotal}</p>
//       <button class="reorder-btn" data-index="${index}">Re-order</button>
//     `;

//     ordersList.appendChild(orderDiv);
//   });

  
//   document.querySelectorAll('.reorder-btn').forEach(button => {
//     button.addEventListener('click', (e) => {
//       const index = e.target.dataset.index;
//       const order = history[index];

     
//       const prefillOrder = order.orders.map(item => ({
//         item: item.item,
//         price: item.price,
//         qty: item.qty
//       }));

//       localStorage.setItem("reorderData", JSON.stringify(prefillOrder));
//       localStorage.setItem("userName", order.customerName);
//       localStorage.setItem("address", order.address);

//       window.location.href = "order.html";
//     });
//   });
// });


document.addEventListener("DOMContentLoaded", async () => {
  const ordersContainer = document.getElementById("orders-container");

  try {
    const response = await fetch("https://kingsman-pastries-backend.onrender.com/api/orders");
    if (!response.ok) throw new Error("Failed to fetch orders");

    const orders = await response.json();
    
    ordersContainer.innerHTML = ""; // clear loading text

    if (orders.length === 0) {
      ordersContainer.textContent = "No past orders found.";
    } else {
      orders.forEach(order => {
        const div = document.createElement("div");
        div.classList.add("order");
        div.innerHTML = `
          <h3>${order.customerName} (${order.phone})</h3>
          <p><strong>Total:</strong> ₦${order.total}</p>
          <ul>
            ${order.items.map(item => `<li>${item.qty} x ${item.item} @ ₦${item.price}</li>`).join("")}
          </ul>
          <p><strong>Date:</strong> ${new Date(order.createdAt).toLocaleString()}</p>
        `;
        ordersContainer.appendChild(div);
      });
    }
  } catch (error) {
    console.error(error);
    ordersContainer.textContent = "Error loading orders.";
  }
});
