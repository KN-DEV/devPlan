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
//# sourceMappingURL=Activity.js.map
