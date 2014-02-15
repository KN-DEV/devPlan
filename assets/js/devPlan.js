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

var ActivityHourCounter = (function () {
    function ActivityHourCounter() {
        this.hour = 0;
        this.counter = 0;
    }
    return ActivityHourCounter;
})();

var TimetableViewSettings = (function () {
    function TimetableViewSettings() {
    }
    TimetableViewSettings.getCounterStatus = function () {
        return TimetableViewSettings.counter;
    };

    TimetableViewSettings.setCounterStatus = function (status) {
        if (typeof status === "undefined") { status = false; }
        TimetableViewSettings.counter = status;
        return TimetableViewSettings;
    };

    TimetableViewSettings.getHourStatus = function () {
        return TimetableViewSettings.hour;
    };

    TimetableViewSettings.setHourStatus = function (status) {
        if (typeof status === "undefined") { status = false; }
        TimetableViewSettings.hour = status;
        return TimetableViewSettings;
    };

    TimetableViewSettings.getCategoryStatus = function () {
        return TimetableViewSettings.category;
    };

    TimetableViewSettings.setCategoryStatus = function (status) {
        if (typeof status === "undefined") { status = false; }
        TimetableViewSettings.category = status;
        return TimetableViewSettings;
    };

    TimetableViewSettings.getBellStatus = function () {
        return TimetableViewSettings.bell;
    };

    TimetableViewSettings.setBellStatus = function (status) {
        if (typeof status === "undefined") { status = false; }
        TimetableViewSettings.bell = status;
        return TimetableViewSettings;
    };

    TimetableViewSettings.getLocationStatus = function () {
        return TimetableViewSettings.location;
    };

    TimetableViewSettings.setLocationStatus = function (status) {
        if (typeof status === "undefined") { status = false; }
        TimetableViewSettings.location = status;
        return TimetableViewSettings;
    };

    TimetableViewSettings.getGroupStatus = function () {
        return TimetableViewSettings.group;
    };

    TimetableViewSettings.setGroupStatus = function (status) {
        if (typeof status === "undefined") { status = false; }
        TimetableViewSettings.group = status;
        return TimetableViewSettings;
    };
    TimetableViewSettings.getTutorStatus = function () {
        return TimetableViewSettings.tutor;
    };

    TimetableViewSettings.setTutorStatus = function (status) {
        if (typeof status === "undefined") { status = false; }
        TimetableViewSettings.tutor = status;
        return TimetableViewSettings;
    };
    TimetableViewSettings.counter = true;
    TimetableViewSettings.hour = true;
    TimetableViewSettings.category = true;
    TimetableViewSettings.bell = true;
    TimetableViewSettings.location = true;
    TimetableViewSettings.group = true;
    TimetableViewSettings.tutor = true;
    return TimetableViewSettings;
})();

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
                devPlan.showTimetable(devPlan.setTimetable(response).getTimetable());
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

    devPlan.getTimetable = function () {
        return devPlan.timetable;
    };

    devPlan.setTimetable = function (timetable) {
        devPlan.timetable = timetable;
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
        console.log(timetable);
        timetable.activities = timetable.activities.sort(function (a, b) {
            return a.starts_at_timestamp - b.starts_at_timestamp;
        });

        var date = "";

        if (timetable.activities[0].tutor != null && getUrlParam("timetable") == 't' + timetable.activities[0].tutor.id) {
            $("#panel-title").empty().append('Plan zajęć:  <a href="timetable.html?timetable=t' + timetable.activities[0].tutor.id + '">' + timetable.activities[0].tutor.name + '</a><a href="' + timetable.activities[0].tutor.moodle_url + '" title="Wizytówka E-Uczelnia"><i class="fa fa-globe fa-fw"></i></a>');
        }

        var activityCounter = [];
        var activityCounterIndex = "";
        var j = 0;
        for (var i = 0; i < timetable.activities.length; i++) {
            j = i;
            var groups = [];
            do {
                if (timetable.activities[j].group != null) {
                    groups[groups.length] = timetable.activities[j].group;
                }
            } while(timetable.activities[++j] != null && timetable.activities[i].name == timetable.activities[j].name && timetable.activities[i].ends_at_timestamp == timetable.activities[j].ends_at_timestamp);

            var indexgroup = "";
            groups = groups.sort(function (a, b) {
                return a.name > b.name;
            });

            for (var k = 0; k < groups.length; k++) {
                indexgroup = indexgroup + groups[k].name;
            }

            activityCounterIndex = indexgroup + '-' + timetable.activities[i].name + '-' + timetable.activities[i].category + '-' + (timetable.activities[i].tutor != null ? timetable.activities[i].tutor.id + '' : '');
            console.log(activityCounterIndex);

            if (activityCounter[activityCounterIndex] == undefined) {
                activityCounter[activityCounterIndex] = new ActivityHourCounter();
            }

            if (timetable.activities[i - 1] != null && timetable.activities[i].name == timetable.activities[i - 1].name && timetable.activities[i].ends_at_timestamp == timetable.activities[i - 1].ends_at_timestamp) {
                continue;
            }
            if (date < timetable.activities[i].date) {
                data = data + '<li class="list-group-item list-group-item-success">' + '<p id="' + timetable.activities[i].date + '" class="h2">' + timetable.activities[i].day_of_week + ' ' + timetable.activities[i].date + '</p>' + '</li>';
                date = timetable.activities[i].date;
            }

            data = data + '<li id="' + i + '" class="list-group-item">' + '<p class="h5">' + '<strong>';

            data = data + '<span title="Nazwa przedmiotu">' + (timetable.activities[i].name.length > 0 ? timetable.activities[i].name : timetable.activities[i].category) + '</span></strong>';

            if (TimetableViewSettings.tutor) {
                data = data + '<span class="pull-right">' + '<a href="timetable.html?timetable=t' + timetable.activities[i].tutor.id + '" title="Pełny plan zajęć prowadzącego">' + timetable.activities[i].tutor.name + "</a> " + (timetable.activities[i].tutor.moodle_url != null ? '<a href="' + timetable.activities[i].tutor.moodle_url + '" title="Wizytówka prowadzącego na E-Uczelni"><i class="fa fa-globe fa-fw"></i></a>' : "") + "</span>";
            }

            data = data + '</p><div class="clearfix"></div>' + (timetable.activities[i].notes != null ? '<p>Notatka: ' + timetable.activities[i].notes + '</p>' : '') + '<p>';

            if (TimetableViewSettings.bell) {
                data = data + '<span class="label label-primary" title="Czas rozpoczęcia i zakończenia zajęć"><i class="fa fa-fw fa-bell"></i>' + timetable.activities[i].starts_at + " - " + timetable.activities[i].ends_at + '</span> ';
            }

            if (TimetableViewSettings.location) {
                data = data + (timetable.activities[i].place != null ? '<span class="label label-success" title="Lokalizacja zajęć"><i class="fa fa-fw fa-map-marker"></i>' + timetable.activities[i].place.location + '</span> ' : '');
            }

            if (TimetableViewSettings.category) {
                data = data + '<span class="label label-danger" title="Typ zajęć"><i class="fa fa-fw fa-tag"></i>' + timetable.activities[i].category + '</span> ';
            }

            if (TimetableViewSettings.counter && timetable.activities[i].category != "egzamin") {
                data = data + '<span class="label label-info" title="Licznik zajęć">' + ++activityCounter[activityCounterIndex].counter + '</span> ';
            }

            if (TimetableViewSettings.hour) {
                data = data + '<span class="label label-default" title="Ilość jednostek lekcyjnych"><i class="fa fa-fw fa-clock-o"></i>' + (activityCounter[activityCounterIndex].hour + " - " + (activityCounter[activityCounterIndex].hour += devPlan.getClassHoursCounter(timetable.activities[i].starts_at, timetable.activities[i].ends_at))) + '</span> ';
            }

            if (TimetableViewSettings.group) {
                data = data + '<br/>';
                for (var j = 0; j < groups.length; j++) {
                    if (groups[j] != null) {
                        data = data + '<small><a href="timetable.html?timetable=g' + groups[j].id + '" title="Plan zajęć dla ' + groups[j].name + '">' + groups[j].name + "</a></small> ";
                        if (j < (groups.length - 1)) {
                            data = data + ' | ';
                        }
                    }
                }
            }
            data = data + '</p><div class="clearfix"></div>' + "</li>";
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
