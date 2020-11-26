var count = 0;
function logURL(requestDetails) {
    if (requestDetails.originUrl != undefined) {
        var pathArray = requestDetails.originUrl.split('/');
        var method = requestDetails.method;
        var type = requestDetails.type;
        var protocol = pathArray[0];
        var host = pathArray[2];
        var originUrl = protocol + '//' + host;
        if (!requestDetails.url.includes(originUrl)) {
            count += 1;
            browser.browserAction.setBadgeText({ text: count.toString() });
            var requestInfo = "Method: " + method + " || Type: " + type + " || URL: " + requestDetails.url;
            var child = document.createElement("div");
            var childContent = document.createTextNode(requestInfo);
            child.appendChild(childContent);
            child.setAttribute("class", "data");
            var breakD = document.createElement("br");
            document.body.appendChild(child);
            document.body.appendChild(breakD);
        }
    }
}


browser.webRequest.onBeforeRequest.addListener(
    logURL,
    { urls: ["<all_urls>"] }
);


