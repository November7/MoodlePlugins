<?php
/*******************************************************************************

*******************************************************************************/
require_once('codehl_engine.php');
require_once('codehl_getpostval.php');


$languageVal	= getPostVal('languageVal');
$headerVal		= getPostVal('headerVal');
$textareaVal	= getPostVal('textareaVal');
$numVal			= getPostVal('numVal');
$startNumberVal	= getPostVal('startNumberVal');

$engine = new CodeHL($languageVal, $textareaVal);
$engine->startLine 	= $startNumberVal;
$engine->codeHeader = $headerVal;
$engine->numLines = $numVal;

$engine->parseHL();
$engine->showParsed();

?>
