// Popup script for PiP Camera

document.getElementById('pipBtn').addEventListener('click', () => {
  // Open a new tab with the camera page
  chrome.tabs.create({ url: chrome.runtime.getURL('camera.html') });
  // Close the popup
  window.close();
});