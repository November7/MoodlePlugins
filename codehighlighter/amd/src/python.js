/*
	Info:
	keywords: max. 4 groups
	
    ver: 0.1 [2022.11.26]

*/
define([], function () {

return {
        ver: "0.1",
        langname: 'Python',
        casesensitive: {
            lv1: true,
            lv2: true,
            lv3: true,
            lv4: true
        },
        keywords: {
            lv1: [
                'for','while',
                'if','elig','else',
                'using','namespace',
                'return','true','false','null'
            ],
            lv2: [
                'int','float','str'
            ],
            lv3: [
            ],
            lv4: [
                'print'
            ]
        },
        number: '[0-9]+',
        text: ['"','\''],
        intxt: 'lLuU',
        realxt: 'fF',
        comment: ['#'],
        multicomment: ['\\/\\*','\\*\\/'] //pair begin => end
    }
});