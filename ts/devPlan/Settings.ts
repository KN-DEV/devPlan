/// <reference path="../DefinitelyTyped/jquery/jquery.d.ts" />
/// <reference path="../DefinitelyTyped/jquery.cookie/jquery.cookie.d.ts" />
/**
 * 
 */
module devPlan {
    /**
     * 

    /**
     * 
     */
    export class Settings {
        /**
         * 
         */
        private static classCounter: boolean = false;
        /**
         * 
         */
        private static classHourCounter: boolean = false;
        /**
         * 
         */
        private static activityCategory: boolean = true;
        /**
         * 
         */
        private static activityBell: boolean = true;
        /**
         * 
         */
        private static activityLocation: boolean = true;
        /**
         * 
         */
        private static activityNote: boolean = true;
        /**
         * 
         */
        private static activityGroup: boolean = true;
        /**
         * 
         */
        private static activityTutor: boolean = true;
        /**
         * 
         */
        private static timetableType: number = 1;
        /**
        * 
        */
        private static timetablePeriod: number = 0;
        /**
         * 
         */
        public static timetableParams: Cash.Params = new Cash.Params();
        /**
         * 
         */
        private static activityNameFilter: string = "";

        /**
         * 
         */
        static getClassCounter(): boolean {
            return Settings.classCounter;
        }
        /**
         * 
         */
        static setClassCounter(status: boolean = false): Settings {
            Settings.classCounter = status;
            return Settings;
        }
        /**
         * 
         */
        static getClassHourCounter(): boolean {
            return Settings.classHourCounter;
        }
        /**
         * 
         */
        static setClassHourCounter(status: boolean = false): Settings {
            Settings.classHourCounter = status;
            return Settings;
        }
        /**
         * 
         */
        static getActivityCategory(): boolean {
            return Settings.activityCategory;
        }
        /**
         * 
         */
        static setActivityCategory(status: boolean = false): Settings {
            Settings.activityCategory = status;
            return Settings;
        }
        /**
         * 
         */
        static getActivityBell(): boolean {
            return Settings.activityBell;
        }
        /**
         * 
         */
        static setActivityBell(status: boolean = false): Settings {
            Settings.activityBell = status;
            return Settings;
        }
        /**
         * 
         */
        static getActivityLocation(): boolean {
            return Settings.activityLocation;
        }
        /**
         * 
         */
        static setActivityLocation(status: boolean = false): Settings {
            Settings.activityLocation = status;
            return Settings;
        }
        /**
         * 
         */
        static getActivityNote(): boolean {
            return Settings.activityNote;
        }
        /**
         * 
         */
        static setActivityNote(status: boolean = false): Settings {
            Settings.activityNote = status;
            return Settings;
        }
        /**
         * 
         */
        static getActivityGroup(): boolean {
            return Settings.activityGroup;
        }
        /**
         * 
         */
        static setActivityGroup(status: boolean = false): Settings {
            Settings.activityGroup = status;
            return Settings;
        }
        /**
         * 
         */
        static getActivityTutor(): boolean {
            return Settings.activityTutor;
        }
        /**
         *
         */
        static setActivityTutor(status: boolean = false): Settings {
            Settings.activityTutor = status;
            return Settings;
        }
        static getTimetableType(): number {
            return Settings.timetableType;
        }
        /**
         *
         */
        static setTimetableType(status: number = 0): Settings {
            Settings.timetableType = status;
            return Settings;
        }
        static getTimetablePeriod(): number {
            return Settings.timetablePeriod;
        }
        /**
         *
         */
        static setTimetablePeriod(status: number = 0): Settings {
            Settings.timetablePeriod = status;
            return Settings;
        }

