var Cash;
(function (Cash) {
    

    var Group = (function () {
        function Group(object) {
            if (typeof object === "undefined") { object = { id: 0, name: "" }; }
            this.id = 0;
            this.name = "";
            this.setId((object == null) ? 0 : object.id);
            this.setName((object == null) ? "" : object.name);
        }
        Group.prototype.getId = function () {
            return this.id;
        };

        Group.prototype.setId = function (id) {
            if (typeof id === "undefined") { id = 0; }
            this.id = id;
        };

        Group.prototype.getName = function () {
            return this.name;
        };

        Group.prototype.setName = function (name) {
            if (typeof name === "undefined") { name = ""; }
            this.name = name;
        };
        return Group;
    })();
    Cash.Group = Group;
})(Cash || (Cash = {}));
var Cash;
(function (Cash) {
    var Tutor = (function () {
        function Tutor(object) {
            if (typeof object === "undefined") { object = { id: 0, name: "", moodle_url: "" }; }
            this.id = 0;
            this.name = "";
            this.moodle_url = "";
            this.setId((object.id == null) ? 0 : object.id);
            this.setName((object.name == null) ? "" : object.name);
            this.setMoodleUrl((object.moodle_url == null) ? "" : object.moodle_url);
        }
        Tutor.prototype.getId = function () {
            return this.id;
        };

        Tutor.prototype.setId = function (id) {
            if (typeof id === "undefined") { id = 0; }
            this.id = id;
        };

        Tutor.prototype.getName = function () {
            return this.name;
        };

        Tutor.prototype.setName = function (name) {
            if (typeof name === "undefined") { name = ""; }
            this.name = name;
        };

        Tutor.prototype.getMoodleUrl = function () {
            return this.moodle_url;
        };

        Tutor.prototype.setMoodleUrl = function (moodleUrl) {
            this.moodle_url = moodleUrl;
        };
        return Tutor;
    })();
    Cash.Tutor = Tutor;
})(Cash || (Cash = {}));
var Cash;
(function (Cash) {
    var Place = (function () {
        function Place(object) {
            if (typeof object === "undefined") { object = { id: 0, location: "" }; }
            this.id = 0;
            this.location = "";
            this.setId((object == null) ? 0 : object.id);
            this.setLocation((object == null) ? "" : object.location);
        }
        Place.prototype.getId = function () {
            return this.id;
        };

        Place.prototype.setId = function (id) {
            this.id = id;
        };

        Place.prototype.getLocation = function () {
            return this.location;
        };

        Place.prototype.setLocation = function (location) {
            this.location = location;
        };
        return Place;
    })();
    Cash.Place = Place;
})(Cash || (Cash = {}));
var Cash;
(function (Cash) {
    var Activity = (function () {
        function Activity(object) {
            if (typeof object === "undefined") { object = {
                category: "",
                date: "",
                day_of_week: "",
                ends_at: "",
                ends_at_timestamp: 0,
                group: null,
                id: 0,
                name: "",
                notes: "",
                place: null,
                starts_at: "",
                starts_at_timestamp: 0,
                state: 0,
                tutor: null
            }; }
            this.category = "";
            this.date = "";
            this.day_of_week = "";
            this.ends_at = "";
            this.ends_at_timestamp = 0;
            this.group = null;
            this.id = 0;
            this.name = "";
            this.notes = "";
            this.place = null;
            this.starts_at = "";
            this.starts_at_timestamp = 0;
            this.state = 0;
            this.tutor = null;
            this.setCategory(object.category);
            this.setDate(object.date);
            this.setDayOfWeek(object.day_of_week);
            this.setEndsAt(object.ends_at);
            this.setEndsAtTimestamp(object.ends_at_timestamp);
            this.setGroup(object.group);
            this.setId(object.id);
            this.setName(object.name);
            this.setNotes(object.notes);
            this.setPlace(object.place);
            this.setStartsAt(object.starts_at);
            this.setStartsAtTimestamp(object.starts_at_timestamp);
            this.setState(object.state);
            this.setTutor(object.tutor);
        }
        Activity.prototype.getCategory = function () {
            return this.category;
        };

        Activity.prototype.setCategory = function (category) {
            this.category = category;
        };

        Activity.prototype.getDate = function () {
            return this.date;
        };

        Activity.prototype.setDate = function (date) {
            this.date = date;
        };

        Activity.prototype.getDayOfWeek = function () {
            return this.day_of_week;
        };

        Activity.prototype.setDayOfWeek = function (day_of_week) {
            this.day_of_week = day_of_week;
        };

        Activity.prototype.getEndsAt = function () {
            return this.ends_at;
        };

        Activity.prototype.setEndsAt = function (ends_at) {
            this.ends_at = ends_at;
        };

        Activity.prototype.getEndsAtTimestamp = function () {
            return this.ends_at_timestamp;
        };

        Activity.prototype.setEndsAtTimestamp = function (ends_at_timestamp) {
            this.ends_at_timestamp = ends_at_timestamp;
        };

        Activity.prototype.getGroup = function () {
            return this.group;
        };

        Activity.prototype.setGroup = function (group) {
            this.group = new Cash.Group(group);
        };

        Activity.prototype.getId = function () {
            return this.id;
        };

        Activity.prototype.setId = function (id) {
            this.id = id;
        };

        Activity.prototype.getName = function () {
            return this.name;
        };

        Activity.prototype.setName = function (name) {
            this.name = name;
        };

        Activity.prototype.getNotes = function () {
            return this.notes;
        };

        Activity.prototype.setNotes = function (notes) {
            this.notes = notes;
        };

        Activity.prototype.getPlace = function () {
            return this.place;
        };

        Activity.prototype.setPlace = function (place) {
            this.place = new Cash.Place(place);
        };

        Activity.prototype.getStartsAt = function () {
            return this.starts_at;
        };

        Activity.prototype.setStartsAt = function (starts_at) {
            this.starts_at = starts_at;
        };

        Activity.prototype.getStartsAtTimestamp = function () {
            return this.starts_at_timestamp;
        };

        Activity.prototype.setStartsAtTimestamp = function (starts_at_timestamp) {
            this.starts_at_timestamp = starts_at_timestamp;
        };

        Activity.prototype.getState = function () {
            return this.state;
        };

        Activity.prototype.setState = function (state) {
            this.state = state;
        };

        Activity.prototype.getTutor = function () {
            return this.tutor;
        };

        Activity.prototype.setTutor = function (tutor) {
            if (tutor != null) {
                this.tutor = new Cash.Tutor(tutor);
            } else {
                this.tutor = new Cash.Tutor();
            }
        };

        Activity.prototype.getNumberOfSchoolLessons = function () {
            var counter = 0;
            for (var i = 0; i <= Cash.Activity.alarms.length; i++) {
                if (Cash.Activity.alarms[i] == this.getStartsAt()) {
                    for (var j = i; j <= Cash.Activity.alarms.length; j++) {
                        if (Cash.Activity.alarms[j] <= this.getEndsAt()) {
                            counter++;
                        }
                    }
                    break;
                }
            }
            return counter / 2;
        };
        Activity.alarms = [
            "07:50", "08:35", "08:45", "09:30", "09:35", "10:20",
            "10:30", "11:15", "11:20", "12:05", "12:15", "13:00",
            "13:05", "13:50", "14:00", "14:45", "14:50", "15:35",
            "15:40", "16:25", "16:30", "17:15", "17:20", "18:05",
            "18:10", "18:55", "19:00", "19:45", "19:50", "20:35"
        ];
        return Activity;
    })();
    Cash.Activity = Activity;
})(Cash || (Cash = {}));
var Cash;
(function (Cash) {
    

    var Params = (function () {
        function Params() {
            this.group_id = [];
            this.tutor_id = [];
            this.place_id = [];
        }
        Params.prototype.toString = function () {
            var data = "";
            if (this.group_id != null) {
                for (var i = 0; i < this.group_id.length; i++) {
                    data = data + this.group_id[i];
                }
            }
            if (this.tutor_id != null) {
                for (var i = 0; i < this.tutor_id.length; i++) {
                    data = data + this.tutor_id[i];
                }
            }
            return data;
        };
        return Params;
    })();
    Cash.Params = Params;
})(Cash || (Cash = {}));
var Cash;
(function (Cash) {
    

    var TimetableStatistics = (function () {
        function TimetableStatistics() {
            this.couter = [];
        }
        return TimetableStatistics;
    })();
    Cash.TimetableStatistics = TimetableStatistics;

    var Timetable = (function () {
        function Timetable(object) {
            if (typeof object === "undefined") { object = { _id: "", access_url: "", params: new Cash.Params(), activities: [] }; }
            this._id = "";
            this.access_url = "";
            this.params = new Cash.Params();
            this.activities = [];
            this.setId(object._id);
            this.setAccessUrl(object.access_url);
            this.setParams(object.params);
            this.setActivities(object.activities);
        }
        Timetable.prototype.getId = function () {
            return this._id;
        };

        Timetable.prototype.setId = function (id) {
            this._id = id;
        };
        Timetable.prototype.getAccessUrl = function () {
            return this.access_url;
        };
        Timetable.prototype.setAccessUrl = function (access_url) {
            this.access_url = access_url;
        };

        Timetable.prototype.getParams = function () {
            return this.params;
        };
        Timetable.prototype.setParams = function (params) {
            this.params = params;
        };
        Timetable.prototype.getActivities = function () {
            return this.activities;
        };

        Timetable.prototype.setActivities = function (activities) {
            if (activities.length > 0) {
                for (var i = 0; i < activities.length; i++) {
                    this.activities[this.getActivities().length] = new Cash.Activity(activities[i]);
                }
                this.activities = this.getActivities().sort(function (a, b) {
                    return a.getStartsAtTimestamp() - b.getStartsAtTimestamp();
                });
            }
        };
        return Timetable;
    })();
    Cash.Timetable = Timetable;
})(Cash || (Cash = {}));
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

        Api.getTimetable = function (query) {
            return $.ajax({
                url: Cash.Api.host + "timetables/" + query,
                type: "GET",
                dataType: 'json'
            });
        };
        Api.host = "http://cash.dev.uek.krakow.pl/v0_1/";
        return Api;
    })();
    Cash.Api = Api;
})(Cash || (Cash = {}));
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
        Settings.getTimetableParams = function () {
            return Settings.timetableParams;
        };

        Settings.setTimetableParams = function (status) {
            if (typeof status === "undefined") { status = { tutor_id: [], place_id: [], group_id: [] }; }
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
                Settings.setTimetableParams(data.timetableParams);
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
            $('#timetableType_' + Settings.getTimetableType()).attr("checked", "checked");
            $('#activityNameFilter').attr('value', Settings.getActivityNameFilter());

            return Settings;
        };
        Settings.loadTimetableParam = function () {
            Settings.timetableParams.group_id.forEach(function (value) {
                Settings.addTimetableParam(devPlan.Init.getGroups()[--value].getName());
            });
            Settings.timetableParams.tutor_id.forEach(function (value) {
                Settings.addTimetableParam(devPlan.Init.getTutors()[--value].getName());
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
                timetableParams: Settings.getTimetableParams(),
                activityNameFilter: ''
            };
            $.cookie.json = true;
            $.cookie('devPlan.Settings', data);
            return Settings;
        };

        Settings.getUrlParam = function (key) {
            var result = new RegExp(key + "=([^&]*)", "i").exec(window.location.search.replace(/\+/g, " "));
            return result && decodeURIComponent(result[1]) || "";
        };

        Settings.getCurrentDate = function () {
            var date = new Date();
            var month = date.getMonth() + 1;
            if (month <= 9) {
                return date.getFullYear() + '-0' + month + '-' + date.getDate();
            } else {
                return date.getFullYear() + '-' + month + '-' + date.getDate();
            }
        };

        Settings.addTimetableParam = function (item) {
            var g = devPlan.Init.searchGroup(item);
            var t = devPlan.Init.searchTutor(item);
            var test = true;
            if (g > 0 && t == null) {
                $("#devPlanParams").append('<button id="g' + g + '" class="devPlanParam btn btn-xs btn-info" onclick="devPlan.Settings.removeTimetableParam(this);" value="' + g + '" type="g">' + item + '' + '</button><wbr> ');

                for (var i = 0; i < Settings.timetableParams.group_id.length; i++) {
                    if (Settings.timetableParams.group_id[i] == g) {
                        test = false;
                    }
                }
                if (test) {
                    Settings.timetableParams.group_id[Settings.timetableParams.group_id.length] = g;
                }
            }
            if (t > 0 && g == null) {
                for (var i = 0; i < Settings.timetableParams.tutor_id.length; i++) {
                    if (Settings.timetableParams.tutor_id[i] == t) {
                        test = false;
                    }
                }
                $("#devPlanParams").append('<button id="t' + t + '" class="devPlanParam btn btn-xs btn-success" onclick="devPlan.Settings.removeTimetableParam(this);" value="' + t + '" type="t">' + item + '' + '</button><wbr> ');

                if (test) {
                    Settings.timetableParams.tutor_id[Settings.timetableParams.tutor_id.length] = t;
                }
            }

            console.log(Settings.timetableParams);
        };
        Settings.removeTimetableParam = function (item) {
            var newTimetableParams = new Cash.Params();
            var item = $(item);
            console.log(item.attr("value"), item.attr("type"));
            if (item.attr("type") == "g") {
                for (var i = 0; i < Settings.timetableParams.group_id.length; i++) {
                    if (Settings.timetableParams.group_id[i] != parseInt(item.attr("value"))) {
                        newTimetableParams.group_id[newTimetableParams.group_id.length] = Settings.timetableParams.group_id[i];
                    }
                }
            }
            if (item.attr("type") == "t") {
                for (var i = 0; i < Settings.timetableParams.tutor_id.length; i++) {
                    if (Settings.timetableParams.tutor_id[i] != parseInt(item.attr("value"))) {
                        newTimetableParams.tutor_id[newTimetableParams.tutor_id.length] = Settings.timetableParams.tutor_id[i];
                    }
                }
            }
            Settings.timetableParams = newTimetableParams;
            item.remove();

            console.log(Settings.timetableParams);
        };
        Settings.setDevPlan = function () {
            $(".devPlanTypeahead").each(function (index) {
            });
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

        Settings.timetableParams = new Cash.Params();

        Settings.activityNameFilter = "";
        return Settings;
    })();
    devPlan.Settings = Settings;
})(devPlan || (devPlan = {}));
var devPlan;
(function (devPlan) {
    var Generate = (function () {
        function Generate() {
        }
        Generate.dateInformation = function (activity) {
            return '<li class="list-group-item list-group-item-info date">' + '<p id="' + activity.getDate() + '" class="h5" ><strong>' + activity.getDayOfWeek() + ', ' + activity.getDate() + '' + '</strong></p>' + '</li>';
        };

        Generate.noteInformation = function (activity) {
            if (devPlan.Settings.getActivityNote() && activity.getNotes()) {
                return '<p class="h6" title="Notatka dotycząca zajęć">Notatka: ' + activity.getNotes() + '</p>';
            }
            return '';
        };

        Generate.nameInformation = function (activity) {
            if (activity.getName().length > 0) {
                return '<strong>' + '<span title="Przedmiot: ' + activity.getName() + '">' + activity.getName() + '</span>' + '</strong>';
            }
            return '<strong>' + '<span title="Przedmiot: ' + activity.getName() + '">' + 'Brak zajeć' + '</span>' + '</strong>';
        };

        Generate.bellInformation = function (activity) {
            if (devPlan.Settings.getActivityBell()) {
                return '<strong>' + '<span class="" title="Zajęcia rozpoczynają się o: ' + activity.starts_at + ' i kończą o ' + activity.ends_at + '">' + '<i class="fa fa-fw fa-bell"></i>' + activity.getStartsAt() + " - " + activity.getEndsAt() + '</span>' + '</strong>';
            }
            return '';
        };

        Generate.categoryInformation = function (activity) {
            if (devPlan.Settings.getActivityCategory()) {
                return '<strong>' + '<span class="label label-danger pull-right" title="Typ zajęć">' + '<i class="fa fa-fw fa-tag"></i>' + activity.getCategory() + '</span></strong>';
            }
            return '';
        };

        Generate.locationInformation = function (activity) {
            if (devPlan.Settings.getActivityLocation() && activity.getPlace().getLocation().length > 0) {
                return '<strong><span class="" title="Zajęcia odbywają się w ' + activity.getPlace().getLocation() + '"><i class="fa fa-fw fa-map-marker"></i>' + activity.getPlace().location + '</span></strong> ';
            }
            return '';
        };

        Generate.tutorInformation = function (activity) {
            if (devPlan.Settings.getActivityTutor()) {
                return '<small><a class="pull-right" href="timetable.html?timetable=t' + activity.getTutor().id + '" title="devPlan  ' + activity.getTutor().getName() + '">' + activity.getTutor().getName() + '</a>' + (activity.getTutor().getMoodleUrl() != null ? '<a class="pull-right" href="' + activity.getTutor().getMoodleUrl() + '" title=" ' + activity.getTutor().getName() + ' - Wizytówka E-Uczelna "><i class="fa fa-globe fa-fw"></i></a>' : "") + '</small>';
            }
            return '';
        };
        return Generate;
    })();
    devPlan.Generate = Generate;
})(devPlan || (devPlan = {}));

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

                devPlan.Settings.setTimetableParams(param);
            }
            param = devPlan.Settings.getTimetableParams();
            console.log(param);

            $.when(Cash.Api.registerTimetable(param)).done(function (response) {
                console.log("After call registerTimetable: " + new Date().getTime());
                Init.showTimetable(Init.setTimetable(response).getTimetable());
                $("#timetable-panel-spinner").remove();
            });

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

                devPlan.Settings.loadTimetableParam();

                $(".devPlanTypeahead").each(function (index) {
                    $('#' + index + '.devPlanTypeahead').removeAttr('disabled').attr('placeholder', 'KrDzIs3011Io / dr Paweł Wołoszyn').attr('data-provide', "typeahead");

                    $('#' + index + '.devPlanTypeahead').typeahead({
                        source: data,
                        limit: 15,
                        updater: function (item) {
                            devPlan.Settings.addTimetableParam(item);
                        }
                    });
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
//# sourceMappingURL=devPlan.js.map
