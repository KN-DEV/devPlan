var devPlan;
(function (devPlan) {
    (function (CacheTime) {
        CacheTime[CacheTime["Group"] = 6] = "Group";
        CacheTime[CacheTime["Tutor"] = 6] = "Tutor";
        CacheTime[CacheTime["Place"] = 6] = "Place";
        CacheTime[CacheTime["Timetable"] = 6] = "Timetable";
    })(devPlan.CacheTime || (devPlan.CacheTime = {}));
    var CacheTime = devPlan.CacheTime;

    var Init = (function () {
        function Init() {
            devPlan.Settings.load();

            Init.setUpButtons(devPlan.Settings.getTimetableParams());

            var params = devPlan.Params.fromString(devPlan.Settings.getUrlParam('timetable'));

            if (params.isEmpty()) {
                params = devPlan.Settings.getTimetableParams();
            }

            if (devPlan.Settings.getTimetableRedirect() && !params.isEmpty() && (window.location.href.indexOf("timetable.html") == -1)) {
                window.location.replace('timetable.html?timetable=' + params.toString());
            }

            if ($("#timetable-results").length) {
                if (!params.isEmpty()) {
                    Init.loadTimetable(params);
                    console.log("Koniec");
                } else {
                    $("#timetable-panel-spinner").remove();
                }
            }

            $.when(Cash.Api.getGroupsList(true, 12), devPlan.Init.tutorsInUse == true ? Cash.Api.getTutorsList(true, 12) : null, Init.placesInUse ? Cash.Api.getPlacesList(true, 12) : null).done(function (groups, tutors, places) {
                $("#search-input").removeAttr('disabled').attr('data-provide', "typeahead").typeahead({
                    source: Init.typeaheadDataCreator(Init.getGroups(), (devPlan.Init.tutorsInUse == true ? Init.getTutors() : []), (devPlan.Init.placesInUse == true ? Init.getPlaces() : [])),
                    items: 15,
                    updater: function (item) {
                        var group = Init.searchGroupId(item);
                        var tutor = Init.searchTutorId(item);
                        var place = Init.searchPlaceId(item);
                        if (group > 0 && tutor == 0 && place == 0) {
                            window.location.replace('timetable.html?timetable=g' + group);
                        }
                        if (devPlan.Init.tutorsInUse == true && group == 0 && tutor > 0 && place == 0) {
                            window.location.replace('timetable.html?timetable=t' + tutor);
                        }
                        if (devPlan.Init.placesInUse == true && group == 0 && tutor == 0 && place > 0) {
                            window.location.replace('timetable.html?timetable=p' + place);
                        }
                    }
                });

                $(".devPlanTypeahead").each(function (index) {
                    $('#' + index + '.devPlanTypeahead').removeAttr('disabled').attr('data-provide', "typeahead");
                    $('#' + index + '.devPlanTypeahead').typeahead({
                        source: Init.typeaheadDataCreator(Init.getGroups(), Init.getTutors(), devPlan.Init.placesInUse == true ? Init.getPlaces() : []),
                        items: 15,
                        updater: function (item) {
                            devPlan.Settings.addTimetableParam(item);
                        }
                    });
                });
            }).fail(function () {
                if ($.jStorage.storageAvailable() == true) {
                    $("#search-input").removeAttr('disabled').attr('data-provide', "typeahead");

                    var data = Init.typeaheadDataCreator(Init.getGroups(), Init.getTutors(), Init.getPlaces());

                    $("#search-input").typeahead({
                        source: data,
                        items: 15,
                        updater: function (item) {
                            var group = Init.searchGroupId(item);
                            var tutor = Init.searchTutorId(item);
                            var place = Init.searchPlaceId(item);
                            if (group > 0 && tutor == 0 && place == 0) {
                                window.location.replace('timetable.html?timetable=g' + group);
                            }
                            if (group == 0 && tutor > 0 && place == 0) {
                                window.location.replace('timetable.html?timetable=t' + tutor);
                            }
                            if (devPlan.Init.placesInUse == true && group == 0 && tutor == 0 && place > 0) {
                                window.location.replace('timetable.html?timetable=p' + place);
                            }
                        }
                    });

                    devPlan.Settings.loadTimetableParam();

                    $(".devPlanTypeahead").each(function (index) {
                        $('#' + index + '.devPlanTypeahead').removeAttr('disabled').attr('data-provide', "typeahead");
                        $('#' + index + '.devPlanTypeahead').typeahead({
                            source: data,
                            items: 15,
                            updater: function (item) {
                                devPlan.Settings.addTimetableParam(item);
                            }
                        });
                    });
                }
            });
        }
        Init.getGroups = function () {
            return Init.groups;
        };

        Init.setGroups = function (groups) {
            if (typeof groups === "undefined") { groups = []; }
            for (var group in groups) {
                Init.groups.push(new devPlan.Group(groups[group].id, groups[group].name));
            }
            Init.groups = Init.getGroups().sort(function (a, b) {
                return a.getName() - b.getName();
            });
            return Init;
        };

        Init.searchGroupId = function (name) {
            var id;
            var found = false;
            for (var i = 0; i < Init.getGroups().length; i++) {
                if (Init.getGroups()[i].getName().toString() == name.toString()) {
                    id = Init.getGroups()[i].getId();
                    found = true;
                    break;
                }
            }
            return found ? id : 0;
        };

        Init.getTutors = function () {
            return Init.tutors;
        };

        Init.setTutors = function (tutors) {
            if (typeof tutors === "undefined") { tutors = []; }
            for (var tutor in tutors) {
                Init.tutors.push(new devPlan.Tutor(tutors[tutor].id, tutors[tutor].name));
            }
            Init.tutors = Init.getTutors().sort(function (a, b) {
                return a.getName() - b.getName();
            });
            return Init;
        };

        Init.searchTutorId = function (name) {
            var id;
            var found = false;
            for (var i = 0; i < Init.getTutors().length; i++) {
                if (Init.getTutors()[i].getName().toUpperCase().toString() == name.toUpperCase().toString()) {
                    id = Init.getTutors()[i].getId();
                    found = true;
                    break;
                }
            }
            return found ? id : 0;
        };

        Init.getPlaces = function () {
            return Init.places;
        };

        Init.setPlaces = function (places) {
            if (typeof places === "undefined") { places = []; }
            for (var place in places) {
                Init.places.push(new devPlan.Place(places[place]));
            }
            Init.places = Init.getPlaces().sort(function (a, b) {
                return a.getLocation() - b.getLocation();
            });
            return Init;
        };

        Init.searchPlaceId = function (name) {
            var id;
            var found = false;
            for (var i = 0; i < Init.getPlaces().length; i++) {
                if (Init.getPlaces()[i].getLocation().toUpperCase().toString() == name.toUpperCase().toString()) {
                    id = Init.getPlaces()[i].getId();
                    found = true;
                    break;
                }
            }
            return found ? id : 0;
        };

        Init.loadTimetable = function (params) {
            $.when(Cash.Api.getTimetable(params.toString(), true, 6 /* Timetable */)).done(function (response) {
                devPlan.Generate.timetable(Init.getTimetable());
                $("#timetable-panel-spinner").remove();
            }).fail(function () {
                if (Init.getTimetable() == null) {
                    $.when(Cash.Api.registerTimetable(params.getGroups(), params.getTutors(), params.getPlaces())).done(function () {
                        $.when(Cash.Api.getTimetable(params.toString(), true, 6 /* Timetable */)).done(function (response) {
                            devPlan.Generate.timetable(Init.getTimetable());
                            $("#timetable-panel-spinner").remove();
                        });
                    });
                } else {
                    devPlan.Generate.timetable(Init.getTimetable());
                    $("#timetable-panel-spinner").remove();
                    $.when(Cash.Api.getTimetableVersion(Init.getTimetable().getParams().toString())).done(function (data) {
                        if (Init.getTimetable().isUpToDate(data) == false) {
                            Init.loadTimetable(params);
                        }
                    });
                }
            });
        };

        Init.getTimetable = function () {
            return Init.timetable;
        };

        Init.setTimetable = function (timetable) {
            console.log(timetable);
            Init.timetable = new devPlan.Timetable(timetable);
            return Init;
        };

        Init.typeaheadDataCreator = function (groups, tutors, places) {
            if (typeof groups === "undefined") { groups = []; }
            if (typeof tutors === "undefined") { tutors = []; }
            if (typeof places === "undefined") { places = []; }
            var data = [];
            for (var i = 0; i < groups.length; i++) {
                data.push(Init.groups[i].getName());
            }
            for (var i = 0; i < tutors.length; i++) {
                data.push(tutors[i].getName());
            }
            for (var i = 0; i < places.length; i++) {
                data.push(places[i].getLocation());
            }
            return data;
        };

        Init.setUpButtons = function (params) {
            if (params.isEmpty() == false) {
                $(".devPlanWizardNavbarIconLink").removeAttr("data-toggle").removeAttr("data-target").toggleClass("btn-warning").toggleClass("btn-success").attr("href", "timetable.html?timetable=" + params.toString());

                $(".devPlanWizardNavbarLink").removeAttr("data-toggle").removeAttr("data-target").toggleClass("btn-warning").toggleClass("btn-success").empty().attr("href", "timetable.html?timetable=" + params.toString()).attr("title", "Twój devPlan").text("Twój devPlan");

                $(".devPlanWizardLink").removeAttr("data-toggle").removeAttr("data-target").toggleClass("btn-warning").toggleClass("btn-success").empty().attr("href", "timetable.html?timetable=" + params.toString()).attr("title", "Twój devPlan").text("Twój devPlan");

                $(".devPlanLink").attr("href", "timetable.html?timetable=" + params.toString()).removeAttr("data-toggle").removeAttr("data-target").attr("title", "Twój devPlan").empty().text("Twój devPlan");
            } else {
                $(".timetable-panel-spinner-icon").empty().append('<button class="btn btn-warning title="Stwórz devPlan" ' + 'data-toggle="modal" data-target="#devPlanWizard">' + 'Stwórz <strong>devPlan</strong>' + '</button>');
            }
        };
        Init.placesInUse = false;
        Init.tutorsInUse = true;

        Init.groups = [];

        Init.tutors = [];

        Init.places = [];
        return Init;
    })();
    devPlan.Init = Init;
})(devPlan || (devPlan = {}));

function containsIndexGroups(indexgroups, query) {
    if (typeof indexgroups === "undefined") { indexgroups = ''; }
    if (typeof query === "undefined") { query = ''; }
    var items = query.toString().toLowerCase().split(" ");
    indexgroups = indexgroups.toString().toLowerCase();
    var item = "";
    var values = [];

    for (var i = 0; i < items.length; i++) {
        item = items[i];
        if (indexgroups.indexOf(item) > -1) {
            values.push(true);
        } else {
            values.push(false);
        }
    }
    for (i = 0; i < values.length; i++) {
        if (values[i] == false) {
            return false;
        }
    }
    return true;
}

function sendIssue() {
    $.ajax({
        url: "http://devplan.uek.krakow.pl/devPlanAdmin/index.php/issue/create",
        type: "POST",
        dataType: 'json',
        data: {
            email: $("#issueEmail").val().toString(),
            content: $("#issueContent").val().toString(),
            device: "Browser",
            device_information: navigator.userAgent
        }
    });
}
//# sourceMappingURL=Init.js.map
