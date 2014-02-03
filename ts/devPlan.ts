/// <reference path="DefinitelyTyped/typeahead/typeahead.d.ts" />
/// <reference path="DefinitelyTyped/jquery/jquery.d.ts" />
/**
 * Cash service
 */
declare var Hogan;
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
        activities: any;
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
        public static jqueryAjaxSettings: JQueryAjaxSettings = {
            dataType: "json",
            type: "GET",
            success: (data) => { },
        };

        /**
         * Gets list of all groups available in cash service
         */
        public static getGroupsList(jqueryAjaxSettings: JQueryAjaxSettings = Cash.Api.jqueryAjaxSettings): JQueryXHR {
            jqueryAjaxSettings.url = Cash.Api.host + "groups";
            return $.ajax(jqueryAjaxSettings);

        }
        /**
         * Gets list of all tutors available in cash service
         */
        public static getTutorsList(jqueryAjaxSettings: JQueryAjaxSettings = Cash.Api.jqueryAjaxSettings): JQueryXHR {
            jqueryAjaxSettings.url = Cash.Api.host + "tutors";
            return $.ajax(jqueryAjaxSettings);

        }
        /**
        * Gets list of all places available in cash service
        */
        public static getPlacesList(jqueryAjaxSettings: JQueryAjaxSettings = Cash.Api.jqueryAjaxSettings): JQueryXHR {
            jqueryAjaxSettings.url = Cash.Api.host + "places";
            return $.ajax(jqueryAjaxSettings);
        }
        /**
         * Registers timetable
         */
        public static registerTimetable(jqueryAjaxSettings: JQueryAjaxSettings): Cash.Api {
            jqueryAjaxSettings.url = Cash.Api.host + "timetables";
            jqueryAjaxSettings.type = "POST",
            $.ajax(jqueryAjaxSettings);
            return this;

        }

        public static getTimetable(timetableParams: Cash.TimetableParams, jqueryAjaxSettings: JQueryAjaxSettings = Cash.Api.jqueryAjaxSettings): JQueryXHR {
            jqueryAjaxSettings.url = Cash.Api.host + "places";
            return $.ajax(jqueryAjaxSettings);
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

                $("#search-input")
                    .removeAttr('disabled')
                    .attr('placeholder', 'KrDzIs3011Io / dr Paweł Wołoszyn');

                $("#search-button")
                    .removeAttr("disabled")
                    .empty()
                    .append("Szukaj");


                if ($("#search-panel-input").length) {
                    $("#search-panel-input")
                        .attr('value', getUrlParam('search'))
                        .attr('placeholder', 'KrDzIs3011Io / dr Paweł Wołoszyn')
                    ;
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

            var data = "";

            for (var i = 0; i < devPlan.getGroups().length; i++) {

                if (devPlan.getGroups()[i].name.toString().toUpperCase().indexOf(query) !== -1) {
                    data = data+ "<tr><td>" + devPlan.getGroups()[i].name + "<br/>" +
                    "<small><a href='timetable.html?timetable=g" + devPlan.getGroups()[i].id + "'>Pokaż plan</a></small></td></tr>";
                }

            }

            for (var i = 0; i < devPlan.getTutors().length; i++) {
                if (devPlan.getTutors()[i].name.toString().toUpperCase().indexOf(query) !== -1) {
                    data = data + "<tr><td>" + devPlan.getTutors()[i].name + "<br/>" +
                    "<small><a href='timetable.html?timetable=t" + devPlan.getTutors()[i].id + "'>Pokaż plan</a>" +
                    ((devPlan.getTutors()[i].moodle_url !== null) ? (" | <a href='" + devPlan.getTutors()[i].moodle_url + "'>Wizytówka</a>") : ("")) +
                    "</small></td></tr>";
                }
            }

            for (var i = 0; i < devPlan.getPlaces().length; i++) {
                if (devPlan.getPlaces()[i].location.toString().toUpperCase().indexOf(query) !== -1) {
                    data = data + "<tr><td>" + devPlan.getPlaces()[i].location + "<br/>" +
                    "<small><a href='timetable.html?timetable=p" + devPlan.getPlaces()[i].id + "'>Pokaż plan</a></small></td></tr>";
                }
            }
            //   console.log(data);

            $("#search-results").append(data);
        } else {
            console.log("Too short query");
        }
    
    }
}

function getUrlParam(key: string): string {
    //  return decodeURIComponent((new RegExp('[?|&]' + name + '=' + '([^&;]+?)(&|#|;|$)').exec(location.search)||[,""])[1].replace(/\+/g, '%20'))||null;
    var result = new RegExp(key + "=([^&]*)", "i").exec(window.location.search.replace(/\+/g, " "));
    return result && decodeURIComponent(result[1]) || "";
}



