<?php
/*
	Info:
	keywords: max. 4 groups
	delimiters: (including space!) and operators (one-char operator)
	ver: 0.1   [2016.03.05]: 
		first try
		
	
*/

$lang_data = array(
	'VER' => '1.3', 
	'LANGNAME' => 'CISCO CLI',
	'CASESENSITIVE' => array(
		1 => false,
		2 => false,
		3 => false,
		4 => false
		),
	'KEYWORDS' => array(
		1 => array(
			'CREATE'
			),
		2 => array(
			'TABLE'
			)
					
		),
	'VARIABLEPATTERN' => '[a-zA-Z_-]{1,}[0-9]{0,}',
	'COMMENT' => array('//' => '\\'),
	'MULTICOMMENT' => array('/*' => '*/'),
	'TEXT' => array(),
	/* delimiters (including space!) and operators (one-char operator) */
	'DELIMITERS' => array(
		' ','.'		
		),
	'DECIMALMARK' => '.'
	);
?>