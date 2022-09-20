define(['jquery'], function($) {
    return {

        init: function() {   
            console.log("highlight init");                     
            jQuery.fn.parseCodeSplit = function(regexp,type) {
                let splitHtml = $(this).html().split(/(<span.*?\/span>)/gi);
                for(let i=0;i<splitHtml.length;i+=2)
                    splitHtml[i] = splitHtml[i].replace(regexp,'<span class="'+type+'">$1</span>');            
                return splitHtml.join("");
            }
    
            jQuery.fn.parseCode = function(regexp,type) {
                
                return $(this).html().replace(regexp,'<span class="'+type+'">$1</span>');
            }

            jQuery.fn.matchCode = function(regexp) {
                let splitHtml = $(this).html().split(/(<span.*?\/span>)/gi);
                
                for(let i=0;i<splitHtml.length;i+=2)
                    if(splitHtml[i].match(regexp)) return true;            
                return false;
            }

            $( "div[data-parser='JS']").each(function() {
                let langname = ($(this).attr('data-language'));
                console.log("Lang: "+langname);
                if($.inArray(langname, ['cpp']) < 0) return;
                let pres = $(this).find("td:eq(1) pre" );

                require(['filter_codehighlighter/'+langname], function(lang_data) {
                    if(lang_data == undefined) return;
                    let artx = [];
                    lang_data.text.forEach(function(el,i) {
                        artx.push("\\"+el+".*?"+"\\"+el);
                    })
                    let regtx = new RegExp("("+artx.join('|')+")","g");
    
                    let regky = [];
                    for(let k in lang_data.keywords) {
                        if (lang_data.keywords.hasOwnProperty(k)) {                   
                            regky.push(new RegExp("\\b("+lang_data.keywords[k].join("|")+")\\b",lang_data.casesensitive[k]?"g":"gi"));
                        }
                    }
    
                    let regcm = [];
                    lang_data.comment.forEach(function(el) {
                        regcm.push(el+".*");
                    })
    
                    for(let i=0;i<lang_data.multicomment.length;i+=2) {
                        regcm.push(lang_data.multicomment[i]+".*?"+lang_data.multicomment[i+1])
                    }
    
                    pres.each(function( index ) {
                        $(this).html($(this).parseCodeSplit(regtx,'text'));                    
                    });   
    
                    for(let i=0;i<lang_data.multicomment.length;i+=2) {
                        let cs = 0;
                        let mc_b = lang_data.multicomment[i];
                        let mc_e = lang_data.multicomment[i+1];
                        pres.each(function( index ) {
                        
                            if(cs) {
                                $(this).html($(this).parseCode(new RegExp("(^.*?($|"+mc_e+"))","g"),'multicomment'));
                                if($(this).html().match(new RegExp("("+mc_e+")"),"g")) {
                                    cs = 0;
                                }                
                            }
                            else $(this).html($(this).parseCode(new RegExp("("+regcm.join("|")+")"),'comment'));
                            let rmc_b = new RegExp("("+mc_b + "((?!"+mc_e + ").)*$)","g");
                            if($(this).matchCode(rmc_b)) {
                                $(this).html($(this).parseCode(rmc_b,'multicomment'));
                                cs = 1;
                            }
                        });
                    }
    
                    pres.each(function( index ) {
                        for(let i=0;i<regky.length;++i) {
                            $(this).html($(this).parseCodeSplit(regky[i],'keyword'+(i+1)));
                        }
                        $(this).html($(this).parseCodeSplit(new RegExp("\\b("+lang_data.number+")\\b","g"),'dec-number'));
                    });
                });
         
            });            
        }
    };
});