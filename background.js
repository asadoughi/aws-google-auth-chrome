chrome.browserAction.onClicked.addListener(function (tab) {
    chrome.storage.local.get({
	durationSeconds: 3600,
	principalArn: ""
    }, function(config) {
	chrome.tabs.executeScript(tab.ib, {
	    code: 'document.aws_google_auth_config = ' + JSON.stringify(config)
	}, function (any) {
	    chrome.tabs.executeScript(tab.ib, {
		file: 'aws-sdk-2.685.0.min.js'
	    }, function (any) {
		chrome.tabs.executeScript(tab.ib, {
		    file: 'inject.js'
		});
	    });
	});
    });
});
