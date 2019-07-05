<?php

function getPostVal ( $name )
{
	if(isset($_POST[$name]))
	{
		$val = $_POST[$name];			  
		if(get_magic_quotes_gpc()) $val = stripslashes($val);
		return $val;
	}	 
	return null;
}

?>