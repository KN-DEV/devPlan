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
            this.category = "";
            this.date = "";
            this.day_of_week = "";
            this.ends_at = "";
            this.ends_at_timestamp = 0;
            this.group = new Cash.Group();
            this.id = 0;
            this.name = "";
            this.notes = "";
            this.place = new Cash.Place();
            this.starts_at = "";
            this.starts_at_timestamp = 0;
            this.state = 0;
            this.tutor = new Cash.Tutor();
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
            return (counter / 2);
        };

        Activity.generateHash = function (activity) {
            return activity.getGroup().getId() + '-' + activity.getName() + '-' + activity.getCategory() + '-' + activity.getTutor().getId();
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
        function Params(groups, tutors, places) {
            if (typeof groups === "undefined") { groups = []; }
            if (typeof tutors === "undefined") { tutors = []; }
            if (typeof places === "undefined") { places = []; }
            var _this = this;
            this.group_id = [];
            this.tutor_id = [];
            this.place_id = [];
            this.getGroups = function () {
                return _this.group_id;
            };
            this.setGroups(groups);
            this.setTutors(tutors);
            this.setPlaces(places);
        }
        Params.prototype.setGroups = function (groups) {
            if (typeof groups === "undefined") { groups = []; }
            this.group_id = groups.sort(function (a, b) {
                return a - b;
            });
            return this;
        };

        Params.prototype.checkIfGroupIdExists = function (id) {
            var check = false;
            for (var i = 0; i < this.getGroups().length; i++) {
                if (this.getGroups()[i] == id) {
                    check = true;
                }
            }
            return check;
        };

        Params.prototype.addGroup = function (id) {
            if (!this.checkIfGroupIdExists(id)) {
                this.getGroups().push(id);
                this.setGroups(this.getGroups().sort(function (a, b) {
                    return a - b;
                }));
            }
            return this;
        };

        Params.prototype.removeGroup = function (id) {
            for (var i = 0; i < this.getGroups().length; i++) {
                if (this.getGroups()[i] == id) {
                    this.getGroups().splice(i, 1);
                }
            }
            return this;
        };

        Params.prototype.getTutors = function () {
            return this.tutor_id;
        };

        Params.prototype.setTutors = function (tutors) {
            if (typeof tutors === "undefined") { tutors = []; }
            this.tutor_id = tutors.sort(function (a, b) {
                return a - b;
            });
            return this;
        };

        Params.prototype.checkIfTutorIdExists = function (id) {
            var check = false;
            for (var i = 0; i < this.getTutors().length; i++) {
                if (this.getTutors()[i] == id) {
                    check = true;
                }
            }
            return check;
        };

        Params.prototype.addTutor = function (id) {
            if (!this.checkIfTutorIdExists(id)) {
                this.getTutors().push(id);
                this.setTutors(this.getTutors().sort(function (a, b) {
                    return a - b;
                }));
            }
            return this;
        };

        Params.prototype.removeTutor = function (id) {
            for (var i = 0; i < this.getTutors().length; i++) {
                if (this.getTutors()[i] == id) {
                    this.getTutors().splice(i, 1);
                }
            }
            return this;
        };

        Params.prototype.getPlaces = function () {
            return this.place_id;
        };

        Params.prototype.setPlaces = function (places) {
            if (typeof places === "undefined") { places = []; }
            this.place_id = places.sort(function (a, b) {
                return a - b;
            });
            return this;
        };

        Params.prototype.checkIfPlaceIdExists = function (id) {
            var check = false;
            for (var i = 0; i < this.getPlaces().length; i++) {
                if (this.getPlaces()[i] == id) {
                    check = true;
                }
            }
            return check;
        };

        Params.prototype.addPlace = function (id) {
            if (!this.checkIfPlaceIdExists(id)) {
                this.getPlaces().push(id);
                this.setPlaces(this.getPlaces().sort(function (a, b) {
                    return a - b;
                }));
            }
            return this;
        };

        Params.prototype.removePlace = function (id) {
            for (var i = 0; i < this.getPlaces().length; i++) {
                if (this.getPlaces()[i] == id) {
                    this.getPlaces().splice(i, 1);
                }
            }
            return this;
        };

        Params.prototype.isEmpty = function () {
            return (this.getGroups().length == 0) && (this.getTutors().length == 0) && (this.getPlaces().length == 0);
        };

        Params.prototype.toString = function () {
            var data = "";
            for (var i = 0; i < this.getGroups().length; i++) {
                data = data + 'g' + this.getGroups()[i];
            }
            for (var i = 0; i < this.getTutors().length; i++) {
                data = data + 't' + this.getTutors()[i];
            }
            for (var i = 0; i < this.getPlaces().length; i++) {
                data = data + 'p' + this.getPlaces()[i];
            }
            return data;
        };

        Params.fromString = function (query) {
            var params = new Cash.Params();
            var timetable = query.match(/[gtp][0-9]*/gi);
            for (var i = 0; i < timetable.length; i++) {
                if (timetable[i].toString().toLowerCase().indexOf("g") != -1) {
                    params.addGroup(parseInt(timetable[i].slice(1).toString()));
                }
                if (timetable[i].toString().toLowerCase().indexOf("t") != -1) {
                    params.addTutor(parseInt(timetable[i].slice(1).toString()));
                }
                if (timetable[i].toString().toLowerCase().indexOf("p") != -1) {
                    params.addTutor(parseInt(timetable[i].slice(1).toString()));
                }
            }
            return params;
        };
        return Params;
    })();
    Cash.Params = Params;
})(Cash || (Cash = {}));
var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var Cash;
(function (Cash) {
    var RegisteredTimetable = (function () {
        function RegisteredTimetable(object) {
            if (typeof object === "undefined") { object = { id: "", access_url: "", params: new Cash.Params() }; }
            this.id = "";
            this.access_url = "";
            this.params = new Cash.Params();
            this.setId(object.id);
            this.setAccessUrl(object.access_url);
            this.setParams(object.params);
        }
        RegisteredTimetable.prototype.getId = function () {
            return this.id;
        };

        RegisteredTimetable.prototype.setId = function (id) {
            this.id = id;
        };

        RegisteredTimetable.prototype.getAccessUrl = function () {
            return this.access_url;
        };

        RegisteredTimetable.prototype.setAccessUrl = function (access_url) {
            this.access_url = access_url;
        };

        RegisteredTimetable.prototype.getParams = function () {
            return this.params;
        };

        RegisteredTimetable.prototype.setParams = function (params) {
            this.params = params;
        };
        return RegisteredTimetable;
    })();
    Cash.RegisteredTimetable = RegisteredTimetable;

    var ActivityInfo = (function () {
        function ActivityInfo(id, numberOfHours) {
            if (typeof numberOfHours === "undefined") { numberOfHours = 0; }
            this.setId(id);
            this.setNumberOfHours(numberOfHours);
        }
        ActivityInfo.prototype.getId = function () {
            return this.id;
        };

        ActivityInfo.prototype.setId = function (id) {
            this.id = id;
            return this;
        };

        ActivityInfo.prototype.getNumberOfHours = function () {
            return this.numberOfHours;
        };

        ActivityInfo.prototype.setNumberOfHours = function (numberOfHours) {
            this.numberOfHours = numberOfHours;
            return this;
        };
        return ActivityInfo;
    })();
    Cash.ActivityInfo = ActivityInfo;

    var Timetable = (function (_super) {
        __extends(Timetable, _super);
        function Timetable(object) {
            if (typeof object === "undefined") { object = { id: "", access_url: "", params: new Cash.Params(), activities: [] }; }
            _super.call(this, object);
            this.activities = [];
            this.resource_versions = [];
            this.maxNumberOfOccurencesOfActivity = [];
            this.activityInfo = [[]];
            this.setActivities(object.activities);
        }
        Timetable.prototype.getActivities = function () {
            return this.activities;
        };

        Timetable.prototype.setActivities = function (activities) {
            var _this = this;
            activities = activities.sort(function (a, b) {
                return a.starts_at_timestamp - b.starts_at_timestamp;
            });
            console.log(activities);
            var id;
            var newActivity;
            var activity_info;
            activities.forEach(function (activity, index) {
                newActivity = new Cash.Activity(activity);
                _this.activities.push(newActivity);
                _this.incrementMaxNumberOfOccurencesOfActivity(newActivity);
                if (_this.activityInfo[Cash.Activity.generateHash(newActivity)] == null) {
                    _this.activityInfo[Cash.Activity.generateHash(newActivity)] = [];
                }
                _this.activityInfo[Cash.Activity.generateHash(newActivity)].push(new Cash.ActivityInfo(newActivity.getId(), newActivity.getNumberOfSchoolLessons()));
            });
        };

        Timetable.prototype.getMaxNumberOfOccurencesOfActivity = function (activity) {
            var activityHash = Cash.Activity.generateHash(activity);
            return (this.maxNumberOfOccurencesOfActivity[activityHash]) == null ? 0 : this.maxNumberOfOccurencesOfActivity[activityHash].length;
        };

        Timetable.prototype.incrementMaxNumberOfOccurencesOfActivity = function (activity) {
            var activityHash = Cash.Activity.generateHash(activity);
            if (this.getMaxNumberOfOccurencesOfActivity(activity) == 0) {
                this.maxNumberOfOccurencesOfActivity[activityHash] = new Array();
            }
            this.maxNumberOfOccurencesOfActivity[activityHash].push(activity.getId());
            return this;
        };

        Timetable.prototype.getPositionOfActivity = function (activity) {
            var activityHash = Cash.Activity.generateHash(activity);
            if (this.maxNumberOfOccurencesOfActivity[activityHash].length > 0) {
                for (var i = 0; i < this.maxNumberOfOccurencesOfActivity[activityHash].length; i++) {
                    if (this.maxNumberOfOccurencesOfActivity[activityHash][i] == activity.getId()) {
                        return (i + 1);
                    }
                }
            }
            return -1;
        };

        Timetable.prototype.sumAllHoursOfActivity = function (activity, full) {
            if (typeof full === "undefined") { full = false; }
            var activityHash = Cash.Activity.generateHash(activity);
            var sum = 0;
            for (var i = 0; i < this.activityInfo[activityHash].length; i++) {
                if (full || i < this.getPositionOfActivity(activity)) {
                    sum = sum + this.activityInfo[activityHash][i].getNumberOfHours();
                }
            }
            return sum;
        };
        return Timetable;
    })(RegisteredTimetable);
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
                dataType: 'json',
                cache: false,
                success: function (data) {
                    console.log("Cash.Api.getGroupsLis() - success", data);
                },
                error: function () {
                    console.log("Cash.Api.getGroupsLis() - error");
                }
            });
        };

        Api.getTutorsList = function () {
            return $.ajax({
                url: Cash.Api.host + "tutors",
                type: "GET",
                dataType: 'json',
                cache: false,
                success: function (data) {
                    console.log("Cash.Api.getTutorsList() - success", data);
                },
                error: function () {
                    console.log("Cash.Api.getTutorsList() - error");
                }
            });
        };

        Api.getPlacesList = function () {
            return $.ajax({
                url: Cash.Api.host + "places",
                type: "GET",
                dataType: 'json',
                cache: false,
                success: function (data) {
                    console.log("Cash.Api.getPlacesList() - success", data);
                },
                error: function () {
                    console.log("Cash.Api.getPlacesList() - error");
                }
            });
        };

        Api.registerTimetable = function (params) {
            return $.ajax({
                url: Cash.Api.host + "timetables",
                type: "POST",
                dataType: 'json',
                data: {
                    group_id: params.getGroups(),
                    tutor_id: params.getTutors(),
                    place_id: params.getPlaces()
                },
                success: function (data) {
                    console.log("Cash.Api.registerTimetable() - success", params, data);
                },
                error: function () {
                    console.log("Cash.Api.registerTimetable() - error", params);
                }
            });
        };

        Api.getTimetable = function (params) {
            return $.ajax({
                url: Cash.Api.host + "timetables/" + params.toString(),
                type: "GET",
                dataType: 'json',
                success: function (data) {
                    console.log("Cash.Api.getTimetable() - success", params.toString(), data);
                },
                error: function () {
                    console.log("Cash.Api.getTimetable() - error", params);
                }
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
        Settings.getTimetablePeriod = function () {
            return Settings.timetablePeriod;
        };

        Settings.setTimetablePeriod = function (status) {
            if (typeof status === "undefined") { status = 0; }
            Settings.timetablePeriod = status;
            return Settings;
        };

        Settings.getTimetableParams = function () {
            console.log(Settings.timetableParams);
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
            console.log("Params", Settings.getTimetableParams());
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
            var g = devPlan.Init.searchGroupId(item);
            var t = devPlan.Init.searchTutorId(item);
            var p = devPlan.Init.searchPlaceId(item);
            if (g > 0 && t == 0 && p == 0) {
                $("#devPlanParams").append('<button id="g' + g + '" class="devPlanParam btn btn-xs btn-primary" onclick="devPlan.Settings.removeTimetableParam(this);" value="' + g + '" type="g">' + item + '' + '</button><wbr>');
                Settings.setTimetableParams(Settings.getTimetableParams().addGroup(g));
            }
            if (g == 0 && t > 0 && p == 0) {
                $("#devPlanParams").append('<button id="t' + t + '" class="devPlanParam btn btn-xs btn-success" onclick="devPlan.Settings.removeTimetableParam(this);" value="' + t + '" type="t">' + item + '' + '</button><wbr>');
                Settings.setTimetableParams(Settings.getTimetableParams().addTutor(t));
            }
            if (g == 0 && t == 0 && p > 0) {
                $("#devPlanParams").append('<button id="p' + t + '" class="devPlanParam btn btn-xs btn-info" onclick="devPlan.Settings.removeTimetableParam(this);" value="' + p + '" type="p">' + item + '' + '</button><wbr>');
                Settings.setTimetableParams(Settings.getTimetableParams().addPlace(p));
            }

            $("#devPlanUrl").empty().append('<p class="form-control-static">https://devplan.uek.krakow.pl/timetable.html?timetable=' + Settings.getTimetableParams().toString() + '</p>');
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

            console.log(Settings.getTimetableParams());
            $("#devPlanUrl").empty().append("https://devplan.uek.krakow.pl/timetable.html?timetable=" + Settings.getTimetableParams().toString());
            item.remove();
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
            return '<li class="list-group-item list-group-item-info date"><p id="' + activity.getDate() + '" class="h5" >' + '<a data-toggle="collapse" data-parent="#accordion" href="#' + activity.getDate() + '.activities" class="">' + (activity.getDayOfWeek() + ', ' + activity.getDate()) + '' + '</a>' + '<a data-toggle="collapse" data-parent="#accordion" href="#' + activity.getDate() + '.activities" class="pull-right"><i class="fa fa-fw fa-chevron-up animate-transform"></i></a>' + '</p></li>';
        };

        Generate.noteInformation = function (activity) {
            if (devPlan.Settings.getActivityNote() && activity.getNotes()) {
                return '<p class="note" title="Notatka dotycząca zajęć">Notatka: ' + activity.getNotes() + '</p>';
            }
            return '';
        };

        Generate.nameInformation = function (activity) {
            if (activity.getName().length > 0) {
                return '<span class="name" title="Przedmiot: ' + activity.getName() + '">' + activity.getName() + '</span>';
            }
            return '<span span="name" title="Przedmiot: ' + activity.getName() + '">' + 'brak nazwy zajęć' + '</span>';
        };

        Generate.bellInformation = function (activity) {
            if (devPlan.Settings.getActivityBell()) {
                return '<span class="bell" title="Zajęcia rozpoczynają się o: ' + activity.getStartsAt() + ' i kończą o ' + activity.getEndsAt() + '">' + '<i class="fa fa-fw fa-bell"></i>' + activity.getStartsAt() + " - " + activity.getEndsAt() + '</span>';
            }
            return '';
        };

        Generate.categoryInformation = function (activity) {
            if (devPlan.Settings.getActivityCategory()) {
                return '<span class="label label-danger category" title="Typ zajęć">' + '<i class="fa fa-fw fa-tag"></i>' + activity.getCategory() + '</span>';
            }
            return '';
        };

        Generate.locationInformation = function (activity) {
            if (devPlan.Settings.getActivityLocation() && activity.getPlace().getLocation().length > 0) {
                return '<span class="location" title="Kliknij aby zobaczyć devPlan: ' + activity.getPlace().getLocation() + '"><i class="fa fa-fw fa-map-marker"></i>' + '<a href="timetable.html?timetable=p' + activity.getPlace().getId() + '">' + activity.getPlace().getLocation() + '</a>' + '</span>';
            }
            return '';
        };

        Generate.activityCounter = function (min, max) {
            if (devPlan.Settings.getClassCounter()) {
                return '<span class="label label-info counter" title="Zajęcia z koleji: ' + min + '"><i class="fa fa-fw fa-info-circle"></i>' + min + ' / ' + max + '</span><wbr>';
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
                return '<a class="tutor" href="timetable.html?timetable=t' + activity.getTutor().id + '" title="Kliknij aby zobaczyć devPlan: ' + activity.getTutor().getName() + '">' + activity.getTutor().getName() + '</a>' + (activity.getTutor().getMoodleUrl() != null ? '<a class="tutor" href="' + activity.getTutor().getMoodleUrl() + '" title=" ' + activity.getTutor().getName() + ' - Wizytówka E-Uczelna "><i class="fa fa-globe fa-fw"></i></a>' : "");
            }
            return '';
        };
        return Generate;
    })();
    devPlan.Generate = Generate;
})(devPlan || (devPlan = {}));

