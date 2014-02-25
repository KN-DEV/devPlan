/// <reference path="../DefinitelyTyped/jquery/jquery.d.ts" />
/**
* Cash service
*/
module Cash {
    /**
     * Cash API implementation
     */
    export class Api {
        /**
         * Host of service Cash 
         */
        private static host: string = "http://cash.dev.uek.krakow.pl/v0_1/";
        /**
         * Gets list of all groups available in cash service
         */
        public static getGroupsList(): JQueryXHR {
            return $.ajax({
                url: Cash.Api.host + "groups?_=" + new Date().getTime(),
                type: "GET",
                dataType: 'json',
                cache: false,
                success: (data) => {
                },
                error: () => {
                }
            });
        }
        /**
         * Gets list of all tutors available in cash service
         */
        public static getTutorsList(): JQueryXHR {
            return $.ajax({
                url: Cash.Api.host + "tutors?_=" + new Date().getTime(),
                type: "GET",
                dataType: 'json',
                cache: false,
                success: (data) => {
                },
                error: () => {
                }
            });
        }
        /**
        * Gets list of all places available in cash service
        */
        public static getPlacesList(): JQueryXHR {
            return $.ajax({
                url: Cash.Api.host + "places?_=" + new Date().getTime(),
                type: "GET",
                dataType: 'json',
                cache: false,
                success: (data) => {
                },
                error: () => {
                }
            });
        }
        /**
         * Registers timetable
         */
        public static registerTimetable(timetableParams: Cash.Params): JQueryXHR {
            return $.ajax({

                url: Cash.Api.host + "timetables",
                type: "POST",
                dataType: 'json',
                cache: false,
                data: {
                    group_id: timetableParams.getGroups(),
                    tutor_id: timetableParams.getTutors(),
                    place_id: timetableParams.getPlaces()
                },
                success: (data: any) => {
                },
                error: () => {
                }
            });
        }
        /**
         * 
         */
        public static getTimetable(params: Cash.Params): JQueryXHR {
            return $.ajax({
                url: Cash.Api.host + "timetables/" + params.toString() + "?_=" + new Date().getTime(),
                type: "GET",
                dataType: 'json',
                cache: false,
                success: (data: any) => {
                },
                error: () => {
                }
            });
        }
    }
}