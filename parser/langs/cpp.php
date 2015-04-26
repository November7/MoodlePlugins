<?php
/*
	Info:
	keywords: max. 4 groups
	delimiters: (including space!) and operators (one-char operator)

	ver: 0.9 [2015.01.10]: 
	the first major test
	ver: 0.9.1 [2015.01.13]: 
	change: comments
	ver: 0.9.2 [2015.01.14]: 
	change: comments, text, esc-chars, number extensions
	ver: 0.9.3 [2015.01.14]: 
	change: delimiters without space!
	ver: 0.9.4 [2015.04.12]
		 add variable pattern

*/

$lang_data = array(
	'VER' => '0.9.3', 
	'LANGNAME' => 'C++',
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
			'using','namespace',
			'return','true','false','null'),
		2 => array(
			'char','bool','int','float','double','void','enum',
			'class','struct','union',			
			'signed','unsigned','long','short',
			'volatile','const','static','auto','register',
			'virtual','friend',
			'delete','new'
			),
		3 => array(
			'INT','UINT','LONG','ULONG',
			'TRUE','FALSE','NULL','FILE'
			),
		4 => array(
			'cout','endl','cin'
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