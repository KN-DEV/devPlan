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
            return '<li id="date' + activity.getDate() + '" class="list-group-item list-group-item-info date"><a data-toggle="collapse" data-parent="#accordion" href="#' + activity.getDate() + '.activities">' +
                (activity.getDayOfWeek() + ', ' + activity.getDate()) + '' +
                '</a>' +
                '</li>';
        }
        /**
         * 
         */
        static noteInformation(activity: Cash.Activity): string {
            if (Settings.getActivityNote() && activity.getNotes()) {
                return '<p class="note" title="Notatka dotycząca zajęć">Notatka: ' + activity.getNotes() + '</p>';
            }
            return '';
        }
        /**
         * 
         */
        static nameInformation(activity: Cash.Activity): string {
            if (activity.getName().length > 0) {
                return '<span class="name" title="Przedmiot: ' + activity.getName() + '">' +
                    activity.getName() +
                    '</span>';
            }
            return '<span span="name" title="Przedmiot: ' + activity.getName() + '">' +
                'brak nazwy zajęć' +
                '</span>';
        }
        /**
         * 
         */
        static bellInformation(activity: Cash.Activity): string {
            if (Settings.getActivityBell()) {
                return '<span class="bell" title="Zajęcia rozpoczynają się o: ' + activity.getStartsAt() + ' i kończą o ' + activity.getEndsAt() + '">' +
                    '<i class="fa fa-fw fa-bell"></i>' +
                    activity.getStartsAt() + " - " + activity.getEndsAt() +
                    '</span>';
            } return '';
        }
        /**
         * 
         */
        static categoryInformation(activity: Cash.Activity): string {
            if (Settings.getActivityCategory()) {
                return'<span class="label label-danger category" title="Typ zajęć">' +
                    '<i class="fa fa-fw fa-tag"></i>' +
                    activity.getCategory() +
                    '</span>';
            }
            return '';
        }
        /**
         * 
         */
        static locationInformation(activity: Cash.Activity): string {
            if (Settings.getActivityLocation() && activity.getPlace().getLocation().length > 0) {
                return '<span class="location" title="Kliknij aby zobaczyć devPlan: ' + activity.getPlace().getLocation() + '"><i class="fa fa-fw fa-map-marker"></i>' +
                    '<a href="timetable.html?timetable=p' + activity.getPlace().getId() + '">' +
                    activity.getPlace().getLocation() +
                    '</a>' +
                    '</span>';
            }
            return '';
        }
        /**
         * 
         */
        static activityCounter(min: number, max: number): string {
            if (Settings.getClassCounter()) {
                return '<span class="label label-info counter" title="Zajęcia z koleji: ' + min + '"><i class="fa fa-fw fa-info-circle"></i>' + min + ' / ' + max + '</span><wbr>';
            } else {
                return '';
            }
        }
        /**
         * 
         */
        static hourInformation(value: number, have: number, all: number): string {
            if (Settings.getClassHourCounter()) {
                return '<span class="label label-default hour" title="Ilość jednostek lekcyjnych:"><i class="fa fa-fw fa-clock-o"></i>' +
                    ((have - value) + 1) + ' - ' + have + ' / ' + all + '</span> ';
            }
            return '';
        }
        /**
         * 
         */
        static tutorInformation(activity: Cash.Activity): string {
            if (Settings.getActivityTutor()) {
                return '<a class="tutor" href="timetable.html?timetable=t' + activity.getTutor().id +
                    '" title="Kliknij aby zobaczyć devPlan: ' + activity.getTutor().getName() + '">' + activity.getTutor().getName() + '</a>' + (activity.getTutor().getMoodleUrl() != null ?
                    '<a class="tutor" href="' + activity.getTutor().getMoodleUrl() +
                    '" title=" ' + activity.getTutor().getName() + ' - Wizytówka E-Uczelna "><i class="fa fa-globe fa-fw"></i></a>' : "");

            }
            return '';
        }
    }
}