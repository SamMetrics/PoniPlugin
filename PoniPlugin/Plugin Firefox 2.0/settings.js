window.addEventListener('load',function (){
    	
    	browser.storage.local.get('skin', function (poni) {
			
		if(poni.skin == "default"){
			
			document.getElementById("skinDefault").checked = true;
			document.getElementById("skinBlack").checked = false;
			
		}else if(poni.skin == "black"){

			document.getElementById("skinBlack").checked = true;
			document.getElementById("skinDefault").checked = false;
		}else{
			alert("Error while loading skin settings");
		}
    	});
    	
    	/*browser.storage.local.get('warnings', function (alarm) {
			
		if(alarm.warnings == "Enable")
			document.getElementById("warning").checked = true;
		else
			document.getElementById("warning").checked = false;
		});*/
});


function saveIt(){
	if( document.getElementById("skinDefault").checked == true )
		browser.storage.local.set({'skin': "default"});
	else
		browser.storage.local.set({'skin': "black"});
		
	/*if(document.getElementById("warning").checked == true)
		browser.storage.local.set({'warnings': "Enable"});
	else
		browser.storage.local.set({'warnings': "Disable"});*/
	
	/*if((document.getElementById("storePath").value == "kappa") && (document.getElementById("deepTree").value == 50) && (document.getElementById("skinBlack").checked == true) 
			&&(document.getElementById("warning").checked == true)){
		//document.getElementById("TheKappa").style.visibility="visible";
		document.getElementById("TheKappa").style.display ="inline";
		alert("Kappa Dash is here!!");
	}
	else{
		//document.getElementById("TheKappa").style.visibility="hidden";
		document.getElementById("TheKappa").style.display ="none";
	}*/
	
	alert("saved");
	window.close();
}

window.onload = function(){
	var save = document.getElementById("saveButton");
	save.addEventListener('click',saveIt);
};
