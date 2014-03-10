var devPlan;
(function (devPlan) {
    var Generate = (function () {
        function Generate() {
        }
        Generate.dateInformation = function (activity) {
            return '<li class="list-group-item list-group-item-info date"><p id="' + activity.getDate() + '" class="h4" >' + '<a data-toggle="collapse" data-parent="#accordion" href="#' + activity.getDate() + '.activities" class="">' + (activity.getDayOfWeek() + ', ' + activity.getDate()) + '' + '</a>' + '<a data-toggle="collapse" data-parent="#accordion" href="#' + activity.getDate() + '.activities" class="pull-right"><i class="fa fa-fw fa-chevron-up animate-transform"></i></a>' + '</p></li>';
        };

        Generate.noteInformation = function (activity) {
            if (devPlan.Settings.getActivityNote() && activity.getNotes()) {
                return '<p class="note" title="Notatka dotycząca zajęć">Notatka: ' + activity.getNotes() + '</p>';
            }
            return '';
        };

        Generate.nameInformation = function (activity) {
            return '<span class="name">' + (activity.getName().length != 0 ? activity.getName() : '&nbsp;') + '</span>';
        };

        Generate.bellInformation = function (activity) {
            if (devPlan.Settings.getActivityBell()) {
                return '<span class="bell" title="Zajęcia rozpoczynają się o: ' + activity.getStartsAt() + ' i kończą o ' + activity.getEndsAt() + '">' + '<i class="fa fa-fw fa-bell"></i>' + activity.getStartsAt() + " - " + activity.getEndsAt() + '</span>';
            }
            return '';
        };

        Generate.categoryInformation = function (activity) {
            if (devPlan.Settings.getActivityCategory()) {
                var color = "";
                switch (activity.getCategory()) {
                    case "wykład":
                        color = "warning";
                        break;
                    case "wykład do wyboru":
                        color = "warning";
                        break;
                    case "lektorat":
                        color = "success";
                        break;
                    case "ćwiczenia":
                        color = "primary";
                        break;
                    case "egzamin":
                        color = "danger";
                        break;
                    default:
                        color = "danger";
                        break;
                }

                return '<span class="label label-' + color + ' category" title="Typ zajęć">' + '<i class="fa fa-fw fa-tag"></i>' + activity.getCategory() + '</span>';
            }
            return '';
        };

        Generate.locationInformation = function (activity) {
            if (devPlan.Settings.getActivityLocation() && activity.getPlace().getLocation().length > 0) {
                return '<span  title="Kliknij aby zobaczyć devPlan: ' + activity.getPlace().getLocation() + '"><i class="fa fa-fw fa-map-marker"></i>' + '<a class="location" href="timetable.html?timetable=p' + activity.getPlace().getId() + '">' + activity.getPlace().getLocation() + '</a>' + '</span>';
            }
            return '';
        };

        Generate.activityCounter = function (min, max) {
            if (devPlan.Settings.getClassCounter()) {
                return '<span class="label label-info counter" title="Zajęcia z kolei: ' + min + '"><i class="fa fa-fw fa-info-circle"></i>' + min + ' / ' + max + '</span><wbr>';
            } else {
                return '';
            }
        };

        Generate.hourInformation = function (value, have, all) {
            if (devPlan.Settings.getClassHourCounter()) {
                return '<span class="label label-default hour" title="Ilość jednostek lekcyjnych:"><i class="fa fa-fw fa-clock-o"></i>' + ((have - value) + 1) + ' - ' + have + ' / ' + all + '</span> ';
            }
            return '';
        };

        Generate.tutorInformation = function (activity) {
            if (devPlan.Settings.getActivityTutor()) {
                return (activity.getTutor().getMoodleUrl() != null ? '<a class="tutor" href="' + activity.getTutor().getMoodleUrl() + '" title=" ' + activity.getTutor().getName() + ' - Wizytówka E-Uczelna "><i class="fa fa-globe fa-fw"></i></a>' : "") + '<a class="tutor" href="timetable.html?timetable=t' + activity.getTutor().id + '" title="Kliknij aby zobaczyć devPlan: ' + activity.getTutor().getName() + '">' + activity.getTutor().getName() + '</a>';
            }
            return '';
        };
        return Generate;
    })();
    devPlan.Generate = Generate;
})(devPlan || (devPlan = {}));
//# sourceMappingURL=Generate.js.map
