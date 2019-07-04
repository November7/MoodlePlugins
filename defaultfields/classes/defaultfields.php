<?php
namespace local_defaultfields;

defined('MOODLE_INTERNAL') || die();

class defaultfields {
    public static function update_profile(\core\event\base $event = null, $userid = null) {


        global $DB, $CFG;

        if ($event) {
            $userid = $event->userid;
        }
        if (!$userid) {
            $userid = $USER->id;
        }

        $user = $DB->get_record('user', array('id' => $userid));
        $usermail = (explode("@",$user->username))[0];
        $userparts = explode(".",(explode("@",$user->username))[0]);
        
        profile_load_data($user);
        if(count($userparts) < 3) $user->profile_field_Grupa = 'Nauczyciel';
        else $user->profile_field_Grupa = strtoupper($userparts[2]);
        profile_save_data($user);

        return true;
    }
}
?>