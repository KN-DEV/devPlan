/// <reference path="../DefinitelyTyped/jquery/jquery.d.ts" />
/// <reference path="../DefinitelyTyped/bootstrap/bootstrap.d.ts" />
/// <reference path="../DefinitelyTyped/jquery.cookie/jquery.cookie.d.ts" />
/// <reference path="../DefinitelyTyped/storejs/storejs.d.ts" />
/// <reference path="../Cash/Timetable.ts" />
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

        public static placesInUse: boolean = false;
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
            Settings.load();
            /**
             * Ustawia przyciski
             */
            Init.setUpButtons(Settings.getTimetableParams());
            /**
             * Tworzy obiekt Params
             */
            var params: Cash.Params = Cash.Params.fromString(Settings.getUrlParam('timetable'));
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
                Settings.getTimetableRedirect() &&
                !params.isEmpty() &&
                (window.location.href.indexOf("timetable.html") == -1)) {
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



                    $.when(Cash.Api.getTimetable(params, true, CacheTime.Timetable))
                        .done((response: any) => {
                            Init.showTimetable(Init.getTimetable());
                            $("#timetable-panel-spinner").remove();
                        }).fail(() => {

                            if (Init.getTimetable() == null) {

                                $.when(Cash.Api.registerTimetable(params))
                                    .done(() => {
                                        $.when(Cash.Api.getTimetable(params, true, CacheTime.Timetable))
                                            .done((response: any) => {
                                                Init.showTimetable(Init.getTimetable());
                                                $("#timetable-panel-spinner").remove();
                                            }).fail((response: any) => {
                                            });
                                    }).fail(() => {
                                    });
                            } else {
                                Init.showTimetable(Init.getTimetable());
                                $("#timetable-panel-spinner").remove();
                            }
                        });
                } else {
                    $("#timetable-panel-spinner").remove();
                }

            }

            $.when(
                Cash.Api.getGroupsList(true, CacheTime.Group),
                Cash.Api.getTutorsList(true, CacheTime.Tutor),
                (devPlan.Init.placesInUse == true ? Cash.Api.getPlacesList(true, CacheTime.Place) : null)
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
                                Init.getTutors(),
                                devPlan.Init.placesInUse == true ? Init.getPlaces() : []
                                ),
                            items: 15,
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
                     * 
                     */
                    $(".devPlanTypeahead").each((index) => {
                        $('#' + index + '.devPlanTypeahead').removeAttr('disabled')
                            .attr('data-provide', "typeahead");
                        $('#' + index + '.devPlanTypeahead').typeahead({
                            source: Init.typeaheadDataCreator(
                                Init.getGroups(),
                                Init.getTutors(),
                                devPlan.Init.placesInUse == true ? Init.getPlaces() : []
                                ),
                            items: 15,
                            updater: (item: any) => {
                                Settings.addTimetableParam(item);
                            }
                        });
                    });

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
                            items: 15,
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
        static getGroups(): Cash.Group[] {
            return Init.groups;
        }
        /**
         *
         */
        static setGroups(groups: Cash.GroupInterface[]= []): Init {
            for (var group in groups) {
                Init.groups.push(new Cash.Group(groups[group]));
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
        static getTutors(): Cash.Tutor[] {
            return Init.tutors;
        }
        /**
         *
         */
        static setTutors(tutors: Cash.TutorInterface[]= []): Init {
            for (var tutor in tutors) {
                Init.tutors.push(new Cash.Tutor(tutors[tutor]));
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
        static getPlaces(): Cash.Place[] {
            return Init.places;
        }
        /**
         *
         */
        static setPlaces(places: any = []): Init {
            for (var place in places) {

                Init.places.push(new Cash.Place(places[place]));
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
        /**
         *
         */
        static getTimetable(): Cash.Timetable {
            return Init.timetable;
        }
        /**
         *
         */
        static setTimetable(timetable?: Cash.TimetableInterface) {
            Init.timetable = new Cash.Timetable(timetable);
            return Init;
        }
        /**
         *
         */
        static showTimetable(timetable: Cash.Timetable): void {
            console.log("showTimetable", timetable);
            var data = "";
            var date = "";
            $("#timetable-results").empty();

            if (timetable.getActivities().length > 0) {
                var activity: Cash.Activity;

                var daysCounter: number = 0;

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
                    groups = groups.sort((a: any, b: any): any => { return a.getName() >= b.getName(); });
                    for (var k = 0; k < groups.length; k++) {
                        indexgroup = indexgroup + ' ' + groups[k].getName();
                    }
                    /**
                     * 
                     */
                    if (activity.getDate() >= Settings.getCurrentDate(Settings.getPage()) || Settings.getTimetableType() == 0) {
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
                                    data = data + '</div>';
                                }
                                data = data + Generate.dateInformation(activity) +
                                '<div id="' + activity.getDate() + '" class="activities collapse in">';
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
                            data = data + Generate.generateActivity(timetable, activity, groups);
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
        /**
         * 
         */
        static typeaheadDataCreator(groups: Cash.Group[]= [], tutors: Cash.Tutor[]= [], places: Cash.Place[]= []): string[] {
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
        static setUpButtons(params: Cash.Params): void {
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
