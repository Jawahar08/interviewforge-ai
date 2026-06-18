document.addEventListener('DOMContentLoaded', () => {
  chrome.storage.sync.get(['apiUrl'], (result) => {
    if (result.apiUrl) {
      document.getElementById('apiUrl').value = result.apiUrl;
    }
  });

  document.getElementById('saveBtn').addEventListener('click', () => {
    const url = document.getElementById('apiUrl').value;
    chrome.storage.sync.set({ apiUrl: url }, () => {
      const status = document.getElementById('status');
      status.textContent = 'Settings saved successfully!';
      setTimeout(() => status.textContent = '', 2000);
    });
  });
});
