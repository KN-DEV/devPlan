module Cash {
    /**
     * Model of Timetable param data
     */
    export interface ParamsInterface {
        group_id: number[];
        tutor_id: number[];
        place_id: number[];
    }
    /**
     * 
     */
    export class Params {
        /**
         * Group id collection
         */
        private group_id: number[] = [];
        /**
         * Tutor id collection
         */
        private tutor_id: number[] = [];
        /**
         * Place id collection
         */
        private place_id: number[] = [];
        /**
         * 
         */
        constructor(groups: number[]= [], tutors: number[]= [], places: number[]= []) {
            this.setGroups(groups);
            this.setTutors(tutors);
            this.setPlaces(places);
        }
        /**
         * 
         */
        public getGroups = (): number[]=> {
            return this.group_id;
        }
        /**
         * 
         */
        public setGroups(groups: number[]= []): Cash.Params {
            this.group_id = groups.sort((a, b) => {return a - b });
            return this;
        }
        /**
         * 
         */
        public checkIfGroupIdExists(id: number): boolean {
            var check: boolean = false;
            for (var i = 0; i < this.getGroups().length; i++) {
                if (this.getGroups()[i] == id) {
                    check = true;
                }
            }
            return check;
        }
        /**
         * 
         */
        public addGroup(id: number): Cash.Params {
            if (!this.checkIfGroupIdExists(id)) {
                this.getGroups().push(id);
                this.setGroups(this.getGroups().sort((a, b) => {return a - b }));
            }
            return this;
        }
        /**
         * 
         */
        public removeGroup(id: number): Cash.Params {
            
            for (var i = 0; i < this.getGroups().length; i++) {
                if (this.getGroups()[i] == id) {
                    this.getGroups().splice(i, 1);
                }
            }
            return this;
        }
        /**
         * 
         */
        public getTutors(): number[] {
            return this.tutor_id;
        }
        /**
         * 
         */
        public setTutors(tutors: number[]= []): Cash.Params {
            this.tutor_id = tutors.sort((a, b) => {return a - b });
            return this;
        }
        /**
         * 
         */
        public checkIfTutorIdExists(id: number): boolean {
            var check: boolean = false;
            for (var i = 0; i < this.getTutors().length; i++) {
                if (this.getTutors()[i] == id) {
                    check = true;
                }
            }
            return check;
        }
        /**
         * 
         */
        public addTutor(id: number): Cash.Params {
            if (!this.checkIfTutorIdExists(id)) {
                this.getTutors().push(id);
                this.setTutors(this.getTutors().sort((a, b) => {return a - b }));
            }
            return this;
        }
        /**
         * 
         */
        public removeTutor(id: number): Cash.Params {
            
            
            for (var i = 0; i < this.getTutors().length; i++) {
                if (this.getTutors()[i] == id) {
                   this.getTutors().splice(i, 1);
                }
            }
            return this;
        }
        /**
         * 
         */
        public getPlaces(): number[] {
            return this.place_id;
        }
        /**
         * 
         */
        public setPlaces(places: number[]= []): Cash.Params {
            this.place_id = places.sort((a, b) => {return a - b });
            return this;
        }
        /**
         * 
         */
        public checkIfPlaceIdExists(id: number): boolean {
            var check: boolean = false;
            for (var i = 0; i < this.getPlaces().length; i++) {
                if (this.getPlaces()[i] == id) {
                    check = true;
                }
            }
            return check;
        }
        /**
         * 
         */
        public addPlace(id: number): Cash.Params {
            if (!this.checkIfPlaceIdExists(id)) {
                this.getPlaces().push(id);
                this.setPlaces(this.getPlaces().sort((a, b) => {return a - b }));
            }
            return this;
        }
        /**
         * 
         */
        public removePlace(id: number): Cash.Params {
            for (var i = 0; i < this.getPlaces().length; i++) {
                if (this.getPlaces()[i] == id) {
                   this.getPlaces().splice(i, 1);
                }
            }
            return this;
        }
        /**
         * 
         */
        public isEmpty() {
            return (this.getGroups().length == 0) && (this.getTutors().length == 0) && (this.getPlaces().length == 0);
        }
        /**
         * 
         */
        public toString() {
            var data: string = "";
            for (var i = 0; i < this.getGroups().length; i++) {
                data = data + 'g' + this.getGroups()[i];
            }
            for (var i = 0; i < this.getTutors().length; i++) {
                data = data + 't' + this.getTutors()[i];
            }
            for (var i = 0; i < this.getPlaces().length; i++) {
                data = data + 'p' + this.getPlaces()[i];
            }
            return data;
        }
        /**
         * 
         */
        public static fromString(query: string): Cash.Params {
            var params = new Cash.Params();
            var timetable = query.match(/[gtp][0-9]*/gi);
            for (var i = 0; i < timetable.length; i++) {
                if (timetable[i].toString().toLowerCase().indexOf("g") != -1) {
                    params.addGroup(parseInt(timetable[i].slice(1).toString()));
                }
                if (timetable[i].toString().toLowerCase().indexOf("t") != -1) {
                    params.addTutor(parseInt(timetable[i].slice(1).toString()));
                }
                if (timetable[i].toString().toLowerCase().indexOf("p") != -1) {
                    params.addTutor(parseInt(timetable[i].slice(1).toString()));
                }
            }
            return params;

        }

    }
}