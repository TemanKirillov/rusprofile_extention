function clickGetDataHandler() {
    chrome.tabs.query({ currentWindow: true, active: true }, function (tabs) {
        var activeTab = tabs[0];
        chrome.tabs.sendMessage(activeTab.id, {"message": "getData"});
    });
}

function clickGetTableHeaderHandler() {
    chrome.tabs.query({ currentWindow: true, active: true }, function (tabs) {
        var activeTab = tabs[0];
        chrome.tabs.sendMessage(activeTab.id, {"message": "getTableHeader"});
    });
}

document
    .getElementById('getData')
    .addEventListener('click', clickGetDataHandler);

document
    .getElementById('getTableHeader')
    .addEventListener('click', clickGetTableHeaderHandler);