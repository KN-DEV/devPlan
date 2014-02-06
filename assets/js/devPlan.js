/// <reference path="DefinitelyTyped/typeahead/typeahead.d.ts" />
/// <reference path="DefinitelyTyped/jquery/jquery.d.ts" />
/**
* Cash service
*/
var Cash;
(function (Cash) {
    

    

    

    

    /**
    * Cash API implementation
    */
    var Api = (function () {
        function Api() {
        }
        /**
        * Settings for ajax request
        */
        /**
        * Gets list of all groups available in cash service
        */
        Api.getGroupsList = function () {
            return $.ajax({
                url: Cash.Api.host + "groups",
                type: "GET",
                dataType: 'json'
            });
        };

        /**
        * Gets list of all tutors available in cash service
        */
        Api.getTutorsList = function () {
            return $.ajax({
                url: Cash.Api.host + "tutors",
                type: "GET",
                dataType: 'json'
            });
        };

        /**
        * Gets list of all places available in cash service
        */
        Api.getPlacesList = function () {
            return $.ajax({
                url: Cash.Api.host + "places",
                type: "GET",
                dataType: 'json'
            });
        };

        /**
        * Registers timetable
        */
        Api.registerTimetable = function (timetableParams) {
            return $.ajax({
                url: Cash.Api.host + "timetables",
                type: "POST",
                dataType: 'json',
                data: timetableParams
            });
        };

        Api.getTimetable = function (timetableParams) {
            return $.ajax({
                url: Cash.Api.host + "places",
                type: "GET",
                dataType: 'json'
            });
        };
        Api.host = "http://cash.dev.uek.krakow.pl/v0_1/";
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

        if (getUrlParam('timetable').length != 0) {
            var param = {
                group_id: [],
                tutor_id: [],
                place_id: []
            };
            var timetable = getUrlParam('timetable').match(/[gtp][0-9]*/gi);

            for (var i = 0; i < timetable.length; i++) {
                if (timetable[i].toString().toLowerCase().indexOf("g") != -1) {
                    param.group_id[param.group_id.length] = parseInt(timetable[i].slice(1).toString());
                }
                if (timetable[i].toString().toLowerCase().indexOf("t") != -1) {
                    param.tutor_id[param.tutor_id.length] = parseInt(timetable[i].slice(1).toString());
                }
                if (timetable[i].toString().toLowerCase().indexOf("p") != -1) {
                    param.place_id[param.place_id.length] = parseInt(timetable[i].slice(1).toString());
                }
            }
            $.when(Cash.Api.registerTimetable(param)).done(function (response) {
                console.log(response);
                devPlan.showTimetable(response);
                $("#timetable-panel .panel-body").remove();
            });
        }

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
            var data = '';

            for (var i = 0; i < devPlan.getGroups().length; i++) {
                if (devPlan.getGroups()[i].name.toString().toUpperCase().indexOf(query) !== -1) {
                    data = data + '<li class="list-group-item">' + '<a href="timetable.html?timetable=g' + devPlan.getGroups()[i].id + '">' + devPlan.getGroups()[i].name + '</a>' + '</li>';
                }
            }
            for (var i = 0; i < devPlan.getTutors().length; i++) {
                if (devPlan.getTutors()[i].name.toString().toUpperCase().indexOf(query) !== -1) {
                    data = data + '<li class="list-group-item">' + '<a href="timetable.html?timetable=t' + devPlan.getTutors()[i].id + '">' + devPlan.getTutors()[i].name + '</a>' + '<span class="pull-right">' + '<a href="' + devPlan.getTutors()[i].moodle_url + '" title="Wizytówka E-Uczelnia"><i class="fa fa-globe fa-fw"></i></a>' + '</span>' + '</li>';
                }
            }
            for (var i = 0; i < devPlan.getPlaces().length; i++) {
                if (devPlan.getPlaces()[i].location.toString().toUpperCase().indexOf(query) !== -1) {
                    data = data + '<li class="list-group-item">' + '<a href="timetable.html?timetable=p' + devPlan.getPlaces()[i].id + '">' + devPlan.getPlaces()[i].location + '</a>' + '</li>';
                }
            }

            $("#search-panel-body").attr("display", "none");
            if (data.length == 0) {
                data = "<tr><td class='text-center'>Brak wyników. Spróbuj jeszcze raz ;)</td</td>";
            }
            $("#search-results").append(data);
        } else {
            console.log("Too short query");
        }
    };

    devPlan.showTimetable = function (timetable) {
        var data = "";
        $("#timetable-results").empty();

        timetable.activities = timetable.activities.sort(function (a, b) {
            return a.starts_at_timestamp - b.starts_at_timestamp;
        });

        var date = "";
        for (var i = 0; i < timetable.activities.length; i++) {
            if (date < timetable.activities[i].date) {
                data = data + '<li class="list-group-item list-group-item-info">' + '<h3 id="' + timetable.activities[i].date + '">' + timetable.activities[i].day_of_week + ' ' + timetable.activities[i].date + '</h3>' + '</li>';
                date = timetable.activities[i].date;
            }
            data = data + '<li class="list-group-item">' + "<h4>" + timetable.activities[i].name + "</h4>" + "<p>" + timetable.activities[i].starts_at + " - " + timetable.activities[i].ends_at + ' ' + (timetable.activities[i].place != null ? '<a href="timetable.html?timetable=p' + timetable.activities[i].place.id + '">' + timetable.activities[i].place.location + '</a>' : "") + '<span class="pull-right">' + (timetable.activities[i].tutor != null ? '<a href="timetable.html?timetable=t' + timetable.activities[i].tutor.id + '">' + timetable.activities[i].tutor.name + "</a> " : "") + (timetable.activities[i].tutor != null && timetable.activities[i].tutor.moodle_url != null ? '<a href="' + timetable.activities[i].tutor.moodle_url + '" title="Wizytówka E-Uczelnia"><i class="fa fa-globe fa-fw"></i></a>' : "") + "</span>" + "</p>" + "</li>";
        }

        $("#timetable-results").append(data);
    };
    devPlan.groups = [];

    devPlan.tutors = [];

    devPlan.places = [];
    return devPlan;
})();

function getUrlParam(key) {
    var result = new RegExp(key + "=([^&]*)", "i").exec(window.location.search.replace(/\+/g, " "));
    return result && decodeURIComponent(result[1]) || "";
}
