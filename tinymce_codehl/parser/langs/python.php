<?php
/*
	Info:
	keywords: max. 4 groups
	ver 0.1

*/

$lang_data = array(
	'VER' => '0.1', 
	'LANGNAME' => 'Python',
	'CASESENSITIVE' => array(
		1 => true,
		2 => true,
		3 => true,
		4 => true
		),
	'KEYWORDS' => array(
		1 => array(
			'for','while',
			'if','elig','else',
			'using','namespace',
			'return','true','false','null'),
		2 => array(
			'int','float','str'
			),
		3 => array(
			),
		4 => array(
			'print'
			)
		),
	'VARIABLEPATTERN' => '[a-zA-Z_]{1,}[0-9]{0,}',
	'MULTICOMMENT' => array(
		'/*' => '*/'
		),
	'COMMENT' => array(
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