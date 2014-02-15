var Cash;
(function (Cash) {
    

    

    

    

    var Api = (function () {
        function Api() {
        }
        Api.getGroupsList = function () {
            return $.ajax({
                url: Cash.Api.host + "groups",
                type: "GET",
                dataType: 'json'
            });
        };

        Api.getTutorsList = function () {
            return $.ajax({
                url: Cash.Api.host + "tutors",
                type: "GET",
                dataType: 'json'
            });
        };

        Api.getPlacesList = function () {
            return $.ajax({
                url: Cash.Api.host + "places",
                type: "GET",
                dataType: 'json'
            });
        };

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

var devPlan = (function () {
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
            }
            $.when(Cash.Api.registerTimetable(param)).done(function (response) {
                console.log(response);
                devPlan.showTimetable(response);
                $("#timetable-panel-spinner").remove();
            });
        }

        if ($("#search-panel-input").length) {
            $("#search-panel-input").attr('value', getUrlParam('search'));
        }
        $.when(Cash.Api.getGroupsList(), Cash.Api.getTutorsList()).done(function (groups, tutors) {
            devPlan.setGroups(groups[0]);
            devPlan.setTutors(tutors[0]);

            $("#search-input").removeAttr('disabled').attr('placeholder', 'KrDzIs3011Io / dr Paweł Wołoszyn').attr('data-provide', "typeahead");

            $("#search-input").typeahead([
                {
                    name: "groups",
                    local: devPlan.generateTypeaheadDatumsForGroups(devPlan.getGroups())
                }, {
                    name: "tutors",
                    local: devPlan.generateTypeaheadDatumsForTutors(devPlan.getTutors())
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
    devPlan.getGroups = function () {
        return devPlan.groups;
    };

    devPlan.setGroups = function (groups) {
        devPlan.groups = groups.sort(function (a, b) {
            return a.name - b.name;
        });
        return devPlan;
    };

    devPlan.getTutors = function () {
        return devPlan.tutors;
    };

    devPlan.setTutors = function (tutors) {
        devPlan.tutors = tutors.sort(function (a, b) {
            return a.name - b.name;
        });
        return devPlan;
    };

    devPlan.getPlaces = function () {
        return devPlan.places;
    };

    devPlan.setPlaces = function (places) {
        devPlan.places = places.sort(function (a, b) {
            return a.location - b.location;
        });
        return devPlan;
    };

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
        console.log(timetable.activities[168]);

        var date = "";

        var activityCounter = [];
        var activityCounterIndex = "";
        var j = 0;
        for (var i = 0; i < timetable.activities.length; i++) {
            activityCounterIndex = timetable.activities[i].group + timetable.activities[i].name + timetable.activities[i].category + timetable.activities[i].tutor.id;
            if (activityCounter[activityCounterIndex] == undefined) {
                activityCounter[activityCounterIndex] = 0;
            }

            if (timetable.activities[i - 1] != null && timetable.activities[i].name == timetable.activities[i - 1].name && timetable.activities[i].ends_at_timestamp == timetable.activities[i - 1].ends_at_timestamp) {
                continue;
            }
            if (date < timetable.activities[i].date) {
                data = data + '<li class="list-group-item list-group-item-success">' + '<p id="' + timetable.activities[i].date + '" class="h2">' + timetable.activities[i].day_of_week + ' ' + timetable.activities[i].date + '</p>' + '</li>';
                date = timetable.activities[i].date;
            }
            data = data + '<li id="' + i + '" class="list-group-item">' + '<p class="h5">' + '<strong class="pull-left">' + timetable.activities[i].name + '</strong>' + '<span class="pull-right">' + (timetable.activities[i].tutor != null ? '<a href="timetable.html?timetable=t' + timetable.activities[i].tutor.id + '">' + timetable.activities[i].tutor.name + "</a> " : "") + (timetable.activities[i].tutor != null && timetable.activities[i].tutor.moodle_url != null ? '<a href="' + timetable.activities[i].tutor.moodle_url + '" title="Wizytówka E-Uczelnia"><i class="fa fa-globe fa-fw"></i></a>' : "") + "</span>" + '</p><div class="clearfix"></div>' + (timetable.activities[i].notes != null ? '<p>Notatka: ' + timetable.activities[i].notes + '</p>' : '') + '<p>' + '<span class="label label-primary"><i class="fa fa-fw fa-clock-o"></i>' + timetable.activities[i].starts_at + " - " + timetable.activities[i].ends_at + '</span> ' + (timetable.activities[i].place != null ? '<span class="label label-success"><i class="fa fa-fw fa-map-marker"></i>' + timetable.activities[i].place.location + '</span>' : '') + ' <span class="label label-danger"><i class="fa fa-fw fa-tag"></i>' + timetable.activities[i].category + '</span>' + ' <span class="label label-default">godziny: ' + (activityCounter[activityCounterIndex] + " - " + (activityCounter[activityCounterIndex] += devPlan.getClassHoursCounter(timetable.activities[i].starts_at, timetable.activities[i].ends_at))) + '</span>' + '<br/>';

            j = i;
            do {
                if (j > i) {
                    data = data + " | ";
                }
                if (timetable.activities[j].group != null) {
                    data = data + '<small><a href="timetable.html?timetable=g' + timetable.activities[j].group.id + '">' + timetable.activities[j].group.name + "</a></small>";
                }
            } while(timetable.activities[++j] != null && timetable.activities[i].name == timetable.activities[j].name && timetable.activities[i].ends_at_timestamp == timetable.activities[j].ends_at_timestamp);
            data = data + "</p>" + "</li>";
        }
        $("#timetable-results").append(data);
    };

    devPlan.getClassHoursCounter = function (startsAt, endsAt) {
        var alarms = [
            "07:50", "08:35", "08:45", "09:30", "09:35", "10:20",
            "10:30", "11:15", "11:20", "12:05", "12:15", "13:00",
            "13:05", "13:50", "14:00", "14:45", "14:50", "15:35",
            "15:40", "16:25", "16:30", "17:15", "17:20", "18:05",
            "18:10", "18:55", "19:00", "19:45", "19:50", "20:35"
        ];
        var counter = 0;
        for (var i = 0; i <= alarms.length; i++) {
            if (alarms[i] == startsAt) {
                for (var j = i; j <= alarms.length; j++) {
                    if (alarms[j] <= endsAt) {
                        counter++;
                    }
                }
                break;
            }
        }
        return counter / 2;
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
//# sourceMappingURL=devPlan.js.map
