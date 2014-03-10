var devPlan;
(function (devPlan) {
    function bindAnimation() {
        $('li.date').find('a').on("click", function () {
            $(this).parent().find('i.fa-chevron-up').toggleClass('animate-down');
        });
    }
    devPlan.bindAnimation = bindAnimation;
})(devPlan || (devPlan = {}));
//# sourceMappingURL=AnimateChevron.js.map
