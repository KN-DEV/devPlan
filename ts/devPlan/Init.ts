/// <reference path="../DefinitelyTyped/jquery/jquery.d.ts" />
/// <reference path="../DefinitelyTyped/typeahead/typeahead.d.ts" />
/// <reference path="../DefinitelyTyped/jquery.cookie/jquery.cookie.d.ts" />
/// <reference path="../Cash/Timetable.ts" />
/// <reference path="../Cash/Api.ts" />
/// <reference path="Settings.ts" />
/// <reference path="Generate.ts" />
/// <reference path="typeahead.ts" />

/**
 * devPlan App
 */

interface JQuery {
    typeahead(x: any): any;
}

module devPlan {
    /**
 * 
 */
    export class ActivityHourCounter {
        hour: number = 0;
        counter: number = 0;
    }
    /**
     * 
     */
    export class Init {

        /**
         * Keeps list of groups from Cash service
         */
        private static groups: Cash.Group[] = [];

        /**
         * Keeps list of tutors from Cash service
         */
        private static tutors: Cash.Tutor[] = [];
        /**
         * Keeps list of places from Cash service
         */
        private static places: Cash.Place[] = [];
        /**
         * 
         */
        static timetable: Cash.Timetable;
        constructor() {
            $("#search-input").attr('value', Settings.getUrlParam('search'));
            Settings.load();

            /**
             * Check if GET['timetable'] exists
             */
            var params: Cash.Params;
            if (Settings.getUrlParam('timetable').length != 0) {
                params = Cash.Params.fromString(Settings.getUrlParam('timetable'));
                Settings.setTimetableParams(params);
            } else {
                params = Settings.getTimetableParams();
            }

            /**
             * Sprawdza czy istnieje jakikolwiek parametr do planu
             */
            if (params.isEmpty()) {
                /**
                 * Kręcące się kółko
                 */
                $("#timetable-panel-spinner-icon")
                    .empty()
                    .append('<button class="btn btn-primary"' +
                    'data-toggle="modal" data-target="#myModal">' +
                    'Stwórz swój devPlan' +
                    '</button>');

            } else {
                /**
                 * Pobieranie planu zajęć
                 */
                $.when(Cash.Api.getTimetable(params))
                    .done((response: any) => {
                        Init.showTimetable(Init.setTimetable(response).getTimetable());
                        $("#timetable-panel-spinner").remove();
                    }).fail(() => {
                        $.when(Cash.Api.registerTimetable(params))
                            .done((response: any) => {
                                console.log(new Date().getTime() + "done");
                                Init.showTimetable(Init.setTimetable(response).getTimetable());

                                $("#timetable-panel-spinner").remove();
                            }).fail(() => {
                                console.log("Registration timetable failed");
                            });
                    });
            }

            /**
             * Zakładka szukaj
             */
            if ($("#search-panel-input").length) {
                $("#search-panel-input").attr('value', Settings.getUrlParam('search'));
            }


            $.when(Cash.Api.getGroupsList(), Cash.Api.getTutorsList())
                .done((groups: any, tutors: any) => {

                    Init.setGroups(groups[0]);
                    Init.setTutors(tutors[0]);

                    $("#search-input")
                        .removeAttr('disabled')
                        .attr('placeholder', 'KrDzIs3011Io / dr Paweł Wołoszyn')
                        .attr('data-provide', "typeahead");

                    var data: string[] = [];
                    for (var i = 0; i < Init.getGroups().length; i++) {
                        data.push(Init.getGroups()[i].getName());
                    }
                    for (i = 0; i < Init.getTutors().length; i++) {
                        data.push(Init.getTutors()[i].getName());
                    }

                    /**
                     * Navbar search
                     */
                    $("#search-input").typeahead({
                        source: data,
                        items: 15,
                        updater: (item: any) => {


                            window.location.replace('timetable.html?timetable=g' + Init.searchGroup(item));
                        }
                    });

                    /**
                     * Add information about selected groups places and tutors
                     */
                    Settings.loadTimetableParam();
                    /**
                     * 
                     */
                    $(".devPlanTypeahead").each((index) => {
                        $('#' + index + '.devPlanTypeahead').removeAttr('disabled')
                            .attr('placeholder', 'KrDzIs3011Io / dr Paweł Wołoszyn')
                            .attr('data-provide', "typeahead");

                        $('#' + index + '.devPlanTypeahead').typeahead({
                            source: data,
                            items: 15,
                            updater: (item: any) => {
                                Settings.addTimetableParam(item);
                                console.log("Selected: " + item);
                            }
                        });
                    });



                    if ($("#search-panel-input").length) {
                        $("#search-panel-input")
                            .attr('value', Settings.getUrlParam('search'))
                            .attr('placeholder', 'KrDzIs3011Io / dr Paweł Wołoszyn')
                            .removeAttr("disabled");
                        $("#search-panel .panel-body").remove();
                        Init.showSearchResults(Settings.getUrlParam("search"));
                    }
                }).fail(() => {
                    console.log("Fail creating typeahead");
                });
        }
        /**
         *
         */
        static getGroups(): Cash.Group[] {
            return Init.groups;
        }
        /**
         *
         */
        static setGroups(groups: Cash.Group[]= []): Init {

            for (var i = 0; i < groups.length; i++) {
                Init.groups.push(new Cash.Group(groups[i]));
            }
            Init.groups = Init.getGroups().sort((a: any, b: any) => {return a.getName() - b.getName() });
            return Init;
        }



