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
//# sourceMappingURL=Version.js.map
