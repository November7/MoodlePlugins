<?php
/*
	Info:
	keywords: max. 4 groups
	delimiters: (including space!) and operators (one-char operator)

	ver: 0.9 [2015.01.10]: 
	the first major test
	ver: 0.9.1 [2015.04.12]
		 add variable pattern

*/

$lang_data = array(
	'LANGNAME' => 'Pascal',
	'CASESENSITIVE' => array(
		1 => false,
		2 => false,
		3 => false,
		4 => false
		),
	'KEYWORDS' => array(
		1 => array(
			'for','while','repeat','until','do','to',
			'if','else',
			'break','goto','case',		
			'type',	'sizeof',
			'true','false',
			),
		2 => array(
			'and','or','xor','not','div'
			),
		3 => array(
			'var','type','label','program',
			'function','procedure',
			'record','array',
			'begin','end'
			),
		4 => array(
			'char','boolean','integer',
			'single','double','real',		
			'const','write'
			)		
		),
	'VARIABLEPATTERN' => '[a-zA-Z_]{1,}[0-9]{0,}',
	'COMMENT' => array(
		),
	'MULTICOMMENT' => array(
		'{'  => '}',
		'(*' => '*)',
		'/*' => '*/'
		),
	'TEXT' => array(
		'\'' => '\''
		),
	/* delimiters (including space!) and operators (one-char operator) */
	'DELIMITERS' => array(
		';',',',' ',
		'(',')','[',']',
		'\'',':',
		'.',
		'*','+','-','/',
		'=','<','>',		
		),
	'DECIMALMARK' => '.'
	);
?>