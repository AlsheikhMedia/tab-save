document.getElementById('saveButton').addEventListener('click', () => {
  chrome.tabs.query({}, (tabs) => {
    if (chrome.runtime.lastError) {
      document.getElementById('message').textContent = chrome.runtime.lastError.message;
      return;
    }

    const content = tabs.map((tab) => `${tab.title}\n${tab.url}`).join('\n\n');

    // Create download using a data URL (doesn't require downloads permission)
    const blob = new Blob([content], {type: 'text/plain'});
    const url = URL.createObjectURL(blob);

    // Create a link element and trigger download
    const a = document.createElement('a');
    a.href = url;
    a.download = 'saved_tabs.txt';
    document.body.appendChild(a);
    a.click();

    // Clean up
    document.body.removeChild(a);
    URL.revokeObjectURL(url);

    // Show success message
    document.getElementById('message').textContent = 'Tabs saved successfully!';
  });
});
