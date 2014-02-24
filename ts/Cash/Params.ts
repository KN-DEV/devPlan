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

        private group_id: number[] = [];
        private tutor_id: number[] = [];
        private place_id: number[] = [];

        constructor(groups: number[]= [], tutors: number[]= [], places: number[]= []) {
            this.setGroups(groups);
            this.setTutors(tutors);
            this.setPlaces(places);
        }

        public getGroups = (): number[]=> {
            return this.group_id;
        }
        public setGroups(groups: number[]= []): Cash.Params {
            this.group_id = groups;
            return this;
        }

        public checkIfGroupIdExists(id: number): boolean {
            var check: boolean = false;
            for (var i = 0; i < this.getGroups().length; i++) {
                if (this.getGroups()[i] == id) {
                    check = true;
                }
            }
            return check;
        }

        public addGroup(id: number): Cash.Params {
            if (!this.checkIfGroupIdExists(id)) {
                this.getGroups().push(id);
            }
            return this;
        }

        public removeGroup(id: number): Cash.Params {

                for (var i = 0; i < this.getGroups().length; i++) {
                    if (this.getGroups()[i] == id) {
                        this.getGroups().splice(id, 1);
                    }

                }
            
            return this;
        }
        public getTutors(): number[] {
            return this.tutor_id;
        }
        public setTutors(tutors: number[]= []): Cash.Params {
            this.tutor_id = tutors;
            return this;
        }

        public checkIfTutorIdExists(id: number): boolean {
            var check: boolean = false;
            for (var i = 0; i < this.getTutors().length; i++) {
                if (this.getTutors()[i] == id) {
                    check = true;
                }
            }
            return check;
        }

        public addTutor(id: number): Cash.Params {
            if (!this.checkIfTutorIdExists(id)) {
                this.getTutors().push(id);
            }
            return this;
        }


        public removeTutor(id: number): Cash.Params {
            for (var i = 0; i < this.getTutors().length; i++) {
                if (this.getTutors()[i] == id) {
                    this.setTutors(this.getTutors().splice(id, 1));
                }

            }
            return this;
        }


        public getPlaces(): number[] {
            return this.place_id;
        }
        public setPlaces(places: number[]= []): Cash.Params {
            this.place_id = places;
            return this;
        }


        public toString() {
            var data: string = "";
            if (this.getGroups().length > 0) {
                for (var i = 0; i < this.getGroups().length; i++) {
                    data = data + this.getGroups()[i];
                }
            }
            if (this.getTutors().length > 0) {
                for (var i = 0; i < this.getTutors().length; i++) {
                    data = data + this.getTutors()[i];
                }
            }
            if (this.getPlaces().length > 0) {
                for (var i = 0; i < this.getPlaces().length; i++) {
                    data = data + this.getPlaces()[i];
                }
            }
            return data;
        }
    }
}