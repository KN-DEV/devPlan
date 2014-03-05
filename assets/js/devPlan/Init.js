var devPlan;
(function (devPlan) {
    var Init = (function () {
        function Init() {
            $("#search-input").attr('value', devPlan.Settings.getUrlParam('search'));
            devPlan.Settings.load();

            var params;
            if (devPlan.Settings.getUrlParam('timetable').length != 0) {
                params = Cash.Params.fromString(devPlan.Settings.getUrlParam('timetable'));
                devPlan.Settings.setTimetableParams(params);
            } else {
                params = devPlan.Settings.getTimetableParams();
                Init.setUpButtons(params);
            }

            if ($("#timetable-results").length == 1) {
                if (params.isEmpty() == false) {
                    $.when(Cash.Api.getTimetable(params)).done(function (response) {
                        Init.showTimetable(Init.setTimetable(response).getTimetable());
                        $("#timetable-panel-spinner").remove();
                    }).fail(function () {
                        $.when(Cash.Api.registerTimetable(params)).done(function (response) {
                            $.when(Cash.Api.getTimetable(params)).done(function (response) {
                                Init.showTimetable(Init.setTimetable(response).getTimetable());
                                $("#timetable-panel-spinner").remove();
                            }).fail(function () {
                            });
                        }).fail(function () {
                            Init.showTimetable(Init.setTimetable().getTimetable());
                        });
                    });
                }
            }

            if ($("#search-panel-input").length != 0) {
                $("#search-panel-input").attr('value', devPlan.Settings.getUrlParam('search'));
            }

            $.when(Cash.Api.getGroupsList(), Cash.Api.getTutorsList(), Cash.Api.getPlacesList()).done(function (groups, tutors, places) {
                console.log(groups, tutors, places);
                Init.setGroups(groups[0]);
                Init.setTutors(tutors[0]);
                Init.setPlaces(places[0]);

                $("#search-input").removeAttr('disabled').attr('placeholder', 'KrDzIs3011Io / dr Paweł Wołoszyn').attr('data-provide', "typeahead");

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
                        if (group == 0 && tutor == 0 && place > 0) {
                            window.location.replace('timetable.html?timetable=p' + place);
                        }
                    }
                });

                devPlan.Settings.loadTimetableParam();

                $(".devPlanTypeahead").each(function (index) {
                    $('#' + index + '.devPlanTypeahead').removeAttr('disabled').attr('placeholder', 'KrDzIs3011Io / dr Paweł Wołoszyn').attr('data-provide', "typeahead");
                    $('#' + index + '.devPlanTypeahead').typeahead({
                        source: data,
                        items: 15,
                        updater: function (item) {
                            devPlan.Settings.addTimetableParam(item);
                        }
                    });
                });
            }).fail(function () {
                console.log("Fail creating typeahead");
            });
        }
        Init.getGroups = function () {
            return Init.groups;
        };

        Init.setGroups = function (groups) {
            if (typeof groups === "undefined") { groups = []; }
            console.log(groups);
            for (var i = 0; i < groups.length; i++) {
                Init.groups.push(new Cash.Group(groups[i]));
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
            for (var i = 0; i < tutors.length; i++) {
                Init.tutors.push(new Cash.Tutor(tutors[i]));
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

        Init.setPlaces = function (tutors) {
            if (typeof tutors === "undefined") { tutors = []; }
            for (var i = 0; i < tutors.length; i++) {
                Init.places.push(new Cash.Place(tutors[i]));
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

        Init.getTimetable = function () {
            return Init.timetable;
        };

        Init.setTimetable = function (timetable) {
            Init.timetable = new Cash.Timetable(timetable);
            return Init;
        };

        Init.showSearchResults = function (query) {
            if (typeof query === "undefined") { query = ""; }
            $("#search-results").empty();
            query = query.toString().toUpperCase();
            if (query.length >= 3) {
                var data = '';
                for (var i = 0; i < Init.getGroups().length; i++) {
                    if (Init.getGroups()[i].getName().toString().toUpperCase().indexOf(query) !== -1) {
                        data = data + '<li class="list-group-item">' + '<a href="timetable.html?timetable=g' + Init.getGroups()[i].getId() + '">' + Init.getGroups()[i].getName() + '</a>' + '</li>';
                    }
                }
                for (var i = 0; i < Init.getTutors().length; i++) {
                    if (Init.getTutors()[i].getName().toString().toUpperCase().indexOf(query) !== -1) {
                        data = data + '<li class="list-group-item">' + '<a href="timetable.html?timetable=t' + Init.getTutors()[i].getId() + '">' + Init.getTutors()[i].getName() + '</a>' + '<span class="pull-right">' + '<a href="' + Init.getTutors()[i].getMoodleUrl() + '" title="Wizytówka E-Uczelnia"><i class="fa fa-globe fa-fw"></i></a>' + '</span>' + '</li>';
                    }
                }
                for (var i = 0; i < Init.getPlaces().length; i++) {
                    if (Init.getPlaces()[i].getLocation().toString().toUpperCase().indexOf(query) !== -1) {
                        data = data + '<li class="list-group-item">' + '<a href="timetable.html?timetable=p' + Init.getPlaces()[i].getId() + '">' + Init.getPlaces()[i].getLocation() + '</a>' + '</li>';
                    }
                }
                $("#search-panel-body").attr("display", "none");
                if (data.length == 0) {
                    data = "<tr><td class='text-center'>Brak wyników. Spróbuj jeszcze raz ;)</td</td>";
                }
                $("#search-results").append(data);
            } else {
                data = "<tr><td class='text-center'>Zbyt krótka fraza.</td</td>";
            }
        };

        Init.showTimetable = function (timetable) {
            var data = "";
            var date = "";
            $("#timetable-results").empty();

            if (timetable.getActivities().length > 0) {
                var activity;

                var daysCounter = 0;

                var j = 0;
                for (var i = 0; i < timetable.getActivities().length; i++) {
                    activity = timetable.getActivities()[i];

                    j = i;
                    var groups = [];
                    do {
                        if (timetable.getActivities()[j].getGroup() != null) {
                            groups[groups.length] = new Cash.Group(timetable.getActivities()[j].getGroup());
                        }
                    } while(timetable.getActivities()[++j] != null && activity.getName() == timetable.getActivities()[j].getName() && activity.getEndsAtTimestamp() == timetable.getActivities()[j].getEndsAtTimestamp());

                    var indexgroup = "";
                    groups = groups.sort(function (a, b) {
                        return a.getName() >= b.getName();
                    });
                    for (var k = 0; k < groups.length; k++) {
                        indexgroup = indexgroup + groups[k].getName();
                    }

                    if (activity.getDate() >= devPlan.Settings.getCurrentDate() || devPlan.Settings.getTimetableType() == 0) {
                        if ((activity.getName().toLowerCase().indexOf(devPlan.Settings.getActivityNameFilter().toLowerCase()) > -1) || (activity.getTutor().getName().toLowerCase().indexOf(devPlan.Settings.getActivityNameFilter().toLowerCase()) > -1) || (indexgroup.toLowerCase().indexOf(devPlan.Settings.getActivityNameFilter().toLowerCase()) > -1) || (activity.getDate().indexOf(devPlan.Settings.getActivityNameFilter().toLowerCase()) > -1)) {
                            if (date != activity.getDate()) {
                                if (devPlan.Settings.getTimetablePeriod() != 0 && daysCounter >= devPlan.Settings.getTimetablePeriod()) {
                                    break;
                                }
                                daysCounter++;
                                if (date != "") {
                                    data = data + '</div>';
                                }
                                data = data + devPlan.Generate.dateInformation(activity) + '<div id="' + activity.getDate() + '" class="activities collapse in">';
                                date = activity.getDate();
                            }

                            if (timetable.getActivities()[i - 1] != null && activity.getName() == timetable.getActivities()[i - 1].getName() && activity.getEndsAtTimestamp() == timetable.getActivities()[i - 1].getEndsAtTimestamp()) {
                                continue;
                            }
                            data = data + '<li id="activity' + activity.getId() + '" class="list-group-item activity ' + activity.getCategory().replace(/\s/gi, "-") + '">' + '<p class="h5">' + devPlan.Generate.nameInformation(timetable.getActivities()[i]) + devPlan.Generate.tutorInformation(timetable.getActivities()[i]);
                            '</p><div class="clearfix"></div>';
                            if (devPlan.Settings.getActivityNote() && activity.getNotes() != null) {
                                data = data + '<p class="h6">' + devPlan.Generate.noteInformation(timetable.getActivities()[i]) + '</p><div class="clearfix"></div>';
                            }
                            if (devPlan.Settings.getActivityBell() || devPlan.Settings.getActivityLocation() || devPlan.Settings.getActivityCategory() || devPlan.Settings.getClassCounter() || devPlan.Settings.getClassHourCounter()) {
                                data = data + '<p class="h6">' + devPlan.Generate.bellInformation(timetable.getActivities()[i]) + devPlan.Generate.locationInformation(timetable.getActivities()[i]) + devPlan.Generate.categoryInformation(timetable.getActivities()[i]) + devPlan.Generate.activityCounter(timetable.getPositionOfActivity(activity), timetable.getMaxNumberOfOccurencesOfActivity(activity)) + devPlan.Generate.hourInformation(activity.getNumberOfSchoolLessons(), timetable.sumAllHoursOfActivity(activity), timetable.sumAllHoursOfActivity(activity, true));
                                data = data + '</p><div class="clearfix"></div>';
                            }
                            if (devPlan.Settings.getActivityGroup()) {
                                data = data + '<p class="h6">';
                                for (var j = 0; j < groups.length; j++) {
                                    if (groups[j] != null) {
                                        data = data + '<a href="timetable.html?timetable=g' + groups[j].getId() + '"class="group" title="Kliknij aby zobaczyć devPlan: ' + groups[j].getName() + '">' + groups[j].getName() + "</a>" + '<wbr>';
                                        if (j < (groups.length - 1)) {
                                            data = data + ' | ';
                                        }
                                    }
                                }
                                data = data + '</p>';
                            }
                            data = data + '<div class="clearfix"></div>';
                            data = data + '</li>';
                        }
                    }
                }

                if (data.length == 0 && devPlan.Settings.getActivityNameFilter().length > 0) {
                    data = data + '<li class="list-group-item"><p class="h4 text-center">Brak wyników</p>';
                }
            } else {
                data = data + '<li class="list-group-item"><p class="h4 text-center">Przykro nam. Ten devPlan nie posiada żadnych zajęć.</p>';
            }
            $("#timetable-results").append(data);

            devPlan.bindAnimation();
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
                $("#devPlanWizardNavbarIconLink").attr("href", "timetable.html").removeAttr("data-toggle").removeAttr("data-target");

                $("#devPlanWizardNavbarLink").attr("href", "timetable.html").removeAttr("data-toggle").removeAttr("data-target").empty().toggleClass("btn-info").toggleClass("btn-success").attr("href", "timetable.html").removeAttr("data-toggle").removeAttr("data-target").text("Mój devPlan");

                $("#devPlanWizardLink").attr("href", "timetable.html").removeAttr("data-toggle").removeAttr("data-target").empty().toggleClass("btn-info").toggleClass("btn-success").text("Mój devPlan");
            } else {
                $("#devPlanSettingsNavbarIconLink").remove();
                $("#devPlanSettingsNavbarLink").remove();

                $("#timetable-panel-spinner-icon").empty().append('<button class="btn btn-info"' + 'data-toggle="modal" data-target="#devPlanWizard">' + 'Stwórz swój <strong>devPlan</strong>' + '</button>');
            }
        };
        Init.groups = [];

        Init.tutors = [];

        Init.places = [];
        return Init;
    })();
    devPlan.Init = Init;
})(devPlan || (devPlan = {}));

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
