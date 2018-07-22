<?php

defined('MOODLE_INTERNAL') || die();

$observers = [
    [
        'eventname' => '\core\event\defaultfields',
        'callback' => '\local_defaultfields\defaultfields::update_profile'
    ]
];


?>