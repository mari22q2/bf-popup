(function() {
  function openPopup(iframeUrl, brandColor = '#007bff', width = 700, height = 650) {
    if (document.querySelector('.popup-overlay')) {
      return;
    }

    document.body.style.overflow = 'hidden';

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

    requestAnimationFrame(() => {
      overlay.style.opacity = '1';
    });
    
    overlay.addEventListener('click', (event) => {
      if (event.target === overlay) {
        document.body.style.overflow = '';
        document.body.removeChild(overlay);
      }
    });

    const popup = document.createElement('div');
    popup.style.position = 'relative';
    popup.style.width = width > window.innerWidth ? '90%' : `${width}px`;
    popup.style.maxWidth = '90%';
    popup.style.maxHeight = '90vh';
    popup.style.background = '#fff';
    popup.style.borderRadius = '15px';
    popup.style.boxShadow = '0 8px 16px rgba(0, 0, 0, 0.2)';
    popup.style.opacity = '0';
    popup.style.transition = 'opacity 0.5s ease';
    overlay.appendChild(popup);

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
      document.body.style.overflow = '';
      document.body.removeChild(overlay);
    };
    popup.appendChild(closeBtn);

    const iframe = document.createElement('iframe');
    iframe.src = iframeUrl;
    iframe.style.width = '100%';
    iframe.style.height = '100%';
    iframe.style.border = 'none';
    iframe.style.margin = '0'; // Fjern margin fra iframen
    iframe.style.padding = '0'; // Fjern padding fra iframen
    popup.appendChild(iframe);

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

    const styleSheet = document.createElement("style");
    styleSheet.type = "text/css";
    styleSheet.innerText = `
      @keyframes spin {
        0% { transform: rotate(0deg); }
        100% { transform: rotate(360deg); }
      }

      /* Fjern margin og padding for hele iframe-indholdet */
      .popup-overlay iframe * {
        margin: 0 !important;
        padding: 0 !important;
      }
    `;
    document.head.appendChild(styleSheet);

    iframe.onload = () => {
      preloader.style.display = 'none';
      popup.style.opacity = '1';
    };
  }

  window.openPopup = openPopup;
})();
