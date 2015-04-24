/*************************************************************************************/
/*								CodeHL Moodle Plugin								 */
/*																					 */
/*							  Version: 1.0 [2015.04.14]								 */
/*							  Version: 1.1 [2015.04.18]								 */
/*************************************************************************************/


/*************************************************************************************/
/*																					 */
/*		Provide the XMLHttpRequest constructor for Internet Explorer 5.x-6.x: 		 */
/*		Other browsers (including Internet Explorer 7.x-9.x) do not redefine		 */
/*		XMLHttpRequest if it already exists. 										 */
/*		[src: http://en.wikipedia.org/wiki/XMLHttpRequest]							 */
/*   																				 */
/*************************************************************************************/

if( typeof XMLHttpRequest === "undefined" ) 
{
	XMLHttpRequest = function()
	{
		try { return new ActiveXObject("Msxml2.XMLHTTP.6.0"); } catch(e) {}
		try { return new ActiveXObject("Msxml2.XMLHTTP.3.0"); } catch(e) {}
		try { return new ActiveXObject("Msxml2.XMLHTTP"); } catch(e) {}
		try { return new ActiveXObject("Microsoft.XMLHTTP"); } catch(e) {}
		throw new Error( "This browser does not support XMLHttpRequest." );
	};
}

/*************************************************************************************/
/*																					 */
/*							Variable definitions									 */
/*																					 */
/*************************************************************************************/

var mainDiv 			= null;
var languageControl 	= null;
var headerControl 		= null;
var textareaControl 	= null;
var numControl 			= null;
var startNumberControl 	= null;
var codehlWidth 		= null;
var codehlWidthUnit 	= null;
var themeControl		= null;
var classPrefix 		= 'codehl_';

/*************************************************************************************/
/*																					 */
/*						Definition of CodeHL Dialog object							 */
/*																					 */
/*************************************************************************************/

