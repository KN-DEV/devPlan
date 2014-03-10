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
//# sourceMappingURL=Activity.js.map
