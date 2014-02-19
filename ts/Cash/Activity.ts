/// <reference path="Group.ts" />
/// <reference path="Tutor.ts" />
/// <reference path="Place.ts" />

module Cash {
    export interface ActivityInterface {

        category: string;
        date: string;
        day_of_week: string;
        ends_at: string;
        ends_at_timestamp: number;
        group: Cash.Group;
        id: number;
        name: string;
        notes: string;
        place: Cash.Place;
        starts_at: string;
        starts_at_timestamp: number;
        state: number;
        tutor: Cash.Tutor;
    }
    export class Activity implements Cash.ActivityInterface {
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


        public category: string = "";
        public date: string = "";
        public day_of_week: string = "";
        public ends_at: string = "";
        public ends_at_timestamp: number = 0;
        public group: Cash.Group = null;
        public id: number = 0;
        public name: string = "";
        public notes: string = "";
        public place: Cash.Place = null;
        public starts_at: string = "";
        public starts_at_timestamp: number = 0;
        public state: number = 0;
        public tutor: Cash.Tutor = null;
        /**
         * 
         */
        constructor(object: Cash.ActivityInterface = {
            category: "",
            date: "",
            day_of_week: "",
            ends_at: "",
            ends_at_timestamp: 0,
            group: null,
            id: 0,
            name: "",
            notes: "",
            place: null,
            starts_at: "",
            starts_at_timestamp: 0,
            state: 0,
            tutor: null
        }) {
            this.setCategory(object.category);
            this.setDate(object.date);
            this.setDayOfWeek(object.day_of_week);
            this.setEndsAt(object.ends_at);
            this.setEndsAtTimestamp(object.ends_at_timestamp);
            this.setGroup(object.group);
            this.setId(object.id);
            this.setName(object.name);
            this.setNotes(object.notes);
            this.setPlace(object.place);
            this.setStartsAt(object.starts_at);
            this.setStartsAtTimestamp(object.starts_at_timestamp);
            this.setState(object.state);
            this.setTutor(object.tutor);
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
        public setCategory(category: string): void {
            this.category = category;
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
        public setDate(date: string): void {
            this.date = date;
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
        public setDayOfWeek(day_of_week: string): void {
            this.day_of_week = day_of_week;
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
        public setEndsAt(ends_at: string): void {
            this.ends_at = ends_at;

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
        public setEndsAtTimestamp(ends_at_timestamp: any): void {
            this.ends_at_timestamp = ends_at_timestamp;

        }
        /**
         * 
         */
        public getGroup(): Cash.Group {
            return this.group;
        }
        /**
         * 
         */
        public setGroup(group: Cash.GroupInterface): void {
            this.group = new Cash.Group(group);

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
        public setId(id: number): void {
            this.id = id;

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
        public setName(name: string): void {
            this.name = name;

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
        public setNotes(notes: string): void {
            this.notes = notes;
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
        public setPlace(place: Cash.PlaceInterface): void {
            this.place = new Cash.Place(place);

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
        public setStartsAt(starts_at: string): void {
            this.starts_at = starts_at;

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
        public setStartsAtTimestamp(starts_at_timestamp: number): void {
            this.starts_at_timestamp = starts_at_timestamp;

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
        public setState(state: number): void {
            this.state = state;

        }
        /**
         * 
         */
        public getTutor(): Cash.Tutor {
            return this.tutor;
        }
        /**
         * 
         */
        public setTutor(tutor: Cash.TutorInterface): void {
            if (tutor != null) {
                this.tutor = new Cash.Tutor(tutor);
            } else {
                this.tutor = new Cash.Tutor();
            }
        }
        /**
         * Returns number of school lessons
         */
        public getNumberOfSchoolLessons(): number {
            var counter = 0;
            for (var i = 0; i <= Cash.Activity.alarms.length; i++) {
                if (Cash.Activity.alarms[i] == this.getStartsAt()) {
                    for (var j = i; j <= Cash.Activity.alarms.length; j++) {
                        if (Cash.Activity.alarms[j] <= this.getEndsAt()) {
                            counter++;
                        }
                    }
                    break;
                }
            }
            return counter / 2;
        }
    }
}