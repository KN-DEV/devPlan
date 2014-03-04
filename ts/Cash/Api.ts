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
                url: Cash.Api.host + "groups",
                type: "GET",
                // cache: true,
                success: (data) => {
                    // console.log("Cash.Api.getTutorsList() - success", data);
                },
                error: () => {
                    //console.log("Cash.Api.getTutorsList() - error");
                }
            });

        }
        /**
         * Gets list of all tutors available in cash service
         */
        public static getTutorsList(): JQueryXHR {
            return $.ajax({
                url: Cash.Api.host + "tutors",
                type: "GET",
                // cache: true,
                success: (data) => {
                    // console.log("Cash.Api.getTutorsList() - success", data);
                },
                error: () => {
                    //console.log("Cash.Api.getTutorsList() - error");
                }
            });
        }
        /**
        * Gets list of all places available in cash service
        */
        public static getPlacesList(): JQueryXHR {
            return $.ajax({
                url: Cash.Api.host + "places",
                type: "GET",
                dataType: 'json',
                //  cache: true,
                success: (data) => {
                    //console.log("Cash.Api.getPlacesList() - success", data);
                },
                error: () => {
                    //console.log("Cash.Api.getPlacesList() - error");
                }
            });
        }
        /**
         * Registers timetable
         */
        public static registerTimetable(params: Cash.Params): JQueryXHR {
            return $.ajax({
                url: Cash.Api.host + "timetables",
                type: "POST",
                dataType: 'json',
                // cache: false,
                data: {
                    group_id: params.getGroups(),
                    tutor_id: params.getTutors(),
                    place_id: params.getPlaces()
                },
                success: (data: any) => {
                    //console.log("Cash.Api.registerTimetable() - success", params, data);
                },
                error: () => {
                    //    console.log("Cash.Api.registerTimetable() - error", params);
                }
            });
        }
        /**
         * 
         */
        public static getTimetable(params: Cash.Params): JQueryXHR {
            return $.ajax({
                url: Cash.Api.host + "timetables/" + params.toString(),
                type: "GET",
                dataType: 'json',
                // cache: false,
                success: (data: any) => {
                    //   console.log("Cash.Api.getTimetable() - success", params.toString(), data);
                },
                error: () => {
                    // console.log("Cash.Api.getTimetable() - error", params);
                }
            });
        }
    }
}