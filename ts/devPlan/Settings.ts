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
        private static timetableRedirect: boolean = false;
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
        private static page: number = 0;
        /**
         * 
         */
        public static getPage(): number {
            return Settings.page;
        }
        /**
         * 
         */
        public static setPage(page: any = 0): Settings {
            page = parseInt(page);
            Settings.page = page;
            return Settings;
        }
        /**
         * 
         */
        public static incresePage(): Settings {
            console.log("days", Settings.getPage());
            Settings.setPage(Settings.getPage() + Settings.getTimetablePeriod());
            console.log("days", Settings.getPage());
            return Settings;
        }
        /**
         * 
         */
        public static decresePage(): Settings {
            console.log("days", Settings.getPage());
            Settings.setPage(Settings.getPage() - Settings.getTimetablePeriod());
            console.log("days", Settings.getPage());
            return Settings;
        }
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
            if (Settings.getClassCounter()) {
                $(".devPlanSettingsActivityClassCounter").attr("checked", "checked");
            }
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
            if (Settings.getClassHourCounter()) {
                $(".devPlanSettingsActivityClassHourCounter").attr("checked", "checked");
            }
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
            if (Settings.getActivityCategory()) {
                $(".devPlanSettingsActivityCategory").attr("checked", "checked");
            }
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
            if (Settings.getActivityBell()) {
                $(".devPlanSettingsActivityBell").attr("checked", "checked");
            }
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
            if (Settings.getActivityLocation()) {
                $(".devPlanSettingsActivityLocation").attr("checked", "checked");
            }
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

            if (Settings.getActivityNote()) {
                $(".devPlanSettingsActivityNote").attr("checked", "checked");
            }
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
            if (Settings.getActivityGroup()) {
                $(".devPlanSettingsActivityGroup").attr("checked", "checked");
            }
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
            if (Settings.getActivityTutor()) {
                $(".devPlanSettingsActivityTutor").attr("checked", "checked");
            }
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
            $('.devPlanSettingsTimetableType[value=' + Settings.getTimetableType() + ']').attr("checked", "checked");
            if (Settings.getTimetableType() == 0) {
                $(".devPlanSettingsTimetablePeriod").attr("disabled", "disabled");
                $(".devPlanTimetablePeriodNavigation").attr("disabled", "disabled");
            } else {
                $(".devPlanSettingsTimetablePeriod").removeAttr("disabled");
                $(".devPlanTimetablePeriodNavigation").removeAttr("disabled");
            }
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
            Settings.setPage();
            $('.devPlanSettingsTimetablePeriod[value=' + Settings.getTimetablePeriod() + ']').attr("checked", "checked");
            return Settings;
        }
        /**
         * 
         */
        static getTimetableRedirect(): boolean {
            return Settings.timetableRedirect;
        }
        /**
         * 
         */
        static setTimetableRedirect(status: boolean = false): Settings {
            Settings.timetableRedirect = status;
            if (Settings.getTimetableRedirect()) {
                $(".devPlanSettingsTimetableRedirect").attr("checked", "checked");
            }
            return Settings;
        }
        /**
         * 
         */
        static getTimetableParams(): Cash.Params {
            return Settings.timetableParams;
        }
        /**
         *
         */
        static setTimetableParams(status: Cash.Params = new Cash.Params()): Settings {
            Settings.timetableParams = status;
            return Settings;
        }
        /**
         * 
         */
        static getActivityNameFilter(): string {
            return Settings.activityNameFilter;
        }
        /**
         *
         */
        static setActivityNameFilter(status: string = ""): Settings {
            Settings.activityNameFilter = status;
            $('.devPlanSettingsActivityNameFilter').attr('value', Settings.getActivityNameFilter());
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
                Settings.setTimetableRedirect(data.timetableRedirect);
            }
            var data: any = $.cookie('devPlan.Params');
            if (data) {
                Settings.setTimetableParams(new Cash.Params(data.group_id, data.tutor_id, data.place_id));
            }
            return Settings;
        }
        /**
         * 
         */
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
            Settings.getTimetableParams().getPlaces().forEach((index: number, item: number) => {
                for (var i = 0; i < Init.getPlaces().length; i++) {
                    if (Init.getPlaces()[i].getId() == index) {
                        Settings.addTimetableParam(Init.getPlaces()[i].getLocation());
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
                timetableRedirect: Settings.getTimetableRedirect(),
                timetableParams: Settings.getTimetableParams(),
                //    activityNameFilter: ''
            };
            $.cookie.json = true;
            $.cookie('devPlan.Settings', data, { expires: 1000 });
            return Settings;
        }
        /**
         * 
         */
        static saveTimetable(): Settings {
            $.cookie.json = true;
            $.cookie('devPlan.Params', Settings.getTimetableParams(), { expires: 180 });
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
        static getCurrentDate(daysToAdd: number = 0): string {
            var date = new Date();
            date.setDate(date.getDate() + daysToAdd);
            var month: string = "";
            if (date.getMonth() <= 9) {
                month = '0' + (date.getMonth() + 1);
            } else {
                month = date.getMonth().toString();
            };
            var day: string = "";
            if (date.getDate() <= 9) {
                day = '0' + date.getDate();
            } else {
                day = date.getDate().toString();
            };
            return date.getFullYear() + '-' + month + '-' + day;
        }
        /**
         * 
         */
        static addTimetableParam(item: string) {
            var g: number = Init.searchGroupId(item);
            var t: number = Init.searchTutorId(item);
            var p: number = Init.searchPlaceId(item);
            if (g > 0 && t == 0 && p == 0) {
                $(".devPlanParams").append(Generate.devPlanParamButton(item, g, "g"));
                Settings.setTimetableParams(Settings.getTimetableParams().addGroup(g))
            }
            if (g == 0 && t > 0 && p == 0) {
                $(".devPlanParams").append(Generate.devPlanParamButton(item, t, "t"));
                Settings.setTimetableParams(Settings.getTimetableParams().addTutor(t));
            }
            if (g == 0 && t == 0 && p > 0) {
                $(".devPlanParams").append(Generate.devPlanParamButton(item, p, "p"));
                Settings.setTimetableParams(Settings.getTimetableParams().addPlace(p));
            }
            Settings.devPlanUrl();
            $('.devPlanQrCodeImg').empty().qrcode('http://devplan.uek.krakow.pl/timetable.html?timetable=' + Settings.getTimetableParams().toString())
        }
        /**
         * 
         */
        static removeTimetableParam(item: JQuery) {
            var item: JQuery = $(item);
            if (item.attr("data-type") == "g") {
                Settings.setTimetableParams(
                    Settings.getTimetableParams()
                        .removeGroup(parseInt(item.attr("data-value"))
                        )
                    );
            }
            if (item.attr("data-type") == "t") {
                Settings.setTimetableParams(
                    Settings.getTimetableParams()
                        .removeTutor(parseInt(item.attr("data-value"))
                        )
                    );
            }
            if (item.attr("data-type") == "p") {
                Settings.setTimetableParams(
                    Settings.getTimetableParams()
                        .removePlace(parseInt(item.attr("data-value"))
                        )
                    );
            }
            item.parent().remove();
            Settings.devPlanUrl();
            $('.devPlanQrCodeImg').empty().qrcode('http://devplan.uek.krakow.pl/timetable.html?timetable=' + Settings.getTimetableParams().toString())
        }
        /**
         * 
         */
        static devPlanUrl(): void {
            var devPlanUrl: any = $(".devPlanUrl").empty();
            if (!Settings.getTimetableParams().isEmpty()) {
                devPlanUrl.append('http://devplan.uek.krakow.pl/timetable.html?timetable=<wbr>' +
                    Settings.getTimetableParams().toString());
            }
        }

    }
}