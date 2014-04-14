
///<reference path='../../../typings/qunit/qunit.d.ts' />
///<reference path='../../devPlan/Timetable.ts' />

test("Cant create instance of devPlan.Timetable", () => {
    ok(new devPlan.Timetable(), "Instence of devPlan.Timetable created");
});
