(function() 
{
	//tinymce.PluginManager.requireLangPack('codehl');
	tinymce.create('tinymce.plugins.CodeHLPlugin', 
	{
		init : function(ed, url) 
		{
			ed.addCommand('codehl_doModal', function() 
			{
				ed.windowManager.open(	{
											file : ed.getParam("moodle_plugin_base") + 'codehl/tinymce/codehl_dlg.html',
											width : 600,  /// lang params ????
											height : 400,
											inline : true,
											scrollbars: false,
											maximizable: true

										}, 
										{
											plugin_url : url
										});
			});

			ed.onInit.add(function() 
			{
				tinyMCE.activeEditor.dom.loadCSS(ed.getParam('moodle_plugin_base')+'codehl/styles.css');
			});

			//console.log(url);
			ed.addButton('codehl', 	{title : 'codehl.desc', cmd : 'codehl_doModal', image : url + '/codehl.png'});
		},
		getInfo : function()
		{	
			return {
				longname : 'Code HL',
				author : 'Marcin Kowalski',
				authorurl : 'http://www.zsme.tarnow.pl',
				infourl : 'http://www.zsme.tarnow.pl',
				version : "1.4"
			};
		}
	});

	tinymce.PluginManager.add('codehl', tinymce.plugins.CodeHLPlugin);
})();