// frontend/public/widget.js
(function () {
  const websiteId = document.currentScript.getAttribute("data-website-id");
  const customization = localStorage.getItem("chatbot-customization");
  const customizationData = customization ? JSON.parse(customization) : null;
  let bgColor = "#2D5BE3";
  let logoImage = `
  <svg xmlns="http://www.w3.org/2000/svg" 
       fill="none" viewBox="0 0 24 24" 
       stroke="currentColor" stroke-width="2" 
       class="w-6 h-6">
    <path stroke-linecap="round" stroke-linejoin="round" 
          d="M8 10h.01M12 10h.01M16 10h.01M21 12c0 4.418-4.03 8-9 8-1.43 0-2.78-.3-3.95-.84L3 20l1.13-3.39C3.42 15.39 3 13.74 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"/>
  </svg>
`;
  if (customizationData && customizationData.websiteId === websiteId) {
    bgColor = customizationData.bgColor || bgColor;
    logoImage = customizationData.logoImage || logoImage;
  }

  // Prevent duplicate button
  if (document.getElementById("chatbot-toggle-btn")) return;

  // Create floating button
  const button = document.createElement("div");
  button.id = "chatbot-toggle-btn";
  button.innerHTML = logoImage;
  button.style.position = "fixed";
  button.style.bottom = "20px";
  button.style.right = "20px";
  button.style.width = "50px";
  button.style.height = "50px";
  button.style.borderRadius = "50%";
  button.style.backgroundColor = bgColor;
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
      iframe.src = `https://chatbot-frontend-hazel-eta.vercel.app/widget.html?websiteId=${websiteId}`; // Change to production URL later
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
