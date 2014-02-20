var devPlan;
(function (devPlan) {
    var ActivityHourCounter = (function () {
        function ActivityHourCounter() {
            this.hour = 0;
            this.counter = 0;
        }
        return ActivityHourCounter;
    })();
    devPlan.ActivityHourCounter = ActivityHourCounter;

    var Init = (function () {
        function Init() {
            $("#search-input").attr('value', devPlan.Settings.getUrlParam('search'));
            devPlan.Settings.load();
            if (devPlan.Settings.getUrlParam('timetable').length != 0) {
                var param = {
                    group_id: [],
                    tutor_id: [],
                    place_id: []
                };
                var query = devPlan.Settings.getUrlParam('timetable');
                var timetable = query.match(/[gtp][0-9]*/gi);

                for (var i = 0; i < timetable.length; i++) {
                    if (timetable[i].toString().toLowerCase().indexOf("g") != -1) {
                        param.group_id[param.group_id.length] = parseInt(timetable[i].slice(1).toString());
                    }
                    if (timetable[i].toString().toLowerCase().indexOf("t") != -1) {
                        param.tutor_id[param.tutor_id.length] = parseInt(timetable[i].slice(1).toString());
                    }
                }

                $.when(Cash.Api.registerTimetable(param)).done(function (response) {
                    console.log("After call registerTimetable: " + new Date().getTime());
                    Init.showTimetable(Init.setTimetable(response).getTimetable());
                    $("#timetable-panel-spinner").remove();
                });
            }

            if ($("#search-panel-input").length) {
                $("#search-panel-input").attr('value', devPlan.Settings.getUrlParam('search'));
            }

            $.when(Cash.Api.getGroupsList(), Cash.Api.getTutorsList()).done(function (groups, tutors) {
                Init.setGroups(groups[0]);
                Init.setTutors(tutors[0]);

                $("#search-input").removeAttr('disabled').attr('placeholder', 'KrDzIs3011Io / dr Paweł Wołoszyn').attr('data-provide', "typeahead");

                var data = [];
                for (var i = 0; i < Init.getGroups().length; i++) {
                    data[data.length] = Init.getGroups()[i].getName();
                }
                for (i = 0; i < Init.getTutors().length; i++) {
                    data[data.length] = Init.getTutors()[i].getName();
                }

                $("#search-input").typeahead({ source: data });

                $(".devPlanTypeahead").each(function (index) {
                    $('#' + index + '.devPlanTypeahead').removeAttr('disabled').attr('placeholder', 'KrDzIs3011Io / dr Paweł Wołoszyn').attr('data-provide', "typeahead");

                    $('#' + index + '.devPlanTypeahead').typeahead({
                        source: data,
                        updater: function (item) {
                            devPlan.Settings.addTimetableParam(item);
                        }
                    });
                });

                $('.devPlanParam').click(function (e) {
                    $(e.target).remove();
                });

                $("#search-button").removeAttr("disabled").empty().append("Szukaj");
                if ($("#search-panel-input").length) {
                    $("#search-panel-input").attr('value', devPlan.Settings.getUrlParam('search')).attr('placeholder', 'KrDzIs3011Io / dr Paweł Wołoszyn').removeAttr("disabled");
                    $("#search-panel .panel-body").remove();
                    Init.showSearchResults(devPlan.Settings.getUrlParam("search"));
                }
            });
        }
        Init.getGroups = function () {
            return Init.groups;
        };

        Init.setGroups = function (groups) {
            for (var i = 0; i < groups.length; i++) {
                Init.groups[Init.getGroups().length] = new Cash.Group(groups[i]);
            }
            Init.groups = Init.getGroups().sort(function (a, b) {
                return a.getName() - b.getName();
            });
            return Init;
        };

        Init.searchGroup = function (name) {
            var id;
            var counter;
            var group;
            for (var i = 0; i < Init.getGroups().length; i++) {
                if (Init.getGroups()[i].getName().toLocaleLowerCase() == name.toLowerCase()) {
                    id = Init.getGroups()[i].getId();
                    counter++;
                }
            }
            return counter > 1 ? 0 : id;
        };

        Init.getTutors = function () {
            return Init.tutors;
        };

        Init.setTutors = function (tutors) {
            for (var i = 0; i < tutors.length; i++) {
                Init.tutors[Init.getTutors().length] = new Cash.Tutor(tutors[i]);
            }
            Init.tutors = Init.getTutors().sort(function (a, b) {
                return a.getName() - b.getName();
            });
            return Init;
        };

        Init.searchTutor = function (name) {
            var id;
            var counter;
            var group;
            for (var i = 0; i < Init.getTutors().length; i++) {
                if (Init.getTutors()[i].getName().toLocaleLowerCase() == name.toLowerCase()) {
                    id = Init.getTutors()[i].getId();
                    counter++;
                }
            }
            return counter > 1 ? 0 : id;
        };

        Init.getTimetable = function () {
            return Init.timetable;
        };

        Init.setTimetable = function (timetable) {
            Init.timetable = new Cash.Timetable(timetable);
            return Init;
        };

        Init.generateTypeaheadDatumsForGroups = function (groups) {
            var data = [];
            for (var i = 0; i < groups.length; i++) {
                data[i] = {
                    value: groups[i].getName(),
                    tokens: groups[i].getName().replace(".", "").split(" "),
                    id: groups[i].getId(),
                    name: groups[i].getName()
                };
            }
            ;
            return data;
        };

        Init.generateTypeaheadDatumsForTutors = function (tutors) {
            var data = [];
            for (var i = 0; i < tutors.length; i++) {
                data[i] = {
                    value: tutors[i].getName(),
                    tokens: tutors[i].getName().replace(".", "").split(" "),
                    id: tutors[i].getId(),
                    name: tutors[i].getName(),
                    moodle_url: tutors[i].getMoodleUrl()
                };
            }
            ;
            return data;
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

                $("#search-panel-body").attr("display", "none");
                if (data.length == 0) {
                    data = "<tr><td class='text-center'>Brak wyników. Spróbuj jeszcze raz ;)</td</td>";
                }
                $("#search-results").append(data);
            } else {
                console.log("Too short query");
            }
        };
        Init.showTimetable = function (timetable) {
            var data = "";
            var date = "";
            $("#timetable-results").empty();

            if (timetable.getActivities().length > 0) {
                var activityCounter = [];
                var activityCounterIndex = "";

                var activity;
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

                    activityCounterIndex = indexgroup + '-' + activity.getName() + '-' + activity.getCategory() + '-' + (activity.getTutor() != null ? activity.getTutor().getId() + '' : '');

                    if (activityCounter[activityCounterIndex] == undefined) {
                        activityCounter[activityCounterIndex] = new ActivityHourCounter();
                    }

                    if (activity.getDate() >= devPlan.Settings.getCurrentDate() || devPlan.Settings.getTimetableType() == 0) {
                        if ((activity.getName().toLowerCase().indexOf(devPlan.Settings.getActivityNameFilter().toLowerCase()) > -1) || (activity.getTutor().getName().toLowerCase().indexOf(devPlan.Settings.getActivityNameFilter().toLowerCase()) > -1) || (indexgroup.toLowerCase().indexOf(devPlan.Settings.getActivityNameFilter().toLowerCase()) > -1) || (activity.getDate().indexOf(devPlan.Settings.getActivityNameFilter().toLowerCase()) > -1)) {
                            if (date != activity.getDate()) {
                                data = data + devPlan.Generate.dateInformation(activity);
                                date = activity.getDate();
                            }
                            date = activity.getDate();

                            if (timetable.getActivities()[i - 1] != null && activity.getName() == timetable.getActivities()[i - 1].getName() && activity.getEndsAtTimestamp() == timetable.getActivities()[i - 1].getEndsAtTimestamp()) {
                                continue;
                            }

                            ++activityCounter[activityCounterIndex].counter;
                            activityCounter[activityCounterIndex].hour += activity.getNumberOfSchoolLessons();

                            data = data + '<li id="activity-' + i + '" class="list-group-item activity">' + '<p class="h5">' + devPlan.Generate.nameInformation(timetable.getActivities()[i]) + '<wbr>' + devPlan.Generate.tutorInformation(timetable.getActivities()[i]);
                            '</p>';

                            if (devPlan.Settings.getActivityNote() && activity.getNotes() != null) {
                                data = data + '<p class="h6">' + devPlan.Generate.noteInformation(timetable.getActivities()[i]) + '</p><div class="clearfix"></div>';
                            }
                            if (devPlan.Settings.getActivityBell() || devPlan.Settings.getActivityLocation() || devPlan.Settings.getActivityCategory() || devPlan.Settings.getClassCounter() || devPlan.Settings.getClassHourCounter()) {
                                data = data + '<p class="h6">' + devPlan.Generate.bellInformation(timetable.getActivities()[i]) + '<wbr>' + devPlan.Generate.locationInformation(timetable.getActivities()[i]) + '<wbr>' + devPlan.Generate.categoryInformation(timetable.getActivities()[i]) + '<wbr>';

                                if (devPlan.Settings.getClassCounter()) {
                                    data = data + '<span class="label label-info pull-right" title="Zajęcia z koleji: ' + activityCounter[activityCounterIndex].counter + '"><i class="fa fa-fw fa-info-circle"></i>' + activityCounter[activityCounterIndex].counter + '</span><wbr>';
                                }

                                if (devPlan.Settings.getClassHourCounter()) {
                                    data = data + '<span class="label label-default pull-right" title="Ilość jednostek lekcyjnych:"><i class="fa fa-fw fa-clock-o"></i>' + (activityCounter[activityCounterIndex].hour - activity.getNumberOfSchoolLessons()) + " - " + activityCounter[activityCounterIndex].hour + '</span> ';
                                }
                                data = data + '</p><div class="clearfix"></div>';
                            }
                            if (devPlan.Settings.getActivityGroup()) {
                                data = data + '<p class="h6">';
                                for (var j = 0; j < groups.length; j++) {
                                    if (groups[j] != null) {
                                        data = data + '<a href="timetable.html?timetable=g' + groups[j].getId() + '" title="Plan zajęć dla ' + groups[j].getName() + '">' + groups[j].getName() + "</a>" + '<wbr>';
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
        };
        Init.groups = [];

        Init.tutors = [];

        Init.places = [];
        return Init;
    })();
    devPlan.Init = Init;
})(devPlan || (devPlan = {}));
//# sourceMappingURL=Init.js.map
