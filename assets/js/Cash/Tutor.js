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
//# sourceMappingURL=Tutor.js.map
