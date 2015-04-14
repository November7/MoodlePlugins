<?php
/*******************************************************************************

*******************************************************************************/
require_once('codehl_engine.php');
require_once('codehl_getpostval.php');


$selectedValue = getPostVal('selectedValue');

$engine = new CodeHL;

$languages = array();
if ($handle = opendir('langs'))
{
    while (($file = readdir($handle)) !== false)
	{
        $pos = strpos($file, '.');
        if ($pos > 0 && substr($file, $pos) == '.php')
		{
            $languages[] = substr($file, 0, $pos);
        }
    }
    closedir($handle);
}

sort($languages);

echo '<select name="langOption" id="langOption">' . "\n";

foreach ($languages as $lang)
{
	$engine->loadLanguage($lang);
	$selected = ' ';
	if( $selectedValue == $lang )
	{
        $selected = ' selected="selected"';
    }
	
	echo '<option value="' . $lang . '"' . $selected . '>' . $engine->getLanguageName() . '</option>' . "\n";
}

echo '</select>' . "\n";
?>
