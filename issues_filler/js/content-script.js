// 接收来自后台的消息
chrome.runtime.onMessage.addListener(function(request, sender, sendResponse)
{
	//alert('收到来自 ' + (sender.tab ? "content-script(" + sender.tab.url + ")" : "popup或者background") + ' 的消息：'+ request);
	if(request.cmd == 'get-selected') {
		var selected = [];
		$('.demo').find('option:selected').each(function() {
			selected.push(this.innerText);
		});
		sendResponse(JSON.stringify(selected));
	}
	else {
		console.log('send response to popup.')
		var issues = ['迭代一：软复位', '迭代二：硬复位']
		sendResponse(JSON.stringify(issues));
	}
});