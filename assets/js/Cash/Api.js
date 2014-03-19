var Cash;
(function (Cash) {
    var Api = (function () {
        function Api() {
        }
        Api.getGroupsList = function (useCache, ttl) {
            if (typeof useCache === "undefined") { useCache = false; }
            if (typeof ttl === "undefined") { ttl = 1; }
            return $.ajax({
                url: Cash.Api.host + "groups",
                type: "GET",
                success: function (data) {
                    devPlan.Init.setGroups(data);
                },
                cacheJStorage: useCache,
                cacheTTL: (3600 * ttl),
                cacheKey: "groups",
                isCacheValid: function () {
                    return $.jStorage.get("groups", false);
                }
            });
        };

        Api.getTutorsList = function (useCache, ttl) {
            if (typeof useCache === "undefined") { useCache = false; }
            if (typeof ttl === "undefined") { ttl = 1; }
            return $.ajax({
                url: Cash.Api.host + "tutors",
                type: "GET",
                success: function (data) {
                    devPlan.Init.setTutors(data);
                },
                cacheJStorage: useCache,
                cacheTTL: (3600000 * ttl),
                cacheKey: "tutors",
                isCacheValid: function () {
                    return $.jStorage.get("tutors", false);
                }
            });
        };

        Api.getPlacesList = function (useCache, ttl) {
            if (typeof useCache === "undefined") { useCache = false; }
            if (typeof ttl === "undefined") { ttl = 1; }
            return $.ajax({
                url: Cash.Api.host + "places",
                type: "GET",
                dataType: 'json',
                success: function (data) {
                    devPlan.Init.setPlaces(data);
                },
                cacheJStorage: useCache,
                cacheKey: "places",
                cacheTTL: (3600000 * ttl),
                isCacheValid: function () {
                    return $.jStorage.get("places", false);
                }
            });
        };

        Api.registerTimetable = function (groups, tutors, places) {
            if (typeof groups === "undefined") { groups = []; }
            if (typeof tutors === "undefined") { tutors = []; }
            if (typeof places === "undefined") { places = []; }
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
        };

        Api.getTimetable = function (query, cache, ttl, notOverRide) {
            if (typeof cache === "undefined") { cache = false; }
            if (typeof ttl === "undefined") { ttl = 1; }
            if (typeof notOverRide === "undefined") { notOverRide = true; }
            return $.ajax({
                url: Cash.Api.host + "timetables/" + query,
                type: "GET",
                dataType: 'json',
                success: function (data) {
                    devPlan.Init.setTimetable(data);
                },
                cacheJStorage: cache,
                cacheKey: query,
                cacheTTL: (3600000 * ttl),
                isCacheValid: function () {
                    return true && notOverRide;
                }
            });
        };

        Api.getTimetableVersion = function (query) {
            return $.ajax({
                url: Cash.Api.host + "timetables/" + query + "/versions",
                type: "GET",
                dataType: 'json',
                cacheJStorage: false
            });
        };
        Api.isUpToDateVersion = function (local, downloaded) {
            if (local == null || downloaded == null) {
                console.log("TEST", local, downloaded);
                return false;
            } else {
                console.log(JSON.stringify(local.versions) == JSON.stringify(downloaded.versions));
                return JSON.stringify(local.versions) == JSON.stringify(downloaded.versions);
            }
        };
        Api.host = "http://cash.dev.uek.krakow.pl/v0_1/";
        return Api;
    })();
    Cash.Api = Api;
})(Cash || (Cash = {}));
//# sourceMappingURL=Api.js.map
