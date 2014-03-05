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
        public static getGroupsList(cache: boolean = false, ttl: number = 1): JQueryXHR {

            return $.ajax({
                url: Cash.Api.host + "groups",
                type: "GET",
                success: (data) => {
                    //  console.log("Cash.Api.getTutorsList() - success", data);
                    devPlan.Init.setGroups(data);
                },
                error: () => {
                    //console.log("Cash.Api.getTutorsList() - error");
                },
                cacheJStorage: cache,
                cacheTTL: (3600 * ttl),
                isCacheValid: () => {
                    return true;
                }
            });
        }
        /**
         * Gets list of all tutors available in cash service
         */
        public static getTutorsList(cache: boolean = false, ttl: number = 1): JQueryXHR {
            return $.ajax({
                url: Cash.Api.host + "tutors",
                type: "GET",
                success: (data) => {
                    //   console.log("Cash.Api.getTutorsList() - success", data);
                    devPlan.Init.setTutors(data);
                },
                error: () => {
                    //console.log("Cash.Api.getTutorsList() - error");
                },
                cacheJStorage: cache,
                cacheTTL: (3600 * ttl),
                isCacheValid: () => {
                    return true;
                }

            });
        }
        /**
        * Gets list of all places available in cash service
        */
        public static getPlacesList(cache: boolean = false, ttl: number = 1): JQueryXHR {
            return $.ajax({
                url: Cash.Api.host + "places",
                type: "GET",
                dataType: 'json',
                success: (data) => {
                    //     console.log("Cash.Api.getPlacesList() - success", data);
                    devPlan.Init.setPlaces(data);
                },
                error: () => {
                    //console.log("Cash.Api.getPlacesList() - error");
                },
                cacheJStorage: cache,
                cacheTTL: (3600 * ttl),
                isCacheValid: () => {
                    return true;
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
                    console.log("Cash.Api.registerTimetable() - success", params, data);
                },
                error: () => {
                    //    console.log("Cash.Api.registerTimetable() - error", params);
                },
                cacheJStorage: false,
            });
        }
        /**
         * 
         */
        public static getTimetable(params: Cash.Params, cache: boolean = false, ttl: number = 1): JQueryXHR {
            return $.ajax({
                url: Cash.Api.host + "timetables/" + params.toString(),
                type: "GET",
                dataType: 'json',
                // cache: false,
                success: (data: any) => {
                    //console.log("Cash.Api.getTimetable() - success", params.toString(), data);
                },
                error: () => {
                    // console.log("Cash.Api.getTimetable() - error", params);
                },
                cacheJStorage: cache,
                cacheTTL: (3600 * ttl),
                isCacheValid: () => {
                    console.log(Cash.Api.host + "timetables/" + params.toString() + "GETundefined");
                    var value: any = $.jStorage.get(Cash.Api.host + "timetables/" + params.toString() + "GETundefined", false);
                    console.log(value);
                    $.when(Cash.Api.getTimetableVersion(params))
                        .done((test) => {
                            if (test.versions == value.versions) {
                                console.log(true, test.versions, value.versions);

                                return true;
                            } else {
                                console.log(false, test.versions, value.versions);

                                return false;
                            }
                        })
                        .fail((test) => {

                            if (value != false) {
                                return true;
                            } else {
                            return false
                            };

                        });
                }
            });

        }
        /**
         *
         */
        public static getTimetableVersion(params: Cash.Params): JQueryXHR {
            return $.ajax({
                url: Cash.Api.host + "timetables/" + params.toString() + "/versions",
                type: "GET",
                dataType: 'json',
                // cache: false,
                success: (data: any) => {
                    //console.log("Cash.Api.getTimetable() - success", params.toString(), data);
                },
                error: () => {
                    // console.log("Cash.Api.getTimetable() - error", params);
                }

            });
        }


        public static checkVersion(oldVersion, newVersion) {




        }
    }


}