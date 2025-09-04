# BF Popup System

A simple, client-friendly popup system that allows non-technical users to create and configure website popups through a visual interface.

## Features

- ✅ **No-code configuration** - Visual interface for non-technical users
- ✅ **Multiple trigger types** - Class, ID, URL path, and text-based triggers  
- ✅ **Brand customization** - Global color theming
- ✅ **Error handling** - Bulletproof with fallbacks and validation
- ✅ **Easy integration** - Single script tag with data attributes
- ✅ **Configuration persistence** - Save/load configurations as JSON files

## How It Works

1. **Clients visit your configuration page** (hosted on GitHub Pages)
2. **They build their popup configuration** visually with forms
3. **They copy the generated code** and paste it into their website
4. **Popups work automatically** based on their configuration

## Quick Setup for GitHub Pages

1. Enable GitHub Pages in your repository settings
2. Set source to "Deploy from a branch" 
3. Choose "main" branch and "/ (root)" folder
4. Your configuration page will be available at: `https://yourusername.github.io/bf-popup`

## Client Instructions

### For Your Clients:

1. **Visit the configuration page**: `https://mari22q2.github.io/bf-popup`
2. **Set your brand color** using the color picker
3. **Add popups**:
   - Enter your form URL (from your form provider)
   - Choose how to trigger the popup:
     - **CSS Class**: Popup opens when buttons with a specific class are clicked
     - **Element ID**: Popup opens when a specific element is clicked  
     - **Page URL**: All buttons on a specific page will open the popup
     - **Text Contains**: Any button containing specific text will open the popup
4. **Copy the generated code** and paste it in your website's `<head>` section
5. **Add the appropriate classes/IDs** to your buttons/links

### Example Generated Code:

```html
<script src="https://cdn.jsdelivr.net/gh/mari22q2/bf-popup/openPopup.js" 
        data-popup-config='{"globalColor":"#96BEC1","popups":[{"formUrl":"https://yourform.com/widget/abc123","trigger":{"type":"class","value":"contact-popup"}}]}'>
</script>
```

## Technical Details

### New Features Added:

1. **Bulletproof Error Handling**:
   - URL validation and sanitization
   - Iframe load error handling with user-friendly messages
   - 10-second timeout for failed loads
   - Console error logging for debugging

2. **Data-Attribute Configuration**:
   - Single script tag with JSON configuration
   - Automatic initialization on DOM ready
   - Backward compatibility with old method

3. **Multiple Trigger Types**:
   - `class`: Target elements with CSS class
   - `id`: Target specific element by ID
   - `url`: Target all buttons on specific pages
   - `text`: Target buttons containing specific text

### Configuration Format:

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

## Files Structure

- `openPopup.js` - Core popup functionality with bulletproof error handling
- `index.html` - Client-facing configuration interface
- `SNIPPET.md` - Integration examples and documentation
- `_config.yml` - GitHub Pages configuration

## Legacy Support

The old method still works for existing clients:

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

## Development

To test locally:
1. Open `index.html` in your browser
2. Configure a popup  
3. Copy the generated code
4. Test it on a local HTML file

## Support

For issues or questions, refer to the configuration page at: `https://mari22q2.github.io/bf-popup`