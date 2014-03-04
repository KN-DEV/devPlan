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
            return '<li class="list-group-item list-group-item-info date"><p id="' +
                activity.getDate() + '" class="h4" >' +
                '<a data-toggle="collapse" data-parent="#accordion" href="#' + activity.getDate() + '.activities" class="">' +
                (activity.getDayOfWeek() + ', ' + activity.getDate()) + '' +
                '</a>' +
                '<a data-toggle="collapse" data-parent="#accordion" href="#' + activity.getDate() + '.activities" class="pull-right"><i class="fa fa-fw fa-chevron-up animate-transform"></i></a>' +
                '</p></li>';
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

            return '<span class="name">' +
                (activity.getName().length != 0 ? activity.getName() : '&nbsp;') +
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

                var color: string = "";
                switch (activity.getCategory()) {
                    case "wykład":
                        color = "warning";
                        break;
                    case "wykład do wyboru":
                        color = "warning";
                        break;
                    case "lektorat":
                        color = "success";
                        break;
                    case "ćwiczenia":
                        color = "primary";
                        break;
                    case "egzamin":
                        color = "danger";
                        break;
                    default:
                        color = "danger";
                        break;
                }

                return '<span class="label label-' + color + ' category" title="Typ zajęć">' +
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
                return '<span  title="Kliknij aby zobaczyć devPlan: ' + activity.getPlace().getLocation() + '"><i class="fa fa-fw fa-map-marker"></i>' +
                    '<a class="location" href="timetable.html?timetable=p' + activity.getPlace().getId() + '">' +
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
                return (activity.getTutor().getMoodleUrl() != null ?
                    '<a class="tutor" href="' + activity.getTutor().getMoodleUrl() +
                    '" title=" ' + activity.getTutor().getName() + ' - Wizytówka E-Uczelna "><i class="fa fa-globe fa-fw"></i></a>' : "") +
                    '<a class="tutor" href="timetable.html?timetable=t' + activity.getTutor().id +
                    '" title="Kliknij aby zobaczyć devPlan: ' + activity.getTutor().getName() + '">' + activity.getTutor().getName() + '</a>';

            }
            return '';
        }
    }
}
