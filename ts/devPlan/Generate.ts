/// <reference path="../../typings/bootstrap/bootstrap.d.ts" />

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
            "Stycznia",
            "Lutego",
            "Marca",
            "Kwietnia",
            "Maja",
            "Czerwca",
            "Lipica",
            "Sierpnia",
            "Września",
            "Października",
            "Listopada",
            "Grudnia"
        ];

        /**
         * 
         */
        static dateInformation(activity: devPlan.Activity): string {
            var date: Date = new Date(activity.getStartsAtTimestamp() * 1000);
            return '<li class="list-group-item list-group-item-info date" data-toggle="collapse" data-parent="#accordion" href="#' + activity.getDate() + '.activities">' +
                '<h4 id="' + activity.getDate() + '">' +
                Generate.dayOfWeek[date.getDay()] + ', ' +
                date.getDate() + ' ' +
                Generate.month[date.getMonth()] +
                '</h4></li>';
        }
        /**
         * 
         */
        static activityName(activity: devPlan.Activity): string {
            return '<span class="name">' +
                (activity.getName().length != 0 ? activity.getName() : '&nbsp;') +
                '</span>';
        }
        /**
         * 
         */
        static activityNote(activity: devPlan.Activity): string {
            return (activity.getNotes().length > 0) ? '<span class="note" title="Notatka dotycząca zajęć">' +
                activity.getNotes() + '</span>' : '';
        }
        /**
         * 
         */
        static activityStartStop(start: Date, stop: Date): string {
            return '<span class="bell">' +
                start.getHours() + ':' + (start.getMinutes() < 10 ? '0' : '') + start.getMinutes() + " - " + stop.getHours() + ':' + (stop.getMinutes() < 10 ? '0' : '') + stop.getMinutes() + '</span>';
        }
        /**
         * 
         */
        static activityCategory(activity: devPlan.Activity): string {
            return '<span class="category pull-right" title="' + activity.getCategory() + '">' +
                activity.getCategory() +
                '</span>';
        }
        /**
         * 
         */
        static activityLocation(activity: devPlan.Activity): string {
            if (activity.getPlace().getLocation().length > 0) {

                if (devPlan.Init.placesInUse == true) {
                    return '<span class="location">' +
                        '<a href="timetable.html?timetable=p' +
                        activity.getPlace().getId() + '">' +
                        activity.getPlace().getLocation() +
                        '</a>' +
                        '</span>';
                } else {
                    return '<span class="location">' +
                        activity.getPlace().getLocation() +
                        '</span>';
                }
            } else {
                return '';
            }
        }
        /**
         * 
         */
        static activityCounter(min: number, max: number): string {
            return '<span class="counter pull-right" title="Zajęcia z kolei: ' + min + '">' + min + '/' + max + '</span>';
        }
        /**
         * 
         */
        static hourInformation(value: number, have: number, all: number): string {
            return '<span class="hour pull-right" title="Godziny lekcyjne">' +
                ((have - value) + 1) + '-' + have + '/' + all + '</span> ';
        }
        /**
         * 
         */
        static activityTutorsList(activity: devPlan.Activity): string {

            if (devPlan.Init.placesInUse == true) {
                return '<span class="tutor">' +
                    (activity.getTutor().getMoodleUrl() != null ?
                    '<a href="' + activity.getTutor().getMoodleUrl() + '" title=" ' + activity.getTutor().getName() + ' - Wizytówka E-Uczelna ">E-Wizytówka</a> ' : "") +
                    '<a href="timetable.html?timetable=t' + activity.getTutor().getId() +
                    '">' + activity.getTutor().getName() + '</a>' +
                    '</span> ';
            } else {
                return '<span class="tutor">' +
                    (activity.getTutor().getMoodleUrl() != null ?
                    '<a href="' + activity.getTutor().getMoodleUrl() + '" title=" ' + activity.getTutor().getName() + ' - Wizytówka E-Uczelna ">E-Wizytówka</a> ' : "") +
                    activity.getTutor().getName() +
                    '</span> ';
            }
        }
        /**
         * @since 0.8
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
        /**
         * Generates groups list
         * @since 0.8
         */
        public static activityGroupsList(groups: devPlan.Group[]= []): string {
            var data: string = '';
            for (var j = 0; j < groups.length; j++) {
                if (groups[j] != null) {
                    data = data + '<span class="group"><a href="timetable.html?timetable=g' + groups[j].getId() + '"title="Kliknij aby zobaczyć devPlan: ' + groups[j].getName() + '">' + groups[j].getName() + "</a></span>";
                }
            }
            return data;
        }

        /**
         * Generate activity
         * @since 0.8
         */
        public static activity(timetable: devPlan.Timetable, activity: devPlan.Activity, groups: devPlan.Group[]= []): string {
            var data = '';
            data = data +
            '<li id="activity' + activity.getId() + '" class="list-group-item activity">' +
            '<div class="row">' +
            '<div class="col-lg-12 col-md-12 col-sm-12 col-xs-12">' +

            Generate.activityName(activity) +
            (Settings.isActivityCategoryVisible() ?
            Generate.activityCategory(activity) : '') +

            //tutor start
            '</div>' +
            //tutor stop
            //note start
            ((Settings.getActivityNote() == true && activity.getNotes().length > 0) ?
            ('<div class="col-lg-12 col-md-12 col-sm-12 col-xs-12">' +
            Generate.activityNote(activity) +
            '</div>') : '');
            //note stop

            if (Settings.getActivityBell() ||
                Settings.getActivityLocation() ||
                Settings.getActivityTutorsList() ||
                Settings.getClassCounter() ||
                Settings.getClassHourCounter()) {
                //
                data = data + '<div class="col-lg-12 col-md-12 col-sm-12 col-xs-12">' +

                (Settings.getActivityBell() ?
                Generate.activityStartStop(new Date(activity.getStartsAtTimestamp() * 1000), new Date(activity.getEndsAtTimestamp() * 1000)) + '<wbr>' : '') +

                (Settings.getActivityLocation() ?
                Generate.activityLocation(activity) + '<wbr>' : '') +

                (timetable.getParams().haveOnlyOneTutor() == false && Settings.getActivityTutorsList() ?
                Generate.activityTutorsList(activity) + '<wbr>' : '') +

                (Settings.getClassCounter() ?
                Generate.activityCounter(timetable.getPositionOfActivity(activity), timetable.getMaxNumberOfOccurencesOfActivity(activity)) + '<wbr>' : '') +

                (Settings.getClassHourCounter() ?
                Generate.hourInformation(activity.getNumberOfSchoolLessons(), timetable.sumAllHoursOfActivity(activity), timetable.sumAllHoursOfActivity(activity, true)) + '<wbr>' : '');

                data = data + '</div>';
            }
            if (timetable.getParams().haveOnlyOneGroup() == false && Settings.getActivityGroup()) {
                data = data + '<div class="col-lg-12 col-md-12 col-sm-12 col-xs-12">' +
                Generate.activityGroupsList(groups) +
                '</div>';
            }

            data = data + '</div></li>';
            return data;
        }

        /**
         *
         */
        static timetable(timetable: devPlan.Timetable): void {
            console.log("showTimetable", timetable);
            var data = "";
            var date = "";
            $("#timetable-results").empty();

            if (timetable.getActivities().length > 0) {
                var activity: devPlan.Activity;

                var daysCounter: number = 0;

                var j = 0;
                for (var i = 0; i < timetable.getActivities().length; i++) {
                    activity = timetable.getActivities()[i];
                    /**
                     * zajęcia dla wielu grup - lista grup
                     */
                    j = i;
                    var groups: devPlan.Group[] = [];
                    do {
                        if (timetable.getActivities()[j].getGroup() != null) {
                            groups[groups.length] = timetable.getActivities()[j].getGroup();
                        }
                    } while (timetable.getActivities()[++j] != null &&
                        activity.getName() == timetable.getActivities()[j].getName() &&
                        activity.getEndsAtTimestamp() == timetable.getActivities()[j].getEndsAtTimestamp());
                    /**
                     * 
                     */
                    var indexgroup = "";
                    groups = groups.sort((a: any, b: any): any => { return a.getName() >= b.getName(); });
                    for (var k = 0; k < groups.length; k++) {
                        indexgroup = indexgroup + ' ' + groups[k].getName();
                    }
                    /**
                     * 
                     */
                    if (activity.getDate() >= timetable.getDateFromDatesListByPosition(timetable.getDatePositionInDatesList(Settings.getCurrentDate()) + (Settings.getPage() * Settings.getTimetablePeriod())) || Settings.getTimetableType() == 0) {
                        /**
                         * Filtr
                         */
                        if (activity.contains(Settings.getActivityNameFilter(), indexgroup) == true) {
                            /**
                             * Cały dzień
                             */
                            if (date != activity.getDate()) {
                                /**
                                 * Ilość kolejnych zajęć
                                 */
                                if (Settings.getTimetablePeriod() != 0 && daysCounter >= Settings.getTimetablePeriod() && Settings.getTimetableType() != 0) {
                                    break;
                                }
                                daysCounter++;
                                if (date != "") {
                                    data = data + '</div></div>';
                                }
                                data = data + '<div class="day">' + Generate.dateInformation(activity) +
                                '<div id="' + activity.getDate() + '" class="activities collapse in ">';
                                date = activity.getDate();
                            }
                            /**
                             * zajęcia dla wielu grup - opuszcza kolejne
                             */
                            if (timetable.getActivities()[i - 1] != null &&
                                activity.getName() == timetable.getActivities()[i - 1].getName() &&
                                activity.getEndsAtTimestamp() == timetable.getActivities()[i - 1].getEndsAtTimestamp()) {
                                continue;
                            }
                            /**
                             * Pojedyncze zajęcia
                             */
                            data = data + Generate.activity(timetable, activity, groups);
                        }
                    }
                }
                //end of loop
                if (data.length == 0 && Settings.getActivityNameFilter().length > 0) {
                    data = data + '<li class="list-group-item"><p class="h4 text-center">Brak wyników</p>';
                }
            } else {
                data = data + '<li class="list-group-item"><p class="h4 text-center">Przykro nam. Ten devPlan nie posiada żadnych zajęć.</p>';
            }
            $("#timetable-results").append(data);
            // binds chevron animation
            bindAnimation();
            $('.activity').popover({
                placement: 'auto',
                trigger: 'click',
                html: true
            });
        }
    }
}
