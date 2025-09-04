# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

BF Popup System is a client-friendly popup configuration tool that enables non-technical users to create website popups through a visual interface. The system consists of:

1. **Core popup library** (`openPopup.js`) - Handles popup creation, styling, and error handling
2. **Configuration interface** (`index.html`) - Visual builder for clients to create popup configurations
3. **GitHub Pages hosting** - Makes the configuration tool accessible at `https://mari22q2.github.io/bf-popup`

## Architecture

### Core Components

**openPopup.js** - The main popup library with:
- `openPopup(iframeUrl, brandColor, width, height)` - Creates and displays popup
- `initPopupSystem(config)` - Initializes multiple popups from configuration
- Auto-initialization from `data-popup-config` script attributes
- Bulletproof error handling with 10-second timeout and fallback messages
- Four trigger types: CSS class, element ID, URL path, and text content

**index.html** - Configuration builder with:
- Global settings (brand color, text triggers)  
- Dynamic popup configuration table
- Live code generation with copy/download functionality
- Responsive design optimized for non-technical users

### Integration Methods

The system supports two integration approaches:

1. **Data-attribute method** (recommended):
```html
<script src="https://cdn.jsdelivr.net/gh/mari22q2/bf-popup/openPopup.js" 
        data-popup-config='{"globalColor":"#96BEC1","popups":[...]}'>
</script>
```

2. **Legacy JavaScript method** (backward compatible):
```html
<script src="https://cdn.jsdelivr.net/gh/mari22q2/bf-popup/openPopup.js"></script>
<script>
document.querySelectorAll(".my-popup").forEach(function (button) {
  button.addEventListener("click", function (event) {
    event.preventDefault();
    openPopup("https://yourform.com/widget/form/abc123", "#96BEC1");
  });
});
</script>
```

## Configuration Schema

```json
{
  "globalColor": "#96BEC1",
  "popups": [
    {
      "formUrl": "https://yourform.com/widget/form/abc123",
      "trigger": {
        "type": "class|id|url|text",
        "value": "trigger-value"
      }
    }
  ]
}
```

## Development Commands

- **Test**: `npm test` (runs `openPopup.test.js`)
- **Local testing**: Open `index.html` in browser to test configuration interface
- **GitHub Pages**: Automatically deploys from main branch root directory

## Key Features

- **Error handling**: 10-second iframe timeout with user-friendly error messages
- **XSS protection**: URL validation and sanitization  
- **Accessibility**: Keyboard navigation (ESC to close) and proper ARIA attributes
- **Responsive**: Mobile-optimized popup sizing and positioning
- **Body scroll lock**: Prevents background scrolling when popup is open

## Testing Approach

Test the popup system by:
1. Configuring popups in `index.html`
2. Copying generated code to a test HTML file
3. Verifying triggers work correctly with different element types
4. Testing error scenarios with invalid URLs

## Client Workflow

1. Client visits configuration page at GitHub Pages URL
2. Sets global brand color using color picker
3. Adds popup configurations with form URLs and trigger types
4. Copies generated script tag to their website's `<head>` section
5. Adds appropriate CSS classes/IDs to trigger elements on their site