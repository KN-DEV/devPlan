var devPlan;
(function (devPlan) {
    var Model = (function () {
        function Model() {
        }
        return Model;
    })();
    devPlan.Model = Model;
})(devPlan || (devPlan = {}));
var devPlan;
(function (devPlan) {
    var Tutor = (function () {
        function Tutor() {
        }
        return Tutor;
    })();
    devPlan.Tutor = Tutor;
})(devPlan || (devPlan = {}));
var devPlan;
(function (devPlan) {
    var Timetable = (function () {
        function Timetable() {
        }
        return Timetable;
    })();
    devPlan.Timetable = Timetable;
})(devPlan || (devPlan = {}));
var devPlan;
(function (devPlan) {
    var Place = (function () {
        function Place() {
        }
        return Place;
    })();
    devPlan.Place = Place;
})(devPlan || (devPlan = {}));
test("Cant create instance of devPlan.Model.Group", function () {
    ok(new devPlan.Model.Group(), "Instence of devPlan.Model.Group created");
});
test("Cant create instance of devPlan.Place", function () {
    ok(new devPlan.Place(), "Instence of devPlan.Place created");
});
test("Cant create instance of devPlan.Timetable", function () {
    ok(new devPlan.Timetable(), "Instence of devPlan.Timetable created");
});
test("Cant create instance of devPlan.Tutor", function () {
    ok(new devPlan.Tutor(), "Instence of devPlan.Tutor created");
});
//# sourceMappingURL=devplan.js.map
