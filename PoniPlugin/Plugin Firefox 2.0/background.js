chrome.commands.onCommand.addListener(function(command) {
	crawlUrl();
	alert("PONI 1");
});

browser.browserAction.onClicked.addListener(function(tab) { 
	crawlUrl();
	alert("PONI 2");
});





/*
browser.runtime.onMessage.addListener(listener)

A PETAT TOT!!!!!!

https://developer.mozilla.org/en-US/Add-ons/WebExtensions/API/runtime/sendMessage

*/





var crawl = document.getElementById('buttonCrawl');
crawl.addEventListener('click', elPoniPisador);

var backChange = browser.document.getElementById('urlAreaId');
backChange.addEventListener('onChange', inici);

function elPoniPisador(){
	crawlUrl();
	alert("PONI 3");
};


function inici(){
	
	browser.storage.local.get("backUp",function(prova){
		if (typeof(prova.backUp) != "undefined") document.getElementById("urlAreaId").innerHTML = prova.backUp;
	});
	
	browser.storage.local.get("Lines",function(pedra){
		if (typeof(pedra.Lines) != "undefined") document.getElementById("totalLines").value = pedra.Lines;
	});
}

function menu(info)
{
	if (info.menuItemId === "default-Skin")
	{
		browser.storage.local.set({'skin': "default"});
	}
	else if(info.menuItemId === "black-Skin")
	{
		browser.storage.local.set({'skin': "black"});
	}
}

chrome.contextMenus.create({
	id: 'default-Skin',
	title: 'Orange Default',
	contexts: ['browser_action']
});

chrome.contextMenus.create({
	id: 'black-Skin',
	title: 'Orange Black',
	contexts: ['browser_action']
});

chrome.contextMenus.onClicked.addListener(menu);

inici();

function getComboA(selectObject) {
	var value = selectObject.value; 
	alert(value);
}
