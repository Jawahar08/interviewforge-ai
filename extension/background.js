chrome.runtime.onInstalled.addListener(() => {
  chrome.contextMenus.create({
    id: "startMockInterview",
    title: "Start Mock Interview for this Job",
    contexts: ["selection"]
  });
});

chrome.contextMenus.onClicked.addListener((info, tab) => {
  if (info.menuItemId === "startMockInterview") {
    const jobDescription = info.selectionText;
    
    // Store the job description in extension storage to pass to the frontend
    chrome.storage.local.set({ selectedJob: jobDescription }, () => {
      // Open the local InterviewForge frontend
      chrome.tabs.create({ url: "http://localhost:5173?jobContext=true" });
    });
  }
});
