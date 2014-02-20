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
        public static registerTimetable(timetableParams: Cash.Params): JQueryXHR {
            return $.ajax({
                url: Cash.Api.host + "timetables",
                type: "POST",
                dataType: 'json',
                data: timetableParams,
            });
        }
        /**
         * 
         */
        public static getTimetable(query: string): JQueryXHR {
            return $.ajax({
                url: Cash.Api.host + "timetables/" + query,
                type: "GET",
                dataType: 'json',
            });
        }
    }
}