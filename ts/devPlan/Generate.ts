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
            return '<li class="list-group-item list-group-item-info date"><p id="' + activity.getDate() + '" class="h5" ><strong>' +
                (activity.getDayOfWeek() + ', ' + activity.getDate()) + '' +
                '</strong>' +
                '<a data-toggle="collapse" data-parent="#accordion" href="#' + activity.getDate() + '.activities" class="pull-right"><i class="fa fa-fw fa-chevron-up"></i></a>' +
                '</p></li>';
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
                    '<span class="" title="Zajęcia rozpoczynają się o: ' + activity.getStartsAt() + ' i kończą o ' + activity.getEndsAt() + '">' +
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
                return '<strong><span class="" title="Kliknij aby zobaczyć devPlan: ' + activity.getPlace().getLocation() + '"><i class="fa fa-fw fa-map-marker"></i>' +
                    '<a href="timetable.html?timetable=p' + activity.getPlace().getId() + '">' +
                    activity.getPlace().getLocation() +
                    '</a>' +
                    '</span></strong> ';
            }
            return '';
        }

        static activityCounter(min: number, max: number): string {
            if (Settings.getClassCounter()) {
                return '<span class="label label-info pull-right" title="Zajęcia z koleji: ' + min + '"><i class="fa fa-fw fa-info-circle"></i>' + min + ' / ' + max + '</span><wbr>';
            } else {
                return '';
            }
        }
        static hourInformation(value: number, have: number, all: number): string {
            if (Settings.getClassHourCounter()) {
                return '<span class="label label-default pull-right" title="Ilość jednostek lekcyjnych:"><i class="fa fa-fw fa-clock-o"></i>' +
                    (have - value) + ' - ' + have + ' / ' + all + '</span> ';
            }
            return '';
        }
        /**
         * 
         */
        static tutorInformation(activity: Cash.Activity): string {

            if (Settings.getActivityTutor()) {
                return '<small ><a class="pull-right" href="timetable.html?timetable=t' + activity.getTutor().id +
                    '" title="Kliknij aby zobaczyć devPlan: ' + activity.getTutor().getName() + '">' + activity.getTutor().getName() + '</a>' + (activity.getTutor().getMoodleUrl() != null ?
                    '<a class="pull-right" href="' + activity.getTutor().getMoodleUrl() +
                    '" title=" ' + activity.getTutor().getName() + ' - Wizytówka E-Uczelna "><i class="fa fa-globe fa-fw"></i></a>' : "") + '</small>';

            }
            return '';
        }
    }
}