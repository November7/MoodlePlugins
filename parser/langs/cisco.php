<?php
/*
	Info:
	keywords: max. 4 groups
	delimiters: (including space!) and operators (one-char operator)
	ver: 0.9 [2015.01.10]: 
	the first major test
	ver: 0.9.1 [2015.04.03]
	ver: 0.9.2 [2015.04.12]
		 add variable pattern
	bug:
		problem with multi-name
*/

$lang_data = array(
	'VER' => '1.2', 
	'LANGNAME' => 'CISCO CLI',
	'CASESENSITIVE' => array(
		1 => false,
		2 => false,
		3 => false,
		4 => false
		),
	'KEYWORDS' => array(
		1 => array(
			'access-enable','access-profile','access-template','analyze','archive','audio-prompt','auto',
			'beep','bingd','bingng',
			'calendar','call','ccm-manager','cd','clear','clock','cns','configure','connect','copy','credential','crypto',
			'debug','delete','dir','disable','disconnect','dot11','dot1x',
			'emadmin','emm','enable','eou','ephone-hunt','erase','event','exit',
			'file-acct','flush','format','fsck',
			'help',
			'isdn','iterate-ip-addrs',
			'ldap','license','lock','login','logout','loop-counter',
			'memory','mkdir','monitor','more','mrinfo','mstat','mtrace',
			'name-connection','no','ntp',
			'partition','ping','ppp','processes','pwd',
			'radius','release','reload','rename','renew','restart','resume','rlogin','rmdir','rsh',
			'send','service-module','set','setup','show','slip','socktest','spec-file','ssh','start-chat','systat',
			'tclquit','tclsafe','tclsh','telnet','terminal','test','traceroute','trm','tunnel',
			'undebug','upgrade',
			'verify','vlan','voice','vtp',
			'webvpn','where','write',
			//
			'aaa','access-list','alias','appfw','application','archive','arp','async-bootp',
			'banner','bba-group','beep','boot','bridge','buffers','busy-message',
			'call','call-history-mib','capf-server','carrier-id','cdp','cef','chat-script','class-map','clock','cns',
			'config-register','configuration','connect','control-plane','coverage','credentials','crypto','ctl-client',
			'default','default-value','define','dial-control-mib','dial-peer','dialer','dialer-list','dnsix-dmdp',
			'dnsix-nat','do','dot11','dot1x','downward-compatible-config','dspfarm',
			'emm','enable','end','environment','eou','ephone','ephone-dn','ephone-dn-template','ephone-hunt',
			'ephone-template','ephone-type','errdisable','event','exception','exit',
			'facility-alarm','fax','file','flow','flow-sampler-map','format',
			'gateway','gw-accounting',
			'help','hostname','http',
			'iapp','identity','interface','ip','iphc-profile','ipv6','ivr','ixi',
			'kerberos','key','kron',
			'l2tp-class','li-view','license','line','load','logging','login','login-string',
			'mac-address-table','macro','map-class','map-list','memory','memory-size','menu','mmoip','modemcap','monitor','mrcp','mta','multilink',
			'netbios','netconf','network-clock-participate','network-clock-select','network-clock-switch','no','ntp','num-exp','name',
			'object-group',
			'parameter-map','parser','password','policy-manager','policy-map','ppp','presence','printer','priority-list','privilege',
			'process','process-max-time','prompt',
			'qos','queue-list',
			'radius-server','random-detect-group','regexp','resource','resume-string','rif','rlm','rlogin','rmon','route-map','router','rtsp',
			'sampler','sasl','sccp','scheduler','scripting','secure','security','service','settlement','sgbp','shutdown',
			'signaling-class','sip-ua','snmp','snmp-server','sntp','source-bridge','spanning-tree','srcp','stackmaker',
			'stacks','standby','state-machine','stcapp','subscriber','subscriber-policy','subscription','switchport',
			'table-map','tacacs-server','telephony-service','template','terminal-queue','tftp-server','tidp',
			'time-range','track','translate','translation-rule','trunk',
			'user-group','username',
			'virtual-template','vlan','vm-integration','voice','voice-card','voice-port','voip-incoming',
			'vpdn','vpdn-group','vpdn-template','vrf','vtp','vxml',
			'warm-reboot','webvpn','wrr-queue',
			'zone','zone-pair'
			),
		2 => array(
			'secret','range','address','vlans','mode','access','trunk','standard','extended',
			'deny','permit','remark','host','running-config','startup-config','password-encryption',
			'mac-address-table','class-map','access-lists','controllers','dhcp','flash','frame-relay',
			'history','policy-map','protocols','queue','queueing','sessions','spanning-tree','storm-control',
			'tcp','tech-support','users','version','vlan-switch','route','rip'
			)
					
		),
	'VARIABLEPATTERN' => '[a-zA-Z_-]{1,}[0-9]{0,}',
	'COMMENT' => array('##' => '\\'),
	'MULTICOMMENT' => array(),
	'TEXT' => array(),
	/* delimiters (including space!) and operators (one-char operator) */
	'DELIMITERS' => array(
		' ','.'		
		),
	'DECIMALMARK' => '.'
	);
?>