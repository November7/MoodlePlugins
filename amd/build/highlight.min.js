define(['jquery','core/url'], function($,url) {

 

    return {

        init: function(content) {   
            

            
            var span = function(type) {
                return '<span class="'+type+'">$1</span>';
            }
            
            $.getScript('/moodle/filter/codehighlighter/amd/src/langs/cpp.js', function()
            {
                let artx = [];
                lang_data.text.forEach(function(el,i) {
                    artx.push("\\"+el+".*?"+"\\"+el);
                })
                let regtx = new RegExp("("+artx.join('|')+")","g");
                
                $( "div[parser='JS'] td:eq(1) pre" ).each(function( index ) {
                    $(this).html($(this).html().replace(regtx,span("text")));         
                });
    
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
    
                for(let i=0;i<lang_data.multicomment.length;i+=2) {
                    let commstart = 0;
                    let mc_b = lang_data.multicomment[i];
                    let mc_e = lang_data.multicomment[i+1];
                    $( "div[parser='JS'] td:eq(1) pre" ).each(function( index ) {
                        if(commstart) {
                            $(this).html($(this).html().replace(new RegExp("(^.*?($|"+mc_e+"))","g"),span("multicomment")))
                            if($(this).html().match(new RegExp("("+mc_e+")"),"g")) {
                                commstart = 0;
                            }                
                        }
                        let rmc_b = new RegExp("("+mc_b + "((?!"+mc_e + ").)*$)","g");
                        if($(this).html().match(rmc_b)) {
                            $(this).html($(this).html().replace(rmc_b,span("multicomment")));
                            commstart = 1;
                        }
                    });
                }
    
                $( "div[parser='JS'] td:eq(1) pre" ).each(function( index ) {
                    for(let i=0;i<regky.length;++i) {
                        $(this).html($(this).html().replace(regky[i],span("keyword"+(i+1))));
                    }
                    $(this).html($(this).html().replace(new RegExp("\\b("+lang_data.number+")\\b","g"),span("dec-number")));
                    $(this).html($(this).html().replace(new RegExp("("+regcm.join("|")+")"),span("comment"))); 
                });
            });
            
            /*
            var strings = "(\".*?\"|\'.*?\')"
            var multicomment_begin = /(\/\*((?!\*\/).)*$)/gi
            var multicomment_end = /(\*\/)/gi
            var multicomment_endline = /(^.*?($|\*\/))/gi
            var keywords_lv1 = /\b(int|for|return|if|foreach)\b/gi
            var keywords_lv2 = /\b(cout|endl)\b/gi
            var numbers = /\b([0-9]+)\b/gi
            */     

        }
    };
});