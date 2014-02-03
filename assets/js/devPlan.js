/// <reference path="DefinitelyTyped/typeahead/typeahead.d.ts" />
/// <reference path="DefinitelyTyped/jquery/jquery.d.ts" />
var Cash;
(function (Cash) {
    

    

    

    

    /**
    * Cash API implementation
    */
    var Api = (function () {
        function Api() {
        }
        /**
        * Gets list of all groups available in cash service
        */
        Api.getGroupsList = function (jqueryAjaxSettings) {
            if (typeof jqueryAjaxSettings === "undefined") { jqueryAjaxSettings = Cash.Api.jqueryAjaxSettings; }
            jqueryAjaxSettings.url = Cash.Api.host + "groups";
            return $.ajax(jqueryAjaxSettings);
        };

        /**
        * Gets list of all tutors available in cash service
        */
        Api.getTutorsList = function (jqueryAjaxSettings) {
            if (typeof jqueryAjaxSettings === "undefined") { jqueryAjaxSettings = Cash.Api.jqueryAjaxSettings; }
            jqueryAjaxSettings.url = Cash.Api.host + "tutors";
            return $.ajax(jqueryAjaxSettings);
        };

        /**
        * Gets list of all places available in cash service
        */
        Api.getPlacesList = function (jqueryAjaxSettings) {
            if (typeof jqueryAjaxSettings === "undefined") { jqueryAjaxSettings = Cash.Api.jqueryAjaxSettings; }
            jqueryAjaxSettings.url = Cash.Api.host + "places";
            return $.ajax(jqueryAjaxSettings);
        };

        /**
        * Registers timetable
        */
        Api.registerTimetable = function (jqueryAjaxSettings) {
            jqueryAjaxSettings.url = Cash.Api.host + "timetables";
            jqueryAjaxSettings.type = "POST", $.ajax(jqueryAjaxSettings);
            return this;
        };

        Api.getTimetable = function (timetableParams, jqueryAjaxSettings) {
            if (typeof jqueryAjaxSettings === "undefined") { jqueryAjaxSettings = Cash.Api.jqueryAjaxSettings; }
            jqueryAjaxSettings.url = Cash.Api.host + "places";
            return $.ajax(jqueryAjaxSettings);
        };
        Api.host = "http://cash.dev.uek.krakow.pl/v0_1/";

        Api.jqueryAjaxSettings = {
            dataType: "json",
            type: "GET",
            success: function (data) {
            }
        };
        return Api;
    })();
    Cash.Api = Api;
})(Cash || (Cash = {}));