        public static searchGroup(name: string): number {
            var id: number;
            var counter: number;
            var group: any;
            for (var i = 0; i < Init.getGroups().length; i++) {
                if (Init.getGroups()[i].getName().toLocaleLowerCase() == name.toLowerCase()) {
                    id = Init.getGroups()[i].getId();
                    counter++;
                }
            }
            return counter > 1 ? 0 : id;
        }
        /**
         *
         */
        static getTutors(): Cash.Tutor[] {
            return Init.tutors;
        }
        /**
         *
         */
        static setTutors(tutors: Cash.Tutor[]= []): Init {
            for (var i = 0; i < tutors.length; i++) {
                Init.tutors.push(new Cash.Tutor(tutors[i]));
            }
            Init.tutors = Init.getTutors().sort((a: any, b: any) => {return a.getName() - b.getName() });
            return Init;
        }

        public static searchTutor(name: string): number {
            var id: number;
            var counter: number;
            var group: any;
            for (var i = 0; i < Init.getTutors().length; i++) {
                if (Init.getTutors()[i].getName().toLocaleLowerCase() == name.toLowerCase()) {
                    id = Init.getTutors()[i].getId();
                    counter++;
                }
            }
            return counter > 1 ? 0 : id;
        }
        /**
         *
         */
        static getTimetable(): Cash.Timetable {
            return Init.timetable;
        }
        /**
         *
         */
        static setTimetable(timetable: Cash.TimetableInterface) {
            Init.timetable = new Cash.Timetable(timetable);
            return Init;
        }

