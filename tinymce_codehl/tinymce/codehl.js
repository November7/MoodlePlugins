/*************************************************************************************/
/*								CodeHL Moodle Plugin								 */
/*																					 */
/*							  Version: 1.0 [2015.04.14]								 */
/*							  Version: 1.1 [2015.04.18]								 */
/*							  Version: 1.3 [2015.04.26]								 */
/*							  Version: 2.0 [2018.08.18]								 */
/*																					 */
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
var useJavaScriptParser = null;
//var classPrefix 		= 'codehl_';
//var classParserJS		= 'parserJS';
var classLangPrefix		= 'chLang_';
var classParserPrefix	= 'chParser_';

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
			encodeURIComponent((mainDiv.className.indexOf(classParserPrefix) == 0) ? 
			mainDiv.className.substring(classParserPrefix.length) : mainDiv.className);

			if(mainDiv.className.search(classParserPrefix+"JS")>=0) this.selectCombo(useJavaScriptParser,"JS");
			else  this.selectCombo(useJavaScriptParser,"PHP");

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
					if(i) textareaControl.value+="\n";
					strLine = htmlTag[i].innerHTML;
					strLine = strLine.replace(/\<[^\>]*\>/gi, "");
					strLine = strLine.replace(/\&amp\;/gi, "&");
					strLine = strLine.replace(/\&lt\;/gi, "<");
					strLine = strLine.replace(/\&gt\;/gi, ">");
					textareaControl.value += strLine;
				}
			}
			if( (htmlTag = mainDiv.getElementsByTagName('table')))
			{
				this.selectCombo(themeControl,htmlTag[0].className);
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
		useJavaScriptParser	= document.getElementById('useJavaScriptParser');
		
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
    	if(confirm('Quit without save?'))
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
		var tabChar = "	";
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
		var diff = 220;
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
		var langOptionTag 		= document.getElementById('langOption');
		var languageVal	  		= langOptionTag.options[ langOptionTag.selectedIndex ].value;
		var headerVal	  		= headerControl.value;
		var textareaVal	  		= textareaControl.value;
		var numVal	  			= numControl.value;
		var startNumberVal		= startNumberControl.value;
		var themeVal			= themeControl.value;
		var useJSVal 			= useJavaScriptParser.value;
		var divWidth			= "auto";
	
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
						'&themeVal='		+ encodeURIComponent(themeVal) 		+
						'&useJSVal='		+ encodeURIComponent(useJSVal) 		+
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
				var htmlContent ="<p>&nbsp;</p>";
//				htmlContent += "<div class='codehl'><div class='"+classPrefix+languageVal+"' data-parser='"+useJSVal+"' "+" 'data-language='"+languageVal+"' ";
				htmlContent += "<div class='codehl'><div class='"+classLangPrefix+languageVal+" "+classParserPrefix+useJSVal+"' ";
				htmlContent += "style='width: "+divWidth+";'>"; 
				htmlContent += xmlHttp.responseText;
				htmlContent += "</div></div><p>&nbsp;</p>";
				tinyMCEPopup.execCommand("mceInsertContent",false,htmlContent);
				
				//ed.addVisual(ed.getBody());

			}
			else
			{
				mainDiv.className		= classLangPrefix+languageVal+" "+classParserPrefix+useJSVal;
//				mainDiv.setAttribute('data-parser',useJSVal);
//				mainDiv.setAttribute('data-language',languageVal);
				mainDiv.style.width 	= divWidth;
				mainDiv.innerHTML		= xmlHttp.responseText;
			}
			
			ed.nodeChanged();
		}
		else console.log("XMLHttpRequest Error: " + xmlHttp.statusText);
	}
};

tinyMCEPopup.onInit.add(codehlDialog.onInit, codehlDialog);