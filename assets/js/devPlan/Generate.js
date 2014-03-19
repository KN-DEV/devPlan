var devPlan;
(function (devPlan) {
    var Generate = (function () {
        function Generate() {
        }
        Generate.dateInformation = function (activity) {
            var date = new Date(activity.getStartsAtTimestamp() * 1000);
            return '<li class="list-group-item list-group-item-info date" data-toggle="collapse" data-parent="#accordion" href="#' + activity.getDate() + '.activities">' + '<h4 id="' + activity.getDate() + '" >' + Generate.dayOfWeek[date.getDay()] + ', ' + date.getDate() + ' ' + Generate.month[date.getMonth()] + '</h4></li>';
        };

        Generate.activityName = function (activity) {
            return '<span class="name">' + (activity.getName().length != 0 ? activity.getName() : '&nbsp;') + '</span>';
        };

        Generate.activityNote = function (activity) {
            return (activity.getNotes().length > 0) ? '<span class="note" title="Notatka dotycząca zajęć">Notatka: ' + activity.getNotes() + '</span>' : '';
        };

        Generate.activityStartStop = function (activity) {
            return '<span class="bell" title="Zajęcia od ' + activity.getStartsAt() + ' do ' + activity.getEndsAt() + '">' + '<i class="fa fa-fw fa-clock-o"></i>' + activity.getStartsAt() + " - " + activity.getEndsAt() + '</span>';
        };

        Generate.activityCategory = function (activity) {
            var color;
            var value;
            switch (activity.getCategory()) {
                case "wykład":
                    color = "warning";
                    value = "W";
                    break;
                case "wykład do wyboru":
                    color = "warning";
                    value = "W";
                    break;
                case "lektorat":
                    color = "success";
                    value = "L";
                    break;
                case "ćwiczenia":
                    color = "primary";
                    value = "Ć";
                    break;
                case "egzamin":
                    color = "danger";
                    value = "E";
                    break;
                default:
                    color = "danger";
                    value = "*";
                    break;
            }
            return '<span class="label label-' + color + ' category pull-right" title="' + activity.getCategory() + '">' + value + '</span>';
        };

        Generate.activityLocation = function (activity) {
            if (activity.getPlace().getLocation().length > 0) {
                if (devPlan.Init.placesInUse == true) {
                    return '<span class="location" title="Kliknij aby zobaczyć devPlan ' + activity.getPlace().getLocation() + '"><i class="fa fa-fw fa-map-marker"></i>' + '<a href="timetable.html?timetable=p' + activity.getPlace().getId() + '">' + activity.getPlace().getLocation() + '</a>' + '</span>';
                } else {
                    return '<span class="location" title="Sala ' + activity.getPlace().getLocation() + '"><i class="fa fa-fw fa-map-marker"></i>' + activity.getPlace().getLocation() + '</span>';
                }
            } else {
                return '';
            }
        };

        Generate.activityCounter = function (min, max) {
            return '<span class="counter" title="Zajęcia z kolei: ' + min + '">' + min + '/' + max + '</span>';
        };

        Generate.hourInformation = function (value, have, all) {
            return '<span class="hour" title="Godziny lekcyjne">' + ((have - value) + 1) + '-' + have + '/' + all + '</span> ';
        };

        Generate.activityTutorsList = function (activity) {
            if (devPlan.Init.placesInUse == true) {
                return '<span class="tutor">' + (activity.getTutor().getMoodleUrl() != null ? '<a   href="' + activity.getTutor().getMoodleUrl() + '" title=" ' + activity.getTutor().getName() + ' - Wizytówka E-Uczelna "><i class="fa fa-globe fa-fw"></i></a>' : "") + '<a   href="timetable.html?timetable=t' + activity.getTutor().getId() + '" title="Kliknij aby zobaczyć devPlan: ' + activity.getTutor().getName() + '">' + activity.getTutor().getName() + '</a>' + '<span>';
            } else {
                return '<span class="tutor">' + (activity.getTutor().getMoodleUrl() != null ? '<a   href="' + activity.getTutor().getMoodleUrl() + '" title=" ' + activity.getTutor().getName() + ' - Wizytówka E-Uczelna "><i class="fa fa-globe fa-fw"></i></a>' : "") + activity.getTutor().getName() + '<span>';
            }
        };

        Generate.devPlanParamButton = function (item, id, type) {
            var color;
            switch (type) {
                case "g":
                    color = "primary";
                    break;
                case "t":
                    color = "success";
                    break;
                case "p":
                    color = "info";
                    break;
            }
            return '<div class="btn-group btn-group-sm devPlanParam">' + '<button title="' + item + '" class="btn btn-' + color + '" >' + '<strong>' + ((item.length > 50) ? item.substr(0, 50) + '...' : item) + '' + '</strong>' + '</button>' + '<button class="btn btn-danger"  data-value="' + id + '"' + ' data-type="' + type + '" onclick="devPlan.Settings.removeTimetableParam(this);">' + '<i class="fa fa-fw fa-trash-o"></i>' + '</button>' + '</div>';
        };

        Generate.activityGroupsList = function (groups) {
            if (typeof groups === "undefined") { groups = []; }
            var data = '';
            for (var j = 0; j < groups.length; j++) {
                if (groups[j] != null) {
                    data = data + '<span class="group"><a href="timetable.html?timetable=g' + groups[j].getId() + '"title="Kliknij aby zobaczyć devPlan: ' + groups[j].getName() + '">' + groups[j].getName() + "</a></span>";
                }
            }
            return data;
        };

        Generate.activity = function (timetable, activity, groups) {
            if (typeof groups === "undefined") { groups = []; }
            var data = '';
            data = data + '<li id="activity' + activity.getId() + '" class="list-group-item activity">' + '<div class="row">' + '<div class="col-lg-12 col-md-12 col-sm-12 col-xs-12">' + Generate.activityName(activity) + (devPlan.Settings.isActivityCategoryVisible() ? Generate.activityCategory(activity) : '') + '</div>' + ((devPlan.Settings.getActivityNote() == true && activity.getNotes().length > 0) ? ('<div class="col-lg-12 col-md-12 col-sm-12 col-xs-12">' + Generate.activityNote(activity) + '</div>') : '');

            if (devPlan.Settings.getActivityBell() || devPlan.Settings.getActivityLocation() || devPlan.Settings.getActivityTutorsList() || devPlan.Settings.getClassCounter() || devPlan.Settings.getClassHourCounter()) {
                data = data + '<div class="col-lg-12 col-md-12 col-sm-12 col-xs-12">' + (devPlan.Settings.getActivityBell() ? Generate.activityStartStop(activity) + ' <wbr>' : '') + (devPlan.Settings.getActivityLocation() ? Generate.activityLocation(activity) + ' <wbr>' : '') + (devPlan.Settings.getClassCounter() ? Generate.activityCounter(timetable.getPositionOfActivity(activity), timetable.getMaxNumberOfOccurencesOfActivity(activity)) + ' <wbr>' : '') + (devPlan.Settings.getClassHourCounter() ? Generate.hourInformation(activity.getNumberOfSchoolLessons(), timetable.sumAllHoursOfActivity(activity), timetable.sumAllHoursOfActivity(activity, true)) + ' <wbr>' : '') + ((timetable.getParams().haveOnlyOneTutor() == false && devPlan.Settings.getActivityTutorsList()) ? Generate.activityTutorsList(activity) : '');

                data = data + '</div>';
            }
            if (timetable.getParams().haveOnlyOneGroup() == false && devPlan.Settings.getActivityGroup()) {
                data = data + '<div class="col-lg-12 col-md-12 col-sm-12 col-xs-12">' + Generate.activityGroupsList(groups) + '</div>';
            }

            data = data + '</div></li>';
            return data;
        };

        Generate.timetable = function (timetable) {
            console.log("showTimetable", timetable);
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
                            groups[groups.length] = timetable.getActivities()[j].getGroup();
                        }
                    } while(timetable.getActivities()[++j] != null && activity.getName() == timetable.getActivities()[j].getName() && activity.getEndsAtTimestamp() == timetable.getActivities()[j].getEndsAtTimestamp());

                    var indexgroup = "";
                    groups = groups.sort(function (a, b) {
                        return a.getName() >= b.getName();
                    });
                    for (var k = 0; k < groups.length; k++) {
                        indexgroup = indexgroup + ' ' + groups[k].getName();
                    }

                    if (activity.getDate() >= timetable.getDateFromDatesListByPosition(timetable.getDatePositionInDatesList(devPlan.Settings.getCurrentDate()) + (devPlan.Settings.getPage() * devPlan.Settings.getTimetablePeriod())) || devPlan.Settings.getTimetableType() == 0) {
                        if (activity.contains(devPlan.Settings.getActivityNameFilter(), indexgroup) == true) {
                            if (date != activity.getDate()) {
                                if (devPlan.Settings.getTimetablePeriod() != 0 && daysCounter >= devPlan.Settings.getTimetablePeriod() && devPlan.Settings.getTimetableType() != 0) {
                                    break;
                                }
                                daysCounter++;
                                if (date != "") {
                                    data = data + '</div></div>';
                                }
                                data = data + '<div class="day">' + Generate.dateInformation(activity) + '<div id="' + activity.getDate() + '" class="activities collapse in ">';
                                date = activity.getDate();
                            }

                            if (timetable.getActivities()[i - 1] != null && activity.getName() == timetable.getActivities()[i - 1].getName() && activity.getEndsAtTimestamp() == timetable.getActivities()[i - 1].getEndsAtTimestamp()) {
                                continue;
                            }

                            data = data + Generate.activity(timetable, activity, groups);
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
            $('.activity').popover({
                placement: 'auto',
                trigger: 'click',
                html: true
            });
        };
        Generate.dayOfWeek = [
            "Niedziela",
            "Poniedziałek",
            "Wtorek",
            "Środa",
            "Czwartek",
            "Piątek",
            "Sobota"
        ];

        Generate.month = [
            "Stycznia",
            "Lutego",
            "Marca",
            "Kwietnia",
            "Maja",
            "Czerwca",
            "Lipica",
            "Sierpnia",
            "Września",
            "Października",
            "Listopada",
            "Grudnia"
        ];
        return Generate;
    })();
    devPlan.Generate = Generate;
})(devPlan || (devPlan = {}));
//# sourceMappingURL=Generate.js.map
