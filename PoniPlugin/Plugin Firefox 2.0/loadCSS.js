function loadCSS() {

browser.storage.local.get('skin', function (poni) {
	
	if(poni.skin == "black"){
		document.getElementsByTagName("head")[0].innerHTML += 
			'<link href="./css/OrangeNewBlack.css" rel="stylesheet" type="text/css">';
	}else{
		document.getElementsByTagName("head")[0].innerHTML += 
			'<link href="./css/styles.css" rel="stylesheet" type="text/css">';	
	}
	//document.getElementsByTagName("body")[0].innerHTML += '<iframe src="snowDef.html" style="border:none;" width=100%; ></iframe>';
});

  /*var head = document.getElementsByTagName("head")[0];
   *   document.getElementsByTagName("head")[0].innerHTML = '<title>Orange Extension - Filters</title><link href="./skins/OrangeNewBlack.css" rel="stylesheet" type="text/css">';
    alert("path: "+document.getElementsByTagName("head")[0].innerHTML);// +" - GG SON - "+ document.getElementsByTagName("head")[1].innerHTML);
    head.appendChild(pathToScript);*/
}

loadCSS();
