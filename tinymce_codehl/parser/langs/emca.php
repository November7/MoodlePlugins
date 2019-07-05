<?php
/*
	Info:
	keywords: max. 4 groups
	delimiters: (including space!) and operators (one-char operator)

	ver: 0.1	[2015.10.17]
	
		 

*/

$lang_data = array(
	'VER' => '0.1', 
	'LANGNAME' => 'EMCA Script',
	'CASESENSITIVE' => array(
		1 => true,
		2 => true,
		3 => true,
		4 => true
		),
	'KEYWORDS' => array(
		1 => array(
			'for','while','do',
			'if','else',
			'break','continue','goto',
			'switch','case','default',
			'try','throw','catch',
			'return','new','with',
			'function','var','in'
			),
		2 => array(
			'true','false','null',
			'undefined','NaN','this'
			),
		3 => array(
			'console','document','window','out'
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