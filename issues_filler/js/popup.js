// 获取当前选项卡ID
function getCurrentTabId(callback)
{
	chrome.tabs.query({active: true, currentWindow: true}, function(tabs)
	{
		if(callback) callback(tabs.length ? tabs[0].id: null);
	});
}

// 向content-script主动发送消息
function sendMessageToContentScript(message, callback)
{
	getCurrentTabId((tabId) =>
	{
		chrome.tabs.sendMessage(tabId, message, function(response)
		{
			if(callback) callback(response);
		});
	});
}

var elYes = document.getElementById("agree");
var elNo = document.getElementById("disagree");

/*
elYes.addEventListener('change', function(e) {
    chrome.storage.local.set({choise: 'yes'})
})
*/

elNo.addEventListener('change', function() {
    chrome.storage.local.get('choise', function(item) {
        //alert('Your choise:' + item.choise);
    })

    // popup主动发消息给content-script
	sendMessageToContentScript({cmd:'get-selected'}, (response) => {
		if(response) {
            var issues = JSON.parse(response)
            alert('收到来自content-script的回复：selected num='+ issues.length + ', items=' + issues[0] + ', ' + issues[1]);
        }
    });
    
    //console.log('You have chosen *NO*!');
})

/*
elYes.addEventListener('change', function() {
	alert('call fSelect.');
	$('.demo').fSelect();
})
*/

/*
$(function() {
	$('.demo').fSelect();
});
*/