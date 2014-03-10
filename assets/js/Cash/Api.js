var Cash;
(function (Cash) {
    var Api = (function () {
        function Api() {
        }
        Api.getGroupsList = function () {
            return $.ajax({
                url: Cash.Api.host + "groups",
                type: "GET",
                success: function (data) {
                    return data;
                },
                error: function () {
                    return [];
                },
                cacheJStorage: true,
                cacheTTL: 60,
                isCacheValid: function () {
                    return true;
                }
            });
        };

        Api.getTutorsList = function () {
            return $.ajax({
                url: Cash.Api.host + "tutors",
                type: "GET",
                success: function (data) {
                    return data;
                },
                error: function () {
                    return [];
                },
                cacheJStorage: true,
                cacheTTL: 60,
                isCacheValid: function () {
                    return true;
                }
            });
        };

        Api.getPlacesList = function () {
            $.ajax({
                url: Cash.Api.host + "places",
                type: "GET",
                dataType: 'json',
                success: function (data) {
                    return data;
                },
                error: function () {
                    return [];
                },
                cacheJStorage: true,
                cacheTTL: 60,
                isCacheValid: function () {
                    return true;
                }
            });
        };

        Api.registerTimetable = function (params) {
            return $.ajax({
                url: Cash.Api.host + "timetables",
                type: "POST",
                dataType: 'json',
                data: {
                    group_id: params.getGroups(),
                    tutor_id: params.getTutors(),
                    place_id: params.getPlaces()
                },
                success: function (data) {
                    console.log("Cash.Api.registerTimetable() - success", params, data);
                },
                error: function () {
                }
            });
        };

        Api.getTimetable = function (params) {
            return $.ajax({
                url: Cash.Api.host + "timetables/" + params.toString(),
                type: "GET",
                dataType: 'json',
                success: function (data) {
                },
                error: function () {
                }
            });
        };
        Api.host = "http://cash.dev.uek.krakow.pl/v0_1/";
        return Api;
    })();
    Cash.Api = Api;
})(Cash || (Cash = {}));
//# sourceMappingURL=Api.js.map
