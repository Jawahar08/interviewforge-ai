document.getElementById('launchBtn').addEventListener('click', () => {
  chrome.tabs.create({ url: "http://localhost:5173" });
});
