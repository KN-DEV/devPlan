/// <reference path="../../typings/jquery/jquery.d.ts" />
/// <reference path="../../typings/bootstrap/bootstrap.d.ts" />
/// <reference path="../../typings/jquery.cookie/jquery.cookie.d.ts" />
/// <reference path="../../typings/storejs/storejs.d.ts" />

/// <reference path="../Cash/Timetable.d.ts" />
/// <reference path="./Timetable.ts" />
/// <reference path="./Timetable/Version.ts" />
/// <reference path="../Cash/Api.ts" />
/// <reference path="Settings.ts" />
/// <reference path="Generate.ts" />
/// <reference path="qrcode.ts" />
/// <reference path="jstorage.ts" />
/// <reference path="AnimateChevron.ts" />
/// <reference path="windowsPhone.ts" />

/**
 * devPlan App
 */
module devPlan {

    export enum CacheTime {
        Group= 6,
        Tutor= 6,
        Place= 6,
        Timetable= 6
    }
    /**
     * 
     */
    export class Init {
        public static typeaheadLimit: number = 15;

        public static placesInUse: boolean = false;
        public static tutorsInUse: boolean = true;
        /**
         * Keeps list of groups from Cash service
         */
        private static groups: devPlan.Group[] = [];
        /**
         * Keeps list of tutors from Cash service
         */
        private static tutors: devPlan.Tutor[] = [];
        /**
         * Keeps list of places from Cash service
         */
        private static places: devPlan.Place[] = [];
        /**
         * 
         */
        static timetable: devPlan.Timetable;
        constructor() {
            Settings.load();
            /**
             * Ustawia przyciski
             */
            Init.setUpButtons(Settings.getTimetableParams());
            /**
             * Tworzy obiekt Params
             */
            var params: devPlan.Params = devPlan.Params.fromString(Settings.getUrlParam('timetable'));
            /**
             * Sprawdza czy obiekt Params jest pusty
             */
            if (params.isEmpty()) {
                /**
                 * Pobiera zapisane ustawienia grup
                 */
                params = Settings.getTimetableParams();
            }

            /**
             * Auto redirect to devPlan
             */
            if (
                //czy jest właczone przekierowywanie
                Settings.getTimetableRedirect() == true &&
                params.isEmpty() == false &&

                (
                window.location.href.indexOf("index.html") == -1 &&
                window.location.href.indexOf("timetable.html") == -1
                )

                ) {
                window.location.replace('timetable.html?timetable=' + params.toString());
            }
            /**
             * Generowanie planu zajęć
             * Sprawdza czy istnieje element
             */
            if ($("#timetable-results").length) {
                /**
                 * Sprawdza czy istnieje jakikolwiek parametr do planu
                 */
                if (!params.isEmpty()) {
                    Init.loadTimetable(params);
                    console.log("Koniec");

                } else {
                    $("#timetable-panel-spinner").remove();
                }
            }

            $.when(
                Cash.Api.getGroupsList(true, 12),
                devPlan.Init.tutorsInUse == true ? Cash.Api.getTutorsList(true, 12) : null,
                devPlan.Init.placesInUse ? Cash.Api.getPlacesList(true, 12) : null
                )
                .done((groups: any, tutors: any, places: any) => {


                    /**
                     * Navbar search
                     */
                    $("#search-input")
                        .removeAttr('disabled')
                        .attr('data-provide', "typeahead")
                        .typeahead({
                            source: Init.typeaheadDataCreator(
                                Init.getGroups(),
                                (devPlan.Init.tutorsInUse == true ? Init.getTutors() : []),
                                (devPlan.Init.placesInUse == true ? Init.getPlaces() : [])
                                ),
                            items: devPlan.Init.typeaheadLimit,
                            updater: (item: any) => {
                                var group: number = Init.searchGroupId(item);
                                var tutor: number = Init.searchTutorId(item);
                                var place: number = Init.searchPlaceId(item);
                                if (group > 0 && tutor == 0 && place == 0) {
                                    window.location.replace('timetable.html?timetable=g' + group);
                                }
                                if (devPlan.Init.tutorsInUse == true && group == 0 && tutor > 0 && place == 0) {
                                    window.location.replace('timetable.html?timetable=t' + tutor);
                                }
                                if (devPlan.Init.placesInUse == true && group == 0 && tutor == 0 && place > 0) {
                                    window.location.replace('timetable.html?timetable=p' + place);
                                }
                            }
                        });

                    /**
                     * 
                     */
                    $(".devPlanTypeahead").each((index) => {
                        $('#' + index + '.devPlanTypeahead').removeAttr('disabled')
                            .attr('data-provide', "typeahead");
                        $('#' + index + '.devPlanTypeahead').typeahead({
                            source: Init.typeaheadDataCreator(
                                Init.getGroups(),
                                (devPlan.Init.tutorsInUse == true ? Init.getTutors() : []),
                                (devPlan.Init.placesInUse == true ? Init.getPlaces() : [])
                                ),
                            items: devPlan.Init.typeaheadLimit,
                            updater: (item: any) => {
                                Settings.addTimetableParam(item);
                            }
                        });
                    });
                    /**
                     * Use cache
                     */
                }).fail(() => {
                    if ($.jStorage.storageAvailable() == true) {
                        $("#search-input")
                            .removeAttr('disabled')
                            .attr('data-provide', "typeahead");

                        /**
                         *Tablica nazw dla typeahead
                         */
                        var data: string[] = Init.typeaheadDataCreator(Init.getGroups(), Init.getTutors(), Init.getPlaces());

                        /**
                         * Navbar search
                         */
                        $("#search-input").typeahead({
                            source: data,
                            items: devPlan.Init.typeaheadLimit,
                            updater: (item: any) => {
                                var group: number = Init.searchGroupId(item);
                                var tutor: number = Init.searchTutorId(item);
                                var place: number = Init.searchPlaceId(item);
                                if (group > 0 && tutor == 0 && place == 0) {
                                    window.location.replace('timetable.html?timetable=g' + group);
                                }
                                if (group == 0 && tutor > 0 && place == 0) {
                                    window.location.replace('timetable.html?timetable=t' + tutor);
                                }
                                if (devPlan.Init.placesInUse == true && group == 0 && tutor == 0 && place > 0) {
                                    window.location.replace('timetable.html?timetable=p' + place);
                                }
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
                                .attr('data-provide', "typeahead");
                            $('#' + index + '.devPlanTypeahead').typeahead({
                                source: data,
                                items: 15,
                                updater: (item: any) => {
                                    Settings.addTimetableParam(item);
                                }
                            });
                        });
                    }
                });



        }

        /**
         *
         */
        static getGroups(): devPlan.Group[] {
            return Init.groups;
        }
        /**
         *
         */
        static setGroups(groups: Cash.GroupInterface[]= []): Init {
            for (var group in groups) {
                Init.groups.push(new devPlan.Group(groups[group].id, groups[group].name));
            }
            Init.groups = Init.getGroups().sort((a: any, b: any) => {return a.getName() - b.getName() });
            return Init;
        }
        /**
         * 
         */
        public static searchGroupId(name: string): number {
            var id: number;
            var found: boolean = false;
            for (var i = 0; i < Init.getGroups().length; i++) {
                if (Init.getGroups()[i].getName().toString() == name.toString()) {
                    id = Init.getGroups()[i].getId();
                    found = true;
                    break;
                }
            }
            return found ? id : 0;
        }
        /**
         * 
         */
        /**
  *
  */
        static getTutors(): devPlan.Tutor[] {
            return Init.tutors;
        }
        /**
         *
         */
        static setTutors(tutors: Cash.TutorInterface[]= []): Init {
            for (var tutor in tutors) {
                Init.tutors.push(new devPlan.Tutor(tutors[tutor].id, tutors[tutor].name));
            }
            Init.tutors = Init.getTutors().sort((a: any, b: any) => {return a.getName() - b.getName() });
            return Init;
        }
        /**
         *
         */
        public static searchTutorId(name: string): number {
            var id: number;
            var found: boolean = false;
            for (var i = 0; i < Init.getTutors().length; i++) {
                if (Init.getTutors()[i].getName().toUpperCase().toString() == name.toUpperCase().toString()) {
                    id = Init.getTutors()[i].getId();
                    found = true;
                    break;
                }
            }
            return found ? id : 0;
        }

        /**
        *
        */
        static getPlaces(): devPlan.Place[] {
            return Init.places;
        }
        /**
         *
         */
        static setPlaces(places: any = []): Init {
            for (var place in places) {

                Init.places.push(new devPlan.Place(places[place]));
            }
            Init.places = Init.getPlaces().sort((a: any, b: any) => {return a.getLocation() - b.getLocation() });
            return Init;
        }
        /**
         *
         */
        public static searchPlaceId(name: string): number {
            var id: number;
            var found: boolean = false;
            for (var i = 0; i < Init.getPlaces().length; i++) {
                if (Init.getPlaces()[i].getLocation().toUpperCase().toString() == name.toUpperCase().toString()) {
                    id = Init.getPlaces()[i].getId();
                    found = true;
                    break;
                }
            }
            return found ? id : 0;
        }


        static loadTimetable(params: devPlan.Params) {

            $.when(Cash.Api.getTimetable(params.toString(), true, CacheTime.Timetable))
                .done((response: any) => {
                    Generate.timetable(Init.getTimetable());
                    $("#timetable-panel-spinner").remove();
                }).fail(() => {
                    if (Init.getTimetable().getActivities().length == 0) {
                        $.when(Cash.Api.registerTimetable(params.getGroups(), params.getTutors(), params.getPlaces()))
                            .done(() => {
                                $.when(Cash.Api.getTimetable(params.toString(), true, CacheTime.Timetable))
                                    .done((response: any) => {
                                        Generate.timetable(Init.getTimetable());
                                        $("#timetable-panel-spinner").remove();
                                    });
                            });
                    } else {
                        Generate.timetable(Init.getTimetable());
                        $("#timetable-panel-spinner").remove();
                        $.when(Cash.Api.getTimetableVersion(Init.getTimetable().getParams().toString()))
                            .done((data: any) => {
                                if (Init.getTimetable().isUpToDate(data) == false) {
                                    Cash.Api.removeTimetableCache(params.toString());
                                    Init.loadTimetable(params);
                                }
                            });
                    }
                });
        }
        /**
         *
         */
        static getTimetable(): devPlan.Timetable {
            return Init.timetable;
        }
        /**
         *
         */
        static setTimetable(timetable: any) {
            //  console.log(timetable);
            Init.timetable = new devPlan.Timetable(timetable);
            return Init;
        }

        /**
         * 
         */
        static typeaheadDataCreator(groups: devPlan.Group[]= [], tutors: devPlan.Tutor[]= [], places: devPlan.Place[]= []): string[] {
            var data: string[] = [];
            for (var i = 0; i < groups.length; i++) {
                data.push(Init.groups[i].getName());
            }
            for (var i = 0; i < tutors.length; i++) {
                data.push(tutors[i].getName());
            }
            for (var i = 0; i < places.length; i++) {
                data.push(places[i].getLocation());
            }
            return data;
        }
        /**
         * 
         */
        static setUpButtons(params: devPlan.Params): void {
            if (params.isEmpty() == false) {
                $(".devPlanWizardNavbarIconLink")
                    .removeAttr("data-toggle")
                    .removeAttr("data-target")
                    .toggleClass("btn-warning")
                    .toggleClass("btn-success")
                    .attr("href", "timetable.html?timetable=" + params.toString());

                $(".devPlanWizardNavbarLink")
                    .removeAttr("data-toggle")
                    .removeAttr("data-target")
                    .toggleClass("btn-warning")
                    .toggleClass("btn-success")
                    .empty()
                    .attr("href", "timetable.html?timetable=" + params.toString())
                    .attr("title", "Twój devPlan")
                    .text("Twój devPlan");

                $(".devPlanWizardLink")
                    .removeAttr("data-toggle")
                    .removeAttr("data-target")
                    .toggleClass("btn-warning")
                    .toggleClass("btn-success")
                    .empty()
                    .attr("href", "timetable.html?timetable=" + params.toString())
                    .attr("title", "Twój devPlan")
                    .text("Twój devPlan");

                $(".devPlanLink")
                    .attr("href", "timetable.html?timetable=" + params.toString())
                    .removeAttr("data-toggle")
                    .removeAttr("data-target")
                    .attr("title", "Twój devPlan")
                    .empty()
                    .text("Twój devPlan");

            } else {
                $(".timetable-panel-spinner-icon")
                    .empty()
                    .append('<button class="btn btn-warning title="Stwórz devPlan" ' +
                    'data-toggle="modal" data-target="#devPlanWizard">' +
                    'Stwórz <strong>devPlan</strong>' +
                    '</button>');
            }
        }



    }
}


function containsIndexGroups(indexgroups: string = '', query: string = ''): boolean {
    var items: string[] = query.toString().toLowerCase().split(" ");
    indexgroups = indexgroups.toString().toLowerCase();
    var item: string = "";
    var values: boolean[] = [];

    for (var i = 0; i < items.length; i++) {
        item = items[i];
        if (indexgroups.indexOf(item) > -1) {
            values.push(true);
        } else {
            values.push(false);
        }
    }
    for (i = 0; i < values.length; i++) {
        if (values[i] == false) {
            return false;
        }
    }
    return true;
}



/**
 * 
 */
function sendIssue() {
    $.ajax({
        url: "http://devplan.uek.krakow.pl/devPlanAdmin/index.php/issue/create",
        type: "POST",
        dataType: 'json',
        data: {
            email: $("#issueEmail").val().toString(),
            content: $("#issueContent").val().toString(),
            device: "Browser",
            device_information: navigator.userAgent
        }
    });
}
