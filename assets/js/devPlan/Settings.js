var devPlan;
(function (devPlan) {
    var Settings = (function () {
        function Settings() {
        }
        Settings.getClassCounter = function () {
            return Settings.classCounter;
        };

        Settings.setClassCounter = function (status) {
            if (typeof status === "undefined") { status = false; }
            Settings.classCounter = status;
            return Settings;
        };

        Settings.getClassHourCounter = function () {
            return Settings.classHourCounter;
        };

        Settings.setClassHourCounter = function (status) {
            if (typeof status === "undefined") { status = false; }
            Settings.classHourCounter = status;
            return Settings;
        };

        Settings.getActivityCategory = function () {
            return Settings.activityCategory;
        };

        Settings.setActivityCategory = function (status) {
            if (typeof status === "undefined") { status = false; }
            Settings.activityCategory = status;
            return Settings;
        };

        Settings.getActivityBell = function () {
            return Settings.activityBell;
        };

        Settings.setActivityBell = function (status) {
            if (typeof status === "undefined") { status = false; }
            Settings.activityBell = status;
            return Settings;
        };

        Settings.getActivityLocation = function () {
            return Settings.activityLocation;
        };

        Settings.setActivityLocation = function (status) {
            if (typeof status === "undefined") { status = false; }
            Settings.activityLocation = status;
            return Settings;
        };

        Settings.getActivityNote = function () {
            return Settings.activityNote;
        };

        Settings.setActivityNote = function (status) {
            if (typeof status === "undefined") { status = false; }
            Settings.activityNote = status;
            return Settings;
        };

        Settings.getActivityGroup = function () {
            return Settings.activityGroup;
        };

        Settings.setActivityGroup = function (status) {
            if (typeof status === "undefined") { status = false; }
            Settings.activityGroup = status;
            return Settings;
        };

        Settings.getActivityTutor = function () {
            return Settings.activityTutor;
        };

        Settings.setActivityTutor = function (status) {
            if (typeof status === "undefined") { status = false; }
            Settings.activityTutor = status;
            return Settings;
        };
        Settings.getTimetableType = function () {
            return Settings.timetableType;
        };

        Settings.setTimetableType = function (status) {
            if (typeof status === "undefined") { status = 0; }
            Settings.timetableType = status;
            return Settings;
        };
        Settings.getTimetablePeriod = function () {
            return Settings.timetablePeriod;
        };

        Settings.setTimetablePeriod = function (status) {
            if (typeof status === "undefined") { status = 0; }
            Settings.timetablePeriod = status;
            return Settings;
        };

        Settings.getDevPlanRedirect = function () {
            return Settings.devPlanRedirect;
        };

        Settings.setDevPlanRedirect = function (status) {
            if (typeof status === "undefined") { status = false; }
            Settings.devPlanRedirect = status;
            return Settings;
        };

        Settings.getTimetableParams = function () {
            return Settings.timetableParams;
        };

        Settings.setTimetableParams = function (status) {
            if (typeof status === "undefined") { status = new Cash.Params(); }
            Settings.timetableParams = status;
            return Settings;
        };
        Settings.getActivityNameFilter = function () {
            return Settings.activityNameFilter;
        };

        Settings.setActivityNameFilter = function (status) {
            if (typeof status === "undefined") { status = ""; }
            Settings.activityNameFilter = status;
            return Settings;
        };

        Settings.load = function () {
            $.cookie.json = true;
            var data = $.cookie('devPlan.Settings');
            if (data) {
                Settings.setClassCounter(data.classCounter);
                Settings.setClassHourCounter(data.classHourCounter);
                Settings.setActivityCategory(data.activityCategory);
                Settings.setActivityBell(data.activityBell);
                Settings.setActivityLocation(data.activityLocation);
                Settings.setActivityNote(data.activityNote);
                Settings.setActivityGroup(data.activityGroup);
                Settings.setActivityTutor(data.activityTutor);
                Settings.setTimetableType(data.timetableType);
                Settings.setTimetablePeriod(data.timetablePeriod);
                Settings.setDevPlanRedirect(data.devPlanRedirect);
            }
            var data = $.cookie('devPlan.Params');
            if (data) {
                Settings.setTimetableParams(new Cash.Params(data.group_id, data.tutor_id, data.place_id));
            }
            if (Settings.getClassCounter()) {
                $("#classCounter").attr("checked", "checked");
            }
            if (Settings.getClassHourCounter()) {
                $("#classHourCounter").attr("checked", "checked");
            }
            if (Settings.getActivityCategory()) {
                $("#activityCategory").attr("checked", "checked");
            }
            if (Settings.getActivityBell()) {
                $("#activityBell").attr("checked", "checked");
            }
            if (Settings.getActivityLocation()) {
                $("#activityLocation").attr("checked", "checked");
            }
            if (Settings.getActivityNote()) {
                $("#activityNote").attr("checked", "checked");
            }
            if (Settings.getActivityGroup()) {
                $("#activityGroup").attr("checked", "checked");
            }
            if (Settings.getActivityTutor()) {
                $("#activityTutor").attr("checked", "checked");
            }
            if (Settings.getDevPlanRedirect()) {
                $("#devPlanRedirect").attr("checked", "checked");
            }
            $('#timetableType' + Settings.getTimetableType()).attr("checked", "checked");
            $('#timetablePeriod' + Settings.getTimetablePeriod()).attr("checked", "checked");

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
                activityCategory: Settings.getActivityCategory(),
                activityBell: Settings.getActivityBell(),
                activityLocation: Settings.getActivityLocation(),
                activityNote: Settings.getActivityNote(),
                activityGroup: Settings.getActivityGroup(),
                activityTutor: Settings.getActivityTutor(),
                timetableType: Settings.getTimetableType(),
                timetablePeriod: Settings.getTimetablePeriod(),
                devPlanRedirect: Settings.getDevPlanRedirect(),
                timetableParams: Settings.getTimetableParams(),
                activityNameFilter: ''
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

        Settings.getCurrentDate = function () {
            var date = new Date();
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

        Settings.addTimetableParam = function (item) {
            var g = devPlan.Init.searchGroupId(item);
            var t = devPlan.Init.searchTutorId(item);
            var p = devPlan.Init.searchPlaceId(item);

            if (g > 0 && t == 0 && p == 0) {
                $(".devPlanParams").append('<button title="' + item + '" id="g' + g + '" class="devPlanParam btn btn-xs btn-primary" onclick="devPlan.Settings.removeTimetableParam(this);" value="' + g + '" type="g">' + ((item.length > 50) ? item.substr(0, 50) + '...' : item) + '' + '</button>');
                Settings.setTimetableParams(Settings.getTimetableParams().addGroup(g));
            }
            if (g == 0 && t > 0 && p == 0) {
                $(".devPlanParams").append('<button title="' + item + '"  id="t' + t + '" class="devPlanParam btn btn-xs btn-success" onclick="devPlan.Settings.removeTimetableParam(this);" value="' + t + '" type="t">' + ((item.length > 50) ? item.substr(0, 50) + '...' : item) + '' + '</button>');
                Settings.setTimetableParams(Settings.getTimetableParams().addTutor(t));
            }
            if (g == 0 && t == 0 && p > 0) {
                $(".devPlanParams").append('<button  title="' + item + '"  id="p' + p + '" class="devPlanParam btn btn-xs btn-info" onclick="devPlan.Settings.removeTimetableParam(this);" value="' + p + '" type="p">' + ((item.length > 50) ? item.substr(0, 50) + '...' : item) + '' + '</button>');
                Settings.setTimetableParams(Settings.getTimetableParams().addPlace(p));
            }
            if (Settings.getTimetableParams().isEmpty()) {
                $(".devPlanUrl").empty();
            } else {
                $(".devPlanUrl").empty().append('http://devplan.uek.krakow.pl/timetable.html?timetable=<wbr>' + Settings.getTimetableParams().toString());
            }
            $('.devPlanQrCodeImg').empty().qrcode('http://devplan.uek.krakow.pl/timetable.html?timetable=' + Settings.getTimetableParams().toString());
        };
        Settings.removeTimetableParam = function (item) {
            var item = $(item);
            if (item.attr("type") == "g") {
                Settings.setTimetableParams(Settings.getTimetableParams().removeGroup(parseInt(item.attr("value"))));
            }
            if (item.attr("type") == "t") {
                Settings.setTimetableParams(Settings.getTimetableParams().removeTutor(parseInt(item.attr("value"))));
            }
            if (item.attr("type") == "p") {
                Settings.setTimetableParams(Settings.getTimetableParams().removePlace(parseInt(item.attr("value"))));
            }

            item.remove();
            if (Settings.getTimetableParams().isEmpty()) {
                $(".devPlanUrl").empty();
            } else {
                $(".devPlanUrl").empty().append('http://devplan.uek.krakow.pl/timetable.html?timetable=<wbr>' + Settings.getTimetableParams().toString());
            }
            $('.devPlanQrCodeImg').empty().qrcode('http://devplan.uek.krakow.pl/timetable.html?timetable=' + Settings.getTimetableParams().toString());
        };
        Settings.classCounter = false;

        Settings.classHourCounter = false;

        Settings.activityCategory = true;

        Settings.activityBell = true;

        Settings.activityLocation = true;

        Settings.activityNote = true;

        Settings.activityGroup = true;

        Settings.activityTutor = true;

        Settings.timetableType = 1;

        Settings.timetablePeriod = 0;

        Settings.timetableParams = new Cash.Params();

        Settings.activityNameFilter = "";

        Settings.devPlanRedirect = false;
        return Settings;
    })();
    devPlan.Settings = Settings;
})(devPlan || (devPlan = {}));
//# sourceMappingURL=Settings.js.map
