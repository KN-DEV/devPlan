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
//# sourceMappingURL=Tutor.js.map
