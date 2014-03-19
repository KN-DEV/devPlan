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
//# sourceMappingURL=Info.js.map
