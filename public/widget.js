// frontend/public/widget.js
(function () {
  // Create floating button
  const button = document.createElement("div");
  button.id = "chatbot-toggle-btn";
  button.innerHTML = "💬"; // You can replace with icon/image
  button.style.position = "fixed";
  button.style.bottom = "20px";
  button.style.right = "20px";
  button.style.width = "60px";
  button.style.height = "60px";
  button.style.borderRadius = "50%";
  button.style.backgroundColor = "#2D5BE3"; // Deep Blue
  button.style.color = "white";
  button.style.display = "flex";
  button.style.alignItems = "center";
  button.style.justifyContent = "center";
  button.style.cursor = "pointer";
  button.style.fontSize = "24px";
  button.style.boxShadow = "0 4px 6px rgba(0,0,0,0.2)";
  button.style.zIndex = "9999";

  document.body.appendChild(button);

  let iframe = null;
  let isOpen = false;

  button.addEventListener("click", () => {
    if (!isOpen) {
      // Open chatbot
      iframe = document.createElement("iframe");
      iframe.id = "chatbot-iframe";
      iframe.src = "http://localhost:3000/widget.html"; // Change to production URL later
      iframe.style.position = "fixed";
      iframe.style.bottom = "90px"; // above button
      iframe.style.right = "20px";
      iframe.style.width = "309px";
      iframe.style.height = "404px";
      iframe.style.border = "none";
      iframe.style.borderRadius = "12px";
      iframe.style.boxShadow = "0 6px 12px rgba(0,0,0,0.25)";
      iframe.style.zIndex = "9999";
      iframe.style.backgroundColor = "#fff";
      document.body.appendChild(iframe);
      isOpen = true;
    } else {
      // Close chatbot
      if (iframe) {
        document.body.removeChild(iframe);
        iframe = null;
      }
      isOpen = false;
    }
  });
})();
