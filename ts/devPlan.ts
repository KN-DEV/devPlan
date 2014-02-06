/// <reference path="DefinitelyTyped/typeahead/typeahead.d.ts" />
/// <reference path="DefinitelyTyped/jquery/jquery.d.ts" />
/**
 * Cash service
 */
module Cash {
    /**
     * Model of group data
     */
    export interface Group {
        id: number;
        name: string;
    }
    /**
     * Model of Tutor data
     */
    export interface Tutor extends Cash.Group {
        moodle_url: string;
    }
    /**
     * Model of place data
     */
    export interface Place {
        id: number;
        location: string;

    }
    /**
     * Model of Timetable param data
     */
    export interface TimetableParams {
        group_id: number[];
        tutor_id: number[];
        place_id: number[];
    }

    export interface Timetable {
        _id: string;
        access_url: string;
        params: TimetableParams;
        activities: Cash.Activity[];
    }
    export interface Activity {
        category: string;
        date: string;
        day_of_week: string;
        ends_at: string;
        ends_at_timestamp: number;
        group: Cash.Group;
        id: number;
        name: string;
        notes: string;
        place: Cash.Place;
        starts_at: string;
        starts_at_timestamp: number;
        state: number;
        tutor: Cash.Tutor;
    }
    /**
     * Cash API implementation
     */
    export class Api {
        /**
         * Host of service Cash 
         */
        private static host: string = "http://cash.dev.uek.krakow.pl/v0_1/";
        /**
         * Settings for ajax request
         */


        /**
         * Gets list of all groups available in cash service
         */
        public static getGroupsList(): JQueryXHR {
            return $.ajax({
                url: Cash.Api.host + "groups",
                type: "GET",
                dataType: 'json'

            });
        }
        /**
         * Gets list of all tutors available in cash service
         */
        public static getTutorsList(): JQueryXHR {
            return $.ajax({
                url: Cash.Api.host + "tutors",
                type: "GET",
                dataType: 'json'
            });
        }
        /**
        * Gets list of all places available in cash service
        */
        public static getPlacesList(): JQueryXHR {
            return $.ajax({
                url: Cash.Api.host + "places",
                type: "GET",
                dataType: 'json'

            });
        }
        /**
         * Registers timetable
         */
        public static registerTimetable(timetableParams: Cash.TimetableParams): JQueryXHR {
            return $.ajax({
                url: Cash.Api.host + "timetables",
                type: "POST",
                dataType: 'json',
                data: timetableParams
            });
        }

        public static getTimetable(timetableParams: Cash.TimetableParams): JQueryXHR {
            return $.ajax({
                url: Cash.Api.host + "places",
                type: "GET",
                dataType: 'json'
            });
        }
    }
}
interface DatumGroup {
    value: string;
    tokens: string[];
    id: number;
    name: string;
}
interface DatumTutor {
    value: string;
    tokens: string[];
    id: number;
    name: string;
    moodle_url: string;
}
interface DatumPlace {
    value: string;
    tokens: string[];
    id: number;
    location: string;
}
/**
 * devPlan App
 */
class devPlan {

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
    constructor() {
        $("#search-input").attr('value', getUrlParam('search'));

        if (getUrlParam('timetable').length != 0) {

            var param: Cash.TimetableParams = {
                group_id: [],
                tutor_id: [],
                place_id: []
            };
            var timetable = getUrlParam('timetable').match(/[gtp][0-9]*/gi);

            for (var i = 0; i < timetable.length; i++) {
                if (timetable[i].toString().toLowerCase().indexOf("g") != -1) {
                    param.group_id[param.group_id.length] = parseInt(timetable[i].slice(1).toString());
                }
                if (timetable[i].toString().toLowerCase().indexOf("t") != -1) {
                    param.tutor_id[param.tutor_id.length] = parseInt(timetable[i].slice(1).toString());
                }
                if (timetable[i].toString().toLowerCase().indexOf("p") != -1) {
                    param.place_id[param.place_id.length] = parseInt(timetable[i].slice(1).toString());
                }
            }
            $.when
                (Cash.Api.registerTimetable(param))
                .done((response: Cash.Timetable) => {
                    console.log(response);
                    devPlan.showTimetable(response);
                    $("#timetable-panel .panel-body").remove();
                });
        }

        if ($("#search-panel-input").length) {
            $("#search-panel-input").attr('value', getUrlParam('search'));
        }
        $.when(
            Cash.Api.getGroupsList(),
            Cash.Api.getTutorsList(),
            Cash.Api.getPlacesList()
            ).done((groups, tutors, places) => {
                devPlan.setGroups(groups[0]);
                devPlan.setTutors(tutors[0]);
                devPlan.setPlaces(places[0]);
                $("#search-input")
                    .removeAttr('disabled')
                    .attr('placeholder', 'KrDzIs3011Io / dr Paweł Wołoszyn')
                    .attr('data-provide', "typeahead");
                $("#search-input").typeahead([
                    {
                        name: "groups",
                        local: devPlan.generateTypeaheadDatumsForGroups(devPlan.getGroups()),
                    }, {
                        name: "tutors",
                        local: devPlan.generateTypeaheadDatumsForTutors(devPlan.getTutors()),
                    }, {
                        name: "places",
                        local: devPlan.generateTypeaheadDatumsForPlaces(devPlan.getPlaces()),
                    }
                ]);
                $("#search-button")
                    .removeAttr("disabled")
                    .empty()
                    .append("Szukaj");

                if ($("#search-panel-input").length) {
                    $("#search-panel-input")
                        .attr('value', getUrlParam('search'))
                        .attr('placeholder', 'KrDzIs3011Io / dr Paweł Wołoszyn')
                        .removeAttr("disabled");
                    $("#search-panel .panel-body").remove();
                    devPlan.showSearchResults(getUrlParam("search"));
                }
            });
    }
    /**
     *
     */
    static getGroups(): Cash.Group[] {
        return devPlan.groups;
    }
    /**
     *
     */
    static setGroups(groups: Cash.Group[]): devPlan {
        devPlan.groups = groups.sort((a: any, b: any) => {return a.name - b.name });
        return devPlan;
    }

