var Cash;
(function (Cash) {
    var Place = (function () {
        function Place(object) {
            if (typeof object === "undefined") { object = { id: 0, location: "" }; }
            this.id = 0;
            this.location = "";
            this.setId((object == null) ? 0 : object.id);
            this.setLocation((object == null) ? "" : object.location);
        }
        Place.prototype.getId = function () {
            return this.id;
        };

        Place.prototype.setId = function (id) {
            this.id = id;
        };

        Place.prototype.getLocation = function () {
            return this.location;
        };

        Place.prototype.setLocation = function (location) {
            this.location = location;
        };
        return Place;
    })();
    Cash.Place = Place;
})(Cash || (Cash = {}));
//# sourceMappingURL=Place.js.map
