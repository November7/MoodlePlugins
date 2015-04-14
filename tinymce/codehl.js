/*************************************************************************************/
/*								CodeHL Moodle Plugin								 */
/*																					 */
/*							  Version: 1.0 [2015.04.14]								 */
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
		}

		var xmlHttp = new XMLHttpRequest();
		xmlHttp.open('POST', '../parser/codehl_getlangs.php', false);
		xmlHttp.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
		xmlHttp.send(strVar);

		if (xmlHttp.readyState == 4 && xmlHttp.status==200) languageControl.innerHTML = xmlHttp.responseText;
		else console.log(alert("XMLHttpRequest Error: " + xmlHttp.statusText));
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
		
		textareaControl.onkeydown = this.tabKey;

		if( mainDiv == null )
		{
			mainDiv = ed.dom.getParent(	ed.selection.getNode(),
										function(n) 
										{
											return n.parentNode && 
											n.parentNode.tagName == "div" &&
											n.parentNode.className == "codehl"; 
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
				htmlContent += "<!-- CodeHL Begin -->";
				htmlContent += "<div class='codehl'><div class='"+classPrefix+languageVal+"' ";
				htmlContent += "style='width: "+divWidth+";'>"; 
				htmlContent += xmlHttp.responseText;
				htmlContent += "</div></div><!-- CodeHL End --><p></p><p></p>";
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
		else console.log(alert("XMLHttpRequest Error: " + xmlHttp.statusText));
	}
};

tinyMCEPopup.onInit.add(codehlDialog.onInit, codehlDialog);