var codehlDialog =
{
/*************************************************************************************/
/*																					 */
/*								Events Handlers 									 */
/*																					 */
/*************************************************************************************/
	onInitDialog : function()
	{
		var strVar = '';
		if (mainDiv)
		{
			strVar += 'selectedValue=' + 
			encodeURIComponent((mainDiv.className.indexOf(classPrefix) == 0) ? 
			mainDiv.className.substring(classPrefix.length) : mainDiv.className);

			var nWidth = parseInt(mainDiv.style.width);
			var strWidthUnit = 'pixels';
			if(mainDiv.style.width.indexOf('%') != -1) strWidthUnit = 'percent';			
			if(!isNaN(nWidth))
			{
				codehlWidth.value = nWidth.toString();
				this.selectCombo(codehlWidthUnit,strWidthUnit);
			}
			var htmlTag;
			if( (htmlTag = mainDiv.getElementsByTagName('tbody')) &&
				(htmlTag = htmlTag[0].getElementsByTagName('td')) &&
				isNaN(htmlTag[0].style.width))
			{
				 	this.selectCombo( numControl, 'off');
			}
			else	
			{
				this.selectCombo( numControl, 'on');
				if(htmlTag = htmlTag[0].getElementsByTagName('pre'))
				{
					startNumberControl.value = parseInt(htmlTag[0].innerHTML);
				}				
			}
			if( (htmlTag = mainDiv.getElementsByTagName('thead')) &&
				(htmlTag = htmlTag[0].getElementsByTagName('span')) &&
				(htmlTag[0].className == 'title'))
					headerControl.value = htmlTag[0].innerHTML;
			if( (htmlTag = mainDiv.getElementsByTagName('tbody')) &&
				(htmlTag = htmlTag[0].getElementsByTagName('td')) &&
				(htmlTag = htmlTag[1].getElementsByTagName('pre')))
			{
				textareaControl.value = "";
				var strLine="";
				for(var i=0;i<htmlTag.length;i++)
				{
					//console.log(htmlTag[i].innerHTML);
					if(i) textareaControl.value+="\n";
					strLine = htmlTag[i].innerHTML.replace(/\<[^\>]*\>/gi, "");
					textareaControl.value += strLine;
				}
			}
		}

		var xmlHttp = new XMLHttpRequest();
		xmlHttp.open('POST', '../parser/codehl_getlangs.php', false);
		xmlHttp.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
		xmlHttp.send(strVar);

		if (xmlHttp.readyState == 4 && xmlHttp.status==200) languageControl.innerHTML = xmlHttp.responseText;
		else console.log("XMLHttpRequest Error: " + xmlHttp.statusText);
	},
	
	onInit : function()
	{
		var ed = tinyMCEPopup.editor;	
		//tinyMCEPopup.resizeToInnerSize();		
		
		languageControl		= document.getElementById('languageControl');
		headerControl		= document.getElementById('headerControl');
		textareaControl		= document.getElementById('textareaControl');
		numControl			= document.getElementById('numControl');
		startNumberControl	= document.getElementById('startNumberControl');
		codehlWidth			= document.getElementById('codehlWidth');
		codehlWidthUnit		= document.getElementById('codehlWidthUnit');
		themeControl		= document.getElementById('themeControl');
		
		textareaControl.onkeydown = this.tabKey;

		if(!mainDiv)
		{
			mainDiv = ed.dom.getParent(	ed.selection.getNode(),
										function(n) 
										{
											if( n.parentNode && 
												n.parentNode.tagName &&
												n.parentNode.tagName == "DIV" &&
												n.parentNode.className == "codehl") 
												 return true; 
											else return false;											
										});			

		}
		this.onInitDialog();		
		this.resizeTextarea();
    },

    onOK : function()
	{
		this.insertCode();
		tinyMCEPopup.close();
	},

    onCancel : function()
    {
    	if(confirm('want quit?'))
    		tinyMCEPopup.close();
    },

	onResize : function()
	{
		this.resizeTextarea();
	},

/*************************************************************************************/
/*																					 */
/*									Functions	 									 */
/*																					 */
/*************************************************************************************/

	tabKey : function(e)
	{
		var ed = tinyMCEPopup.editor;
		var tabChar = "  ";
		if (e.keyCode) code = e.keyCode;
		else if (e.which) code = e.which;
		if(code != null && code == 9)
		{
			if(document.selection)
			{
				this.focus();
				var sel = document.selection.createRange();
				sel.text = tabChar;
			}
			else if(this.selectionStart || this.selectionStart == "0")
			{
				var sx = this.scrollLeft;
				var sy = this.scrollTop;
				var st = this.selectionStart;
				var en = this.selectionEnd;				
				this.value = this.value.substring(0,st) + tabChar + this.value.substring(en,this.value.length);
				this.focus();
				this.selectionStart = st + tabChar.length;
				this.selectionEnd	= en + tabChar.length;
				this.scrollLeft 	= sx;
				this.scrollTop 		= sy;
			}
			else this.value += tabChar;
			return false;
		}
	},

	resizeTextarea : function()
	{
		var diff = 200;
		if (!tinymce.isIE) contentHeight = self.innerHeight - diff;
		else contentHeight = document.body.clientHeight - diff;

		if( textareaControl ) textareaControl.style.height = Math.abs(contentHeight) + 'px';
	},

	selectCombo : function(combo, value)
	{
		for( var i = 0; i < combo.options.length; i++ )
		{
			if(	combo.options[i].value == value )
			{
				combo.selectedIndex = i;
				break;
			}
		}
	},

	insertCode : function()
	{
		var langOptionTag 	= document.getElementById('langOption');
		var languageVal	  	= langOptionTag.options[ langOptionTag.selectedIndex ].value;
		var headerVal	  	= headerControl.value;
		var textareaVal	  	= textareaControl.value;
		var numVal	  		= numControl.value;
		var startNumberVal	= startNumberControl.value;
		var divWidth		= "auto";
	
		var widthNumber = parseInt(codehlWidth.value);
		if( !isNaN(widthNumber) )
		{
			if( codehlWidthUnit.value == "percent" ) divWidth = widthNumber + "%";
			else divWidth = widthNumber + "px";
		}					

		var xmlHttp = new XMLHttpRequest();
		xmlHttp.open('POST', '../parser/codehl_getparsedcode.php', false);
		xmlHttp.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
		xmlHttp.send(	'languageVal=' 		+ encodeURIComponent(languageVal) 	+
						'&headerVal=' 		+ encodeURIComponent(headerVal) 	+
						'&textareaVal=' 	+ encodeURIComponent(textareaVal) 	+
						'&numVal=' 			+ encodeURIComponent(numVal) 		+
						'&startNumberVal=' 	+ encodeURIComponent(startNumberVal));

		if (xmlHttp.readyState == 4 && xmlHttp.status==200)
		{	
			var ed = tinyMCEPopup.editor;
			tinyMCEPopup.execCommand("mceAddUndoLevel");
			if (!mainDiv)
			{
				var rng = ed.selection.getRng();
				if (rng.collapse)
				{
					rng.collapse(false);
				}
				var htmlContent ="";
				htmlContent += "<div class='codehl'><div class='"+classPrefix+languageVal+"' ";
				htmlContent += "style='width: "+divWidth+";'>"; 
				htmlContent += xmlHttp.responseText;
				htmlContent += "</div></div>";
				tinyMCEPopup.execCommand("mceInsertContent",false,"<p></p>");
				tinyMCEPopup.execCommand("mceInsertContent",false,htmlContent);

				ed.addVisual(ed.getBody());
			}
			else
			{
				mainDiv.className		= classPrefix+languageVal;
				mainDiv.style.width 	= divWidth;
				mainDiv.innerHTML		= xmlHttp.responseText;
			}
			
			ed.nodeChanged();
		}
		else console.log("XMLHttpRequest Error: " + xmlHttp.statusText);
	}
};

tinyMCEPopup.onInit.add(codehlDialog.onInit, codehlDialog);