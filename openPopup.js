(function() {
  // Function to initialize and show the popup
  function openPopup(iframeUrl, brandColor = '#007bff', width = 700, height = 650) {
    // Check if an overlay already exists
    if (document.querySelector('.popup-overlay')) {
      return;
    }

    // Create overlay
    const overlay = document.createElement('div');
    overlay.className = 'popup-overlay';
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
    overlay.style.opacity = '0';
    overlay.style.transition = 'opacity 0.4s ease-in';
    document.body.appendChild(overlay);

    // Fade in overlay
    requestAnimationFrame(() => {
      overlay.style.opacity = '1';
    });
    
    // Close popup if clicking outside the box
    let escListener;

    function closePopup() {
      document.removeEventListener('keydown', escListener);
      if (overlay.parentNode) {
        document.body.removeChild(overlay);
      }
    }

    overlay.addEventListener('click', (event) => {
      if (event.target === overlay) {
        closePopup();
      }
    });

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
    closeBtn.textContent = '×';
    closeBtn.style.position = 'absolute';
    closeBtn.style.top = '10px';
    closeBtn.style.right = '15px';
    closeBtn.style.background = 'transparent';
    closeBtn.style.border = 'none';
    closeBtn.style.color = brandColor;
    closeBtn.style.fontSize = '35px';
    closeBtn.style.cursor = 'pointer';
    closeBtn.onclick = () => {
      closePopup();
    };
    popup.appendChild(closeBtn);

    // Create iframe
    const iframe = document.createElement('iframe');
    iframe.src = iframeUrl;
    iframe.style.width = '100%';
    iframe.style.height = '100%';
    iframe.style.border = 'none';
    popup.appendChild(iframe);

    escListener = (event) => {
      if (event.key === 'Escape' && document.activeElement !== iframe) {
        closePopup();
      }
    };
    document.addEventListener('keydown', escListener);

    // Show preloader
    const preloader = document.createElement('div');
    preloader.style.position = 'absolute';
    preloader.style.top = '50%';
    preloader.style.left = '50%';
    preloader.style.transform = 'translate(-50%, -50%)';
    preloader.style.border = '6px solid #f3f3f3';
    preloader.style.borderTop = `6px solid ${brandColor}`;
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
      preloader.style.display = 'none';
      popup.style.opacity = '1';
    };
  }

  // Expose the function to global scope
  window.openPopup = openPopup;
})();
