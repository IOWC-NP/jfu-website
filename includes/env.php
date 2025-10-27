<?php

define("APP_ROOT", realpath(dirname(dirname(__FILE__))));
foreach(glob(APP_ROOT.'/includes/classes/*.php') as $file) include $file;