        /**
         * 
         */
        static showSearchResults(query: string = ""): void {
            $("#search-results").empty();
            query = query.toString().toUpperCase();
            if (query.length >= 3) {
                var data = '';
                for (var i = 0; i < Init.getGroups().length; i++) {
                    if (Init.getGroups()[i].getName().toString().toUpperCase().indexOf(query) !== -1) {
                        data = data +
                        '<li class="list-group-item">' +
                        '<a href="timetable.html?timetable=g' + Init.getGroups()[i].getId() + '">' + Init.getGroups()[i].getName() + '</a>' +
                        '</li>';
                    }
                }
                for (var i = 0; i < Init.getTutors().length; i++) {
                    if (Init.getTutors()[i].getName().toString().toUpperCase().indexOf(query) !== -1) {
                        data = data +
                        '<li class="list-group-item">' +
                        '<a href="timetable.html?timetable=t' + Init.getTutors()[i].getId() + '">' + Init.getTutors()[i].getName() + '</a>' +
                        '<span class="pull-right">' +
                        '<a href="' + Init.getTutors()[i].getMoodleUrl() + '" title="Wizytówka E-Uczelnia"><i class="fa fa-globe fa-fw"></i></a>' +
                        '</span>' +
                        '</li>';

                    }
                }
                //            for ( var i = 0; i <Init.getPlaces().length; i++ )
                //            {
                //                if (Init.Init.getPlaces()[i].location.toString().toUpperCase().indexOf( query ) !== -1 )
                //                {
                //                    data = data +
                //                    '<li class="list-group-item">' +
                //                    '<a href="timetable.html?timetable=p' +Init.getPlaces()[i].id + '">' +Init.getPlaces()[i].location + '</a>' +
                //                    '</li>';
                //                }
                //            }
                $("#search-panel-body").attr("display", "none");
                if (data.length == 0) {
                    data = "<tr><td class='text-center'>Brak wyników. Spróbuj jeszcze raz ;)</td</td>";
                }
                $("#search-results").append(data);
            } else {
                console.log("Too short query");
            }
        }
        /**
         * 
         */
        static showTimetable(timetable: Cash.Timetable): void {
            var data = "";
            var date = "";
            $("#timetable-results").empty();

            if (timetable.getActivities().length > 0) {

                var activityCounter: ActivityHourCounter[] = [];
                var activityCounterIndex: string = "";

                var activity: Cash.Activity;
                var j = 0;
                for (var i = 0; i < timetable.getActivities().length; i++) {
                    activity = timetable.getActivities()[i];
                    /**
                     * zajęcia dla wielu grup - lista grup
                     */
                    j = i;
                    var groups: Cash.Group[] = [];
                    do {
                        if (timetable.getActivities()[j].getGroup() != null) {
                            groups[groups.length] = new Cash.Group(timetable.getActivities()[j].getGroup());
                        }
                    } while (timetable.getActivities()[++j] != null &&
                        activity.getName() == timetable.getActivities()[j].getName() &&
                        activity.getEndsAtTimestamp() == timetable.getActivities()[j].getEndsAtTimestamp());

                    /**
                     * 
                     */
                    var indexgroup = "";
                    groups = groups.sort((a: any, b: any): any => {
                        return a.getName() >= b.getName();
                    });

                    for (var k = 0; k < groups.length; k++) {
                        indexgroup = indexgroup + groups[k].getName();
                    }

                    activityCounterIndex = indexgroup + '-' + activity.getName() + '-' +
                    activity.getCategory() + '-' + (activity.getTutor() != null ? activity.getTutor().getId() + '' : '');

                    if (activityCounter[activityCounterIndex] == undefined) {
                        activityCounter[activityCounterIndex] = new ActivityHourCounter();
                    }

                    if (
                        activity.getDate() >= Settings.getCurrentDate()
                        || Settings.getTimetableType() == 0) {


                        if (                            //(activity.getName().length == 0) ||
                            (activity.getName().toLowerCase().indexOf(Settings.getActivityNameFilter().toLowerCase()) > -1) ||
                            // (activity.getCategory().toLowerCase().indexOf(Settings.getActivityNameFilter().toLowerCase()) > -1) ||
                            (activity.getTutor().getName().toLowerCase().indexOf(Settings.getActivityNameFilter().toLowerCase()) > -1) ||
                            (indexgroup.toLowerCase().indexOf(Settings.getActivityNameFilter().toLowerCase()) > -1) ||
                            (activity.getDate().indexOf(Settings.getActivityNameFilter().toLowerCase()) > -1)
                            ) {

                            if (date != activity.getDate()) {
                                data = data + Generate.dateInformation(activity);
                                date = activity.getDate();
                            }
                            date = activity.getDate();

                            /**
                             * zajęcia dla wielu grup - opuszcza kolejne
                             */
                            if (timetable.getActivities()[i - 1] != null &&
                                activity.getName() == timetable.getActivities()[i - 1].getName() &&
                                activity.getEndsAtTimestamp() == timetable.getActivities()[i - 1].getEndsAtTimestamp()) {
                                continue;
                            }

                            ++activityCounter[activityCounterIndex].counter;
                            activityCounter[activityCounterIndex].hour += activity.getNumberOfSchoolLessons();

                            data = data +
                            '<li id="activity-' + i + '" class="list-group-item activity">' +
                            '<p class="h5">' +
                            Generate.nameInformation(timetable.getActivities()[i]) + '<wbr>' +
                            Generate.tutorInformation(timetable.getActivities()[i]);
                            '</p>';

                            if (Settings.getActivityNote() && activity.getNotes() != null) {
                                data = data + '<p class="h6">' +
                                Generate.noteInformation(timetable.getActivities()[i]) +
                                '</p><div class="clearfix"></div>';
                            }
                            if (Settings.getActivityBell() ||
                                Settings.getActivityLocation() ||
                                Settings.getActivityCategory() ||
                                Settings.getClassCounter() ||
                                Settings.getClassHourCounter()) {
                                data = data + '<p class="h6">' +

                                Generate.bellInformation(timetable.getActivities()[i]) + '<wbr>' +
                                Generate.locationInformation(timetable.getActivities()[i]) + '<wbr>' +
                                Generate.categoryInformation(timetable.getActivities()[i]) + '<wbr>';



                                if (Settings.getClassCounter()) {
                                    data = data + '<span class="label label-info pull-right" title="Zajęcia z koleji: ' + activityCounter[activityCounterIndex].counter + '"><i class="fa fa-fw fa-info-circle"></i>' + activityCounter[activityCounterIndex].counter + '</span><wbr>';
                                }

                                if (Settings.getClassHourCounter()) {
                                    data = data + '<span class="label label-default pull-right" title="Ilość jednostek lekcyjnych:"><i class="fa fa-fw fa-clock-o"></i>' +
                                    (activityCounter[activityCounterIndex].hour - activity.getNumberOfSchoolLessons()) + " - " + activityCounter[activityCounterIndex].hour +
                                    '</span> ';
                                }
                                data = data + '</p><div class="clearfix"></div>';
                            }
                            if (Settings.getActivityGroup()) {
                                data = data + '<p class="h6">';
                                for (var j = 0; j < groups.length; j++) {
                                    if (groups[j] != null) {
                                        data = data + '<a href="timetable.html?timetable=g' + groups[j].getId() + '" title="Plan zajęć dla ' + groups[j].getName() + '">' + groups[j].getName() + "</a>" + '<wbr>';
                                        if (j < (groups.length - 1)) {
                                            data = data + ' | ';
                                        }
                                    }
                                }
                                data = data + '</p>';
                            }
                            data = data + '<div class="clearfix"></div>';
                            data = data + '</li>';
                        }
                    }
                }
                if (data.length == 0 && Settings.getActivityNameFilter().length > 0) {
                    data = data + '<li class="list-group-item"><p class="h4 text-center">Brak wyników</p>';
                }
            } else {
                data = data + '<li class="list-group-item"><p class="h4 text-center">Przykro nam. Ten devPlan nie posiada żadnych zajęć.</p>';
            }
            $("#timetable-results").append(data);
        }
    }

}


function sendIssue() {
    $.ajax({
        url: "http://devplan.uek.krakow.pl/devPlanAdmin/index.php/issue/create",
        type: "POST",
        data: {
            email: $("#issueEmail").val(),
            content: $("#issueContent").val(),
            device: "Browser",
            device_information: navigator
        }
    });
}


