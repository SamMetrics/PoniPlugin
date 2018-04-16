var typePanel= "panel";

function getOS(){

	chrome.runtime.getPlatformInfo(function(info) {
	// Display host OS in the console
	
		if(info.os == "win"){
			typePanel = "panel";
		}
		else if(info.os == "linux"){
			
			typePanel = "normal";
		}
		else{
			alert("Other OS, setting default windows creation(panel)");
			typePanel = "panel";
		}
	});
}

//------------------------------------------------------------------------------------------//

function settingsWin(e) { //OBRIR FINESTRA SETTINGS
  
  var leftPos = 30;
  var topPos = 30;
  var width = 500;
  var height = 350;
  var typePanel;
  getOS();
  
  browser.windows.create({
	url: "settings.html",
	type: typePanel,
	left: leftPos,
	top: topPos,
	width: width,
	height: height
  });
}

var settings = document.querySelector('.settings');
settings.addEventListener('click', settingsWin);
