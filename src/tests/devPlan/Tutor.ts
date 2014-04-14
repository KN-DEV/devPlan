
///<reference path='../../../typings/qunit/qunit.d.ts' />
///<reference path='../../devPlan/Tutor.ts' />
test("Cant create instance of devPlan.Tutor", () => {
    ok(new devPlan.Tutor(), "Instence of devPlan.Tutor created");
});
