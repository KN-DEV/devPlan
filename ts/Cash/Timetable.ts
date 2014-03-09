/// <reference path="Activity.ts" />
/// <reference path="Params.ts" />
/**
 * 
 */
module Cash {

    export interface RegisteredTimetableInterface {

        /**
         *
         */
        _id: string;
        /**
         *
         */
        access_url: string;
        /**
         *
         */
        params: Cash.Params;
    }

    export interface TimetableInterface extends RegisteredTimetableInterface {
        /**
         * 
         */
        activities: Cash.Activity[];
        /**
         * 
         */
        versions: any[];
    }


    export class RegisteredTimetable {


        /**
         *
         */
        private _id: string = "";
        /**
         *
         */
        private access_url: string = "";
        /**
         *
         */
        private params: Cash.Params = new Cash.Params();
        /**
         * 
         */
        constructor(object = { _id: "", access_url: "", params: new Cash.Params() }) {
            this.setId(object._id);
            this.setAccessUrl(object.access_url);
            this.setParams(object.params);

        }


        /**
        *
        */
        public getId(): string {
            return this._id;
        }
        /**
         *
         */
        private setId(id: string): void {
            this._id = id;
        }
        /**
         *
         */
        public getAccessUrl(): string {
            return this.access_url;
        }
        /**
         *
         */
        private setAccessUrl(access_url: string): void {
            this.access_url = access_url;
        }
        /**
         *
         */
        public getParams(): Cash.Params {
            return this.params;
        }
        /**
         *
         */
        private setParams(params: Cash.Params) {
            this.params = params;
        }
    }
    /**
     * 
     */
    export class ActivityInfo {
        /**
         * 
         */
        private id: number;
        /**
         * 
         */
        private numberOfHours: number;
        /**
         * 
         */
        private positionNumberInOrder: number;
        /**
         * 
         */
        constructor(id: number, numberOfHours: number = 0) {
            this.setId(id);
            this.setNumberOfHours(numberOfHours);
        }
        /**
         * 
         */
        public getId(): number {
            return this.id;
        }

        /**
         * 
         */
        private setId(id: number): ActivityInfo {
            this.id = id;
            return this;
        }
        /**
         * 
         */
        public getNumberOfHours(): number {
            return this.numberOfHours;
        }
        /**
         * 
         */
        private setNumberOfHours(numberOfHours: number): ActivityInfo {
            this.numberOfHours = numberOfHours;
            return this;
        }


    }
    /**
     * 
     */
    export class Timetable extends RegisteredTimetable {
        /**
         * 
         */
        private activities: Cash.Activity[] = [];
        /**
         * 
         */
        private resource_versions: any[] = [];
        /**
         * 
         */
        private maxNumberOfOccurencesOfActivity: number[] = [];
        /**
         * 
         */  
        private activityInfo: any = [[]];
        /**
         * 
         */
        constructor(object = { _id: "", access_url: "", params: new Cash.Params(), activities: [] }) {
            super(object);
            this.setActivities(object.activities);
        }
        /**
         * 
         */
        public getActivities(): Cash.Activity[] {
            return this.activities;
        }
        /**
         * 
         */
        private setActivities(activities: Cash.ActivityInterface[]): void {
            activities = activities.sort((a: any, b: any) => {return a.starts_at_timestamp - b.starts_at_timestamp });
            var id: number;
            var newActivity: Cash.Activity;
            var activity_info: Cash.ActivityInfo;
            activities.forEach(
                (activity: any, index: number) => {
                    newActivity = new Cash.Activity(activity);
                    this.activities.push(newActivity);
                    this.incrementMaxNumberOfOccurencesOfActivity(newActivity);
                    if (this.activityInfo[Cash.Activity.generateHash(newActivity)] == null) {
                        this.activityInfo[Cash.Activity.generateHash(newActivity)] = [];
                    }
                    this.activityInfo[Cash.Activity.generateHash(newActivity)].push(new Cash.ActivityInfo(
                        newActivity.getId(),
                        newActivity.getNumberOfSchoolLessons()));
                });
        }
        /**
         * Zwraca ilość wystąpień danego przedmiotu
         */
        public getMaxNumberOfOccurencesOfActivity(activity: Cash.Activity): number {
            var activityHash: string = Cash.Activity.generateHash(activity);
            return (this.maxNumberOfOccurencesOfActivity[activityHash]) == null ? 0 : this.maxNumberOfOccurencesOfActivity[activityHash].length;
        }
        /**
         * Zwiększa liczbe wystąpień danego przedmiotu
         */
        public incrementMaxNumberOfOccurencesOfActivity(activity: Cash.Activity): Cash.Timetable {
            var activityHash: string = Cash.Activity.generateHash(activity);
            if (this.getMaxNumberOfOccurencesOfActivity(activity) == 0) {
                this.maxNumberOfOccurencesOfActivity[activityHash] = new Array();
            }
            this.maxNumberOfOccurencesOfActivity[activityHash].push(activity.getId());
            return this;
        }
        /**
         * Zwraca pozycje na liście wystąpień unikalnego activity
         */
        public getPositionOfActivity(activity: Cash.Activity): number {
            var activityHash: string = Cash.Activity.generateHash(activity);
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
         * 
         */
        public sumAllHoursOfActivity(activity: Cash.Activity, full: boolean= false) {
            var activityHash = Cash.Activity.generateHash(activity);
            var sum: number = 0;
            for (var i = 0; i < this.activityInfo[activityHash].length; i++) {
                if (full || i < this.getPositionOfActivity(activity)) {
                    sum = sum + this.activityInfo[activityHash][i].getNumberOfHours();
                }
            }
            return sum;
        }
    }
}