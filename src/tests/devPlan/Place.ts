
///<reference path='../../../typings/qunit/qunit.d.ts' />
///<reference path='../../devPlan/Place.ts' />

test("Cant create instance of devPlan.Place", () => {
    ok(new devPlan.Place(), "Instence of devPlan.Place created");
});
