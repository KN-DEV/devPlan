/// <reference path="../../typings/jquery/jquery.d.ts" />
/// <reference path="../../typings/jquery.cookie/jquery.cookie.d.ts" />
/**
 * 
 */
module devPlan {
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
        private static activityCategoryVisibility: boolean = true;
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
        private static activityTutorsList: boolean = true;
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
        public static timetableParams: devPlan.Params = new devPlan.Params();
        /**
         * 
         */
        private static activityNameFilter: string = "";
        /**
         * @since 0.8
         */
        private static page: number = 0;
        /**
         * Returns page
         * @since 0.8
         */
        public static getPage(): number {
            return Settings.page;
        }
        /**
         * Sets page
         * @since 0.8
         */
        public static setPage(page: number = 0): Settings {
            Settings.page = page;
            return Settings;
        }
        /**
         * @since 0.8
         */
        public static increasePage(): Settings {
            // Czy w ogóle już nie ma nadchodzących zajęć na dzień dzisiejszy
            if (Init.getTimetable().getDatePositionInDatesList(Settings.getCurrentDate()) != -1) {
                // Czy istnieją następne zajęcia 
                if (Init.getTimetable().isValidPositionInDatesList(
                    Init.getTimetable().getDatePositionInDatesList(Settings.getCurrentDate()) + ((Settings.getPage() + 1) * Settings.getTimetablePeriod())
                    )
                    ) {
                    Settings.setPage(Settings.getPage() + 1);
                }
                if (Init.getTimetable().isValidPositionInDatesList(
                    Init.getTimetable().getDatePositionInDatesList(Settings.getCurrentDate()) + ((Settings.getPage() + 1) * Settings.getTimetablePeriod())
                    )) {
                    $("button.devPlanTimetablePeriodNavigation.decrease").removeAttr("disabled");
                } else {
                    $("button.devPlanTimetablePeriodNavigation.increase").attr("disabled", "disabled");
                }
            } else {
                $("button.devPlanTimetablePeriodNavigation.increase").attr("disabled", "disabled");
            }
            return Settings;
        }
        /**
         * @since 0.8
         */
        public static decreasePage(): Settings {

            // Czy istnieje zajęcia poprzednie
            if (devPlan.Init.getTimetable().isValidPositionInDatesList(
                devPlan.Init.getTimetable().getDatePositionInDatesList(
                    Settings.getCurrentDate()) + ((Settings.getPage() - 1) * Settings.getTimetablePeriod())
                )) {
                Settings.setPage(Settings.getPage() - 1);
            }
            if (devPlan.Init.getTimetable().isValidPositionInDatesList(
                devPlan.Init.getTimetable().getDatePositionInDatesList(
                    Settings.getCurrentDate()) + ((Settings.getPage() - 1) * Settings.getTimetablePeriod())
                )) {
                $("button.devPlanTimetablePeriodNavigation.increase")
                    .removeAttr("disabled");
            } else {
                $("button.devPlanTimetablePeriodNavigation.decrease")
                    .attr("disabled", "disabled");
            }
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
            if (Settings.getClassCounter() == true) {
                $("input.devPlanSettingsActivityClassCounter").attr("checked", "checked");
            } else {
                $("input.devPlanSettingsActivityClassCounter").removeAttr("checked");

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
            if (Settings.getClassHourCounter() == true) {
                $("input.devPlanSettingsActivityClassHourCounter").attr("checked", "checked");
            }
            return Settings;
        }
        /**
         *
         */
        static isActivityCategoryVisible(): boolean {
            return Settings.activityCategoryVisibility;
        }
        /**
         *
         */
        static setCategoryVisibility(status: boolean = false): Settings {
            Settings.activityCategoryVisibility = status;
            if (Settings.isActivityCategoryVisible() == true) {
                $("input.devPlanSettingsShowActivityCategory").attr("checked", "checked");
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
                $("input.devPlanSettingsActivityBell").attr("checked", "checked");
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
                $("input.devPlanSettingsActivityLocation").attr("checked", "checked");
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
                $("input.devPlanSettingsActivityNote").attr("checked", "checked");
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
                $("input.devPlanSettingsActivityGroup").attr("checked", "checked");
            }
            return Settings;
        }
        /**
         *
         */
        static getActivityTutorsList(): boolean {
            return Settings.activityTutorsList;
        }
        /**
         *
         */
        static setActivityTutorsList(status: boolean = false): Settings {
            Settings.activityTutorsList = status;
            if (Settings.getActivityTutorsList()) {
                $("input.devPlanSettingsactivityTutorsList").attr("checked", "checked");
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
            if (Settings.getTimetableType() == 0) {
                $("input.devPlanSettingsTimetablePeriod")
                    .attr("disabled", "disabled");
                $("button.devPlanTimetablePeriodNavigation")
                    .attr("disabled", "disabled");
            } else {
                $("input.devPlanSettingsTimetablePeriod")
                    .removeAttr("disabled");
                $("button.devPlanTimetablePeriodNavigation")
                    .removeAttr("disabled");
            }
            $('input.devPlanSettingsTimetableType[value=\"' + Settings.getTimetableType() + '\"]')
                .attr("checked", "checked");
            return Settings;

        }
        static getTimetablePeriod(): number {
            // return parseInt(Settings.timetablePeriod);
            //
            // unary + operator acts like parseInt function
            // +a is practically the same as doing a * 1,
            // but it converts value to number if needed
            // var period: number = +Settings.timetablePeriod;
            return +Settings.timetablePeriod;
        }
        /**
         *
         */
        static setTimetablePeriod(status: number = 0): Settings {
            Settings.timetablePeriod = status;
            Settings.setPage(0);
            $('input.devPlanSettingsTimetablePeriod[value=\"' + devPlan.Settings.getTimetablePeriod() + '\"]').attr("checked", "checked");
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
                $("input.devPlanSettingsTimetableRedirect").attr("checked", "checked");
            }
            return Settings;
        }
        /**
         *
         */
        static getTimetableParams(): devPlan.Params {
            return Settings.timetableParams;
        }
        /**
         *
         */
        static setTimetableParams(status: devPlan.Params = new devPlan.Params()): Settings {
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
            $('input.devPlanSettingsActivityNameFilter').attr('value', Settings.getActivityNameFilter());
            return Settings;
        }
        /**
         *
         */
        static load(): Settings {
            $.cookie.json = true;
            var data: any = $.cookie('devPlan.Settings');
            console.log(data);
            if (data) {
                Settings.setClassCounter(data.classCounter);
                Settings.setClassHourCounter(data.classHourCounter);
                Settings.setCategoryVisibility(data.activityCategory);
                Settings.setActivityBell(data.activityBell);
                Settings.setActivityLocation(data.activityLocation);
                Settings.setActivityNote(data.activityNote);
                Settings.setActivityGroup(data.activityGroup);
                Settings.setActivityTutorsList(data.activityTutorsList);
                Settings.setTimetableType(data.timetableType);
                Settings.setTimetablePeriod(data.timetablePeriod);
                Settings.setTimetableRedirect(data.timetableRedirect);
            } else {
                Settings.setClassCounter(Settings.getClassCounter());
                Settings.setClassHourCounter(Settings.getClassHourCounter());
                Settings.setCategoryVisibility(Settings.isActivityCategoryVisible());
                Settings.setActivityBell(Settings.getActivityBell());
                Settings.setActivityLocation(Settings.getActivityBell());
                Settings.setActivityNote(Settings.getActivityNote());
                Settings.setActivityGroup(Settings.getActivityGroup());
                Settings.setActivityTutorsList(Settings.getActivityTutorsList());
                Settings.setTimetableType(Settings.getTimetableType());
                Settings.setTimetablePeriod(Settings.getTimetablePeriod());
                Settings.setTimetableRedirect(Settings.getTimetableRedirect());
            }

            var data: any = $.cookie('devPlan.Params');
            if (data) {
                Settings.setTimetableParams(new devPlan.Params(data.group_id, data.tutor_id, data.place_id));
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
                activityCategory: Settings.isActivityCategoryVisible(),
                activityBell: Settings.getActivityBell(),
                activityLocation: Settings.getActivityLocation(),
                activityNote: Settings.getActivityNote(),
                activityGroup: Settings.getActivityGroup(),
                activityTutorsList: Settings.getActivityTutorsList(),
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
         * Transform to mysql datestamp
         */
        static transformDateToDateStamp(date: Date = new Date()) {
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
        static getCurrentDate(daysToAdd: number = 0): string {
            var date = new Date();
            date.setDate(date.getDate() + daysToAdd);
            return Settings.transformDateToDateStamp(date);
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
            
            var str = Settings.getTimetableParams().toString();
            var regex = /([a-zA-Z])/g;
            str = str.replace(regex, "<wbr>$1");

            $('.devPlanExportUrl').html('http://devplan.uek.krakow.pl/export/' + str);
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
            $('.devPlanQrCodeImg')
                .empty()
                .qrcode('http://devplan.uek.krakow.pl/export/' + Settings.getTimetableParams().toString());

            $('.devPlanExportUrl').attr('value', 'http://devplan.uek.krakow.pl/export/'+ Settings.getTimetableParams().toString());
        }
        /**
         *
         */
        static devPlanUrl(): void {
            var devPlanUrl: any = $(".devPlanUrl").empty();
            if (!Settings.getTimetableParams().isEmpty()) {
                devPlanUrl.append('<a href="http://devplan.uek.krakow.pl/timetable.html?timetable=' +
                    Settings.getTimetableParams().toString() + '">link</a>');
            }
        }

    }
}
