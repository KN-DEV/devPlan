/// <reference path="../DefinitelyTyped/jquery/jquery.d.ts" />

module devPlan {
    export function bindAnimation(): void {
        $('li.date').find('a').on("click", function() {
            //$(this).find('fa-chevron-up').toggleClass('animate-down');
            $(this).parent().find('i.fa-chevron-up').toggleClass('animate-down');
        });
    }
}