        static getTimetableParams(): Cash.Params {
            console.log(Settings.timetableParams);
            return Settings.timetableParams;
        }
        /**
         *
         */
        static setTimetableParams(status: Cash.Params = new Cash.Params()): Settings {
            Settings.timetableParams = status;
            return Settings;
        }
        static getActivityNameFilter(): string {
            return Settings.activityNameFilter;
        }
        /**
         *
         */
        static setActivityNameFilter(status: string = ""): Settings {
            Settings.activityNameFilter = status;
            return Settings;
        }
        /**
         * 
         */
        static load(): Settings {
            $.cookie.json = true;
            var data: any = $.cookie('devPlan.Settings');
            if (data) {
                Settings.setClassCounter(data.classCounter);
                Settings.setClassHourCounter(data.classHourCounter);
                Settings.setActivityCategory(data.activityCategory);
                Settings.setActivityBell(data.activityBell);
                Settings.setActivityLocation(data.activityLocation);
                Settings.setActivityNote(data.activityNote);
                Settings.setActivityGroup(data.activityGroup);
                Settings.setActivityTutor(data.activityTutor);
                Settings.setTimetableType(data.timetableType);
                Settings.setTimetablePeriod(data.timetablePeriod);

            }
            var data: any = $.cookie('devPlan.Params');
            if (data) {
                Settings.setTimetableParams(new Cash.Params(data.group_id, data.tutor_id, data.place_id));
                //Settings.setActivityNameFilter(data.activityNameFilter);
            }
            if (Settings.getClassCounter()) {
                $("#classCounter").attr("checked", "checked");
            }
            if (Settings.getClassHourCounter()) {
                $("#classHourCounter").attr("checked", "checked");
            }
            if (Settings.getActivityCategory()) {
                $("#activityCategory").attr("checked", "checked");
            }
            if (Settings.getActivityBell()) {
                $("#activityBell").attr("checked", "checked");
            }
            if (Settings.getActivityLocation()) {
                $("#activityLocation").attr("checked", "checked");
            }
            if (Settings.getActivityNote()) {
                $("#activityNote").attr("checked", "checked");
            }
            if (Settings.getActivityGroup()) {
                $("#activityGroup").attr("checked", "checked");
            }
            if (Settings.getActivityTutor()) {
                $("#activityTutor").attr("checked", "checked");
            }
            $('#timetableType' + Settings.getTimetableType()).attr("checked", "checked");
            $('#timetablePeriod' + Settings.getTimetablePeriod()).attr("checked", "checked");
            //  $('#activityNameFilter').attr('value', Settings.getActivityNameFilter());


            return Settings;
        }
        static loadTimetableParam() {
            Settings.getTimetableParams().getGroups().forEach((index: number, item: number) => {
                for (var i = 0; i < Init.getGroups().length; i++) {
                    if (Init.getGroups()[i].getId() == index) {
                        Settings.addTimetableParam(Init.getGroups()[i].getName());
                    }
                }
            });
            Settings.getTimetableParams().getTutors().forEach((index: number, item: number) => {
                for (var i = 0; i < Init.getTutors().length; i++) {
                    if (Init.getTutors()[i].getId() == index) {
                        Settings.addTimetableParam(Init.getTutors()[i].getName());
                    }
                }
            });
        }
        /**
         *
         */
        static save(): Settings {
            var data: Settings = {
                classCounter: Settings.getClassCounter(),
                classHourCounter: Settings.getClassHourCounter(),
                activityCategory: Settings.getActivityCategory(),
                activityBell: Settings.getActivityBell(),
                activityLocation: Settings.getActivityLocation(),
                activityNote: Settings.getActivityNote(),
                activityGroup: Settings.getActivityGroup(),
                activityTutor: Settings.getActivityTutor(),
                timetableType: Settings.getTimetableType(),
                timetablePeriod: Settings.getTimetablePeriod(),
                timetableParams: Settings.getTimetableParams(),
                activityNameFilter: ''
            };
            $.cookie.json = true;
            $.cookie('devPlan.Settings', data, { expires: 1000 });
            return Settings;
        }

        static saveTimetable(): Settings {
            $.cookie.json = true;
            $.cookie('devPlan.Params', Settings.getTimetableParams(), { expires: 180 });
            console.log("Params", Settings.getTimetableParams());
            return Settings;
        }
        /**
         * Returns param from url
         */
        static getUrlParam(key: string): string {
            var result = new RegExp(key + "=([^&]*)", "i").exec(window.location.search.replace(/\+/g, " "));
            return result && decodeURIComponent(result[1]) || "";
        }
        /**
         *
         */
        static getCurrentDate(): string {
            var date = new Date();
            var month = date.getMonth() + 1;
            if (month <= 9) {
                return date.getFullYear() + '-0' + month + '-' + date.getDate();
            }
            else {
                return date.getFullYear() + '-' + month + '-' + date.getDate();
            }
        }
        /**
         * 
         */
        static addTimetableParam(item: string) {
            var g = Init.searchGroupId(item);
            var t = Init.searchTutorId(item);
            var p = Init.searchPlaceId(item);
            if (g > 0 && t == 0 && p == 0) {
                $("#devPlanParams").append('<button id="g' + g + '" class="devPlanParam btn btn-xs btn-primary" onclick="devPlan.Settings.removeTimetableParam(this);" value="' + g + '" type="g">' + item + '' +
                    '</button><wbr>');
                Settings.setTimetableParams(Settings.getTimetableParams().addGroup(g))
            }
            if (g == 0 && t > 0 && p == 0) {
                $("#devPlanParams").append('<button id="t' + t + '" class="devPlanParam btn btn-xs btn-success" onclick="devPlan.Settings.removeTimetableParam(this);" value="' + t + '" type="t">' + item + '' +
                    '</button><wbr>');
                Settings.setTimetableParams(Settings.getTimetableParams().addTutor(t));
            }
            if (g == 0 && t == 0 && p > 0) {
                $("#devPlanParams").append('<button id="p' + t + '" class="devPlanParam btn btn-xs btn-info" onclick="devPlan.Settings.removeTimetableParam(this);" value="' + p + '" type="p">' + item + '' +
                    '</button><wbr>');
                Settings.setTimetableParams(Settings.getTimetableParams().addPlace(p));
            }
            $("#devPlanUrl").empty().append('<p class="form-control-static"><a href="/timetable.html?timetable=' + Settings.getTimetableParams().toString() + '">link</a></p>');

        }
        static removeTimetableParam(item: JQuery) {
            var item: JQuery = $(item);
            if (item.attr("type") == "g") {
                Settings.setTimetableParams(Settings.getTimetableParams().removeGroup(parseInt(item.attr("value"))));
            }
            if (item.attr("type") == "t") {
                Settings.setTimetableParams(Settings.getTimetableParams().removeTutor(parseInt(item.attr("value"))));
            }
            if (item.attr("type") == "p") {
                Settings.setTimetableParams(Settings.getTimetableParams().removePlace(parseInt(item.attr("value"))));
            }

            console.log(Settings.getTimetableParams());
            $("#devPlanUrl")
                .empty()
                .append("https://devplan.uek.krakow.pl/timetable.html?timetable=" + Settings.getTimetableParams().toString());
            item.remove();
        }

    }
}