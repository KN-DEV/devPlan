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
//# sourceMappingURL=Timetable.js.map
