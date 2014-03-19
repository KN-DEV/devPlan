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
//# sourceMappingURL=Timetable.js.map
