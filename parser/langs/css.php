<?php
/*
	Info:
	keywords: max. 4 groups
	delimiters: (including space!) and operators (one-char operator)
	ver: 0.1 [2016.03.13]
*/

$lang_data = array(
	'VER' => '0.1', 
	'LANGNAME' => 'CSS',
	'CASESENSITIVE' => array(
		1 => true,
		2 => true,
		3 => true,
		4 => false
		),
	'KEYWORDS' => array(
		1 => array(
			'color','font','margin','padding'
			),
		2 => array('px','em','pt'
			),
		3 => array('hover'),
		4 => array('div')
					
		),
	'VARIABLEPATTERN' => '[a-zA-Z_-]{1,}[0-9]{0,}',
	'COMMENT' => array(),
	'MULTICOMMENT' => array('/*'=>'*/'),
	'TEXT' => array(),
	'INTXT' => '#',
	/* delimiters (including space!) and operators (one-char operator) */
	'DELIMITERS' => array(
		' ','.'		
		),
	'DECIMALMARK' => '.'
	);
?>