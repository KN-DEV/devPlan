var devPlan;
(function (devPlan) {
    var Group = (function () {
        function Group(id, name) {
            if (typeof id === "undefined") { id = 0; }
            if (typeof name === "undefined") { name = ""; }
            this.id = 0;
            this.name = "";
            this.setId(id);
            this.setName(name);
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
    devPlan.Group = Group;
})(devPlan || (devPlan = {}));
var devPlan;
(function (devPlan) {
    var Tutor = (function () {
        function Tutor(id, name, moodle_url) {
            if (typeof id === "undefined") { id = 0; }
            if (typeof name === "undefined") { name = ""; }
            if (typeof moodle_url === "undefined") { moodle_url = ""; }
            this.id = 0;
            this.name = "";
            this.moodle_url = "";
            this.setId(id);
            this.setName(name);
            this.setMoodleUrl(moodle_url);
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

        Tutor.prototype.setMoodleUrl = function (moodle_url) {
            if (typeof moodle_url === "undefined") { moodle_url = ""; }
            this.moodle_url = moodle_url;
        };
        return Tutor;
    })();
    devPlan.Tutor = Tutor;
})(devPlan || (devPlan = {}));
var devPlan;
(function (devPlan) {
    var Place = (function () {
        function Place(id, location) {
            if (typeof id === "undefined") { id = 0; }
            if (typeof location === "undefined") { location = ""; }
            this.id = 0;
            this.location = "";
            this.setId(id);
            this.setLocation(location);
        }
        Place.prototype.getId = function () {
            return this.id;
        };

        Place.prototype.setId = function (id) {
            if (typeof id === "undefined") { id = 0; }
            this.id = id;
        };

        Place.prototype.getLocation = function () {
            return this.location;
        };

        Place.prototype.setLocation = function (location) {
            if (typeof location === "undefined") { location = ""; }
            this.location = location;
        };
        return Place;
    })();
    devPlan.Place = Place;
})(devPlan || (devPlan = {}));
var devPlan;
(function (devPlan) {
    var Activity = (function () {
        function Activity(object) {
            this.category = "";
            this.date = "";
            this.day_of_week = "";
            this.ends_at = "";
            this.ends_at_timestamp = 0;
            this.group = new devPlan.Group();
            this.id = 0;
            this.name = "";
            this.notes = "";
            this.place = new devPlan.Place();
            this.starts_at = "";
            this.starts_at_timestamp = 0;
            this.state = 0;
            this.tutor = new devPlan.Tutor();
            this.setCategory(object.category).setDate(object.date).setDayOfWeek(object.day_of_week).setEndsAt(object.ends_at).setEndsAtTimestamp(object.ends_at_timestamp).setStartsAt(object.starts_at).setStartsAtTimestamp(object.starts_at_timestamp).setState(object.state).setId(object.id).setName(object.name);
            if (object.notes != null) {
                this.setNotes(object.notes);
            }
            if (object.group != null) {
                this.setGroup(object.group);
            }

            if (object.place != null) {
                this.setPlace(object.place);
            }
            if (object.tutor != null) {
                this.setTutor(object.tutor);
            }
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
            return this;
        };

        Activity.prototype.getEndsAt = function () {
            return this.ends_at;
        };

        Activity.prototype.setEndsAt = function (ends_at) {
            this.ends_at = ends_at;
            return this;
        };

        Activity.prototype.getEndsAtTimestamp = function () {
            return this.ends_at_timestamp;
        };

        Activity.prototype.setEndsAtTimestamp = function (ends_at_timestamp) {
            this.ends_at_timestamp = ends_at_timestamp;
            return this;
        };

        Activity.prototype.getGroup = function () {
            return this.group;
        };

        Activity.prototype.setGroup = function (group) {
            this.group = new devPlan.Group(group.id, group.name);
            return this;
        };

        Activity.prototype.getId = function () {
            return this.id;
        };

        Activity.prototype.setId = function (id) {
            this.id = id;
            return this;
        };

        Activity.prototype.getName = function () {
            return this.name;
        };

        Activity.prototype.setName = function (name) {
            this.name = name;
            return this;
        };

        Activity.prototype.getNotes = function () {
            return this.notes;
        };

        Activity.prototype.setNotes = function (notes) {
            this.notes = notes;
            return this;
        };

        Activity.prototype.getPlace = function () {
            return this.place;
        };

        Activity.prototype.setPlace = function (place) {
            if (typeof place === "undefined") { place = { id: 0, location: "" }; }
            this.place = new devPlan.Place(place.id != null ? place.id : 0, place.location != null ? place.location : "");
            return this;
        };

        Activity.prototype.getStartsAt = function () {
            return this.starts_at;
        };

        Activity.prototype.setStartsAt = function (starts_at) {
            this.starts_at = starts_at;
            return this;
        };

        Activity.prototype.getStartsAtTimestamp = function () {
            return this.starts_at_timestamp;
        };

        Activity.prototype.setStartsAtTimestamp = function (starts_at_timestamp) {
            this.starts_at_timestamp = starts_at_timestamp;
            return this;
        };

        Activity.prototype.getState = function () {
            return this.state;
        };

        Activity.prototype.setState = function (state) {
            this.state = state;
            return this;
        };

        Activity.prototype.getTutor = function () {
            return this.tutor;
        };

        Activity.prototype.setTutor = function (tutor) {
            this.tutor = new devPlan.Tutor(tutor.id, tutor.name, tutor.moodle_url);
            return this;
        };

        Activity.prototype.getNumberOfSchoolLessons = function () {
            var counter = 0;
            for (var i = 0; i <= devPlan.Activity.alarms.length; i++) {
                if (devPlan.Activity.alarms[i] == this.getStartsAt()) {
                    for (var j = i; j <= devPlan.Activity.alarms.length; j++) {
                        if (devPlan.Activity.alarms[j] <= this.getEndsAt()) {
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
            var date = new Date((this.getStartsAtTimestamp() * 1000));
            for (var i = 0; i < items.length; i++) {
                item = items[i];
                if ((this.getName().toLowerCase().indexOf(item) > -1) || (this.getTutor().getName().toLowerCase().indexOf(item) > -1) || (this.getNotes().toLowerCase().indexOf(item) > -1) || (this.getCategory().toLowerCase().indexOf(item) > -1) || (this.getStartsAt().toLowerCase().indexOf(item) > -1) || (this.getEndsAt().toLowerCase().indexOf(item) > -1) || (this.getPlace().getLocation().toLowerCase().indexOf(item) > -1) || (date.getFullYear().toString().toLowerCase().indexOf(item) > -1) || (devPlan.Settings.transformDateToDateStamp(date).toLowerCase().indexOf(item) > -1) || (devPlan.Generate.month[date.getMonth()].toLowerCase().indexOf(item) > -1) || (devPlan.Generate.dayOfWeek[date.getDay()].toLowerCase().indexOf(item) > -1) || (date.getDate().toString().toLowerCase().indexOf(item) > -1) || (containsIndexGroups(indexgroup, item))) {
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
    devPlan.Activity = Activity;
})(devPlan || (devPlan = {}));
var devPlan;
(function (devPlan) {
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
            this.setGroups(groups != null ? groups : []);
            this.setTutors(tutors != null ? tutors : []);
            this.setPlaces(places != null ? places : []);
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

        Params.prototype.haveOnlyOneTutor = function () {
            return (this.getGroups().length == 0 && this.getTutors().length == 1 && this.getPlaces().length == 0);
        };

        Params.prototype.haveOnlyOneGroup = function () {
            return (this.getGroups().length == 1 && this.getTutors().length == 0 && this.getPlaces().length == 0);
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
            var params = new devPlan.Params();
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
    devPlan.Params = Params;
})(devPlan || (devPlan = {}));
var devPlan;
(function (devPlan) {
    var TimetableRegistered = (function () {
        function TimetableRegistered(object) {
            if (typeof object === "undefined") { object = { _id: "", access_url: "", params: new devPlan.Params() }; }
            this._id = "";
            this.access_url = "";
            this.params = new devPlan.Params();
            this.setId(object._id);
            this.setAccessUrl(object.access_url);
            this.setParams(object.params);
        }
        TimetableRegistered.prototype.getId = function () {
            return this._id;
        };

        TimetableRegistered.prototype.setId = function (id) {
            this._id = id;
            return this;
        };

        TimetableRegistered.prototype.getAccessUrl = function () {
            return this.access_url;
        };

        TimetableRegistered.prototype.setAccessUrl = function (access_url) {
            this.access_url = access_url;
            return this;
        };

        TimetableRegistered.prototype.getParams = function () {
            return this.params;
        };

        TimetableRegistered.prototype.setParams = function (params) {
            this.params = params;
            return this;
        };
        return TimetableRegistered;
    })();
    devPlan.TimetableRegistered = TimetableRegistered;
})(devPlan || (devPlan = {}));
var devPlan;
(function (devPlan) {
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
    devPlan.ActivityInfo = ActivityInfo;
})(devPlan || (devPlan = {}));
var devPlan;
(function (devPlan) {
    var Timetable = (function () {
        function Timetable(object) {
            if (typeof object === "undefined") { object = { _id: "", params: new devPlan.Params(), versions: {}, activities: [] }; }
            this._id = "";
            this.params = new devPlan.Params();
            this.activities = [];
            this.versions = {};
            this.maxNumberOfOccurencesOfActivity = [];
            this.activityInfo = [[]];
            this.datesList = [];
            this.setId(object._id).setParams(object.params).setVersions(object.versions).setActivities(object.activities);
        }
        Timetable.prototype.getId = function () {
            return this._id;
        };

        Timetable.prototype.setId = function (id) {
            this._id = id;
            return this;
        };

        Timetable.prototype.getParams = function () {
            return this.params;
        };

        Timetable.prototype.setParams = function (params) {
            if (typeof params === "undefined") { params = { group_id: [], tutor_id: [], place_id: [] }; }
            this.params = new devPlan.Params(params.group_id, params.tutor_id, params.place_id);
            return this;
        };

        Timetable.prototype.getVersions = function () {
            return this.versions;
        };

        Timetable.prototype.setVersions = function (versions) {
            this.versions = versions;
            return this;
        };

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
                newActivity = new devPlan.Activity(activity);
                _this.pushDateToDatesList(newActivity.getDate());
                _this.activities.push(newActivity);
                _this.incrementMaxNumberOfOccurencesOfActivity(newActivity);
                if (_this.activityInfo[devPlan.Activity.generateHash(newActivity)] == null) {
                    _this.activityInfo[devPlan.Activity.generateHash(newActivity)] = [];
                }
                _this.activityInfo[devPlan.Activity.generateHash(newActivity)].push(new devPlan.ActivityInfo(newActivity.getId(), newActivity.getNumberOfSchoolLessons()));
            });
            return this;
        };

        Timetable.prototype.getMaxNumberOfOccurencesOfActivity = function (activity) {
            var activityHash = devPlan.Activity.generateHash(activity);
            return (this.maxNumberOfOccurencesOfActivity[activityHash]) == null ? 0 : this.maxNumberOfOccurencesOfActivity[activityHash].length;
        };

        Timetable.prototype.incrementMaxNumberOfOccurencesOfActivity = function (activity) {
            var activityHash = devPlan.Activity.generateHash(activity);
            if (this.getMaxNumberOfOccurencesOfActivity(activity) == 0) {
                this.maxNumberOfOccurencesOfActivity[activityHash] = new Array();
            }
            this.maxNumberOfOccurencesOfActivity[activityHash].push(activity.getId());
            return this;
        };

        Timetable.prototype.getPositionOfActivity = function (activity) {
            var activityHash = devPlan.Activity.generateHash(activity);
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
            var activityHash = devPlan.Activity.generateHash(activity);
            var sum = 0;
            for (var i = 0; i < this.activityInfo[activityHash].length; i++) {
                if (full || i < this.getPositionOfActivity(activity)) {
                    sum = sum + this.activityInfo[activityHash][i].getNumberOfHours();
                }
            }
            return sum;
        };

        Timetable.prototype.getDatesList = function () {
            return this.datesList;
        };

        Timetable.prototype.getDateFromDatesListByPosition = function (id) {
            if (typeof id === "undefined") { id = 0; }
            if (this.isValidPositionInDatesList(id)) {
                return this.getDatesList()[id];
            } else {
                if (id < 0) {
                    return this.getDatesList()[0];
                }
                if (id > this.getDatesList().length) {
                    return this.getDatesList()[this.getDatesList().length];
                }
            }
        };

        Timetable.prototype.isValidPositionInDatesList = function (id) {
            return id > -1 && id < this.getDatesList().length;
        };

        Timetable.prototype.pushDateToDatesList = function (date) {
            if (this.checkIfDateExistsInDatesList(date) == false) {
                this.datesList.push(date);
            }
            return this;
        };

        Timetable.prototype.checkIfDateExistsInDatesList = function (date) {
            for (var i = 0; i < this.getDatesList().length; i++) {
                if (this.getDatesList()[i] == date) {
                    return true;
                }
            }
            return false;
        };

        Timetable.prototype.getDatePositionInDatesList = function (date) {
            for (var i = 0; i < this.getDatesList().length; i++) {
                if (this.getDatesList()[i] >= date) {
                    return i;
                }
            }
            return -1;
        };

        Timetable.prototype.isUpToDate = function (versions) {
            return JSON.stringify(new devPlan.TimetableVersion(this.getId(), this.getVersions())) == JSON.stringify(versions);
        };
        return Timetable;
    })();
    devPlan.Timetable = Timetable;
})(devPlan || (devPlan = {}));
var devPlan;
(function (devPlan) {
    var TimetableVersion = (function () {
        function TimetableVersion(_id, versions) {
            if (typeof _id === "undefined") { _id = ""; }
            if (typeof versions === "undefined") { versions = {}; }
            this._id = "";
            this.versions = {};
            this.setId(_id);
            this.setVersions(versions);
        }
        TimetableVersion.prototype.getId = function () {
            return this._id;
        };

        TimetableVersion.prototype.setId = function (id) {
            if (typeof id === "undefined") { id = ""; }
            this._id = id;
            return this;
        };

        TimetableVersion.prototype.getVersions = function () {
            return this.versions;
        };

        TimetableVersion.prototype.setVersions = function (versions) {
            if (typeof versions === "undefined") { versions = Object; }
            this.versions = versions;
            return this;
        };
        return TimetableVersion;
    })();
    devPlan.TimetableVersion = TimetableVersion;
})(devPlan || (devPlan = {}));
var Cash;
(function (Cash) {
    var Api = (function () {
        function Api() {
        }
        Api.getGroupsList = function (useCache, ttl) {
            if (typeof useCache === "undefined") { useCache = false; }
            if (typeof ttl === "undefined") { ttl = 1; }
            return $.ajax({
                url: Cash.Api.host + "groups?t=" + new Date().getTime(),
                type: "GET",
                success: function (data) {
                    devPlan.Init.setGroups(data);
                },
                cacheJStorage: useCache,
                cacheTTL: (3600 * ttl),
                cacheKey: "groups",
                isCacheValid: function () {
                    return $.jStorage.get("groups", false);
                }
            });
        };

        Api.getTutorsList = function (useCache, ttl) {
            if (typeof useCache === "undefined") { useCache = false; }
            if (typeof ttl === "undefined") { ttl = 1; }
            return $.ajax({
                url: Cash.Api.host + "tutors?t=" + new Date().getTime(),
                type: "GET",
                success: function (data) {
                    devPlan.Init.setTutors(data);
                },
                cacheJStorage: useCache,
                cacheTTL: (3600000 * ttl),
                cacheKey: "tutors",
                isCacheValid: function () {
                    return $.jStorage.get("tutors", false);
                }
            });
        };

        Api.getPlacesList = function (useCache, ttl) {
            if (typeof useCache === "undefined") { useCache = false; }
            if (typeof ttl === "undefined") { ttl = 1; }
            return $.ajax({
                url: Cash.Api.host + "places?t=" + new Date().getTime(),
                type: "GET",
                dataType: 'json',
                success: function (data) {
                    devPlan.Init.setPlaces(data);
                },
                cacheJStorage: useCache,
                cacheKey: "places",
                cacheTTL: (3600000 * ttl),
                isCacheValid: function () {
                    return $.jStorage.get("places", false);
                }
            });
        };

        Api.registerTimetable = function (groups, tutors, places) {
            if (typeof groups === "undefined") { groups = []; }
            if (typeof tutors === "undefined") { tutors = []; }
            if (typeof places === "undefined") { places = []; }
            return $.ajax({
                url: Cash.Api.host + "timetables",
                type: "POST",
                dataType: 'json',
                data: {
                    group_id: groups,
                    tutor_id: tutors,
                    place_id: places
                },
                cacheJStorage: false
            });
        };

        Api.getTimetable = function (query, cache, ttl, notOverRide) {
            if (typeof cache === "undefined") { cache = false; }
            if (typeof ttl === "undefined") { ttl = 1; }
            if (typeof notOverRide === "undefined") { notOverRide = true; }
            return $.ajax({
                url: Cash.Api.host + "timetables/" + query + '?t=' + new Date().getTime(),
                type: "GET",
                dataType: 'json',
                success: function (data) {
                    devPlan.Init.setTimetable(data);
                },
                cacheJStorage: cache,
                cacheKey: query,
                cacheTTL: (3600000 * ttl),
                isCacheValid: function () {
                    return true && notOverRide;
                }
            });
        };

        Api.getTimetableVersion = function (query) {
            return $.ajax({
                url: Cash.Api.host + "timetables/" + query + "/versions?t=" + new Date().getTime(),
                type: "GET",
                dataType: 'json',
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
            Settings.page = page;
            return Settings;
        };

        Settings.increasePage = function () {
            if (devPlan.Init.getTimetable().getDatePositionInDatesList(Settings.getCurrentDate()) != -1) {
                if (devPlan.Init.getTimetable().isValidPositionInDatesList(devPlan.Init.getTimetable().getDatePositionInDatesList(Settings.getCurrentDate()) + ((Settings.getPage() + 1) * Settings.getTimetablePeriod()))) {
                    Settings.setPage(Settings.getPage() + 1);
                }
                if (devPlan.Init.getTimetable().isValidPositionInDatesList(devPlan.Init.getTimetable().getDatePositionInDatesList(Settings.getCurrentDate()) + ((Settings.getPage() + 1) * Settings.getTimetablePeriod()))) {
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
            if (devPlan.Init.getTimetable().isValidPositionInDatesList(devPlan.Init.getTimetable().getDatePositionInDatesList(Settings.getCurrentDate()) + ((Settings.getPage() - 1) * Settings.getTimetablePeriod()))) {
                Settings.setPage(Settings.getPage() - 1);
            }
            if (devPlan.Init.getTimetable().isValidPositionInDatesList(devPlan.Init.getTimetable().getDatePositionInDatesList(Settings.getCurrentDate()) + ((Settings.getPage() - 1) * Settings.getTimetablePeriod()))) {
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
            Settings.setPage(0);
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
            $('.devPlanQrCodeImg').empty().qrcode('http://devplan.uek.krakow.pl/export/' + Settings.getTimetableParams().toString());
            $('.devPlanExportUrl').attr('value', 'http://devplan.uek.krakow.pl/export/' + Settings.getTimetableParams().toString());
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
            $('.devPlanQrCodeImg').empty().qrcode('http://devplan.uek.krakow.pl/export/' + Settings.getTimetableParams().toString());

            $('.devPlanExportUrl').attr('value', 'http://devplan.uek.krakow.pl/export/' + Settings.getTimetableParams().toString());
        };

        Settings.devPlanUrl = function () {
            var devPlanUrl = $(".devPlanUrl").empty();
            if (!Settings.getTimetableParams().isEmpty()) {
                devPlanUrl.append('<a href="http://devplan.uek.krakow.pl/timetable.html?timetable=' + Settings.getTimetableParams().toString() + '">link</a>');
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
var devPlan;
(function (devPlan) {
    var Generate = (function () {
        function Generate() {
        }
        Generate.dateInformation = function (activity) {
            var date = new Date(activity.getStartsAtTimestamp() * 1000);
            return '<li class="list-group-item list-group-item-info date" data-toggle="collapse" data-parent="#accordion" href="#' + activity.getDate() + '.activities">' + '<h4 id="' + activity.getDate() + '">' + Generate.dayOfWeek[date.getDay()] + ', ' + date.getDate() + ' ' + Generate.month[date.getMonth()] + '</h4></li>';
        };

        Generate.activityName = function (activity) {
            return '<span class="name">' + (activity.getName().length != 0 ? activity.getName() : '&nbsp;') + '</span>';
        };

        Generate.activityNote = function (activity) {
            return (activity.getNotes().length > 0) ? '<span class="note" title="Notatka dotycząca zajęć">' + activity.getNotes() + '</span>' : '';
        };

        Generate.activityStartStop = function (start, stop) {
            return '<span class="bell">' + start.getHours() + ':' + (start.getMinutes() < 10 ? '0' : '') + start.getMinutes() + " - " + stop.getHours() + ':' + (stop.getMinutes() < 10 ? '0' : '') + stop.getMinutes() + '</span>';
        };

        Generate.activityCategory = function (activity) {
            return '<span class="category pull-right" title="' + activity.getCategory() + '">' + activity.getCategory() + '</span>';
        };

        Generate.activityLocation = function (activity) {
            if (activity.getPlace().getLocation().length > 0) {
                if (devPlan.Init.placesInUse == true) {
                    return '<span class="location">' + '<a href="timetable.html?timetable=p' + activity.getPlace().getId() + '">' + activity.getPlace().getLocation() + '</a>' + '</span>';
                } else {
                    return '<span class="location">' + activity.getPlace().getLocation() + '</span>';
                }
            } else {
                return '';
            }
        };

        Generate.activityCounter = function (min, max) {
            return '<span class="counter pull-right" title="Zajęcia z kolei: ' + min + '">' + min + '/' + max + '</span>';
        };

        Generate.hourInformation = function (value, have, all) {
            return '<span class="hour pull-right" title="Godziny lekcyjne">' + ((have - value) + 1) + '-' + have + '/' + all + '</span> ';
        };

        Generate.activityTutorsList = function (activity) {
            if (devPlan.Init.tutorsInUse == true) {
                return '<span class="tutor">' + (activity.getTutor().getMoodleUrl() != null ? '<a href="' + activity.getTutor().getMoodleUrl() + '" title=" ' + activity.getTutor().getName() + ' - Wizytówka E-Uczelna ">E-Wizytówka</a> ' : "") + '<a href="timetable.html?timetable=t' + activity.getTutor().getId() + '">' + activity.getTutor().getName() + '</a>' + '</span> ';
            } else {
                return '<span class="tutor">' + (activity.getTutor().getMoodleUrl() != null ? '<a href="' + activity.getTutor().getMoodleUrl() + '" title=" ' + activity.getTutor().getName() + ' - Wizytówka E-Uczelna ">E-Wizytówka</a> ' : "") + activity.getTutor().getName() + '</span> ';
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
                data = data + '<div class="col-lg-12 col-md-12 col-sm-12 col-xs-12">' + (devPlan.Settings.getActivityBell() ? Generate.activityStartStop(new Date(activity.getStartsAtTimestamp() * 1000), new Date(activity.getEndsAtTimestamp() * 1000)) + '<wbr>' : '') + (devPlan.Settings.getActivityLocation() ? Generate.activityLocation(activity) + '<wbr>' : '') + (timetable.getParams().haveOnlyOneTutor() == false && devPlan.Settings.getActivityTutorsList() ? Generate.activityTutorsList(activity) + '<wbr>' : '') + (devPlan.Settings.getClassCounter() ? Generate.activityCounter(timetable.getPositionOfActivity(activity), timetable.getMaxNumberOfOccurencesOfActivity(activity)) + '<wbr>' : '') + (devPlan.Settings.getClassHourCounter() ? Generate.hourInformation(activity.getNumberOfSchoolLessons(), timetable.sumAllHoursOfActivity(activity), timetable.sumAllHoursOfActivity(activity, true)) + '<wbr>' : '');

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

            var params = devPlan.Params.fromString(devPlan.Settings.getUrlParam('timetable'));

            if (params.isEmpty()) {
                params = devPlan.Settings.getTimetableParams();
            }

            if (devPlan.Settings.getTimetableRedirect() == true && params.isEmpty() == false && (window.location.href.indexOf("index.html") == -1 && window.location.href.indexOf("timetable.html") == -1)) {
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

            $.when(Cash.Api.getGroupsList(true, 12), devPlan.Init.tutorsInUse == true ? Cash.Api.getTutorsList(true, 12) : null, devPlan.Init.placesInUse ? Cash.Api.getPlacesList(true, 12) : null).done(function (groups, tutors, places) {
                $("#search-input").removeAttr('disabled').attr('data-provide', "typeahead").typeahead({
                    source: Init.typeaheadDataCreator(Init.getGroups(), (devPlan.Init.tutorsInUse == true ? Init.getTutors() : []), (devPlan.Init.placesInUse == true ? Init.getPlaces() : [])),
                    items: devPlan.Init.typeaheadLimit,
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
                        source: Init.typeaheadDataCreator(Init.getGroups(), (devPlan.Init.tutorsInUse == true ? Init.getTutors() : []), (devPlan.Init.placesInUse == true ? Init.getPlaces() : [])),
                        items: devPlan.Init.typeaheadLimit,
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
                        items: devPlan.Init.typeaheadLimit,
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
        Init.typeaheadLimit = 15;

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
//# sourceMappingURL=devPlan.js.map
