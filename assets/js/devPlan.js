/// <reference path="DefinitelyTyped/typeahead/typeahead.d.ts" />
/// <reference path="DefinitelyTyped/jquery/jquery.d.ts" />
/**
* Cash service
*/
var Cash;
(function (Cash) {
    

    

    

    

    

    /**
    * Cash API implementation
    */
    var Api = (function () {
        function Api() {
        }
        /**
        * Gets list of all groups available in cash service
        */
        Api.getGroupsList = function (jqueryAjaxSettings) {
            if (typeof jqueryAjaxSettings === "undefined") { jqueryAjaxSettings = Cash.Api.jqueryAjaxSettings; }
            jqueryAjaxSettings.url = Cash.Api.host + "groups";
            $.ajax(jqueryAjaxSettings);
        };

        /**
        * Gets list of all tutors available in cash service
        */
        Api.getTutorsList = function (jqueryAjaxSettings) {
            if (typeof jqueryAjaxSettings === "undefined") { jqueryAjaxSettings = Cash.Api.jqueryAjaxSettings; }
            jqueryAjaxSettings.url = Cash.Api.host + "tutors";
            $.ajax(jqueryAjaxSettings);
        };

        /**
        * Gets list of all places available in cash service
        */
        Api.getPlacesList = function (jqueryAjaxSettings) {
            if (typeof jqueryAjaxSettings === "undefined") { jqueryAjaxSettings = Cash.Api.jqueryAjaxSettings; }
            jqueryAjaxSettings.url = Cash.Api.host + "places";
            $.ajax(jqueryAjaxSettings);
        };

        /**
        * Registers timetable
        */
        Api.registerTimetable = function (jqueryAjaxSettings) {
            jqueryAjaxSettings.url = Cash.Api.host + "timetables";
            jqueryAjaxSettings.type = "POST", $.ajax(jqueryAjaxSettings);
            return this;
        };
        Api.host = "http://cash.dev.uek.krakow.pl/v0_1/";

        Api.jqueryAjaxSettings = {
            dataType: "json",
            type: "GET",
            cache: true,
            async: false,
            success: function (data) {
                console.log(data);
            }
        };
        return Api;
    })();
    Cash.Api = Api;
})(Cash || (Cash = {}));

/**
* devPlan App
*/
var devPlan = (function () {
    /**
    *
    */
    function devPlan() {
        /**
        * Keeps list of groups from Cash service
        */
        this.groups = [];
        /**
        * Keeps list of tutors from Cash service
        */
        this.tutors = [];
        /**
        * Keeps list of places from Cash service
        */
        this.places = [];
        this.loadGroups();
        this.loadTutors();
        this.loadPlaces();
    }
    /**
    *
    */
    devPlan.prototype.getGroups = function () {
        return this.groups;
    };

    /**
    *
    */
    devPlan.prototype.setGroups = function (groups) {
        this.groups = groups;
        return this;
    };

    /**
    *
    */
    devPlan.prototype.getTutors = function () {
        return this.tutors;
    };

    /**
    *
    */
    devPlan.prototype.setTutors = function (tutors) {
        this.tutors = tutors;
        return this;
    };

    /**
    *
    */
    devPlan.prototype.getPlaces = function () {
        return this.places;
    };

    /**
    *
    */
    devPlan.prototype.setPlaces = function (places) {
        this.places = places;
        return this;
    };

    /**
    *
    */
    devPlan.prototype.loadGroups = function () {
        var _this = this;
        var jqueryAjaxSettings = Cash.Api.jqueryAjaxSettings;
        jqueryAjaxSettings.success = function (data) {
            _this.setGroups(data);
        };
        Cash.Api.getGroupsList(jqueryAjaxSettings);
        return this;
    };

    /**
    *
    */
    devPlan.prototype.loadTutors = function () {
        var _this = this;
        var jqueryAjaxSettings = Cash.Api.jqueryAjaxSettings;
        jqueryAjaxSettings.success = function (data) {
            _this.setTutors(data);
        };
        Cash.Api.getTutorsList(jqueryAjaxSettings);
        return this;
    };

    /**
    * @TODO sprawdzić co zwraca success
    */
    devPlan.prototype.loadPlaces = function () {
        var _this = this;
        var jqueryAjaxSettings = Cash.Api.jqueryAjaxSettings;
        jqueryAjaxSettings.success = function (data) {
            _this.setPlaces(data);
        };
        Cash.Api.getPlacesList(jqueryAjaxSettings);
        return this;
    };

    /**
    *
    */
    devPlan.prototype.getTypeaheadDatumsForGroups = function (groups) {
        if (typeof groups === "undefined") { groups = this.groups; }
        var data = [];
        for (var i = 0; i < groups.length; i++) {
            data[i] = {
                value: groups[i].name,
                tokens: groups[i].name.replace(".", "").split(" "),
                id: groups[i].id,
                name: groups[i].name
            };
        }
        ;
        return data;
    };

    /**
    *
    */
    devPlan.prototype.getTypeaheadDatumsForTutors = function (tutors) {
        if (typeof tutors === "undefined") { tutors = this.tutors; }
        var data = [];

        for (var i = 0; i < tutors.length; i++) {
            data[i] = {
                value: tutors[i].name,
                tokens: tutors[i].name.replace(".", "").split(" "),
                id: tutors[i].id,
                name: tutors[i].name,
                moodle_url: tutors[i].moodle_url
            };
        }
        ;
        return data;
    };

    /**
    *
    */
    devPlan.prototype.getTypeaheadDatumsForPlaces = function (places) {
        if (typeof places === "undefined") { places = this.places; }
        var data = [];
        for (var i = 0; i < places.length; i++) {
            data[i] = {
                value: places[i].location,
                tokens: places[i].location.replace(".", "").split(" "),
                id: places[i].id,
                location: places[i].location
            };
        }
        ;
        return data;
    };
    return devPlan;
})();
