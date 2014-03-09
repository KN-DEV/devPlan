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
                    console.log("Cash.Api.getTutorsList() - success", data);
                    devPlan.Init.setGroups(data);
                },
                error: () => {
                    console.log("Cash.Api.getTutorsList() - error");
                },
                cacheJStorage: cache,
                cacheTTL: (3600 * ttl),
                cacheKey: "Cash.groups",
                isCacheValid: () => {
                    return $.jStorage.get("Cash.places", false);

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
                    console.log("Cash.Api.getTutorsList() - success", data);
                    devPlan.Init.setTutors(data);
                },
                error: () => {
                    console.log("Cash.Api.getTutorsList() - error");
                },
                cacheJStorage: cache,
                cacheTTL: (3600000 * ttl),
                cacheKey: "Cash.tutors",
                isCacheValid: () => {
                    return $.jStorage.get("Cash.places", false);

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
                    devPlan.Init.setPlaces(data);
                    console.log("Cash.Api.getPlacesList() - success", data);
                },
                error: () => {
                    console.log("Cash.Api.getPlacesList() - error");
                },
                cacheJStorage: cache,
                cacheKey: "Cash.places",
                cacheTTL: (3600000 * ttl),
                isCacheValid: () => {
                    return $.jStorage.get("Cash.places", false);

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
                    console.log("Cash.Api.registerTimetable() - success", params.toString(), data);
                },
                error: () => {
                    console.log("Cash.Api.registerTimetable() - error", params.toString());
                },
                cacheJStorage: false
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
                    devPlan.Init.setTimetable(data);
                    console.log("Cash.Api.getTimetable() - success", params.toString(), data);
                },
                error: () => {
                    console.log("Cash.Api.getTimetable() - error", params.toString());
                },
                cacheJStorage: cache,
                cacheKey: params.toString(),
                cacheTTL: (3600000 * ttl),
                isCacheValid: () => {

                    return true;
                    //                    $.when(Cash.Api.getTimetableVersion(params))
                    //                        .done((currentInfo: any = null) => {
                    //                            console.log($.jStorage.get(params.toString()));
                    //                            return Cash.Api.isUpToDateVersion($.jStorage.get(params.toString()), currentInfo);
                    //                        }).always(() => {return $.jStorage.get(params.toString(), false) });
                }
            });
        }
        /**
         *
         */
        public static getTimetableVersion(params: Cash.Params): any {
            return $.ajax({
                url: Cash.Api.host + "timetables/" + params.toString() + "/versions",
                type: "GET",
                dataType: 'json',
                // cache: false,
                success: (data: any) => {
                    console.log("Cash.Api.getTimetableVersion() - success", params.toString(), data);
                },
                error: () => {
                    console.log("Cash.Api.getTimetable() - error", params.toString());
                },
                cacheJStorage: false,
            });
        }
        public static isUpToDateVersion(local: any, downloaded: any): boolean {
            if (local == null || downloaded == null) {
                console.log("TEST", local, downloaded);
                return false;
            } else {
                console.log(JSON.stringify(local.versions) == JSON.stringify(downloaded.versions));
                return JSON.stringify(local.versions) == JSON.stringify(downloaded.versions);
            }
        }
    }
}