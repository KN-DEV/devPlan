var devPlan;
(function (devPlan) {
    var Group = (function () {
        function Group(id, name) {
            if (typeof id === "undefined") { id = 0; }
            if (typeof name === "undefined") { name = ""; }
            this.id = 0;
            this.name = "";
            this.setId(id);
            this.setName(name);
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
    devPlan.Group = Group;
})(devPlan || (devPlan = {}));
//# sourceMappingURL=Group.js.map
