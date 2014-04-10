/// <reference path="../../typings/jquery/jquery.d.ts" />
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
        public static getGroupsList(useCache: boolean = false, ttl: number = 1): JQueryXHR {
            return $.ajax({
                url: Cash.Api.host + "groups?t=" + new Date().getTime(),
                type: "GET",
                success: (data) => {
                    devPlan.Init.setGroups(data);
                },
                cacheJStorage: useCache,
                cacheTTL: (3600 * ttl),
                cacheKey: "groups",
                isCacheValid: () => {
                    return $.jStorage.get("groups", false);
                }
            });
        }
        /**
         * Gets list of all tutors available in cash service
         */
        public static getTutorsList(useCache: boolean = false, ttl: number = 1): JQueryXHR {
            return $.ajax({
                url: Cash.Api.host + "tutors?t=" + new Date().getTime(),
                type: "GET",
                success: (data) => {
                    devPlan.Init.setTutors(data);
                },

                cacheJStorage: useCache,
                cacheTTL: (3600000 * ttl),
                cacheKey: "tutors",
                isCacheValid: () => {
                    return $.jStorage.get("tutors", false);
                }
            });
        }
        /**
        * Gets list of all places available in cash service
        */
        public static getPlacesList(useCache: boolean = false, ttl: number = 1): JQueryXHR {
            return $.ajax({
                url: Cash.Api.host + "places?t=" + new Date().getTime(),
                type: "GET",
                dataType: 'json',
                success: (data) => {
                    devPlan.Init.setPlaces(data);
                },
                cacheJStorage: useCache,
                cacheKey: "places",
                cacheTTL: (3600000 * ttl),
                isCacheValid: () => {
                    return $.jStorage.get("places", false);
                }
            });
        }
        /**
         * Registers timetable
         */
        public static registerTimetable(groups: number[]= [], tutors: number[]= [], places: number[]= []): JQueryXHR {
            return $.ajax({
                url: Cash.Api.host + "timetables",
                type: "POST",
                dataType: 'json',
                data: {
                    group_id: groups,
                    tutor_id: tutors,
                    place_id: places
                },
                cacheJStorage: false
            });
        }
        /**
         * 
         */
        public static getTimetable(query: string, cache: boolean = false, ttl: number = 1, notOverRide= true): JQueryXHR {
            return $.ajax({
                url: Cash.Api.host + "timetables/" + query + '?t=' + new Date().getTime(),
                type: "GET",
                dataType: 'json',
                success: (data: any) => {
                    devPlan.Init.setTimetable(data);
                },
                cacheJStorage: cache,
                cacheKey: query,
                cacheTTL: (3600000 * ttl),
                isCacheValid: () => {
                    return true && notOverRide;
                }
            });
        }
        /**
         *
         */
        public static getTimetableVersion(query: string): any {
            return $.ajax({
                url: Cash.Api.host + "timetables/" + query + "/versions?t="+ new Date().getTime(),
                type: "GET",
                dataType: 'json',
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