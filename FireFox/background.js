browser.browserAction.onClicked.addListener(() => {
  browser.tabs.query({}).then((tabs) => {
    const content = tabs.map((tab) => `${tab.title}\n${tab.url}`).join('\n\n');

    const blob = new Blob([content], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);

    browser.downloads.download({
      url: url,
      filename: 'saved_tabs.txt',
      saveAs: true
    })
      .then(() => URL.revokeObjectURL(url))
      .catch((error) => console.error('Tab Saver: download failed', error));
  });
});
