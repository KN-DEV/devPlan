/**
 * 
 */
module devPlan {
    /**
     * 
     */
    export class Generate {
        /**
         * 
         */
        static dateInformation(activity: Cash.Activity): string {
            return '<li class="list-group-item list-group-item-info date">' +
                '<p id="' + activity.getDate() + '" class="h5" ><strong>' +
                activity.getDayOfWeek() + ', ' + activity.getDate() + '' +
                '</strong></p>' +
                '</li>';
        }
        /**
         * 
         */
        static noteInformation(activity: Cash.Activity): string {
            if (Settings.getActivityNote() && activity.getNotes()) {
                return '<p class="h6" title="Notatka dotycząca zajęć">Notatka: ' + activity.getNotes() + '</p>';
            }
            return '';
        }
        /**
         * 
         */
        static nameInformation(activity: Cash.Activity): string {
            if (activity.getName().length > 0) {
                return '<strong>' +
                    '<span title="Przedmiot: ' + activity.getName() + '">' +
                    activity.getName() +
                    '</span>' +
                    '</strong>';
            }
            return '<strong>' +
                '<span title="Przedmiot: ' + activity.getName() + '">' +
                'Brak zajeć' +
                '</span>' +
                '</strong>';
        }
        /**
         * 
         */
        static bellInformation(activity: Cash.Activity): string {
            if (Settings.getActivityBell()) {
                return '<strong>' +
                    '<span class="" title="Zajęcia rozpoczynają się o: ' + activity.starts_at + ' i kończą o ' + activity.ends_at + '">' +
                    '<i class="fa fa-fw fa-bell"></i>' +
                    activity.getStartsAt() + " - " + activity.getEndsAt() +
                    '</span>' +
                    '</strong>';
            } return '';
        }
        /**
         * 
         */
        static categoryInformation(activity: Cash.Activity): string {
            if (Settings.getActivityCategory()) {
                return '<strong>' +
                    '<span class="label label-danger pull-right" title="Typ zajęć">' +
                    '<i class="fa fa-fw fa-tag"></i>' +
                    activity.getCategory() +
                    '</span></strong>';
            } return '';
        }
        /**
         * 
         */
        static locationInformation(activity: Cash.Activity): string {
            if (Settings.getActivityLocation() && activity.getPlace().getLocation().length > 0) {
                return '<strong><span class="" title="Zajęcia odbywają się w ' + activity.getPlace().getLocation() + '"><i class="fa fa-fw fa-map-marker"></i>' +
                    //            '<a href="timetable.html?timetable=p' + activity.place.id + '">' +
                    activity.getPlace().location +
                //            '</a>'+ 
                    '</span></strong> ';
            }
            return '';
        }
        /**
         * 
         */
        static tutorInformation(activity: Cash.Activity): string {

            if (Settings.getActivityTutor()) {
                return '<small><a class="pull-right" href="timetable.html?timetable=t' + activity.getTutor().id +
                    '" title="devPlan  ' + activity.getTutor().getName() + '">' + activity.getTutor().getName() + '</a>' + (activity.getTutor().getMoodleUrl() != null ?
                    '<a class="pull-right" href="' + activity.getTutor().getMoodleUrl() +
                    '" title=" ' + activity.getTutor().getName() + ' - Wizytówka E-Uczelna "><i class="fa fa-globe fa-fw"></i></a>' : "")+'</small>';

            }
            return '';
        }
    }
}