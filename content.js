// Function to translate text using MyMemory Translation API
async function translateText(text) {
    const apiUrl = `https://api.mymemory.translated.net/get?q=${encodeURIComponent(text)}&langpair=en|hi`;
  
    try {
      const response = await fetch(apiUrl);
      const data = await response.json();
      if (data.responseData && data.responseData.translatedText) {
        return data.responseData.translatedText;
      } else {
        throw new Error('Translation failed');
      }
    } catch (error) {
      console.error('Error translating text:', error);
      return 'Translation failed. Please try again.';
    }
  }
  
  // Function to display the translation as a tooltip
  function displayTooltip(text, translation) {
    // Remove any existing tooltip
    const existingTooltip = document.getElementById('translation-tooltip');
    if (existingTooltip) {
      existingTooltip.remove();
    }
  
    // Create a new tooltip
    const tooltip = document.createElement('div');
    tooltip.id = 'translation-tooltip';
    tooltip.style.position = 'absolute';
    tooltip.style.backgroundColor = '#000';
    tooltip.style.border = '2px solid #0f0';
    tooltip.style.color = '#0f0';
    tooltip.style.padding = '10px';
    tooltip.style.zIndex = '10000';
    tooltip.style.fontFamily = 'Courier New, Courier, monospace';
    tooltip.style.fontSize = '14px';
    tooltip.style.boxShadow = '0 0 10px #0f0';
    tooltip.innerText = translation;
  
    // Position the tooltip near the highlighted text
    const selection = window.getSelection();
    const range = selection.getRangeAt(0);
    const rect = range.getBoundingClientRect();
    tooltip.style.top = `${rect.bottom + window.scrollY}px`;
    tooltip.style.left = `${rect.left + window.scrollX}px`;
  
    // Add the tooltip to the page
    document.body.appendChild(tooltip);
  
    // Remove the tooltip after 5 seconds
    setTimeout(() => tooltip.remove(), 5000);
  }
  
  // Listen for text highlighting
  document.addEventListener('mouseup', async () => {
    const selectedText = window.getSelection().toString().trim();
    if (selectedText) {
      const translation = await translateText(selectedText);
      displayTooltip(selectedText, translation);
    }
  });