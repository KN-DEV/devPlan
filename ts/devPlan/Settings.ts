/// <reference path="../DefinitelyTyped/jquery/jquery.d.ts" />
/// <reference path="../DefinitelyTyped/jquery.cookie/jquery.cookie.d.ts" />
/**
 * 
 */
module devPlan {
    /**
     * 
     */
    export interface SettingsInterface {
        /**
       *
       */
        classCounter: boolean;
        /**
         *
         */
        classHourCounter: boolean;
        /**
         *
         */
        activityCategory: boolean;
        /**
         *
         */
        activityBell: boolean;
        /**
         *
         */
        activityLocation: boolean;
        /**
         *
         */
        activityNote: boolean;
        /**
         *
         */
        activityGroup: boolean;
        /**
         *
         */
        activityTutor: boolean;
        /**
         *
         */
        timetableType: number;
        /**
         * 
         */
        timetableParams: Cash.Params;
        /**
         * 
         */
        activityNameFilter: string;
    }
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
        private static timetableParams: Cash.Params = new Cash.Params();
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
        static getTimetableParams(): Cash.Params {
            return Settings.timetableParams;
        }
        /**
         *
         */
        static setTimetableParams(status: Cash.Params = { tutor_id: [], place_id: [], group_id: [] }): Settings {
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
            var data: SettingsInterface = $.cookie('devPlan.Settings');
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
                Settings.setTimetableParams(data.timetableParams);
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
            $('#timetableType_' + Settings.getTimetableType()).attr("checked", "checked");
            $('#activityNameFilter').attr('value', Settings.getActivityNameFilter());


            return Settings;
        }
        static loadTimetableParam() {

            Settings.timetableParams.group_id.forEach((value: number) => {
                Settings.addTimetableParam(Init.getGroups()[--value].getName());
            });
            Settings.timetableParams.tutor_id.forEach((value: number) => {
                Settings.addTimetableParam(Init.getTutors()[--value].getName());
            });


            //            
            //            for (var i = 0; i < Settings.timetableParams.tutor_id.length; i++) {
            //          //      Settings.addTimetableParam(Init.getTutors()[Settings.timetableParams.tutor_id[i]].getName());
            //            }
        }
        /**
         *
         */
        static save(): Settings {
            var data: SettingsInterface = {
                classCounter: Settings.getClassCounter(),
                classHourCounter: Settings.getClassHourCounter(),
                activityCategory: Settings.getActivityCategory(),
                activityBell: Settings.getActivityBell(),
                activityLocation: Settings.getActivityLocation(),
                activityNote: Settings.getActivityNote(),
                activityGroup: Settings.getActivityGroup(),
                activityTutor: Settings.getActivityTutor(),
                timetableType: Settings.getTimetableType(),
                timetableParams: Settings.getTimetableParams(),
                activityNameFilter: ''
            };
            $.cookie.json = true;
            $.cookie('devPlan.Settings', data);
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

        static addTimetableParam(item: string) {

            var g = Init.searchGroup(item);
            var t = Init.searchTutor(item);
            var test = true;
            if (g > 0 && t == null) {

                $("#devPlanParams").append('<button id="g' + g + '" class="devPlanParam btn btn-xs btn-info" onclick="devPlan.Settings.removeTimetableParam(this);" value="' + g + '" type="g">' + item + '' +
                    '</button><wbr> ');

                for (var i = 0; i < Settings.timetableParams.group_id.length; i++) {
                    if (Settings.timetableParams.group_id[i] == g) {
                        test = false;
                    }

                }
                if (test) {
                    Settings.timetableParams.group_id[Settings.timetableParams.group_id.length] = g;
                }
            }
            if (t > 0 && g == null) {

                for (var i = 0; i < Settings.timetableParams.tutor_id.length; i++) {
                    if (Settings.timetableParams.tutor_id[i] == t) {
                        test = false;
                    }
                }
                $("#devPlanParams").append('<button id="t' + t + '" class="devPlanParam btn btn-xs btn-success" onclick="devPlan.Settings.removeTimetableParam(this);" value="' + t + '" type="t">' + item + '' +
                    '</button><wbr> ');

                if (test) {

                    Settings.timetableParams.tutor_id[Settings.timetableParams.tutor_id.length] = t;
                }
            }

            console.log(Settings.timetableParams);

        }
        static removeTimetableParam(item: JQuery) {
            var newTimetableParams: Cash.Params = new Cash.Params();
            var item: JQuery = $(item);
            console.log(item.attr("value"), item.attr("type"));
            if (item.attr("type") == "g") {
                for (var i = 0; i < Settings.timetableParams.group_id.length; i++) {
                    if (Settings.timetableParams.group_id[i] != parseInt(item.attr("value"))) {
                        newTimetableParams.group_id[newTimetableParams.group_id.length] = Settings.timetableParams.group_id[i];
                    }
                }
            }
            if (item.attr("type") == "t") {
                for (var i = 0; i < Settings.timetableParams.tutor_id.length; i++) {
                    if (Settings.timetableParams.tutor_id[i] != parseInt(item.attr("value"))) {
                        newTimetableParams.tutor_id[newTimetableParams.tutor_id.length] = Settings.timetableParams.tutor_id[i];
                    }
                }



            }
            Settings.timetableParams = newTimetableParams;
            item.remove();

            console.log(Settings.timetableParams);

        }
        static setDevPlan(): void {

            $(".devPlanTypeahead").each((index) => {

            });
        }
    }
}