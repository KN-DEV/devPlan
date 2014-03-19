var devPlan;
(function (devPlan) {
    var Settings = (function () {
        function Settings() {
        }
        Settings.getPage = function () {
            return Settings.page;
        };

        Settings.setPage = function (page) {
            if (typeof page === "undefined") { page = 0; }
            Settings.page = page;
            return Settings;
        };

        Settings.increasePage = function () {
            if (devPlan.Init.getTimetable().getDatePositionInDatesList(Settings.getCurrentDate()) != -1) {
                if (devPlan.Init.getTimetable().isValidPositionInDatesList(devPlan.Init.getTimetable().getDatePositionInDatesList(Settings.getCurrentDate()) + ((Settings.getPage() + 1) * Settings.getTimetablePeriod()))) {
                    Settings.setPage(Settings.getPage() + 1);
                }
                if (devPlan.Init.getTimetable().isValidPositionInDatesList(devPlan.Init.getTimetable().getDatePositionInDatesList(Settings.getCurrentDate()) + ((Settings.getPage() + 1) * Settings.getTimetablePeriod()) + 1)) {
                    $("button.devPlanTimetablePeriodNavigation.decrease").removeAttr("disabled");
                } else {
                    $("button.devPlanTimetablePeriodNavigation.increase").attr("disabled", "disabled");
                }
            } else {
                $("button.devPlanTimetablePeriodNavigation.increase").attr("disabled", "disabled");
            }
            return Settings;
        };

        Settings.decreasePage = function () {
            console.log(devPlan.Init.getTimetable().getDatePositionInDatesList(Settings.getCurrentDate()) + ((Settings.getPage()) * Settings.getTimetablePeriod()));

            if (devPlan.Init.getTimetable().isValidPositionInDatesList(devPlan.Init.getTimetable().getDatePositionInDatesList(Settings.getCurrentDate()) + ((Settings.getPage()) * Settings.getTimetablePeriod()))) {
                Settings.setPage(Settings.getPage() - 1);
            }

            if (devPlan.Init.getTimetable().isValidPositionInDatesList(devPlan.Init.getTimetable().getDatePositionInDatesList(Settings.getCurrentDate()) + ((Settings.getPage()) * Settings.getTimetablePeriod()))) {
                $("button.devPlanTimetablePeriodNavigation.increase").removeAttr("disabled");
            } else {
                $("button.devPlanTimetablePeriodNavigation.decrease").attr("disabled", "disabled");
            }

            return Settings;
        };

        Settings.getClassCounter = function () {
            return Settings.classCounter;
        };

        Settings.setClassCounter = function (status) {
            if (typeof status === "undefined") { status = false; }
            Settings.classCounter = status;
            if (Settings.getClassCounter() == true) {
                $("input.devPlanSettingsActivityClassCounter").attr("checked", "checked");
            } else {
                $("input.devPlanSettingsActivityClassCounter").removeAttr("checked");
            }
            return Settings;
        };

        Settings.getClassHourCounter = function () {
            return Settings.classHourCounter;
        };

        Settings.setClassHourCounter = function (status) {
            if (typeof status === "undefined") { status = false; }
            Settings.classHourCounter = status;
            if (Settings.getClassHourCounter() == true) {
                $("input.devPlanSettingsActivityClassHourCounter").attr("checked", "checked");
            }
            return Settings;
        };

        Settings.isActivityCategoryVisible = function () {
            return Settings.activityCategoryVisibility;
        };

        Settings.setCategoryVisibility = function (status) {
            if (typeof status === "undefined") { status = false; }
            Settings.activityCategoryVisibility = status;
            if (Settings.isActivityCategoryVisible() == true) {
                $("input.devPlanSettingsShowActivityCategory").attr("checked", "checked");
            }
            return Settings;
        };

        Settings.getActivityBell = function () {
            return Settings.activityBell;
        };

        Settings.setActivityBell = function (status) {
            if (typeof status === "undefined") { status = false; }
            Settings.activityBell = status;
            if (Settings.getActivityBell()) {
                $("input.devPlanSettingsActivityBell").attr("checked", "checked");
            }
            return Settings;
        };

        Settings.getActivityLocation = function () {
            return Settings.activityLocation;
        };

        Settings.setActivityLocation = function (status) {
            if (typeof status === "undefined") { status = false; }
            Settings.activityLocation = status;
            if (Settings.getActivityLocation()) {
                $("input.devPlanSettingsActivityLocation").attr("checked", "checked");
            }
            return Settings;
        };

        Settings.getActivityNote = function () {
            return Settings.activityNote;
        };

        Settings.setActivityNote = function (status) {
            if (typeof status === "undefined") { status = false; }
            Settings.activityNote = status;
            if (Settings.getActivityNote()) {
                $("input.devPlanSettingsActivityNote").attr("checked", "checked");
            }
            return Settings;
        };

        Settings.getActivityGroup = function () {
            return Settings.activityGroup;
        };

        Settings.setActivityGroup = function (status) {
            if (typeof status === "undefined") { status = false; }
            Settings.activityGroup = status;
            if (Settings.getActivityGroup()) {
                $("input.devPlanSettingsActivityGroup").attr("checked", "checked");
            }
            return Settings;
        };

        Settings.getActivityTutorsList = function () {
            return Settings.activityTutorsList;
        };

        Settings.setActivityTutorsList = function (status) {
            if (typeof status === "undefined") { status = false; }
            Settings.activityTutorsList = status;
            if (Settings.getActivityTutorsList()) {
                $("input.devPlanSettingsactivityTutorsList").attr("checked", "checked");
            }
            return Settings;
        };
        Settings.getTimetableType = function () {
            return Settings.timetableType;
        };

        Settings.setTimetableType = function (status) {
            if (typeof status === "undefined") { status = 0; }
            Settings.timetableType = status;
            if (Settings.getTimetableType() == 0) {
                $("input.devPlanSettingsTimetablePeriod").attr("disabled", "disabled");
                $("button.devPlanTimetablePeriodNavigation").attr("disabled", "disabled");
            } else {
                $("input.devPlanSettingsTimetablePeriod").removeAttr("disabled");
                $("button.devPlanTimetablePeriodNavigation").removeAttr("disabled");
            }
            $('input.devPlanSettingsTimetableType[value=\"' + Settings.getTimetableType() + '\"]').attr("checked", "checked");
            return Settings;
        };
        Settings.getTimetablePeriod = function () {
            return +Settings.timetablePeriod;
        };

        Settings.setTimetablePeriod = function (status) {
            if (typeof status === "undefined") { status = 0; }
            Settings.timetablePeriod = status;
            Settings.setPage();
            $('input.devPlanSettingsTimetablePeriod[value=\"' + devPlan.Settings.getTimetablePeriod() + '\"]').attr("checked", "checked");
            return Settings;
        };

        Settings.getTimetableRedirect = function () {
            return Settings.timetableRedirect;
        };

        Settings.setTimetableRedirect = function (status) {
            if (typeof status === "undefined") { status = false; }
            Settings.timetableRedirect = status;
            if (Settings.getTimetableRedirect()) {
                $("input.devPlanSettingsTimetableRedirect").attr("checked", "checked");
            }
            return Settings;
        };

        Settings.getTimetableParams = function () {
            return Settings.timetableParams;
        };

        Settings.setTimetableParams = function (status) {
            if (typeof status === "undefined") { status = new devPlan.Params(); }
            Settings.timetableParams = status;
            return Settings;
        };

        Settings.getActivityNameFilter = function () {
            return Settings.activityNameFilter;
        };

        Settings.setActivityNameFilter = function (status) {
            if (typeof status === "undefined") { status = ""; }
            Settings.activityNameFilter = status;
            $('input.devPlanSettingsActivityNameFilter').attr('value', Settings.getActivityNameFilter());
            return Settings;
        };

        Settings.load = function () {
            $.cookie.json = true;
            var data = $.cookie('devPlan.Settings');
            console.log(data);
            if (data) {
                Settings.setClassCounter(data.classCounter);
                Settings.setClassHourCounter(data.classHourCounter);
                Settings.setCategoryVisibility(data.activityCategory);
                Settings.setActivityBell(data.activityBell);
                Settings.setActivityLocation(data.activityLocation);
                Settings.setActivityNote(data.activityNote);
                Settings.setActivityGroup(data.activityGroup);
                Settings.setActivityTutorsList(data.activityTutorsList);
                Settings.setTimetableType(data.timetableType);
                Settings.setTimetablePeriod(data.timetablePeriod);
                Settings.setTimetableRedirect(data.timetableRedirect);
            } else {
                Settings.setClassCounter(Settings.getClassCounter());
                Settings.setClassHourCounter(Settings.getClassHourCounter());
                Settings.setCategoryVisibility(Settings.isActivityCategoryVisible());
                Settings.setActivityBell(Settings.getActivityBell());
                Settings.setActivityLocation(Settings.getActivityBell());
                Settings.setActivityNote(Settings.getActivityNote());
                Settings.setActivityGroup(Settings.getActivityGroup());
                Settings.setActivityTutorsList(Settings.getActivityTutorsList());
                Settings.setTimetableType(Settings.getTimetableType());
                Settings.setTimetablePeriod(Settings.getTimetablePeriod());
                Settings.setTimetableRedirect(Settings.getTimetableRedirect());
            }

            var data = $.cookie('devPlan.Params');
            if (data) {
                Settings.setTimetableParams(new devPlan.Params(data.group_id, data.tutor_id, data.place_id));
            }
            return Settings;
        };

        Settings.loadTimetableParam = function () {
            Settings.getTimetableParams().getGroups().forEach(function (index, item) {
                for (var i = 0; i < devPlan.Init.getGroups().length; i++) {
                    if (devPlan.Init.getGroups()[i].getId() == index) {
                        Settings.addTimetableParam(devPlan.Init.getGroups()[i].getName());
                    }
                }
            });
            Settings.getTimetableParams().getTutors().forEach(function (index, item) {
                for (var i = 0; i < devPlan.Init.getTutors().length; i++) {
                    if (devPlan.Init.getTutors()[i].getId() == index) {
                        Settings.addTimetableParam(devPlan.Init.getTutors()[i].getName());
                    }
                }
            });
            Settings.getTimetableParams().getPlaces().forEach(function (index, item) {
                for (var i = 0; i < devPlan.Init.getPlaces().length; i++) {
                    if (devPlan.Init.getPlaces()[i].getId() == index) {
                        Settings.addTimetableParam(devPlan.Init.getPlaces()[i].getLocation());
                    }
                }
            });
        };

        Settings.save = function () {
            var data = {
                classCounter: Settings.getClassCounter(),
                classHourCounter: Settings.getClassHourCounter(),
                activityCategory: Settings.isActivityCategoryVisible(),
                activityBell: Settings.getActivityBell(),
                activityLocation: Settings.getActivityLocation(),
                activityNote: Settings.getActivityNote(),
                activityGroup: Settings.getActivityGroup(),
                activityTutorsList: Settings.getActivityTutorsList(),
                timetableType: Settings.getTimetableType(),
                timetablePeriod: Settings.getTimetablePeriod(),
                timetableRedirect: Settings.getTimetableRedirect(),
                timetableParams: Settings.getTimetableParams()
            };
            $.cookie.json = true;
            $.cookie('devPlan.Settings', data, { expires: 1000 });
            return Settings;
        };

        Settings.saveTimetable = function () {
            $.cookie.json = true;
            $.cookie('devPlan.Params', Settings.getTimetableParams(), { expires: 180 });
            return Settings;
        };

        Settings.getUrlParam = function (key) {
            var result = new RegExp(key + "=([^&]*)", "i").exec(window.location.search.replace(/\+/g, " "));
            return result && decodeURIComponent(result[1]) || "";
        };

        Settings.transformDateToDateStamp = function (date) {
            if (typeof date === "undefined") { date = new Date(); }
            var month = "";
            if (date.getMonth() <= 9) {
                month = '0' + (date.getMonth() + 1);
            } else {
                month = date.getMonth().toString();
            }
            ;
            var day = "";
            if (date.getDate() <= 9) {
                day = '0' + date.getDate();
            } else {
                day = date.getDate().toString();
            }
            ;
            return date.getFullYear() + '-' + month + '-' + day;
        };

        Settings.getCurrentDate = function (daysToAdd) {
            if (typeof daysToAdd === "undefined") { daysToAdd = 0; }
            var date = new Date();
            date.setDate(date.getDate() + daysToAdd);
            return Settings.transformDateToDateStamp(date);
        };

        Settings.addTimetableParam = function (item) {
            var g = devPlan.Init.searchGroupId(item);
            var t = devPlan.Init.searchTutorId(item);
            var p = devPlan.Init.searchPlaceId(item);
            if (g > 0 && t == 0 && p == 0) {
                $(".devPlanParams").append(devPlan.Generate.devPlanParamButton(item, g, "g"));
                Settings.setTimetableParams(Settings.getTimetableParams().addGroup(g));
            }
            if (g == 0 && t > 0 && p == 0) {
                $(".devPlanParams").append(devPlan.Generate.devPlanParamButton(item, t, "t"));
                Settings.setTimetableParams(Settings.getTimetableParams().addTutor(t));
            }
            if (g == 0 && t == 0 && p > 0) {
                $(".devPlanParams").append(devPlan.Generate.devPlanParamButton(item, p, "p"));
                Settings.setTimetableParams(Settings.getTimetableParams().addPlace(p));
            }
            Settings.devPlanUrl();
            $('.devPlanQrCodeImg').empty().qrcode('http://devplan.uek.krakow.pl/timetable.html?timetable=' + Settings.getTimetableParams().toString());
        };

        Settings.removeTimetableParam = function (item) {
            var item = $(item);
            if (item.attr("data-type") == "g") {
                Settings.setTimetableParams(Settings.getTimetableParams().removeGroup(parseInt(item.attr("data-value"))));
            }
            if (item.attr("data-type") == "t") {
                Settings.setTimetableParams(Settings.getTimetableParams().removeTutor(parseInt(item.attr("data-value"))));
            }
            if (item.attr("data-type") == "p") {
                Settings.setTimetableParams(Settings.getTimetableParams().removePlace(parseInt(item.attr("data-value"))));
            }
            item.parent().remove();
            Settings.devPlanUrl();
            $('.devPlanQrCodeImg').empty().qrcode('http://devplan.uek.krakow.pl/timetable.html?timetable=' + Settings.getTimetableParams().toString());
        };

        Settings.devPlanUrl = function () {
            var devPlanUrl = $(".devPlanUrl").empty();
            if (!Settings.getTimetableParams().isEmpty()) {
                devPlanUrl.append('http://devplan.uek.krakow.pl/timetable.html?timetable=<wbr>' + Settings.getTimetableParams().toString());
            }
        };
        Settings.classCounter = false;

        Settings.classHourCounter = false;

        Settings.activityCategoryVisibility = true;

        Settings.activityBell = true;

        Settings.activityLocation = true;

        Settings.activityNote = true;

        Settings.activityGroup = true;

        Settings.activityTutorsList = true;

        Settings.timetableType = 1;

        Settings.timetablePeriod = 0;

        Settings.timetableRedirect = false;

        Settings.timetableParams = new devPlan.Params();

        Settings.activityNameFilter = "";

        Settings.page = 0;
        return Settings;
    })();
    devPlan.Settings = Settings;
})(devPlan || (devPlan = {}));
//# sourceMappingURL=Settings.js.map
