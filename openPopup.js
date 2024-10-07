(function() {
  // Function to initialize and show the popup
  function showBookingPopup(iframeUrl, color, width = 700, height = 700) {
    // Create overlay
    const overlay = document.createElement('div');
    overlay.style.position = 'fixed';
    overlay.style.top = '0';
    overlay.style.left = '0';
    overlay.style.width = '100%';
    overlay.style.height = '100%';
    overlay.style.background = 'rgba(0, 0, 0, 0.8)';
    overlay.style.zIndex = '1000';
    overlay.style.display = 'flex';
    overlay.style.justifyContent = 'center';
    overlay.style.alignItems = 'center';
    document.body.appendChild(overlay);

    // Create popup container
    const popup = document.createElement('div');
    popup.style.position = 'relative';
    popup.style.width = `${width}px`;
    popup.style.height = `${height}px`;
    popup.style.background = '#fff';
    popup.style.borderRadius = '15px';
    popup.style.boxShadow = '0 8px 16px rgba(0, 0, 0, 0.2)';
    popup.style.opacity = '0';
    popup.style.transition = 'opacity 0.5s ease';
    overlay.appendChild(popup);

    // Create close button
    const closeBtn = document.createElement('button');
    closeBtn.innerHTML = '&times;';
    closeBtn.style.position = 'absolute';
    closeBtn.style.top = '10px';
    closeBtn.style.right = '15px';
    closeBtn.style.background = 'transparent';
    closeBtn.style.border = 'none';
    closeBtn.style.color = `${color}`;
    closeBtn.style.fontSize = '30px';
    closeBtn.style.cursor = 'pointer';
    closeBtn.onclick = () => {
      document.body.removeChild(overlay);
    };
    popup.appendChild(closeBtn);

    // Create iframe
    const iframe = document.createElement('iframe');
    iframe.src = iframeUrl;
    iframe.style.width = '100%';
    iframe.style.height = '100%';
    iframe.style.border = 'none';
    popup.appendChild(iframe);

    // Show preloader
    const preloader = document.createElement('div');
    preloader.style.border = '6px solid #f3f3f3';
    preloader.style.borderTop = `6px solid ${color}`;
    preloader.style.borderRadius = '50%';
    preloader.style.width = '50px';
    preloader.style.height = '50px';
    preloader.style.animation = 'spin 1s linear infinite';
    overlay.appendChild(preloader);

    // Add keyframes for preloader animation
    const styleSheet = document.createElement("style");
    styleSheet.type = "text/css";
    styleSheet.innerText = `
      @keyframes spin {
        0% { transform: rotate(0deg); }
        100% { transform: rotate(360deg); }
      }
    `;
    document.head.appendChild(styleSheet);

    // Wait for iframe to load and then fade in popup
    iframe.onload = () => {
      setTimeout(() => {
        preloader.style.display = 'none';
        popup.style.opacity = '1';
      }, 1000); // Ensure preloader is shown for at least 1 second
    };
  }

  // Expose the function to global scope
  window.showBookingPopup = showBookingPopup;
})();
