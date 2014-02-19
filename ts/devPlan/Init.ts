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
module devPlan {
    /**
 * 
 */
    export class ActivityHourCounter {
        hour: number = 0;
        counter: number = 0;
    }

    export class Init {

        /**
         * Keeps list of groups from Cash service
         */
        static groups: Cash.Group[] = [];

        /**
         * Keeps list of tutors from Cash service
         */
        static tutors: Cash.Tutor[] = [];
        /**
         * Keeps list of places from Cash service
         */
        static places: Cash.Place[] = [];
        /**
         * 
         */
        static timetable: Cash.Timetable;
        constructor() {
            $("#search-input").attr('value', Settings.getUrlParam('search'));
            Settings.load();
            if (Settings.getUrlParam('timetable').length != 0) {
                var param: Cash.Params = {
                    group_id: [],
                    tutor_id: [],
                    place_id: []
                };
                var timetable = Settings.getUrlParam('timetable').match(/[gtp][0-9]*/gi);

                for (var i = 0; i < timetable.length; i++) {
                    if (timetable[i].toString().toLowerCase().indexOf("g") != -1) {
                        param.group_id[param.group_id.length] = parseInt(timetable[i].slice(1).toString());
                    }
                    if (timetable[i].toString().toLowerCase().indexOf("t") != -1) {
                        param.tutor_id[param.tutor_id.length] = parseInt(timetable[i].slice(1).toString());
                    }
                    //                if ( timetable[i].toString().toLowerCase().indexOf( "p" ) != -1 )
                    //                {
                    //                    param.place_id[param.place_id.length] = parseInt( timetable[i].slice( 1 ).toString() );
                    //                }
                }
                $.when
                    (Cash.Api.registerTimetable(param))
                    .done((response: Cash.Timetable) => {
                        Init.showTimetable(Init.setTimetable(response).getTimetable());
                        $("#timetable-panel-spinner").remove();
                    });
            }

            if ($("#search-panel-input").length) {
                $("#search-panel-input").attr('value', Settings.getUrlParam('search'));
            }
            $.when(
                Cash.Api.getGroupsList(),
                Cash.Api.getTutorsList()
            //            ,Cash.Api.getPlacesList()
                ).done((groups: any, tutors: any
                //            , places
                    ) => {
                    /*
                     * Typeahead
                     */
                    Init.setGroups(groups[0]);
                    Init.setTutors(tutors[0]);
                    //               Init.setPlaces( places[0] );
                    $("#search-input")
                        .removeAttr('disabled')
                        .attr('placeholder', 'KrDzIs3011Io / dr Paweł Wołoszyn')
                        .attr('data-provide', "typeahead");

                    $("#search-input").typeahead([
                        {
                            name: "groups",
                            local: Init.generateTypeaheadDatumsForGroups(Init.getGroups()),
                        }, {
                            name: "tutors",
                            local: Init.generateTypeaheadDatumsForTutors(Init.getTutors()),
                        }
                        //                    , {
                        //                        name: "places",
                        //                        local:Init.generateTypeaheadDatumsForPlaces(Init.Init.getPlaces() ),
                        //                    }
                    ]);
                    $("#search-button")
                        .removeAttr("disabled")
                        .empty()
                        .append("Szukaj");

                    if ($("#search-panel-input").length) {
                        $("#search-panel-input")
                            .attr('value', Settings.getUrlParam('search'))
                            .attr('placeholder', 'KrDzIs3011Io / dr Paweł Wołoszyn')
                            .removeAttr("disabled");
                        $("#search-panel .panel-body").remove();
                        Init.showSearchResults(Settings.getUrlParam("search"));
                    }
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
        static setGroups(groups: Cash.GroupInterface[]): Init {
            for (var i = 0; i < groups.length; i++) {
                Init.groups[Init.getGroups().length] = new Cash.Group(groups[i]);
            }
            Init.groups = Init.getGroups().sort((a: any, b: any) => {return a.getName() - b.getName() });
            return Init;
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
        static setTutors(tutors: Cash.TutorInterface[]): Init {
            for (var i = 0; i < tutors.length; i++) {
                Init.tutors[Init.getTutors().length] = new Cash.Tutor(tutors[i]);
            }
            Init.tutors = Init.getTutors().sort((a: any, b: any) => {return a.getName() - b.getName() });
            return Init;
        }
        //        /**
        //         *
        //         */
        //        static getPlaces(): Cash.Place[] {
        //            return Init.places;
        //        }
        //        /**
        //         *
        //         */
        //        static setPlaces(places: Cash.Place[]): Init {
        //            //        console.log(places);
        //            //       Init.places = places.sort((a: any, b: any) => {return a.location - b.location });
        //            //        return Init;
        //            console.log(typeof places);
        //            for (var i = 0; i < places.length; i++) {
        //                Init.places[Init.getPlaces().length] = new Cash.Place(places[i]);
        //            }
        //
        //            Init.places = Init.getPlaces().sort((a: any, b: any) => {return a.getLocation() - b.getLocation() });
        //            return Init;
        //        }
        /**
         * 
         */
        static getTimetable(): Cash.Timetable {
            //        console.log(Init.timetable);
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
        public static generateTypeaheadDatumsForGroups(groups: Cash.Group[]): DatumGroup[] {
            var data: DatumGroup[] = [];
            for (var i = 0; i < groups.length; i++) {
                data[i] = {
                    value: groups[i].getName(),
                    tokens: groups[i].getName().replace(".", "").split(" "),
                    id: groups[i].getId(),
                    name: groups[i].getName()
                };
            };
            return data;
        }
        /**
         *
         */
        public static generateTypeaheadDatumsForTutors(tutors: Cash.Tutor[]): DatumTutor[] {
            var data: DatumTutor[] = [];
            for (var i = 0; i < tutors.length; i++) {
                data[i] = {
                    value: tutors[i].getName(),
                    tokens: tutors[i].getName().replace(".", "").split(" "),
                    id: tutors[i].getId(),
                    name: tutors[i].getName(),
                    moodle_url: tutors[i].getMoodleUrl()
                };
            };
            return data;
        }
        //        /**
        //         *
        //         */
        //        public static generateTypeaheadDatumsForPlaces(places: Cash.Place[]): DatumPlace[] {
        //            var data: DatumPlace[] = [];
        //            for (var i = 0; i < places.length; i++) {
        //                data[i] = {
        //                    value: places[i].getLocation(),
        //                    tokens: places[i].getLocation().replace(".", "").split(" "),
        //                    id: places[i].getId(),
        //                    location: places[i].getLocation()
        //                };
        //            };
        //            return data;
        //        }

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
                    groups = groups.sort(
                        (a: any, b: any): any => {
                            return a.getName() >= b.getName();
                        }
                        );

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
                            Generate.nameInformation(timetable.getActivities()[i]) +
                            Generate.tutorInformation(timetable.getActivities()[i]);
                            '</p>';

                            data = data + '<p class="h6">' + Generate.noteInformation(timetable.getActivities()[i]) + '</p><div class="clearfix"></div>';

                            if (Settings.getActivityBell() ||
                                Settings.getActivityLocation() ||
                                Settings.getActivityCategory() ||
                                Settings.getClassCounter() ||
                                Settings.getClassHourCounter()) {
                                data = data + '<p class="h6">' +

                                Generate.bellInformation(timetable.getActivities()[i]) +
                                Generate.locationInformation(timetable.getActivities()[i]) +
                                Generate.categoryInformation(timetable.getActivities()[i]);



                                if (Settings.getClassCounter()) {
                                    data = data + '<span class="label label-info pull-right" title="Zajęcia z koleji: ' + activityCounter[activityCounterIndex].counter + '"><i class="fa fa-fw fa-info-circle"></i>' + activityCounter[activityCounterIndex].counter + '</span> ';
                                }

                                if (Settings.getClassHourCounter()) {
                                    data = data + ' <span class="label label-default pull-right" title="Ilość jednostek lekcyjnych:"><i class="fa fa-fw fa-clock-o"></i>' +
                                    (activityCounter[activityCounterIndex].hour - activity.getNumberOfSchoolLessons()) + " - " + activityCounter[activityCounterIndex].hour +
                                    '</span> ';
                                }
                                data = data + '</p>';
                            }
                            if (Settings.getActivityGroup()) {
                                data = data + '<p class="h6">';
                                for (var j = 0; j < groups.length; j++) {
                                    if (groups[j] != null) {
                                        data = data + '<a href="timetable.html?timetable=g' + groups[j].getId() + '" title="Plan zajęć dla ' + groups[j].getName() + '">' + groups[j].getName() + "</a>";
                                        if (j < (groups.length - 1)) {
                                            data = data + ' | ';
                                        }
                                    }
                                }
                                data = data + '</p>';
                            }
                            //   data = data + '</p><div class="clearfix"></div>';
                            data = data + '</li>';
                        }
                    }
                }
                if (data.length == 0 && Settings.getActivityNameFilter().length > 0) {
                    data = data + '<li id="' + i + '" class="list-group-item"><p class="h3">Brak wyników</p>';
                }
            } else {


                data = data + '<li id="' + i + '" class="list-group-item"><p class="h3">Przykro nam. Taki devPlan nie istnieje.</p>';
            }
            $("#timetable-results").append(data);
        }
    }

}