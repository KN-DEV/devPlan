var Cash;
(function (Cash) {
    

    var Group = (function () {
        function Group(object) {
            if (typeof object === "undefined") { object = { id: 0, name: "" }; }
            this.id = 0;
            this.name = "";
            this.setId((object == null) ? 0 : object.id);
            this.setName((object == null) ? "" : object.name);
        }
        Group.prototype.getId = function () {
            return this.id;
        };

        Group.prototype.setId = function (id) {
            if (typeof id === "undefined") { id = 0; }
            this.id = id;
        };

        Group.prototype.getName = function () {
            return this.name;
        };

        Group.prototype.setName = function (name) {
            if (typeof name === "undefined") { name = ""; }
            this.name = name;
        };
        return Group;
    })();
    Cash.Group = Group;
})(Cash || (Cash = {}));
//# sourceMappingURL=Group.js.map
