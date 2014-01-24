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
    export interface Timetable_Params {
        group_id: number[];
        tutor_id: number[];
        place_id: number[];
    }
    /**
     * Model of activity datatyp
     */
    export interface Activity {

    }
    export interface Timetable {
        _id: string;
        access_url: string;
        params: Timetable_Params;
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
            cache: true,
            async: false,
            success: (data): any => { console.log(data); }
        };

        /**
         * Gets list of all groups available in cash service
         */
        public static getGroupsList(jqueryAjaxSettings: JQueryAjaxSettings = Cash.Api.jqueryAjaxSettings): void {
            jqueryAjaxSettings.url = Cash.Api.host + "groups";
            $.ajax(jqueryAjaxSettings);

        }
        /**
         * Gets list of all tutors available in cash service
         */
        public static getTutorsList(jqueryAjaxSettings: JQueryAjaxSettings = Cash.Api.jqueryAjaxSettings): void {
            jqueryAjaxSettings.url = Cash.Api.host + "tutors";
            $.ajax(jqueryAjaxSettings);
        }
        /**
        * Gets list of all places available in cash service
        */
        public static getPlacesList(jqueryAjaxSettings: JQueryAjaxSettings = Cash.Api.jqueryAjaxSettings): void {
            jqueryAjaxSettings.url = Cash.Api.host + "places";
            $.ajax(jqueryAjaxSettings);
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
    groups: Cash.Group[] = [];

    /**
     * Keeps list of tutors from Cash service
     */
    tutors: Cash.Tutor[] = [];
    /**
     * Keeps list of places from Cash service
     */
    places: Cash.Place[] = [];
    /**
     * 
     */
    constructor() {
        this.loadGroups();
        this.loadTutors();
        this.loadPlaces();


    }
    /**
     * 
     */
    public getGroups(): Cash.Group[] {
        return this.groups;
    }
    /**
     * 
     */
    public setGroups(groups: Cash.Group[]): devPlan {
        this.groups = groups;
        return this;
    }

    /**
     * 
     */
    public getTutors(): Cash.Tutor[] {
        return this.tutors;
    }

    /**
     * 
     */
    public setTutors(tutors: Cash.Tutor[]): devPlan {
        this.tutors = tutors;
        return this;
    }
    /**
     * 
     */
    public getPlaces(): Cash.Place[] {
        return this.places;
    }
    /**
     * 
     */
    public setPlaces(places: Cash.Place[]): devPlan {
        this.places = places;
        return this;
    }
    /**
     * 
     */
    loadGroups(): any {
        var jqueryAjaxSettings = Cash.Api.jqueryAjaxSettings;
        jqueryAjaxSettings.success = (data: Cash.Group[]): void => {
            this.setGroups(data);
        };
        Cash.Api.getGroupsList(jqueryAjaxSettings);
        return this;
    }
    /**
     * 
     */
    loadTutors(): any {
        var jqueryAjaxSettings = Cash.Api.jqueryAjaxSettings;
        jqueryAjaxSettings.success = (data): void=> {
            this.setTutors(data);
        };
        Cash.Api.getTutorsList(jqueryAjaxSettings);
        return this;
    }
    /**
     * @TODO sprawdzić co zwraca success
     */
    loadPlaces(): devPlan {
        var jqueryAjaxSettings = Cash.Api.jqueryAjaxSettings;
        jqueryAjaxSettings.success = (data: Cash.Place[]): void => {
            this.setPlaces(data);
        };
        Cash.Api.getPlacesList(jqueryAjaxSettings);
        return this;
    }
    /**
     * 
     */
    getTypeaheadDatumsForGroups(groups: Cash.Group[]= this.groups): DatumGroup[] {
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
    getTypeaheadDatumsForTutors(tutors: Cash.Tutor[]= this.tutors): DatumTutor[] {
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
    getTypeaheadDatumsForPlaces(places: Cash.Place[]= this.places): DatumPlace[] {
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
}
var x = new devPlan();
$("#search").typeahead([{
    name: "groups",
    local: x.getTypeaheadDatumsForGroups(x.getGroups()),
}, {
        name: "tutors",
        local: x.getTypeaheadDatumsForTutors(x.getTutors()),
    }, {
        name: "places",
        local: x.getTypeaheadDatumsForPlaces(x.getPlaces()),
    }]);