var devPlan;
(function (devPlan) {
    function bindAnimation() {
        $('li.date').find('a').on("click", function () {
            $(this).parent().find('i.fa-chevron-up').toggleClass('animate-down');
        });
    }
    devPlan.bindAnimation = bindAnimation;
})(devPlan || (devPlan = {}));

var devPlan;
(function (devPlan) {
    var ActivityHourCounter = (function () {
        function ActivityHourCounter() {
            this.hour = 1;
            this.counter = 0;
        }
        return ActivityHourCounter;
    })();
    devPlan.ActivityHourCounter = ActivityHourCounter;

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
            }

            if (!params.isEmpty()) {
                $("#devPlanWizardNavbarIconLink").attr("href", "timetable.html").removeAttr("data-toggle").removeAttr("data-target");

                $("#devPlanWizardNavbarLink").attr("href", "timetable.html").removeAttr("data-toggle").removeAttr("data-target").empty().toggleClass("btn-info").toggleClass("btn-success").attr("href", "timetable.html").removeAttr("data-toggle").removeAttr("data-target").text("Mój devPlan");
                $("#devPlanWizardLink").attr("href", "timetable.html").removeAttr("data-toggle").removeAttr("data-target").empty().toggleClass("btn-info").toggleClass("btn-success").text("Mój devPlan");
            }

            if ($("#timetable-results").length == 1) {
                if (params.isEmpty() == true) {
                    $("#timetable-panel-spinner-icon").empty().append('<button class="btn btn-info"' + 'data-toggle="modal" data-target="#devPlanWizard">' + 'Stwórz swój <strong>devPlan</strong>' + '</button>');
                } else {
                    $.when(Cash.Api.getTimetable(params)).done(function (response) {
                        Init.showTimetable(Init.setTimetable(response).getTimetable());
                        $("#timetable-panel-spinner").remove();
                    }).fail(function () {
                        console.log("Pobranie planu zakończone niepowodzeniem.");
                        $.when(Cash.Api.registerTimetable(params)).done(function (response) {
                            console.log("Rejestracja planu zkończona powodzeniem.");
                            $.when(Cash.Api.getTimetable(params)).done(function (response) {
                                Init.showTimetable(Init.setTimetable(response).getTimetable());
                                $("#timetable-panel-spinner").remove();
                                console.log("Pobieranie planu po rejestracji zakończone powodzeniem.");
                            }).fail(function () {
                                console.log("Pobieranie planu po rejestracji zakończone niepowodzeniem.");
                            });
                        }).fail(function () {
                            console.log("Rejestracja planu nie powiodła się");
                        });
                    });
                }
            }

            if ($("#search-panel-input").length) {
                $("#search-panel-input").attr('value', devPlan.Settings.getUrlParam('search'));
            }

            $.when(Cash.Api.getGroupsList(), Cash.Api.getTutorsList(), Cash.Api.getPlacesList()).done(function (groups, tutors, places) {
                Init.setGroups(groups[0]);
                Init.setTutors(tutors[0]);
                Init.setPlaces(places[0]);

                $("#search-input").removeAttr('disabled').attr('placeholder', 'KrDzIs3011Io / dr Paweł Wołoszyn').attr('data-provide', "typeahead");

                var data = [];
                for (var i = 0; i < Init.getGroups().length; i++) {
                    data.push(Init.getGroups()[i].getName());
                }
                for (i = 0; i < Init.getTutors().length; i++) {
                    data.push(Init.getTutors()[i].getName());
                }

                $("#search-input").typeahead({
                    source: data,
                    items: 15,
                    updater: function (item) {
                        var group = Init.searchGroupId(item);
                        var tutor = Init.searchTutorId(item);
                        var place = Init.searchPlaceId(item);
                        console.log("navbar search", item, Init.searchGroupId(item), 'timetable.html?timetable=g' + group);
                        console.log("navbar search", item, Init.searchTutorId(item), 'timetable.html?timetable=t' + tutor);
                        console.log("navbar search", item, Init.searchPlaceId(item), 'timetable.html?timetable=p' + place);

                        if (group > 0 && tutor == 0 && place == 0) {
                            window.location.replace('timetable.html?timetable=g' + group);
                        }
                        if (group == 0 && tutor > 0 && place == 0) {
                            window.location.replace('timetable.html?timetable=t' + tutor);
                        }
                        if (group == 0 && tutor == 0 && place > 0) {
                            window.location.replace('timetable.html?timetable=p' + place);
                        }
                        console.log("navbar search error", item);
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
                            console.log("Selected: " + item);
                        }
                    });
                });

                if ($("#search-panel-input").length) {
                    $("#search-panel-input").attr('value', devPlan.Settings.getUrlParam('search')).attr('placeholder', 'KrDzIs3011Io / dr Paweł Wołoszyn').removeAttr("disabled");
                    $("#search-panel .panel-body").remove();
                    Init.showSearchResults(devPlan.Settings.getUrlParam("search"));
                }
            }).fail(function () {
                console.log("Fail creating typeahead");
            });
        }
        Init.getGroups = function () {
            return Init.groups;
        };

        Init.setGroups = function (groups) {
            if (typeof groups === "undefined") { groups = []; }
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
                    if (activity.getDate() >= devPlan.Settings.getCurrentDate() || devPlan.Settings.getTimetableType() == 0) {
                        if ((activity.getName().toLowerCase().indexOf(devPlan.Settings.getActivityNameFilter().toLowerCase()) > -1) || (activity.getTutor().getName().toLowerCase().indexOf(devPlan.Settings.getActivityNameFilter().toLowerCase()) > -1) || (indexgroup.toLowerCase().indexOf(devPlan.Settings.getActivityNameFilter().toLowerCase()) > -1) || (activity.getDate().indexOf(devPlan.Settings.getActivityNameFilter().toLowerCase()) > -1)) {
                            if (date != activity.getDate()) {
                                if (date != "") {
                                    data = data + '</div>';
                                }
                                data = data + devPlan.Generate.dateInformation(activity) + '<div id="' + activity.getDate() + '" class="activities collapse in">';
                                date = activity.getDate();
                            }

                            if (timetable.getActivities()[i - 1] != null && activity.getName() == timetable.getActivities()[i - 1].getName() && activity.getEndsAtTimestamp() == timetable.getActivities()[i - 1].getEndsAtTimestamp()) {
                                continue;
                            }
                            data = data + '<li id="activity' + activity.getId() + '" class="list-group-item activity ' + activity.getCategory() + '">' + '<p class="h5">' + devPlan.Generate.nameInformation(timetable.getActivities()[i]) + devPlan.Generate.tutorInformation(timetable.getActivities()[i]);
                            '</p>';
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
                                        data = data + '<a href="timetable.html?timetable=g' + groups[j].getId() + '" title="Kliknij aby zobaczyć devPlan: ' + groups[j].getName() + '">' + groups[j].getName() + "</a>" + '<wbr>';
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
//# sourceMappingURL=devPlan.js.map
