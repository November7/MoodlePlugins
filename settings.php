<?php

defined('MOODLE_INTERNAL') || die();

if ($ADMIN->fulltree) {


    $options = [
        'option1' => 'opcja 1',
        'option2' => 'opcja 2',
        'option3' => 'opcja 3'];

    $setting = new admin_setting_configselect('defaultfields/option',
                                         new lang_string('option', 'defaultfields'),
                                         new lang_string('option_desc', 'defaultfields'),
                                         'opcja 1',
                                         $options);
   // $settings->add($setting);

    $setting = new admin_setting_configcheckbox('defaultfields/xxx',
                                        new lang_string('xxx', 'defaultfields'),
                                        new lang_string('xxx_desc', 'defaultfields'),
                                        0);
    //$settings->add($setting);
}


?>