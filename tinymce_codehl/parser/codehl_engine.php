<?php
/*
	var 0.1		[2014.12.10]
		Start
	ver 0.8 	[2015.01.23]
		main functions
	ver 0.9 	[2015.01.24]
		Stable engine
	ver 0.9.1 	[2015.01.25]
		fixed: 
			parsing empty strings
			selecting code without line numbers
			mulitiline span
	ver 0.9.2	[2015.04.02]
		fixed:	performance
	ver 0.9.3	[2015.04.12]
		add variable pattern
	ver 1.0		[2015.04.12]
		&lt; &gt; &amp; 		<-- not fixed
	ver 1.1		[2015.05.18]
		enabled editing code
	ver 1.3 	[2015.05.26]
		fixed:
			&lt; &gt; &amp; 
	ver 1.4		[2015.12.--]
		minor changes
	ver 1.5		[2016.03.01]
		fixed:	
			char enconding bug
	ver 1.6
		fixed:
			keywords matching bug
	ver 1.7		[2016.03.05]
		Feature: key-words case sensitivity

	ver 2.0 (beta)
		Feature: JavaScript Parser
	var 2.0
		JavaScript Parser (beta)
		

*/

class CodeHL
{
	var $lang_data = array();
	var $clearCode ="";
	var $parsedCode="";
	var $lang="";
	var $numLines = true;
	var $startLine = 1;
	var $style = "normal";
	var $codeHeader = "Sample code";
	var $timestamps = array();
	var $ver = "2.1";
	var $parserEngine = "PHP";

	function timestamp($name="noname")
	{
		list($usec, $sec) = explode(' ', microtime()); 

		array_push($this->timestamps,array($name,(float)$usec + (float)$sec)); 
	}

	function showtimestamps($all=true)
	{
		$i=0;		
		$last=0;
		$first=0;
		$buff = "";
		$details = "";
		if($all)
		{
			foreach($this->timestamps as $row)
			{				
				if($i) $details .= sprintf("%s <span style='color:#a00'>%3.2f</span> ms", $row[0],1000*($row[1]-$last));
				else {$first = $row[1]; $details .= sprintf("<br>Start at <span style='color:#a00'> %s</span>",date("H:i:s", $row[1]));}
				$last = $row[1];
				$details .= "<br>";
				$i++;
			}
		}
		$buff .= sprintf("Parsed in: %3.2f ms",1000*($last-$first));
		return $buff.$details;
	}

	function CodeHL($lang ='', $clearCode = '', $codeHeader = '') 	
	{
		if (!empty($lang)) 
		{
			$this->lang = $lang;
			$this->loadLanguage($lang);
		} 
		if (!empty($clearCode)) $this->clearCode = $clearCode;
		if (!empty($codeHeader)) $this->codeHeader = $codeHeader;
    }

	function loadLanguage($lang)
	{
		require("langs/{$lang}.php");
		$this->lang_data = $lang_data;			
	}
	
	function getLanguageName()
	{
		return $this->lang_data['LANGNAME'];
	}

	function in_array_case($needle, $haystack, $case = true)
	{
		if($case)
			return in_array($needle, $haystack);
		else
			return in_array(strtolower($needle), array_map('strtolower', $haystack));
	}
	
	function commentText(&$formatted,&$splitted)
	{		
		$escapechars 	= "\\/*()";
		$pattern 		= array();
		$class 			= array();
		$regpart 		= array();

		foreach($this->lang_data['MULTICOMMENT'] as $b => $e)
		{
			array_push($pattern,addcslashes($b,$escapechars).'.*?'.addcslashes($e,$escapechars));
			array_push($class,'<span class=\'multicomment\'>$0</span>');
		}

		foreach($this->lang_data['COMMENT'] as $b => $e)
		{
			$reg = addcslashes($b,$escapechars).'[\x20-\xFF]*';			
			array_push($pattern,$reg);
			array_push($class,'<span class=\'comment\'>$0</span>');
		}

		foreach($this->lang_data['TEXT'] as $b => $e)
		{
			array_push($pattern,$b.$e);
			array_push($class,'<span class=\'text\'>$0</span>');
			$reg = addcslashes($b,$escapechars).'.*?';
			if(isset($this->lang_data['ESCAPECHAR'])) $reg .= '[^'.addcslashes($this->lang_data['ESCAPECHAR'],$escapechars).']';
			$reg .= $e;
			array_push($pattern,$reg);
			array_push($class,'<span class=\'text\'>$0</span>');
		}
		
		array_push($pattern,$this->lang_data['VARIABLEPATTERN']);
		array_push($class,'');
		
		array_push($pattern,'0{1}[0-7]{1,}');
		array_push($class,'<span class=\'oct-number\'>$0</span>');
		array_push($pattern,'0[xX][\da-fA-F]{1,}');
		array_push($class,'<span class=\'hex-number\'>$0</span>');
		$tmpVar = '[+-]{0,1}[\d]{0,}\\'.$this->lang_data['DECIMALMARK'].'[\d]{1,}';
		if(isset($this->lang_data['REALXT'])) $tmpVar .= '['.$this->lang_data['REALXT'].']{0,1}';
		array_push($pattern,$tmpVar);		
		array_push($class,'<span class=\'double-number\'>$0</span>');
		$tmpVar = '[+-]{0,1}[\d]{1,}';
		if(isset($this->lang_data['INTXT'])) $tmpVar .= '['.$this->lang_data['INTXT'].']{0,1}';
		array_push($pattern,$tmpVar);
		array_push($class,'<span class=\'dec-number\'>$0</span>');
	
		array_push($pattern,'\\r\\n|\\r|\\n');
		array_push($class,'$0');

		array_push($pattern,'&amp;|&gt;|&lt;');
		array_push($class,'$0');
		
		$splitted = preg_split('/('.implode(')|(',$pattern).')/s', $this->clearCode, -1, PREG_SPLIT_DELIM_CAPTURE | PREG_SPLIT_NO_EMPTY);
	
		foreach($pattern as $p) 
		{
			if(substr($p,-1) != '$') array_push($regpart,'/^'.$p.'$/s');
			else array_push($regpart,'/^'.$p.'/s');
		}

		$formatted = preg_filter($regpart,$class,$splitted);

		foreach($formatted as $k => $v) 
			if($formatted[$k]!='') unset($splitted[$k]);
			else unset($formatted[$k]);
	}

