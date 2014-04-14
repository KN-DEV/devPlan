
///<reference path='../../../../typings/qunit/qunit.d.ts' />
///<reference path='../../../devPlan/Model/Group.ts' />
test("Cant create instance of devPlan.Model.Group", () => {
    ok(new devPlan.Model.Group(), "Instence of devPlan.Model.Group created");
});
