// Background script (service worker) for the extension

chrome.runtime.onInstalled.addListener(() => {
  console.log('Edge Extension Template installed');
});

// Listen for messages from content scripts or popup
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.action === 'getData') {
    // Handle request
    sendResponse({ data: 'Hello from background script' });
  }
});