/**
* devPlan App
*/
var devPlan = (function () {
    /**
    *
    */
    function devPlan() {
        $("#search-input").attr('value', getUrlParam('search'));

        if ($("#search-panel-input").length) {
            $("#search-panel-input").attr('value', getUrlParam('search'));
        }
        $.when(Cash.Api.getGroupsList(), Cash.Api.getTutorsList(), Cash.Api.getPlacesList()).done(function (groups, tutors, places) {
            devPlan.setGroups(groups[0]);
            devPlan.setTutors(tutors[0]);
            devPlan.setPlaces(places[0]);

            $("#search-input").removeAttr('disabled').attr('placeholder', 'KrDzIs3011Io / dr Paweł Wołoszyn').attr('data-provide', "typeahead");

            $("#search-input").typeahead([
                {
                    name: "groups",
                    local: devPlan.generateTypeaheadDatumsForGroups(devPlan.getGroups())
                }, {
                    name: "tutors",
                    local: devPlan.generateTypeaheadDatumsForTutors(devPlan.getTutors())
                }, {
                    name: "places",
                    local: devPlan.generateTypeaheadDatumsForPlaces(devPlan.getPlaces())
                }
            ]);

            $("#search-button").removeAttr("disabled").empty().append("Szukaj");

            if ($("#search-panel-input").length) {
                $("#search-panel-input").attr('value', getUrlParam('search')).attr('placeholder', 'KrDzIs3011Io / dr Paweł Wołoszyn').removeAttr("disabled");
                ;
                $("#search-panel .panel-body").remove();

                devPlan.showSearchResults(getUrlParam("search"));
            }
        });
    }
    /**
    *
    */
    devPlan.getGroups = function () {
        return devPlan.groups;
    };

    /**
    *
    */
    devPlan.setGroups = function (groups) {
        devPlan.groups = groups.sort(function (a, b) {
            return a.name - b.name;
        });
        return devPlan;
    };

    /**
    *
    */
    devPlan.getTutors = function () {
        return devPlan.tutors;
    };

    /**
    *
    */
    devPlan.setTutors = function (tutors) {
        devPlan.tutors = tutors.sort(function (a, b) {
            return a.name - b.name;
        });
        return devPlan;
    };

    /**
    *
    */
    devPlan.getPlaces = function () {
        return devPlan.places;
    };

    /**
    *
    */
    devPlan.setPlaces = function (places) {
        devPlan.places = places.sort(function (a, b) {
            return a.location - b.location;
        });
        return devPlan;
    };

    /**
    *
    */
    devPlan.generateTypeaheadDatumsForGroups = function (groups) {
        var data = [];
        for (var i = 0; i < groups.length; i++) {
            data[i] = {
                value: groups[i].name,
                tokens: groups[i].name.replace(".", "").split(" "),
                id: groups[i].id,
                name: groups[i].name
            };
        }
        ;
        return data;
    };

    /**
    *
    */
    devPlan.generateTypeaheadDatumsForTutors = function (tutors) {
        var data = [];
        for (var i = 0; i < tutors.length; i++) {
            data[i] = {
                value: tutors[i].name,
                tokens: tutors[i].name.replace(".", "").split(" "),
                id: tutors[i].id,
                name: tutors[i].name,
                moodle_url: tutors[i].moodle_url
            };
        }
        ;
        return data;
    };

    /**
    *
    */
    devPlan.generateTypeaheadDatumsForPlaces = function (places) {
        var data = [];
        for (var i = 0; i < places.length; i++) {
            data[i] = {
                value: places[i].location,
                tokens: places[i].location.replace(".", "").split(" "),
                id: places[i].id,
                location: places[i].location
            };
        }
        ;
        return data;
    };

    devPlan.showSearchResults = function (query) {
        if (typeof query === "undefined") { query = ""; }
        $("#search-results").empty();

        console.log("Query: " + query);
        query = query.toString().toUpperCase();
        if (query.length >= 3) {
            var data = "";

            for (var i = 0; i < devPlan.getGroups().length; i++) {
                if (devPlan.getGroups()[i].name.toString().toUpperCase().indexOf(query) !== -1) {
                    data = data + "<tr><td>" + devPlan.getGroups()[i].name + "<br/>" + "<small><a href='timetable.html?timetable=g" + devPlan.getGroups()[i].id + "'>Pokaż plan</a></small></td></tr>";
                }
            }

            for (var i = 0; i < devPlan.getTutors().length; i++) {
                if (devPlan.getTutors()[i].name.toString().toUpperCase().indexOf(query) !== -1) {
                    data = data + "<tr><td>" + devPlan.getTutors()[i].name + "<br/>" + "<small><a href='timetable.html?timetable=t" + devPlan.getTutors()[i].id + "'>Pokaż plan</a>" + ((devPlan.getTutors()[i].moodle_url !== null) ? (" | <a href='" + devPlan.getTutors()[i].moodle_url + "'>Wizytówka</a>") : ("")) + "</small></td></tr>";
                }
            }

            for (var i = 0; i < devPlan.getPlaces().length; i++) {
                if (devPlan.getPlaces()[i].location.toString().toUpperCase().indexOf(query) !== -1) {
                    data = data + "<tr><td>" + devPlan.getPlaces()[i].location + "<br/>" + "<small><a href='timetable.html?timetable=p" + devPlan.getPlaces()[i].id + "'>Pokaż plan</a></small></td></tr>";
                }
            }

            //   console.log(data);
            $("#search-results").append(data);
        } else {
            console.log("Too short query");
        }
    };
    devPlan.groups = [];

    devPlan.tutors = [];

    devPlan.places = [];
    return devPlan;
})();

function getUrlParam(key) {
    //  return decodeURIComponent((new RegExp('[?|&]' + name + '=' + '([^&;]+?)(&|#|;|$)').exec(location.search)||[,""])[1].replace(/\+/g, '%20'))||null;
    var result = new RegExp(key + "=([^&]*)", "i").exec(window.location.search.replace(/\+/g, " "));
    return result && decodeURIComponent(result[1]) || "";
}
