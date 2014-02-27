/// <reference path="../DefinitelyTyped/jquery/jquery.d.ts" />

module devPlan {
    function bindAnimation(): void {
        $('li#date').on("click", function() {
            $('li.fa-chevron-up').toggleClass('animate-down')
        })
    }
}
