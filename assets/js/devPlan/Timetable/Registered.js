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
//# sourceMappingURL=Registered.js.map
