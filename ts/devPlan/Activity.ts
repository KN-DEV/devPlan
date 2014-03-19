/// <reference path="../Cash/Activity.d.ts" />
/// <reference path="./Group.ts" />
/// <reference path="./Tutor.ts" />
/// <reference path="./Place.ts" />
/**
 * 
 */
module devPlan {
    /**
     * 
     */
    export class Activity {
        /**
         * 
         */
        private category: string = "";
        /**
         * 
         */
        private date: string = "";
        /**
         * 
         */
        private day_of_week: string = "";
        /**
         * 
         */
        private ends_at: string = "";
        /**
         * 
         */
        private ends_at_timestamp: number = 0;
        /**
         * 
         */
        private group: devPlan.Group = new devPlan.Group();
        /**
         * 
         */
        private id: number = 0;
        /**
         * 
         */
        private name: string = "";
        /**
         * 
         */
        private notes: string = "";
        /**
         * 
         */
        private place: devPlan.Place = new devPlan.Place();
        /**
         * 
         */
        private starts_at: string = "";
        /**
         * 
         */
        private starts_at_timestamp: number = 0;
        /**
         * 
         */
        private state: number = 0;
        /**
         * 
         */
        private tutor: devPlan.Tutor = new devPlan.Tutor();
        /**
        * 
        */
        public static alarms = [
            "07:50", "08:35", "08:45", "09:30", "09:35", "10:20",
            "10:30", "11:15", "11:20", "12:05", "12:15", "13:00",
            "13:05", "13:50", "14:00", "14:45", "14:50", "15:35",
            "15:40", "16:25", "16:30", "17:15", "17:20", "18:05",
            "18:10", "18:55", "19:00", "19:45", "19:50", "20:35",
        ];
        /**
         * 
         */
        constructor(object: Cash.ActivityInterface) {
            this.setCategory(object.category)
                .setDate(object.date)
                .setDayOfWeek(object.day_of_week)
                .setEndsAt(object.ends_at)
                .setEndsAtTimestamp(object.ends_at_timestamp)
                .setStartsAt(object.starts_at)
                .setStartsAtTimestamp(object.starts_at_timestamp)
                .setState(object.state)
                .setId(object.id)
                .setName(object.name);
            if (object.notes != null) {
                this.setNotes(object.notes);
            }
            if (object.group != null) {
                this.setGroup(object.group);
            }

            if (object.place != null) {
                this.setPlace(object.place);
            }
            if (object.tutor != null) {
                this.setTutor(object.tutor);
            }
        }
        /**
         * 
         */
        public getCategory(): string {
            return this.category;
        }
        /**
         * 
         */
        public setCategory(category: string): Activity {
            this.category = category;
            return this;
        }
        /**
         * 
         */
        public getDate(): string {
            return this.date;
        }
        /**
         * 
         */
        public setDate(date: string): Activity {
            this.date = date;
            return this;
        }
        /**
         * 
         */
        public getDayOfWeek(): string {
            return this.day_of_week;
        }
        /**
         * 
         */
        public setDayOfWeek(day_of_week: string): Activity {
            this.day_of_week = day_of_week;
            return this;
        }
        /**
         * 
         */
        public getEndsAt(): string {
            return this.ends_at;
        }
        /**
         * 
         */
        public setEndsAt(ends_at: string): Activity {
            this.ends_at = ends_at;
            return this;

        }
        /**
         * 
         */
        public getEndsAtTimestamp(): number {
            return this.ends_at_timestamp;
        }
        /**
         * 
         */
        public setEndsAtTimestamp(ends_at_timestamp: any): Activity {
            this.ends_at_timestamp = ends_at_timestamp;
            return this;
        }
        /**
         * 
         */
        public getGroup(): devPlan.Group {
            return this.group;
        }
        /**
         * 
         */
        public setGroup(group: Cash.GroupInterface): Activity {
            this.group = new devPlan.Group(group.id, group.name);
            return this;
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
        public setId(id: number): Activity {
            this.id = id;
            return this;

        }
        /**
         * 
         */
        public getName(): string {
            return this.name;
        }
        /**
         * 
         */
        public setName(name: string): Activity {
            this.name = name;
            return this;

        }
        /**
         * 
         */
        public getNotes(): string {
            return this.notes;
        }
        /**
         * 
         */
        public setNotes(notes: string): Activity {
            this.notes = notes;
            return this;
        }
        /**
         * 
         */
        public getPlace(): any {
            return this.place;
        }
        /**
         * 
         */
        public setPlace(place: Cash.PlaceInterface = { id: 0, location: "" }): Activity {
            this.place = new devPlan.Place(place.id != null ? place.id : 0, place.location != null ? place.location : "");
            return this;
        }
        /**
         * 
         */
        public getStartsAt(): string {
            return this.starts_at;
        }
        /**
         * 
         */
        public setStartsAt(starts_at: string): Activity {
            this.starts_at = starts_at;
            return this;

        }
        /**
         * 
         */
        public getStartsAtTimestamp(): number {
            return this.starts_at_timestamp;
        }
        /**
         * 
         */
        public setStartsAtTimestamp(starts_at_timestamp: number): Activity {
            this.starts_at_timestamp = starts_at_timestamp;
            return this;

        }
        /**
         * 
         */
        public getState(): number {
            return this.state;
        }
        /**
         * 
         */
        public setState(state: number): Activity {
            this.state = state;
            return this;

        }
        /**
         * 
         */
        public getTutor(): Tutor {
            return this.tutor;
        }
        /**
         * 
         */
        public setTutor(tutor: Cash.TutorInterface): Activity {
            this.tutor = new Tutor(tutor.id, tutor.name, tutor.moodle_url);
            return this;
        }
        /**
         * Returns number of school lessons
         */
        public getNumberOfSchoolLessons(): number {
            var counter: number = 0;
            for (var i = 0; i <= devPlan.Activity.alarms.length; i++) {
                if (devPlan.Activity.alarms[i] == this.getStartsAt()) {
                    for (var j = i; j <= devPlan.Activity.alarms.length; j++) {
                        if (devPlan.Activity.alarms[j] <= this.getEndsAt()) {
                            counter++;
                        }
                    }
                    break;
                }
            }
            return (counter / 2);
        }
        /**
         * 
         */
        public static generateHash(activity: Activity): string {
            return activity.getGroup().getId() + '-' + activity.getName() + '-' + activity.getCategory() + '-' + activity.getTutor().getId();
        }
        /**
         * 
         */
        public contains(query: string, indexgroup: string = ''): boolean {
            var items: string[] = query.toString().toLowerCase().split(" ");
            var item: string = "";
            var values: boolean[] = [];
            var date: Date = new Date((this.getStartsAtTimestamp() * 1000));
            for (var i = 0; i < items.length; i++) {
                item = items[i];
                if ((this.getName().toLowerCase().indexOf(item) > -1) ||
                    (this.getTutor().getName().toLowerCase().indexOf(item) > -1) ||
                    (this.getNotes().toLowerCase().indexOf(item) > -1) ||
                    (this.getCategory().toLowerCase().indexOf(item) > -1) ||
                    (this.getStartsAt().toLowerCase().indexOf(item) > -1) ||
                    (this.getEndsAt().toLowerCase().indexOf(item) > -1) ||
                    (this.getPlace().getLocation().toLowerCase().indexOf(item) > -1) ||
                    //
                    (date.getFullYear().toString().toLowerCase().indexOf(item) > -1) ||
                    (devPlan.Settings.transformDateToDateStamp(date).toLowerCase().indexOf(item) > -1) ||
                    (devPlan.Generate.month[date.getMonth()].toLowerCase().indexOf(item) > -1) ||
                    (devPlan.Generate.dayOfWeek[date.getDay()].toLowerCase().indexOf(item) > -1) ||
                    (date.getDate().toString().toLowerCase().indexOf(item) > -1) ||
                    //
                    (containsIndexGroups(indexgroup, item))) {
                    //
                    values.push(true);
                } else {
                    values.push(false);
                }
            }
            for (i = 0; i < values.length; i++) {
                if (values[i] == false) {
                    return false;
                }
            }
            return true;
        }

    }
}