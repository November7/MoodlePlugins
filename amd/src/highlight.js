define(['jquery'], function($) {
    return {

        init: function(wwwroot) {
                        
            jQuery.fn.parseCodeSplit = function(regexp,type) {
                let splitHtml = $(this).html().split(/(<span.*?\/span>)/gi);
                for(let i=0;i<splitHtml.length;i+=2)
                    splitHtml[i] = splitHtml[i].replace(regexp,'<span class="'+type+'">$1</span>');            
                return splitHtml.join("");
            }
    
            jQuery.fn.parseCode = function(regexp,type) {
                
                return $(this).html().replace(regexp,'<span class="'+type+'">$1</span>');
            }

            let langname = $( "div[data-parser='JS']").attr('data-language');
            

            require(['filter_codehighlighter/'+langname], function(lang_data) {
                
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

                /*******/
                $( "div[data-parser='JS'] td:eq(1) pre" ).each(function( index ) {
                    
                    $(this).html($(this).parseCode(regtx,'text'));
                });   

                for(let i=0;i<lang_data.multicomment.length;i+=2) {
                    let cs = 0;
                    let mc_b = lang_data.multicomment[i];
                    let mc_e = lang_data.multicomment[i+1];
                    $( "div[data-parser='JS'] td:eq(1) pre" ).each(function( index ) {
                    
                        if(cs) {
                            $(this).html($(this).parseCode(new RegExp("(^.*?($|"+mc_e+"))","g"),'multicomment'));
                            if($(this).html().match(new RegExp("("+mc_e+")"),"g")) {
                                cs = 0;
                            }                
                        }
                        let rmc_b = new RegExp("("+mc_b + "((?!"+mc_e + ").)*$)","g");
                        if($(this).html().match(rmc_b)) {
                            $(this).html($(this).parseCode(rmc_b,'multicomment'));
                            cs = 1;
                        }
                    });
                }

                $( "div[data-parser='JS'] td:eq(1) pre" ).each(function( index ) {
                    $(this).html($(this).parseCode(new RegExp("("+regcm.join("|")+")"),'comment'));
                    for(let i=0;i<regky.length;++i) {
                        $(this).html($(this).parseCodeSplit(regky[i],'keyword'+(i+1)));
                    }
                    $(this).html($(this).parseCodeSplit(new RegExp("\\b("+lang_data.number+")\\b","g"),'dec-number'));
                });
            });
        }
    };
});