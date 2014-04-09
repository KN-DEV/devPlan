/// <reference path="Activity.ts" />
/// <reference path="Params.ts" />
/// <reference path="Timetable/Registered.ts" />
/// <reference path="Activity/Info.ts" />

module devPlan {
    /**
     * Class represents response from Cash service for registered timetable with additional behaviors
     * @version 0.8
     */
    export class Timetable {
        /**
        * Timetable id
        * @since 0.8
        */
        private _id: string = "";

        /**
         * Timetable params
         * @since 0.8
         */
        private params: Params = new devPlan.Params();

        /**
         * Timetable activities
         * @since 0.8
         */
        private activities: devPlan.Activity[] = [];

        /**
         * Timetable resources version
         * @since 0.8
         */
        private versions: Object = {};

        /**
         * @since 0.8
         */
        private maxNumberOfOccurencesOfActivity: number[] = [];

        /**
         * @since 0.8
         */
        private activityInfo: any = [[]];

        /**
         * Collection of all dates in activities
         * @since 0.8
         */
        private datesList: string[] = [];

        /**
         * @since 0.8
         */
        constructor(object= { _id: "", params: new devPlan.Params(), versions: {}, activities: [] }) {
            this.setId(object._id)
                .setParams(object.params)
                .setVersions(object.versions)
                .setActivities(object.activities);
        }

        /**
         * Returns timetable id
         * @since 0.8
         */
        public getId(): string {
            return this._id;
        }

        /**
         * Sets timetable id
         * @since 0.8
         */
        private setId(id: string): Timetable {
            this._id = id;
            return this;
        }

        /**
         * Returns timetable params
         * @since 0.8
         */
        public getParams(): devPlan.Params {
            return this.params;
        }
        /**
         * Sets timetable params
         * @since 0.8
         */
        private setParams(params: any= { group_id: [], tutor_id: [], place_id: [] }): Timetable {
            this.params = new devPlan.Params(params.group_id, params.tutor_id, params.place_id);
            return this;
        }
        /**
        * Returns timetable versions
        * @since 0.8
        */
        public getVersions(): Object {
            return this.versions;
        }

        /**
         * Sets timetable versions
         * @since 0.8
         */
        private setVersions(versions: Object): Timetable {
            this.versions = versions;
            return this;
        }

        /**
         * Returns activities collection
         * @since 0.8
         */
        public getActivities(): devPlan.Activity[] {
            return this.activities;
        }
        /**
         * Sets activities collection
         * @since 0.8
         */
        private setActivities(activities: Cash.ActivityInterface[]): Timetable {
            activities = activities.sort((a: any, b: any) => {return a.starts_at_timestamp - b.starts_at_timestamp });
            var id: number;
            var newActivity: devPlan.Activity;
            var activity_info: devPlan.ActivityInfo;
            activities.forEach(
                (activity: any, index: number) => {
                    newActivity = new devPlan.Activity(activity);
                    this.pushDateToDatesList(newActivity.getDate());
                    this.activities.push(newActivity);
                    this.incrementMaxNumberOfOccurencesOfActivity(newActivity);
                    if (this.activityInfo[devPlan.Activity.generateHash(newActivity)] == null) {
                        this.activityInfo[devPlan.Activity.generateHash(newActivity)] = [];
                    }
                    this.activityInfo[devPlan.Activity.generateHash(newActivity)].push(new devPlan.ActivityInfo(
                        newActivity.getId(),
                        newActivity.getNumberOfSchoolLessons()));
                });
            return this;
        }

        /**
         * Zwraca ilość wystąpień danego przedmiotu
         * @since 0.8
         */
        public getMaxNumberOfOccurencesOfActivity(activity: devPlan.Activity): number {
            var activityHash: string = devPlan.Activity.generateHash(activity);
            return (this.maxNumberOfOccurencesOfActivity[activityHash]) == null ? 0 : this.maxNumberOfOccurencesOfActivity[activityHash].length;
        }

        /**
         * Zwiększa liczbe wystąpień danego przedmiotu
         * @since 0.8
         */
        public incrementMaxNumberOfOccurencesOfActivity(activity: devPlan.Activity): devPlan.Timetable {
            var activityHash: string = devPlan.Activity.generateHash(activity);
            if (this.getMaxNumberOfOccurencesOfActivity(activity) == 0) {
                this.maxNumberOfOccurencesOfActivity[activityHash] = new Array();
            }
            this.maxNumberOfOccurencesOfActivity[activityHash].push(activity.getId());
            return this;
        }

        /**
         * Returns position in unique activity occurence list
         * @since 0.8
         */
        public getPositionOfActivity(activity: devPlan.Activity): number {
            var activityHash: string = devPlan.Activity.generateHash(activity);
            if (this.maxNumberOfOccurencesOfActivity[activityHash].length > 0) {
                for (var i = 0; i < this.maxNumberOfOccurencesOfActivity[activityHash].length; i++) {
                    if (this.maxNumberOfOccurencesOfActivity[activityHash][i] == activity.getId()) {
                        return (i + 1);
                    }
                }
            }
            return -1;
        }

        /**
         * @since 0.8
         */
        public sumAllHoursOfActivity(activity: devPlan.Activity, full: boolean= false) {
            var activityHash = devPlan.Activity.generateHash(activity);
            var sum: number = 0;
            for (var i = 0; i < this.activityInfo[activityHash].length; i++) {
                if (full || i < this.getPositionOfActivity(activity)) {
                    sum = sum + this.activityInfo[activityHash][i].getNumberOfHours();
                }
            }
            return sum;
        }

        /**
         * Returns list of all dates in which activities occurred
         * @since 0.8
         */
        public getDatesList(): string[] {
            return this.datesList;
        }

        /**
         * Returns date from dates collection by position
         * @since 0.8
         */
        public getDateFromDatesListByPosition(id: number= 0) {

            if (this.isValidPositionInDatesList(id)) {
                return this.getDatesList()[id];
            } else {
                if (id < 0) {
                    return this.getDatesList()[0];
                }
                if (id > this.getDatesList().length) {
                    return this.getDatesList()[this.getDatesList().length];
                }
            }
        }

        /**
         * Is valid position in dates collection
         * @since 0.8
         */

        public isValidPositionInDatesList(id: number) {
            return id >-1 && id < this.getDatesList().length;
        }
        /**
         * Pushs date to dates list when not exists
         * @since 0.8
         */
        public pushDateToDatesList(date: string): Timetable {
            if (this.checkIfDateExistsInDatesList(date) == false) {
                this.datesList.push(date);
            }
            return this;
        }

        /**
         * Checks if given value exists in dates list
         * @since 0.8
         */
        public checkIfDateExistsInDatesList(date: string): boolean {
            for (var i = 0; i < this.getDatesList().length; i++) {
                if (this.getDatesList()[i] == date) {
                    return true;
                }
            }
            return false;
        }

        /**
         * Returns position of date in dates collection
         * @since 0.8
         */
        public getDatePositionInDatesList(date: string): number {
            for (var i = 0; i < this.getDatesList().length; i++) {
                if (this.getDatesList()[i] >= date) {
                    return i;
                }
            }
            return -1;
        }

        public isUpToDate(versions: devPlan.TimetableVersion): boolean {
            return JSON.stringify(new devPlan.TimetableVersion(this.getId(), this.getVersions())) == JSON.stringify(versions);
        }
    }
}