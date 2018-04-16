function crawlUrl()
{
	browser.tabs.query({active:true,lastFocusedWindow:true},function(tabs)
	{
		var url = tabs[0].url;
		
		document.getElementById("totalLines").value++;
		var catDiv = document.createElement("div");
		
		var newLine = '<div class="counter"><div style="display:inline;">'+document.getElementById("totalLines").value+'</div><input type="checkbox"/><label>'+url+'</label></div>';
		
		catDiv.innerHTML = newLine;
		
		document.getElementById("urlAreaId").appendChild(catDiv);
		document.getElementById("urlAreaId").insertBefore(catDiv, document.getElementById("urlAreaId").firstChild);
		document.getElementById("selectAll").checked = false;
		
		saveBackUp();
	});
}

function saveBackUp()
{
	browser.storage.local.set({"backUp": document.getElementById("urlAreaId").innerHTML});
	browser.storage.local.set({"Lines": document.getElementById("totalLines").value });
}

//------------------------------------------------------------------------------------------//

function clearPanel(){

	if(window.confirm("Delete all the content?")){
		$("#urlAreaId").empty(); 
		document.getElementById("totalLines").value = 0;
		linesCounter = 0;
		document.getElementById("selectAll").checked = false;
	}
	
	browser.storage.local.set({"Lines": 0 });
	removeBackUp();
}

function removeCheckeds(){
  
   	var lineCounter = 1;
  	var d = $("#urlAreaId").contents();
  	var linesList = [];
  	for(var foo=d.length;foo>0;foo--){//for each line
  		
		var lines = d[foo-1].childNodes;//get the line content
		var childs = lines[0].children;

		if(childs[1].checked){

			d[foo-1].remove();
		}else{

			childs[0].innerHTML = lineCounter;
			lineCounter++;
		}	
   	}	
	document.getElementById("totalLines").value = lineCounter-1;
	
	document.getElementById("selectAll").checked = false;
	
	browser.storage.local.set({"Lines": document.getElementById("totalLines").value });
	
	if(document.getElementById("totalLines").value == 0){ 	
		removeBackUp();
		browser.storage.local.set({"Lines": 0 });
	}
	else
		saveBackUp();
}

//------------------------------------------------------------------------------------------//

function removeBackUp()
{
	browser.storage.local.set({'backUp': ""});
}

//------------------------------------------------------------------------------------------//

function selectAll(){

	var d = $("#urlAreaId").contents();
	var input;
	var selectA = document.getElementById('selectAll');
	for(var foo=0;foo<d.length;foo++){//for each line
	
		input =	d[foo].childNodes[0].children[1];
		if(selectA.checked){

			input.checked = true;
		}else{
			input.checked = false;
		}
	}	
}

//------------------------------------------------------------------------------------------//

function importToMassInsert(){
    
	browser.tabs.query({'title':'Mass Insert Sections - Orange Tool',}, function (tabs){
       
		var d = $("#urlAreaId").contents();
        	for(var foo=0;foo<d.length;foo++){//for each line
            
            		input = d[foo].childNodes[0].children[1];
            
            		if(input.checked == true){
                		var text = d[foo].childNodes[0].children[2].innerHTML+"\\r\\n";
                		chrome.tabs.executeScript(tabs[0].id, {code:"document.getElementById('inputInsert').value+='"+text+"'"});
                		
            			chrome.tabs.executeScript(tabs[0].id,{code: "document.getElementsByName('urls')[1].value+='"+text+"'"});
		}
        }   
    });
}

function copyToClipboard(){
    var copyDiv = document.createElement('div');
    copyDiv.contentEditable = true;
    document.body.appendChild(copyDiv);
    var urlsDiv = document.getElementById("urlAreaId").childNodes;    
    var line;
    var text = "";
    for(var foo=0;foo<urlsDiv.length;foo++){
        if(urlsDiv[foo].firstChild.childNodes[1].checked){  
        
            line = urlsDiv[foo].firstChild.childNodes[2].innerHTML;
            text+=line+"\n";
        }
    }
    
    var myWindow = window.open("","",'width=800,height=300,resizable=NO,toolbar=false,scrollbars=false,top=120,left=180');
    var textNode = myWindow.document.createElement("textarea");
    textNode.style.width = "100%";
    textNode.style.height = "80%";
    textNode.textContent = text;
    myWindow.document.body.appendChild(textNode);
    copyDiv.innerHTML = text;
    
    copyDiv.unselectable = "off";
    copyDiv.focus();
    document.execCommand('SelectAll');
    document.execCommand("Copy", false, null);
    document.body.removeChild(copyDiv);
}



var clear = document.getElementById('buttonClear');
clear.addEventListener('click', clearPanel);

var removeElement = document.getElementById('buttonRemove');
removeElement.addEventListener('click', removeCheckeds);

var selectA = document.getElementById('selectAll');
selectA.addEventListener('change', selectAll);

var copy2Orange = document.getElementById('buttonCopyOrange');
copy2Orange.addEventListener('click',importToMassInsert);

var copyClip = document.getElementById("buttonCopyClipboard");
copyClip.addEventListener('click',copyToClipboard);
