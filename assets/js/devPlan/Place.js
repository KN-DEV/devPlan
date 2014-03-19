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
//# sourceMappingURL=Place.js.map
