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
        static dayOfWeek: string[] = [
            "Niedziela",
            "Poniedziałek",
            "Wtorek",
            "Środa",
            "Czwartek",
            "Piątek",
            "Sobota"
        ];
        /**
         * 
         */
        static month: string[] = [
            "Styczeń",
            "Luty",
            "Marzec",
            "Kwiecień",
            "Maj",
            "Czerwiec",
            "Lipiec",
            "Sierpień",
            "Wrzesień",
            "Październik",
            "Listopad",
            "Grudzień"
        ];

        /**
         * 
         */
        static dateInformation(activity: Cash.Activity): string {
            var date: Date = new Date(activity.getStartsAtTimestamp() * 1000);
            return '<li class="list-group-item list-group-item-info date"    data-toggle="collapse" data-parent="#accordion" href="#' + activity.getDate() + '.activities"><p id="' +
                activity.getDate() + '" class="h4" >' +
                '<span>' + Generate.dayOfWeek[date.getDay()] + '</span> ' +
                '<span class="pull-right">' + date.getDate() + ' - ' + Generate.month[date.getMonth()] + ' - ' + date.getFullYear() + '' +
                '</span>' +
            //                '<span data-toggle="collapse" data-parent="#accordion" href="#' + activity.getDate() + '.activities" class="pull-right"><i class="fa fa-fw fa-chevron-up animate-transform"></i></span>' +
                '</p></li>';
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
        static noteInformation(activity: Cash.Activity): string {
            return (activity.getNotes() != null) ? '<span class="note" title="Notatka dotycząca zajęć">Notatka: ' +
                activity.getNotes() + '</span>' : '';
        }

        /**
         * 
         */
        static bellInformation(activity: Cash.Activity): string {
            return '<span class="bell" title="Zajęcia rozpoczynają się o: ' +
                activity.getStartsAt() + ' i kończą o ' + activity.getEndsAt() + '">' +
                '<strong><i class="fa fa-fw fa-bell"></i>' +
                activity.getStartsAt() + " - " + activity.getEndsAt() +
                '</strong></span>';
        }
        /**
         * 
         */
        static categoryInformation(activity: Cash.Activity): string {
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
        /**
         * 
         */
        static locationInformation(activity: Cash.Activity): string {
            if (activity.getPlace().getLocation().length > 0) {

                if (devPlan.Init.placesInUse == true) {
                    return '<span class="location" title="Kliknij aby zobaczyć devPlan ' +
                        activity.getPlace().getLocation() +
                        '"><i class="fa fa-fw fa-map-marker"></i>' +
                        '<a href="timetable.html?timetable=p' +
                        activity.getPlace().getId() + '">' +
                        activity.getPlace().getLocation() +
                        '</a>' +
                        '</span>';
                }
                return '<span class="location" title="Sala ' +
                    activity.getPlace().getLocation() +
                    '"><i class="fa fa-fw fa-map-marker"></i>' +
                    activity.getPlace().getLocation() +
                    '</span>';
            }
            return '';
        }
        /**
         * 
         */
        static activityCounter(min: number, max: number): string {
            return '<span class="counter" title="Zajęcia z kolei: ' + min + '">Zajęcia z kolei: ' + min + '/' + max + '</span><wbr>';
        }
        /**
         * 
         */
        static hourInformation(value: number, have: number, all: number): string {
            return '<span class="hour" title="Ilość jednostek lekcyjnych:">' +
                'Godziny lekcyjne od ' + ((have - value) + 1) + ' do ' + have + '(' + all + ')</span> ';
        }
        /**
         * 
         */
        static tutorInformation(activity: Cash.Activity): string {
            return '<span class="tutor"><small>' + (activity.getTutor().getMoodleUrl() != null ?
                '<a href="' + activity.getTutor().getMoodleUrl() +
                '" title=" ' + activity.getTutor().getName() + ' - Wizytówka E-Uczelna "><i class="fa fa-globe fa-fw"></i></a>' : "") +
                '<a href="timetable.html?timetable=t' + activity.getTutor().id +
                '" title="Kliknij aby zobaczyć devPlan: ' + activity.getTutor().getName() + '">' + activity.getTutor().getName() + '</a></small><span>';
        }
        /**
         * 
         */
        static devPlanParamButton(item: any, id: number, type: string): string {
            var color: string;
            switch (type) {
                case "g":
                    color = "primary";
                    break;
                case "t":
                    color = "success";
                    break;
                case "p":
                    color = "info";
                    break;
                default:
                    color = "default";
                    break;
            }
            return '<div class="btn-group btn-group-sm devPlanParam">' +
                '<button title="' + item + '" class="btn btn-' + color + '" >' +
                '<strong>' +
                ((item.length > 50) ? item.substr(0, 50) + '...' : item) + '' +
                '</strong>' +
                '</button>' +
                '<button class="btn btn-danger"  data-value="' + id + '"' +
                ' data-type="' + type + '" onclick="devPlan.Settings.removeTimetableParam(this);">' +
                '<i class="fa fa-fw fa-trash-o"></i>' +
                '</button>' +
                '</div>';
        }


        public static groupList(groups: Cash.Group[]= []): string {
            var data: string = '';
            for (var j = 0; j < groups.length; j++) {
                if (groups[j] != null) {
                    data = data + '<span class="group"><a href="timetable.html?timetable=g' + groups[j].getId() + '"title="Kliknij aby zobaczyć devPlan: ' + groups[j].getName() + '">' + groups[j].getName() + "</a></span>" + '<wbr>';
                    if (j < (groups.length - 1)) {
                        data = data + ' | ';
                    }
                }
            }
            return data;
        }

        public static generateActivity(timetable: Cash.Timetable, activity: Cash.Activity, groups: Cash.Group[]= []): string {
            var data = '';
            data = data +
            '<li id="activity' + activity.getId() + '" class="list-group-item activity ' + activity.getCategory().replace(/\s/gi, "-") + '">' +
            '<p class="h4">' +
            Generate.nameInformation(activity) +
            //tutor start
            ((Settings.getActivityTutor() == true) ?
            Generate.tutorInformation(activity) : '') +
            '</p>' +
            '<div class="clearfix"></div>' +
            //tutor stop
            //note start
            ((Settings.getActivityNote() == true) ?
            ('<p class="h5">' +
            Generate.noteInformation(activity) +
            '</p><div class="clearfix"></div>') : '');
            //note stop

            if (Settings.getActivityBell() ||
                Settings.getActivityLocation() ||
                Settings.getActivityCategory() ||
                Settings.getClassCounter() ||
                Settings.getClassHourCounter()) {
                //
                data = data + '<p class="h5">' +
                (Settings.getActivityBell() ?
                Generate.bellInformation(activity) : '') + ' ' +
                (Settings.getActivityLocation() ?
                Generate.locationInformation(activity) : '') + ' ' +
                (Settings.getActivityCategory() ?
                Generate.categoryInformation(activity) : '') + ' ' +
                (Settings.getClassCounter() ?
                Generate.activityCounter(timetable.getPositionOfActivity(activity), timetable.getMaxNumberOfOccurencesOfActivity(activity)) : '') + ' ' +
                (Settings.getClassHourCounter() ?
                Generate.hourInformation(activity.getNumberOfSchoolLessons(), timetable.sumAllHoursOfActivity(activity), timetable.sumAllHoursOfActivity(activity, true)) : '') + ' ';
                data = data + '</p><div class="clearfix"></div>';
            }
            if (Settings.getActivityGroup()) {
                data = data + '<p class="h6">' +
                Generate.groupList(groups) +
                '</p><div class="clearfix"></div>';
            }
            data = data + '</li>';
            return data;
        }
    }
}