    /**
     *
     */
    static getTutors(): Cash.Tutor[] {
        return devPlan.tutors;
    }

    /**
     *
     */
    static setTutors(tutors: Cash.Tutor[]): devPlan {
        devPlan.tutors = tutors.sort((a: any, b: any) => {return a.name - b.name });
        return devPlan;
    }
    /**
     *
     */
    static getPlaces(): Cash.Place[] {
        return devPlan.places;
    }
    /**
     *
     */
    static setPlaces(places: Cash.Place[]): devPlan {
        devPlan.places = places.sort((a: any, b: any) => {return a.location - b.location });
        return devPlan;
    }

    /**
     *
     */
    public static generateTypeaheadDatumsForGroups(groups: Cash.Group[]): DatumGroup[] {
        var data: DatumGroup[] = [];
        for (var i = 0; i < groups.length; i++) {
            data[i] = {
                value: groups[i].name,
                tokens: groups[i].name.replace(".", "").split(" "),
                id: groups[i].id,
                name: groups[i].name
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
                value: tutors[i].name,
                tokens: tutors[i].name.replace(".", "").split(" "),
                id: tutors[i].id,
                name: tutors[i].name,
                moodle_url: tutors[i].moodle_url
            };
        };
        return data;
    }
    /**
     *
     */
    public static generateTypeaheadDatumsForPlaces(places: Cash.Place[]): DatumPlace[] {
        var data: DatumPlace[] = [];
        for (var i = 0; i < places.length; i++) {
            data[i] = {
                value: places[i].location,
                tokens: places[i].location.replace(".", "").split(" "),
                id: places[i].id,
                location: places[i].location
            };
        };
        return data;
    }

    static showSearchResults(query: string = ""): void {
        $("#search-results").empty();
        console.log("Query: " + query);
        query = query.toString().toUpperCase();

        if (query.length >= 3) {
            var data = '';


            for (var i = 0; i < devPlan.getGroups().length; i++) {
                if (devPlan.getGroups()[i].name.toString().toUpperCase().indexOf(query) !== -1) {
                    data = data +
                    '<li class="list-group-item">' +
                    '<a href="timetable.html?timetable=g' + devPlan.getGroups()[i].id + '">' + devPlan.getGroups()[i].name + '</a>' +
                    '</li>';
                }
            }
            for (var i = 0; i < devPlan.getTutors().length; i++) {
                if (devPlan.getTutors()[i].name.toString().toUpperCase().indexOf(query) !== -1) {
                    data = data +
                    '<li class="list-group-item">' +
                    '<a href="timetable.html?timetable=t' + devPlan.getTutors()[i].id + '">' + devPlan.getTutors()[i].name + '</a>' +
                    '<span class="pull-right">' +
                    '<a href="' + devPlan.getTutors()[i].moodle_url + '" title="Wizytówka E-Uczelnia"><i class="fa fa-globe fa-fw"></i></a>' +
                    '</span>' +
                    '</li>';

                }
            }
            for (var i = 0; i < devPlan.getPlaces().length; i++) {
                if (devPlan.getPlaces()[i].location.toString().toUpperCase().indexOf(query) !== -1) {
                    data = data +
                    '<li class="list-group-item">' +
                    '<a href="timetable.html?timetable=p' + devPlan.getPlaces()[i].id + '">' + devPlan.getPlaces()[i].location + '</a>' +
                    '</li>';
                }
            }



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
        $("#timetable-results").empty();

        timetable.activities = timetable.activities.sort((a: any, b: any) => {return a.starts_at_timestamp - b.starts_at_timestamp });


        var date = "";
        for (var i = 0; i < timetable.activities.length; i++) {

            if (date < timetable.activities[i].date) {
                data = data + '<li class="list-group-item">' +
                '<h3 id="' + timetable.activities[i].date + '">' + timetable.activities[i].day_of_week + ' ' + timetable.activities[i].date + '</h3>' +
                '</li>';
                date = timetable.activities[i].date;
            }
            data = data +
            '<li class="list-group-item">' +
            "<h4>" + timetable.activities[i].name + "</h4>" +
            "<p>" +
            timetable.activities[i].starts_at + " - " + timetable.activities[i].ends_at + ' ' +

            (timetable.activities[i].place != null ?
            '<a href="timetable.html?timetable=p' + timetable.activities[i].place.id + '">' + timetable.activities[i].place.location + '</a>' : "") +

            '<span class="pull-right">' +
            (timetable.activities[i].tutor != null ?
            '<a href="timetable.html?timetable=t' + timetable.activities[i].tutor.id + '">' + timetable.activities[i].tutor.name + "</a> " : "") +

            (timetable.activities[i].tutor != null && timetable.activities[i].tutor.moodle_url != null ?
            '<a href="' + timetable.activities[i].tutor.moodle_url + '" title="Wizytówka E-Uczelnia"><i class="fa fa-globe fa-fw"></i></a>' : "") +

            "</span>" +
            "</p>" +
            "</li>";
        }


        $("#timetable-results").append(data);
    }
}

function getUrlParam(key: string): string {
    var result = new RegExp(key + "=([^&]*)", "i").exec(window.location.search.replace(/\+/g, " "));
    return result && decodeURIComponent(result[1]) || "";
}

