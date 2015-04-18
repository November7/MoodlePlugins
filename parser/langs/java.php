<?php
/*
	Info:
	keywords: max. 4 groups
	delimiters: (including space!) and operators (one-char operator)

	ver: 0.9 [2015.04.12]
		 

*/

$lang_data = array(
	'VER' => '0.9', 
	'LANGNAME' => 'Java',
	'CASESENSITIVE' => array(
		1 => true,
		2 => true,
		3 => true
		),
	'KEYWORDS' => array(
		1 => array(
			'for','while','do',
			'if','else',
			'break','continue','goto',
			'switch','case','default',
			'typedef','sizeof',
			'public','protected','private',
			'try','throw','catch',
			'return','true','false','null',
			'import','java','util'
			),
		2 => array(
			'char','bool','int','float','double','void','enum','String',
			'class','struct','union',			
			'signed','unsigned','long','short',
			'volatile','const','static','auto','register',
			'virtual','friend',
			'new'
			),
		3 => array(
			'String','Scanner','System','in','out'
			),
		4 => array(
			)
		),
	'VARIABLEPATTERN' => '[a-zA-Z_]{1,}[0-9]{0,}',
	'MULTICOMMENT' => array(
		'/*' => '*/'
		),
	'COMMENT' => array(
		'//' => '\\',
		'#' => '\\'
		),
	'TEXT' => array(
		'"' => '"',
		'\'' => '\''
		),
	'ESCAPECHAR' => '\\',
	'INTXT' => 'lLuU',
	'REALXT' => 'fF',
	'DELIMITERS' => array(		
		';',',',
		'(',')','{','}','[',']',		
		'.',
		'*','+','-','/','%',
		'=','<','>',
		'~','&','|','^','!',
		':','?'
		),
	'DECIMALMARK' => '.'
	);

?>