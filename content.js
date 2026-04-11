// Content script injected into web pages

console.log('Content script loaded');

// Example: Change the background color of the page
document.body.style.backgroundColor = 'lightblue';

// Send a message to the background script
chrome.runtime.sendMessage({ action: 'pageLoaded', url: window.location.href });