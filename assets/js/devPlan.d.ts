/// <reference path="../../ts/Cash/Activity.d.ts" />
/// <reference path="../../typings/jquery/jquery.d.ts" />
/// <reference path="../../typings/jquery.cookie/jquery.cookie.d.ts" />
/// <reference path="../../typings/bootstrap/bootstrap.d.ts" />
/// <reference path="../../typings/storejs/storejs.d.ts" />
/// <reference path="../../ts/Cash/Timetable.d.ts" />
declare module devPlan {
    class Group {
        private id;
        private name;
        constructor(id?: number, name?: string);
        public getId(): number;
        public setId(id?: number): void;
        public getName(): string;
        public setName(name?: string): void;
    }
}
declare module devPlan {
    class Tutor {
        private id;
        public name: string;
        public moodle_url: string;
        constructor(id?: number, name?: string, moodle_url?: string);
        public getId(): number;
        public setId(id?: number): void;
        public getName(): string;
        public setName(name?: string): void;
        public getMoodleUrl(): string;
        public setMoodleUrl(moodle_url?: string): void;
    }
}
declare module devPlan {
    class Place {
        private id;
        private location;
        constructor(id?: number, location?: string);
        public getId(): number;
        public setId(id?: number): void;
        public getLocation(): string;
        public setLocation(location?: string): void;
    }
}
declare module devPlan {
    class Activity {
        private category;
        private date;
        private day_of_week;
        private ends_at;
        private ends_at_timestamp;
        private group;
        private id;
        private name;
        private notes;
        private place;
        private starts_at;
        private starts_at_timestamp;
        private state;
        private tutor;
        static alarms: string[];
        constructor(object: Cash.ActivityInterface);
        public getCategory(): string;
        public setCategory(category: string): Activity;
        public getDate(): string;
        public setDate(date: string): Activity;
        public getDayOfWeek(): string;
        public setDayOfWeek(day_of_week: string): Activity;
        public getEndsAt(): string;
        public setEndsAt(ends_at: string): Activity;
        public getEndsAtTimestamp(): number;
        public setEndsAtTimestamp(ends_at_timestamp: any): Activity;
        public getGroup(): Group;
        public setGroup(group: Cash.GroupInterface): Activity;
        public getId(): number;
        public setId(id: number): Activity;
        public getName(): string;
        public setName(name: string): Activity;
        public getNotes(): string;
        public setNotes(notes: string): Activity;
        public getPlace(): any;
        public setPlace(place?: Cash.PlaceInterface): Activity;
        public getStartsAt(): string;
        public setStartsAt(starts_at: string): Activity;
        public getStartsAtTimestamp(): number;
        public setStartsAtTimestamp(starts_at_timestamp: number): Activity;
        public getState(): number;
        public setState(state: number): Activity;
        public getTutor(): Tutor;
        public setTutor(tutor: Cash.TutorInterface): Activity;
        public getNumberOfSchoolLessons(): number;
        static generateHash(activity: Activity): string;
        public contains(query: string, indexgroup?: string): boolean;
    }
}
declare module devPlan {
    class Params {
        private group_id;
        private tutor_id;
        private place_id;
        constructor(groups?: number[], tutors?: number[], places?: number[]);
        public getGroups: () => number[];
        public setGroups(groups?: number[]): Params;
        public checkIfGroupIdExists(id: number): boolean;
        public addGroup(id: number): Params;
        public removeGroup(id: number): Params;
        public getTutors(): number[];
        public setTutors(tutors?: number[]): Params;
        public checkIfTutorIdExists(id: number): boolean;
        public addTutor(id: number): Params;
        public removeTutor(id: number): Params;
        public getPlaces(): number[];
        public setPlaces(places?: number[]): Params;
        public checkIfPlaceIdExists(id: number): boolean;
        public addPlace(id: number): Params;
        public removePlace(id: number): Params;
        public isEmpty(): boolean;
        public haveOnlyOneTutor(): boolean;
        public haveOnlyOneGroup(): boolean;
        public toString(): string;
        static fromString(str?: string): Params;
    }
}
declare module devPlan {
    class TimetableRegistered {
        private _id;
        private access_url;
        private params;
        constructor(object?: {
            _id: string;
            access_url: string;
            params: Params;
        });
        public getId(): string;
        private setId(id);
        public getAccessUrl(): string;
        private setAccessUrl(access_url);
        public getParams(): Params;
        private setParams(params);
    }
}
declare module devPlan {
    class ActivityInfo {
        private id;
        private numberOfHours;
        private positionNumberInOrder;
        constructor(id: number, numberOfHours?: number);
        public getId(): number;
        private setId(id);
        public getNumberOfHours(): number;
        private setNumberOfHours(numberOfHours);
    }
}
declare module devPlan {
    class Timetable {
        private _id;
        private params;
        private activities;
        private versions;
        private maxNumberOfOccurencesOfActivity;
        private activityInfo;
        private datesList;
        constructor(object?: {
            _id: string;
            params: Params;
            versions: {};
            activities: any[];
        });
        public getId(): string;
        private setId(id);
        public getParams(): Params;
        private setParams(params?);
        public getVersions(): Object;
        private setVersions(versions);
        public getActivities(): Activity[];
        private setActivities(activities);
        public getMaxNumberOfOccurencesOfActivity(activity: Activity): number;
        public incrementMaxNumberOfOccurencesOfActivity(activity: Activity): Timetable;
        public getPositionOfActivity(activity: Activity): number;
        public sumAllHoursOfActivity(activity: Activity, full?: boolean): number;
        public getDatesList(): string[];
        public getDateFromDatesListByPosition(id?: number): string;
        public isValidPositionInDatesList(id: number): boolean;
        public pushDateToDatesList(date: string): Timetable;
        public checkIfDateExistsInDatesList(date: string): boolean;
        public getDatePositionInDatesList(date: string): number;
        public isUpToDate(versions: TimetableVersion): boolean;
    }
}
declare module devPlan {
    class TimetableVersion {
        private _id;
        private versions;
        constructor(_id?: string, versions?: {});
        public getId(): string;
        private setId(id?);
        public getVersions(): Object;
        private setVersions(versions?);
    }
}
declare module Cash {
    class Api {
        private static host;
        static getGroupsList(useCache?: boolean, ttl?: number): JQueryXHR;
        static getTutorsList(useCache?: boolean, ttl?: number): JQueryXHR;
        static getPlacesList(useCache?: boolean, ttl?: number): JQueryXHR;
        static registerTimetable(groups?: number[], tutors?: number[], places?: number[]): JQueryXHR;
        static getTimetable(query: string, cache?: boolean, ttl?: number, notOverRide?: boolean): JQueryXHR;
        static removeTimetableCache(query: string): void;
        static getTimetableVersion(query: string): any;
        static isUpToDateVersion(local: any, downloaded: any): boolean;
    }
}
declare module devPlan {
    class Settings {
        private static classCounter;
        private static classHourCounter;
        private static activityCategoryVisibility;
        private static activityBell;
        private static activityLocation;
        private static activityNote;
        private static activityGroup;
        private static activityTutorsList;
        private static timetableType;
        private static timetablePeriod;
        private static timetableRedirect;
        static timetableParams: Params;
        private static activityNameFilter;
        private static page;
        static getPage(): number;
        static setPage(page?: number): Settings;
        static increasePage(): Settings;
        static decreasePage(): Settings;
        static getClassCounter(): boolean;
        static setClassCounter(status?: boolean): Settings;
        static getClassHourCounter(): boolean;
        static setClassHourCounter(status?: boolean): Settings;
        static isActivityCategoryVisible(): boolean;
        static setCategoryVisibility(status?: boolean): Settings;
        static getActivityBell(): boolean;
        static setActivityBell(status?: boolean): Settings;
        static getActivityLocation(): boolean;
        static setActivityLocation(status?: boolean): Settings;
        static getActivityNote(): boolean;
        static setActivityNote(status?: boolean): Settings;
        static getActivityGroup(): boolean;
        static setActivityGroup(status?: boolean): Settings;
        static getActivityTutorsList(): boolean;
        static setActivityTutorsList(status?: boolean): Settings;
        static getTimetableType(): number;
        static setTimetableType(status?: number): Settings;
        static getTimetablePeriod(): number;
        static setTimetablePeriod(status?: number): Settings;
        static getTimetableRedirect(): boolean;
        static setTimetableRedirect(status?: boolean): Settings;
        static getTimetableParams(): Params;
        static setTimetableParams(status?: Params): Settings;
        static getActivityNameFilter(): string;
        static setActivityNameFilter(status?: string): Settings;
        static load(): Settings;
        static loadTimetableParam(): void;
        static save(): Settings;
        static saveTimetable(): Settings;
        static getUrlParam(key: string): string;
        static transformDateToDateStamp(date?: Date): string;
        static getCurrentDate(daysToAdd?: number): string;
        static addTimetableParam(item: string): void;
        static removeTimetableParam(item: JQuery): void;
        static devPlanUrl(): void;
    }
}
declare module devPlan {
    class Generate {
        static dayOfWeek: string[];
        static month: string[];
        static dateInformation(activity: Activity): string;
        static activityName(activity: Activity): string;
        static activityNote(activity: Activity): string;
        static activityStartStop(start: Date, stop: Date): string;
        static activityCategory(activity: Activity): string;
        static activityLocation(activity: Activity): string;
        static activityCounter(min: number, max: number): string;
        static hourInformation(value: number, have: number, all: number): string;
        static activityTutorsList(activity: Activity): string;
        static devPlanParamButton(item: any, id: number, type: string): string;
        static activityGroupsList(groups?: Group[]): string;
        static activity(timetable: Timetable, activity: Activity, groups?: Group[]): string;
        static timetable(timetable: Timetable): void;
    }
}
interface JQuery {
    qrcode: any;
}
interface JQueryStatic {
    jStorage: any;
}
declare module devPlan {
    function bindAnimation(): void;
}
declare module devPlan {
    enum CacheTime {
        Group = 6,
        Tutor = 6,
        Place = 6,
        Timetable = 6,
    }
    class Init {
        static typeaheadLimit: number;
        static placesInUse: boolean;
        static tutorsInUse: boolean;
        private static groups;
        private static tutors;
        private static places;
        static timetable: Timetable;
        constructor();
        static getGroups(): Group[];
        static setGroups(groups?: Cash.GroupInterface[]): Init;
        static searchGroupId(name: string): number;
        static getTutors(): Tutor[];
        static setTutors(tutors?: Cash.TutorInterface[]): Init;
        static searchTutorId(name: string): number;
        static getPlaces(): Place[];
        static setPlaces(places?: any): Init;
        static searchPlaceId(name: string): number;
        static loadTimetable(params: Params): void;
        static getTimetable(): Timetable;
        static setTimetable(timetable: any): typeof Init;
        static typeaheadDataCreator(groups?: Group[], tutors?: Tutor[], places?: Place[]): string[];
        static setUpButtons(params: Params): void;
    }
}
declare function containsIndexGroups(indexgroups?: string, query?: string): boolean;
declare function sendIssue(): void;
