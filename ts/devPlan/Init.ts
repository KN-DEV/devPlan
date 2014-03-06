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
            if (window.location.href.indexOf("index.html") == -1 &&
                window.location.href.indexOf("timetable.html") == -1 &&
                !params.isEmpty()) {
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



                    $.when(Cash.Api.getTimetable(params, true))
                        .done((response: any) => {
                            Init.showTimetable(Init.getTimetable());
                            $("#timetable-panel-spinner").remove();
                        }).fail(() => {

                            if (Init.getTimetable() == null) {

                                $.when(Cash.Api.registerTimetable(params))
                                    .done(() => {
                                        $.when(Cash.Api.getTimetable(params, true))
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
            /**
             * Pobieranie listy grup pracowników i miejsc
             */
            $.when(Cash.Api.getGroupsList(true, 72),
                Cash.Api.getTutorsList(true, 72),
                Cash.Api.getPlacesList(true, 72))
                .done((groups: any, tutors: any, places: any) => {

                    $("#search-input")
                        .removeAttr('disabled')
                        .attr('placeholder', 'KrDzIs3011Io / dr Paweł Wołoszyn')
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
                            if (group == 0 && tutor == 0 && place > 0) {
                                window.location.replace('timetable.html?timetable=p' + place);
                            }
                        }
                    });

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
                            }
                        });
                    });

                }).fail(() => {
                    if ($.jStorage.storageAvailable() == true) {
                        $("#search-input")
                            .removeAttr('disabled')
                            .attr('placeholder', 'KrDzIs3011Io / dr Paweł Wołoszyn')
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
                                if (group == 0 && tutor == 0 && place > 0) {
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
                                .attr('placeholder', 'KrDzIs3011Io / dr Paweł Wołoszyn')
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
                        indexgroup = indexgroup + groups[k].getName();
                    }
                    /**
                     * 
                     */
                    if (activity.getDate() >= Settings.getCurrentDate() ||
                        Settings.getTimetableType() == 0) {

                        if ((activity.getName().toLowerCase().indexOf(Settings.getActivityNameFilter().toLowerCase()) > -1) ||
                            (activity.getTutor().getName().toLowerCase().indexOf(Settings.getActivityNameFilter().toLowerCase()) > -1) ||
                            (indexgroup.toLowerCase().indexOf(Settings.getActivityNameFilter().toLowerCase()) > -1) ||
                            (activity.getDate().indexOf(Settings.getActivityNameFilter().toLowerCase()) > -1)) {

                            if (date != activity.getDate()) {

                                /**
                                 * Ilość kolejnych zajęć
                                 */
                                if (Settings.getTimetablePeriod() != 0 && daysCounter >= Settings.getTimetablePeriod()) {
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
                            data = data +
                            '<li id="activity' + activity.getId() + '" class="list-group-item activity ' + activity.getCategory().replace(/\s/gi, "-") + '">' +
                            '<p class="h5">' +
                            Generate.nameInformation(timetable.getActivities()[i]) +
                            Generate.tutorInformation(timetable.getActivities()[i]);
                            '</p><div class="clearfix"></div>';
                            if (Settings.getActivityNote() && activity.getNotes() != null) {
                                data = data + '<p class="h6">' +
                                Generate.noteInformation(timetable.getActivities()[i]) +
                                '</p><div class="clearfix"></div>';
                            }
                            if (Settings.getActivityBell() ||
                                Settings.getActivityLocation() || Settings.getActivityCategory() ||
                                Settings.getClassCounter() || Settings.getClassHourCounter()) {
                                //
                                data = data + '<p class="h6">' + Generate.bellInformation(timetable.getActivities()[i]) +
                                Generate.locationInformation(timetable.getActivities()[i]) +
                                Generate.categoryInformation(timetable.getActivities()[i]) +
                                Generate.activityCounter(timetable.getPositionOfActivity(activity), timetable.getMaxNumberOfOccurencesOfActivity(activity)) +
                                Generate.hourInformation(activity.getNumberOfSchoolLessons(), timetable.sumAllHoursOfActivity(activity), timetable.sumAllHoursOfActivity(activity, true));
                                data = data + '</p><div class="clearfix"></div>';
                            }
                            if (Settings.getActivityGroup()) {
                                data = data + '<p class="h6">';
                                for (var j = 0; j < groups.length; j++) {
                                    if (groups[j] != null) {
                                        data = data + '<a href="timetable.html?timetable=g' + groups[j].getId() + '"class="group" title="Kliknij aby zobaczyć devPlan: ' + groups[j].getName() + '">' + groups[j].getName() + "</a>" + '<wbr>';
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
