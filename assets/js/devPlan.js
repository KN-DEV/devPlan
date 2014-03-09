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
            this.setNotes((object.notes == null ? "" : object.notes));
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
            return this;
        };

        Activity.prototype.getDate = function () {
            return this.date;
        };

        Activity.prototype.setDate = function (date) {
            this.date = date;
            return this;
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

        Activity.prototype.contains = function (query, indexgroup) {
            if (typeof indexgroup === "undefined") { indexgroup = ''; }
            var items = query.toString().toLowerCase().split(" ");
            var item = "";
            var values = [];
            for (var i = 0; i < items.length; i++) {
                item = items[i];
                if ((this.getName().toLowerCase().indexOf(item) > -1) || (this.getTutor().getName().toLowerCase().indexOf(item) > -1) || (this.getNotes().toLowerCase().indexOf(item) > -1) || (this.getCategory().toLowerCase().indexOf(item) > -1) || (this.getStartsAt().toLowerCase().indexOf(item) > -1) || (this.getEndsAt().toLowerCase().indexOf(item) > -1) || (this.getPlace().getLocation().toLowerCase().indexOf(item) > -1) || (containsIndexGroups(indexgroup, item))) {
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

        Params.fromString = function (str) {
            if (typeof str === "undefined") { str = ""; }
            var params = new Cash.Params();
            var paramsArray = str.match(/[gtp][0-9]*/gi);

            if (paramsArray != null) {
                for (var i = 0; i < paramsArray.length; i++) {
                    if (paramsArray[i].toString().toLowerCase().indexOf("g") != -1) {
                        params.addGroup(parseInt(paramsArray[i].slice(1).toString()));
                    }
                    if (paramsArray[i].toString().toLowerCase().indexOf("t") != -1) {
                        params.addTutor(parseInt(paramsArray[i].slice(1).toString()));
                    }
                    if (paramsArray[i].toString().toLowerCase().indexOf("p") != -1) {
                        params.addPlace(parseInt(paramsArray[i].slice(1).toString()));
                    }
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
            if (typeof object === "undefined") { object = { _id: "", access_url: "", params: new Cash.Params() }; }
            this._id = "";
            this.access_url = "";
            this.params = new Cash.Params();
            this.setId(object._id);
            this.setAccessUrl(object.access_url);
            this.setParams(object.params);
        }
        RegisteredTimetable.prototype.getId = function () {
            return this._id;
        };

        RegisteredTimetable.prototype.setId = function (id) {
            this._id = id;
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
            if (typeof object === "undefined") { object = { _id: "", access_url: "", params: new Cash.Params(), activities: [] }; }
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
        Api.getGroupsList = function (cache, ttl) {
            if (typeof cache === "undefined") { cache = false; }
            if (typeof ttl === "undefined") { ttl = 1; }
            return $.ajax({
                url: Cash.Api.host + "groups",
                type: "GET",
                success: function (data) {
                    console.log("Cash.Api.getTutorsList() - success", data);
                    devPlan.Init.setGroups(data);
                },
                error: function () {
                    console.log("Cash.Api.getTutorsList() - error");
                },
                cacheJStorage: cache,
                cacheTTL: (3600 * ttl),
                cacheKey: "Cash.groups",
                isCacheValid: function () {
                    return $.jStorage.get("Cash.places", false);
                }
            });
        };

        Api.getTutorsList = function (cache, ttl) {
            if (typeof cache === "undefined") { cache = false; }
            if (typeof ttl === "undefined") { ttl = 1; }
            return $.ajax({
                url: Cash.Api.host + "tutors",
                type: "GET",
                success: function (data) {
                    console.log("Cash.Api.getTutorsList() - success", data);
                    devPlan.Init.setTutors(data);
                },
                error: function () {
                    console.log("Cash.Api.getTutorsList() - error");
                },
                cacheJStorage: cache,
                cacheTTL: (3600000 * ttl),
                cacheKey: "Cash.tutors",
                isCacheValid: function () {
                    return $.jStorage.get("Cash.places", false);
                }
            });
        };

        Api.getPlacesList = function (cache, ttl) {
            if (typeof cache === "undefined") { cache = false; }
            if (typeof ttl === "undefined") { ttl = 1; }
            return $.ajax({
                url: Cash.Api.host + "places",
                type: "GET",
                dataType: 'json',
                success: function (data) {
                    devPlan.Init.setPlaces(data);
                    console.log("Cash.Api.getPlacesList() - success", data);
                },
                error: function () {
                    console.log("Cash.Api.getPlacesList() - error");
                },
                cacheJStorage: cache,
                cacheKey: "Cash.places",
                cacheTTL: (3600000 * ttl),
                isCacheValid: function () {
                    return $.jStorage.get("Cash.places", false);
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
                    console.log("Cash.Api.registerTimetable() - success", params.toString(), data);
                },
                error: function () {
                    console.log("Cash.Api.registerTimetable() - error", params.toString());
                },
                cacheJStorage: false
            });
        };

        Api.getTimetable = function (params, cache, ttl) {
            if (typeof cache === "undefined") { cache = false; }
            if (typeof ttl === "undefined") { ttl = 1; }
            return $.ajax({
                url: Cash.Api.host + "timetables/" + params.toString(),
                type: "GET",
                dataType: 'json',
                success: function (data) {
                    devPlan.Init.setTimetable(data);
                    console.log("Cash.Api.getTimetable() - success", params.toString(), data);
                },
                error: function () {
                    console.log("Cash.Api.getTimetable() - error", params.toString());
                },
                cacheJStorage: cache,
                cacheKey: params.toString(),
                cacheTTL: (3600000 * ttl),
                isCacheValid: function () {
                    return true;
                }
            });
        };

        Api.getTimetableVersion = function (params) {
            return $.ajax({
                url: Cash.Api.host + "timetables/" + params.toString() + "/versions",
                type: "GET",
                dataType: 'json',
                success: function (data) {
                    console.log("Cash.Api.getTimetableVersion() - success", params.toString(), data);
                },
                error: function () {
                    console.log("Cash.Api.getTimetable() - error", params.toString());
                },
                cacheJStorage: false
            });
        };
        Api.isUpToDateVersion = function (local, downloaded) {
            if (local == null || downloaded == null) {
                console.log("TEST", local, downloaded);
                return false;
            } else {
                console.log(JSON.stringify(local.versions) == JSON.stringify(downloaded.versions));
                return JSON.stringify(local.versions) == JSON.stringify(downloaded.versions);
            }
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
        Settings.getPage = function () {
            return Settings.page;
        };

        Settings.setPage = function (page) {
            if (typeof page === "undefined") { page = 0; }
            page = parseInt(page);
            Settings.page = page;
            return Settings;
        };

        Settings.incresePage = function () {
            console.log("days", Settings.getPage());
            Settings.setPage(Settings.getPage() + Settings.getTimetablePeriod());
            console.log("days", Settings.getPage());
            return Settings;
        };

        Settings.decresePage = function () {
            console.log("days", Settings.getPage());
            Settings.setPage(Settings.getPage() - Settings.getTimetablePeriod());
            console.log("days", Settings.getPage());
            return Settings;
        };

        Settings.getClassCounter = function () {
            return Settings.classCounter;
        };

        Settings.setClassCounter = function (status) {
            if (typeof status === "undefined") { status = false; }
            Settings.classCounter = status;
            if (Settings.getClassCounter()) {
                $(".devPlanSettingsActivityClassCounter").attr("checked", "checked");
            }
            return Settings;
        };

        Settings.getClassHourCounter = function () {
            return Settings.classHourCounter;
        };

        Settings.setClassHourCounter = function (status) {
            if (typeof status === "undefined") { status = false; }
            Settings.classHourCounter = status;
            if (Settings.getClassHourCounter()) {
                $(".devPlanSettingsActivityClassHourCounter").attr("checked", "checked");
            }
            return Settings;
        };

        Settings.getActivityCategory = function () {
            return Settings.activityCategory;
        };

        Settings.setActivityCategory = function (status) {
            if (typeof status === "undefined") { status = false; }
            Settings.activityCategory = status;
            if (Settings.getActivityCategory()) {
                $(".devPlanSettingsActivityCategory").attr("checked", "checked");
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
                $(".devPlanSettingsActivityBell").attr("checked", "checked");
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
                $(".devPlanSettingsActivityLocation").attr("checked", "checked");
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
                $(".devPlanSettingsActivityNote").attr("checked", "checked");
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
                $(".devPlanSettingsActivityGroup").attr("checked", "checked");
            }
            return Settings;
        };

        Settings.getActivityTutor = function () {
            return Settings.activityTutor;
        };

        Settings.setActivityTutor = function (status) {
            if (typeof status === "undefined") { status = false; }
            Settings.activityTutor = status;
            if (Settings.getActivityTutor()) {
                $(".devPlanSettingsActivityTutor").attr("checked", "checked");
            }
            return Settings;
        };
        Settings.getTimetableType = function () {
            return Settings.timetableType;
        };

        Settings.setTimetableType = function (status) {
            if (typeof status === "undefined") { status = 0; }
            Settings.timetableType = status;
            $('.devPlanSettingsTimetableType[value=' + Settings.getTimetableType() + ']').attr("checked", "checked");
            if (Settings.getTimetableType() == 0) {
                $(".devPlanSettingsTimetablePeriod").attr("disabled", "disabled");
                $(".devPlanTimetablePeriodNavigation").attr("disabled", "disabled");
            } else {
                $(".devPlanSettingsTimetablePeriod").removeAttr("disabled");
                $(".devPlanTimetablePeriodNavigation").removeAttr("disabled");
            }
            return Settings;
        };
        Settings.getTimetablePeriod = function () {
            return Settings.timetablePeriod;
        };

        Settings.setTimetablePeriod = function (status) {
            if (typeof status === "undefined") { status = 0; }
            Settings.timetablePeriod = status;
            Settings.setPage();
            $('.devPlanSettingsTimetablePeriod[value=' + Settings.getTimetablePeriod() + ']').attr("checked", "checked");
            return Settings;
        };

        Settings.getTimetableRedirect = function () {
            return Settings.timetableRedirect;
        };

        Settings.setTimetableRedirect = function (status) {
            if (typeof status === "undefined") { status = false; }
            Settings.timetableRedirect = status;
            if (Settings.getTimetableRedirect()) {
                $(".devPlanSettingsTimetableRedirect").attr("checked", "checked");
            }
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
            $('.devPlanSettingsActivityNameFilter').attr('value', Settings.getActivityNameFilter());
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
                Settings.setTimetableRedirect(data.timetableRedirect);
            }
            var data = $.cookie('devPlan.Params');
            if (data) {
                Settings.setTimetableParams(new Cash.Params(data.group_id, data.tutor_id, data.place_id));
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
                activityCategory: Settings.getActivityCategory(),
                activityBell: Settings.getActivityBell(),
                activityLocation: Settings.getActivityLocation(),
                activityNote: Settings.getActivityNote(),
                activityGroup: Settings.getActivityGroup(),
                activityTutor: Settings.getActivityTutor(),
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

        Settings.getCurrentDate = function (daysToAdd) {
            if (typeof daysToAdd === "undefined") { daysToAdd = 0; }
            var date = new Date();
            date.setDate(date.getDate() + daysToAdd);
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

        Settings.activityCategory = true;

        Settings.activityBell = true;

        Settings.activityLocation = true;

        Settings.activityNote = true;

        Settings.activityGroup = true;

        Settings.activityTutor = true;

        Settings.timetableType = 1;

        Settings.timetablePeriod = 0;

        Settings.timetableRedirect = false;

        Settings.timetableParams = new Cash.Params();

        Settings.activityNameFilter = "";

        Settings.page = 0;
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
            var date = new Date(activity.getStartsAtTimestamp() * 1000);
            return '<li class="list-group-item list-group-item-info date"    data-toggle="collapse" data-parent="#accordion" href="#' + activity.getDate() + '.activities"><p id="' + activity.getDate() + '" class="h4" >' + '<span>' + Generate.dayOfWeek[date.getDay()] + '</span> ' + '<span class="pull-right">' + date.getDate() + ' - ' + Generate.month[date.getMonth()] + ' - ' + date.getFullYear() + '' + '</span>' + '</p></li>';
        };

        Generate.nameInformation = function (activity) {
            return '<span class="name">' + (activity.getName().length != 0 ? activity.getName() : '&nbsp;') + '</span>';
        };

        Generate.noteInformation = function (activity) {
            return (activity.getNotes() != null) ? '<span class="note" title="Notatka dotycząca zajęć">Notatka: ' + activity.getNotes() + '</span>' : '';
        };

        Generate.bellInformation = function (activity) {
            return '<span class="bell" title="Zajęcia rozpoczynają się o: ' + activity.getStartsAt() + ' i kończą o ' + activity.getEndsAt() + '">' + '<strong><i class="fa fa-fw fa-bell"></i>' + activity.getStartsAt() + " - " + activity.getEndsAt() + '</strong></span>';
        };

        Generate.categoryInformation = function (activity) {
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
        };

        Generate.locationInformation = function (activity) {
            if (activity.getPlace().getLocation().length > 0) {
                return '<span class="location" title="Kliknij aby zobaczyć devPlan: ' + activity.getPlace().getLocation() + '"><i class="fa fa-fw fa-map-marker"></i>' + '<a href="timetable.html?timetable=p' + activity.getPlace().getId() + '">' + activity.getPlace().getLocation() + '</a>' + '</span>';
            }
            return '';
        };

        Generate.activityCounter = function (min, max) {
            return '<span class="counter" title="Zajęcia z kolei: ' + min + '">Zajęcia z kolei: ' + min + '/' + max + '</span><wbr>';
        };

        Generate.hourInformation = function (value, have, all) {
            return '<span class="hour" title="Ilość jednostek lekcyjnych:">' + 'Godziny lekcyjne od ' + ((have - value) + 1) + ' do ' + have + '(' + all + ')</span> ';
        };

        Generate.tutorInformation = function (activity) {
            return '<span class="tutor"><small>' + (activity.getTutor().getMoodleUrl() != null ? '<a href="' + activity.getTutor().getMoodleUrl() + '" title=" ' + activity.getTutor().getName() + ' - Wizytówka E-Uczelna "><i class="fa fa-globe fa-fw"></i></a>' : "") + '<a href="timetable.html?timetable=t' + activity.getTutor().id + '" title="Kliknij aby zobaczyć devPlan: ' + activity.getTutor().getName() + '">' + activity.getTutor().getName() + '</a></small><span>';
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
                default:
                    color = "default";
                    break;
            }
            return '<div class="btn-group btn-group-sm devPlanParam">' + '<button title="' + item + '" class="btn btn-' + color + '" >' + '<strong>' + ((item.length > 50) ? item.substr(0, 50) + '...' : item) + '' + '</strong>' + '</button>' + '<button class="btn btn-danger"  data-value="' + id + '"' + ' data-type="' + type + '" onclick="devPlan.Settings.removeTimetableParam(this);">' + '<i class="fa fa-fw fa-trash-o"></i>' + '</button>' + '</div>';
        };

        Generate.groupList = function (groups) {
            if (typeof groups === "undefined") { groups = []; }
            var data = '';
            for (var j = 0; j < groups.length; j++) {
                if (groups[j] != null) {
                    data = data + '<span class="group"><a href="timetable.html?timetable=g' + groups[j].getId() + '"title="Kliknij aby zobaczyć devPlan: ' + groups[j].getName() + '">' + groups[j].getName() + "</a></span>" + '<wbr>';
                    if (j < (groups.length - 1)) {
                        data = data + ' | ';
                    }
                }
            }
            return data;
        };

        Generate.generateActivity = function (timetable, activity, groups) {
            if (typeof groups === "undefined") { groups = []; }
            var data = '';
            data = data + '<li id="activity' + activity.getId() + '" class="list-group-item activity ' + activity.getCategory().replace(/\s/gi, "-") + '">' + '<p class="h4">' + Generate.nameInformation(activity) + ((devPlan.Settings.getActivityTutor() == true) ? Generate.tutorInformation(activity) : '') + '</p>' + '<div class="clearfix"></div>' + ((devPlan.Settings.getActivityNote() == true) ? ('<p class="h5">' + Generate.noteInformation(activity) + '</p><div class="clearfix"></div>') : '');

            if (devPlan.Settings.getActivityBell() || devPlan.Settings.getActivityLocation() || devPlan.Settings.getActivityCategory() || devPlan.Settings.getClassCounter() || devPlan.Settings.getClassHourCounter()) {
                data = data + '<p class="h5">' + (devPlan.Settings.getActivityBell() ? Generate.bellInformation(activity) : '') + ' ' + (devPlan.Settings.getActivityLocation() ? Generate.locationInformation(activity) : '') + ' ' + (devPlan.Settings.getActivityCategory() ? Generate.categoryInformation(activity) : '') + ' ' + (devPlan.Settings.getClassCounter() ? Generate.activityCounter(timetable.getPositionOfActivity(activity), timetable.getMaxNumberOfOccurencesOfActivity(activity)) : '') + ' ' + (devPlan.Settings.getClassHourCounter() ? Generate.hourInformation(activity.getNumberOfSchoolLessons(), timetable.sumAllHoursOfActivity(activity), timetable.sumAllHoursOfActivity(activity, true)) : '') + ' ';
                data = data + '</p><div class="clearfix"></div>';
            }
            if (devPlan.Settings.getActivityGroup()) {
                data = data + '<p class="h6">' + Generate.groupList(groups) + '</p><div class="clearfix"></div>';
            }
            data = data + '</li>';
            return data;
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
            "Styczeń",
            "Luty",
            "Marzec",
            "Kwiecień",
            "Maj",
            "Czerwiec",
            "Lipiec",
            "Sierpień",
            "Wrzesień",
            "Październik",
            "Listopad",
            "Grudzień"
        ];
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
if (navigator.userAgent.match(/IEMobile\/10\.0/)) {
    var msViewportStyle = document.createElement("style");
    msViewportStyle.appendChild(document.createTextNode("@-ms-viewport{width:auto!important}"));
    document.getElementsByTagName("head")[0].appendChild(msViewportStyle);
}
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

            var params = Cash.Params.fromString(devPlan.Settings.getUrlParam('timetable'));

            if (params.isEmpty()) {
                params = devPlan.Settings.getTimetableParams();
            }

            if (devPlan.Settings.getTimetableRedirect() && !params.isEmpty() && (window.location.href.indexOf("index.html") == -1 && window.location.href.indexOf("timetable.html") == -1)) {
                window.location.replace('timetable.html?timetable=' + params.toString());
            }

            if ($("#timetable-results").length) {
                if (!params.isEmpty()) {
                    $.when(Cash.Api.getTimetable(params, true, 6 /* Timetable */)).done(function (response) {
                        Init.showTimetable(Init.getTimetable());
                        $("#timetable-panel-spinner").remove();
                    }).fail(function () {
                        if (Init.getTimetable() == null) {
                            $.when(Cash.Api.registerTimetable(params)).done(function () {
                                $.when(Cash.Api.getTimetable(params, true, 6 /* Timetable */)).done(function (response) {
                                    Init.showTimetable(Init.getTimetable());
                                    $("#timetable-panel-spinner").remove();
                                }).fail(function (response) {
                                });
                            }).fail(function () {
                            });
                        } else {
                            Init.showTimetable(Init.getTimetable());
                            $("#timetable-panel-spinner").remove();
                        }
                    });
                } else {
                    $("#timetable-panel-spinner").remove();
                }
            }

            $.when(Cash.Api.getGroupsList(true, 6 /* Group */), Cash.Api.getTutorsList(true, 6 /* Tutor */), Cash.Api.getPlacesList(true, 6 /* Place */)).done(function (groups, tutors, places) {
                $("#search-input").removeAttr('disabled').attr('data-provide', "typeahead").typeahead({
                    source: Init.typeaheadDataCreator(Init.getGroups(), Init.getTutors(), Init.getPlaces()),
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

                $(".devPlanTypeahead").each(function (index) {
                    $('#' + index + '.devPlanTypeahead').removeAttr('disabled').attr('data-provide', "typeahead");
                    $('#' + index + '.devPlanTypeahead').typeahead({
                        source: Init.typeaheadDataCreator(Init.getGroups(), Init.getTutors(), Init.getPlaces()),
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
                            if (group == 0 && tutor == 0 && place > 0) {
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
                Init.groups.push(new Cash.Group(groups[group]));
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
                Init.tutors.push(new Cash.Tutor(tutors[tutor]));
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
                Init.places.push(new Cash.Place(places[place]));
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

        Init.showTimetable = function (timetable) {
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
                            groups[groups.length] = new Cash.Group(timetable.getActivities()[j].getGroup());
                        }
                    } while(timetable.getActivities()[++j] != null && activity.getName() == timetable.getActivities()[j].getName() && activity.getEndsAtTimestamp() == timetable.getActivities()[j].getEndsAtTimestamp());

                    var indexgroup = "";
                    groups = groups.sort(function (a, b) {
                        return a.getName() >= b.getName();
                    });
                    for (var k = 0; k < groups.length; k++) {
                        indexgroup = indexgroup + ' ' + groups[k].getName();
                    }

                    if (activity.getDate() >= devPlan.Settings.getCurrentDate(devPlan.Settings.getPage()) || devPlan.Settings.getTimetableType() == 0) {
                        if (activity.contains(devPlan.Settings.getActivityNameFilter(), indexgroup) == true) {
                            if (date != activity.getDate()) {
                                if (devPlan.Settings.getTimetablePeriod() != 0 && daysCounter >= devPlan.Settings.getTimetablePeriod() && devPlan.Settings.getTimetableType() != 0) {
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

                            data = data + devPlan.Generate.generateActivity(timetable, activity, groups);
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
//# sourceMappingURL=devPlan.js.map
