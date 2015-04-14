<?php
/*
	Info:
	keywords: max. 4 groups
	delimiters: (including space!) and operators (one-char operator)

	ver: 0.9 	[2015.03.15]
	ver: 0.9.1 	[2015.04.09]
	ver: 1.0 	[2015.04.12]
		 add variable pattern

*/

$lang_data = array(
	'VER' => '1.0', 
	'LANGNAME' => 'Command Prompt',
	'CASESENSITIVE' => array(
		1 => false,
		2 => false,
		3 => false,
		4 => false
		),
	'KEYWORDS' => array(
		1 => array(
			'cd','mkdir','ls','dir',
			'shutdown','reboot','halt','turnoff',
			'sudo','su','chmod','chown','pwd',
			'cat','nano','joe',
			'adduser','useradd','addgroup',
			'passwd','userdel','groupdel',
			'shadow','group'
			),
		2 => array(
			'less','more','grep',
			'ifconfig','ifup','ifdown'
			),
		3 => array(
			'iface','static','dhcp','address','netmask','network','broadcast','gateway','auto','inet','dns-nameservers'
			)			
		),
	'VARIABLEPATTERN' => '[a-zA-Z_-]{1,}[0-9]{0,}',
	'COMMENT' => array('#' => '\\'),
	'MULTICOMMENT' => array(),
	'TEXT' => array(),
	/* delimiters (including space!) and operators (one-char operator) */
	'DELIMITERS' => array(
		' ','.'		
		),
	'DECIMALMARK' => '.'
	);
?>