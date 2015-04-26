<?php
/*******************************************************************************

*******************************************************************************/
require_once('codehl_engine.php');
require_once('codehl_getpostval.php');

$engine = new CodeHL(getPostVal('languageVal'),getPostVal('textareaVal'));
$engine->startLine 	= getPostVal('startNumberVal');
$engine->codeHeader = getPostVal('headerVal');
$engine->numLines = getPostVal('numVal');
$engine->style = getPostVal('themeVal');

$engine->parseHL();
$engine->showParsed();

?>