	function datatypesKeywords(&$formatted,&$splitted)
	{
		foreach($splitted as $k=>$fraq)
		{
			$ret = array($fraq);

			foreach ($this->lang_data['DELIMITERS'] as $splitter)
			{

				$splitrow = array();
				foreach ($ret as $row)
				{
					$spli = array();
					foreach(preg_split("/\\".$splitter."/",$row) as $r)
					{

						array_push($spli,$r);
						array_push($spli,$splitter); 
					}
					array_pop($spli);

					foreach($spli as $s) array_push($splitrow,$s);
					//$splitrow = array_merge($splitrow,$spli);
				}
				$ret = $splitrow;

			}

			foreach($ret as $key=>&$item)
			{
				$parsed[$key] = $item;			

				if(in_array($item,$this->lang_data['DELIMITERS']))
				{
					//$item = str_replace(["&","<",">"],["&amp;","&lt;","&gt;"],$item);
					$parsed[$key] = "<span class='delimiters'>{$item}</span>";					
				}
				else
				{
					foreach($this->lang_data['KEYWORDS'] as $group => $keyword)
					{
						if( $this->in_array_case($item,$keyword,$this->lang_data['CASESENSITIVE'][$group]))
						{
							$parsed[$key] = "<span class='keyword{$group}'>{$item}</span>";	
						}	
					}
				}
				$item = "";
			}

			$gotowe = implode($parsed);
			if($gotowe != "")
			{
				$formatted[$k] = $gotowe;
				unset($splitted[$k]);
			}			
			unset($parsed);
		}
	}

	function parseHL()
	{	
		$formatted = array();
		$splitted = array();

		$this->clearCode = str_replace(["&","<",">"],["&amp;","&lt;","&gt;"],$this->clearCode);

		if ($this->parserEngine == "PHP") {
			$this->commentText($formatted,$splitted);	
			$this->datatypesKeywords($formatted,$splitted);
			ksort($formatted);
			$splitted = preg_split('/(\\r\\n|\\r|\\n)/', implode($formatted));
			/********** NOT SURE **********/
			$next = array();
			foreach($splitted as &$spli)
			{
				if(strlen($spli) >0 && substr($spli,5) != '<span' && isset($next['class'])) 
				{
					$spli = '<span class=\''.$next['class'].'\'>'.$spli; 				
				}
				if(strlen($spli) >0 && substr($spli,-7) != '</span>') 
				{
					unset($next);
					preg_match('/<span class=\'(?P<class>.+?)\'>.*?$/', substr($spli,strrpos($spli,'<span')),$next);				
					$spli .= "</span>";				
				}
				else unset($next);			
			}
			/*******************************/
		}
		else {
			$splitted = preg_split('/(\\r\\n|\\r|\\n)/', ($this->clearCode));
		}
		
		$this->parsedCode = "<table class='{$this->style}'>";
	
		$this->parsedCode .= "<thead><tr><th colspan='2'><span class='title'>{$this->codeHeader}</span><span class='language'>CodeHL {$this->ver} <b>[{$this->lang_data['LANGNAME']}]</b></span></th></tr></thead>";
		
		$lineNumbers = "";
		$codeLines = "";

		$nr = $this->startLine;
		foreach($splitted as $s)
		{
			$lineNumbers .= "<pre>$nr</pre>";
			$codeLines .= "<pre>".(strlen($s)>0?$s:" ")."</pre>";
			$nr++;
		}
		//linenubers
		$this->parsedCode .= "<tr>";
		if($this->numLines == 'off') $this->parsedCode .= "<td style='width: 0px; border-right: 0px;'></td><td>";
		else $this->parsedCode .= "<td>$lineNumbers</td><td>";		
		$this->parsedCode .= $codeLines."</td></tr>";
		echo "</table>";
	}

	function showParsed()
	{
		echo $this->parsedCode;		
	}
};
?>