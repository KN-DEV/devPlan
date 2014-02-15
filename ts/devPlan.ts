/// <reference path="DefinitelyTyped/typeahead/typeahead.d.ts" />
/// <reference path="DefinitelyTyped/jquery/jquery.d.ts" />

/**
 * Cash service
 */
module Cash
{
    /**
     * Model of group data
     */
    export interface Group
    {
        id: number;
        name: string;
    }
    /**
     * Model of Tutor data
     */
    export interface Tutor extends Cash.Group
    {
        moodle_url: string;
    }
    /**
     * Model of place data
     */
    export interface Place
    {
        id: number;
        location: string;

    }
    /**
     * Model of Timetable param data
     */
    export interface TimetableParams
    {
        group_id: number[];
        tutor_id: number[];
        place_id: number[];
    }

    export interface Timetable
    {
        _id: string;
        access_url: string;
        params: TimetableParams;
        activities: Cash.Activity[];
    }
    export interface Activity
    {
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
    /**
     * Cash API implementation
     */
    export class Api
    {
        /**
         * Host of service Cash 
         */
        private static host: string = "http://cash.dev.uek.krakow.pl/v0_1/";
        /**
         * Settings for ajax request
         */


        /**
         * Gets list of all groups available in cash service
         */
        public static getGroupsList(): JQueryXHR
        {
            return $.ajax( {
                url: Cash.Api.host + "groups",
                type: "GET",
                dataType: 'json'

            });
        }
        /**
         * Gets list of all tutors available in cash service
         */
        public static getTutorsList(): JQueryXHR
        {
            return $.ajax( {
                url: Cash.Api.host + "tutors",
                type: "GET",
                dataType: 'json'
            });
        }
        /**
        * Gets list of all places available in cash service
        */
        public static getPlacesList(): JQueryXHR
        {
            return $.ajax( {
                url: Cash.Api.host + "places",
                type: "GET",
                dataType: 'json'

            });
        }
        /**
         * Registers timetable
         */
        public static registerTimetable( timetableParams: Cash.TimetableParams ): JQueryXHR
        {
            return $.ajax( {
                url: Cash.Api.host + "timetables",
                type: "POST",
                dataType: 'json',
                data: timetableParams
            });
        }

        public static getTimetable( timetableParams: Cash.TimetableParams ): JQueryXHR
        {
            return $.ajax( {
                url: Cash.Api.host + "places",
                type: "GET",
                dataType: 'json'
            });
        }
    }
}
interface DatumGroup
{
    value: string;
    tokens: string[];
    id: number;
    name: string;
}
interface DatumTutor
{
    value: string;
    tokens: string[];
    id: number;
    name: string;
    moodle_url: string;
}
interface DatumPlace
{
    value: string;
    tokens: string[];
    id: number;
    location: string;
}

interface ActivityHoursCounter
{
    name: string;
    category: string;
    tutor: number;
    group: number;
    hours: number;
}
/**
 * devPlan App
 */
class devPlan
{

    /**
     * Keeps list of groups from Cash service
     */
    static groups: Cash.Group[] = [];

    /**
     * Keeps list of tutors from Cash service
     */
    static tutors: Cash.Tutor[] = [];
    /**
     * Keeps list of places from Cash service
     */
    static places: Cash.Place[] = [];
    /**
     * 
     */
    constructor()
    {
        /**
         * Timetable
         */

        $( "#search-input" ).attr( 'value', getUrlParam( 'search' ) );

        if ( getUrlParam( 'timetable' ).length != 0 )
        {

            var param: Cash.TimetableParams = {
                group_id: [],
                tutor_id: [],
                place_id: []
            };
            var timetable = getUrlParam( 'timetable' ).match( /[gtp][0-9]*/gi );

            for ( var i = 0; i < timetable.length; i++ )
            {
                if ( timetable[i].toString().toLowerCase().indexOf( "g" ) != -1 )
                {
                    param.group_id[param.group_id.length] = parseInt( timetable[i].slice( 1 ).toString() );
                }
                if ( timetable[i].toString().toLowerCase().indexOf( "t" ) != -1 )
                {
                    param.tutor_id[param.tutor_id.length] = parseInt( timetable[i].slice( 1 ).toString() );
                }
                //                if ( timetable[i].toString().toLowerCase().indexOf( "p" ) != -1 )
                //                {
                //                    param.place_id[param.place_id.length] = parseInt( timetable[i].slice( 1 ).toString() );
                //                }
            }
            $.when
                ( Cash.Api.registerTimetable( param ) )
                .done( ( response: Cash.Timetable ) =>
                {
                    console.log( response );
                    devPlan.showTimetable( response );
                    $( "#timetable-panel-spinner" ).remove();
                });
        }

        if ( $( "#search-panel-input" ).length )
        {
            $( "#search-panel-input" ).attr( 'value', getUrlParam( 'search' ) );
        }
        $.when(
            Cash.Api.getGroupsList(),
            Cash.Api.getTutorsList()
        //            ,Cash.Api.getPlacesList()
            ).done( ( groups, tutors
            //            , places
                ) =>
            {
                /*
                 * Typeahead
                 */
                devPlan.setGroups( groups[0] );
                devPlan.setTutors( tutors[0] );
                //                devPlan.setPlaces( places[0] );
                $( "#search-input" )
                    .removeAttr( 'disabled' )
                    .attr( 'placeholder', 'KrDzIs3011Io / dr Paweł Wołoszyn' )
                    .attr( 'data-provide', "typeahead" );

                $( "#search-input" ).typeahead( [
                    {
                        name: "groups",
                        local: devPlan.generateTypeaheadDatumsForGroups( devPlan.getGroups() ),
                    }, {
                        name: "tutors",
                        local: devPlan.generateTypeaheadDatumsForTutors( devPlan.getTutors() ),
                    }
                    //                    , {
                    //                        name: "places",
                    //                        local: devPlan.generateTypeaheadDatumsForPlaces( devPlan.getPlaces() ),
                    //                    }
                ] );
                $( "#search-button" )
                    .removeAttr( "disabled" )
                    .empty()
                    .append( "Szukaj" );

                if ( $( "#search-panel-input" ).length )
                {
                    $( "#search-panel-input" )
                        .attr( 'value', getUrlParam( 'search' ) )
                        .attr( 'placeholder', 'KrDzIs3011Io / dr Paweł Wołoszyn' )
                        .removeAttr( "disabled" );
                    $( "#search-panel .panel-body" ).remove();
                    devPlan.showSearchResults( getUrlParam( "search" ) );
                }
            });
    }
    /**
     *
     */
    static getGroups(): Cash.Group[]
    {
        return devPlan.groups;
    }
    /**
     *
     */
    static setGroups( groups: Cash.Group[] ): devPlan
    {
        devPlan.groups = groups.sort( ( a: any, b: any ) => {return a.name - b.name });
        return devPlan;
    }

    /**
     *
     */
    static getTutors(): Cash.Tutor[]
    {
        return devPlan.tutors;
    }

    /**
     *
     */
    static setTutors( tutors: Cash.Tutor[] ): devPlan
    {
        devPlan.tutors = tutors.sort( ( a: any, b: any ) => {return a.name - b.name });
        return devPlan;
    }
    /**
     *
     */
    static getPlaces(): Cash.Place[]
    {
        return devPlan.places;
    }
    /**
     *
     */
    static setPlaces( places: Cash.Place[] ): devPlan
    {
        devPlan.places = places.sort( ( a: any, b: any ) => {return a.location - b.location });
        return devPlan;
    }

    /**
     *
     */
    public static generateTypeaheadDatumsForGroups( groups: Cash.Group[] ): DatumGroup[]
    {
        var data: DatumGroup[] = [];
        for ( var i = 0; i < groups.length; i++ )
        {
            data[i] = {
                value: groups[i].name,
                tokens: groups[i].name.replace( ".", "" ).split( " " ),
                id: groups[i].id,
                name: groups[i].name
            };
        };
        return data;
    }
    /**
     *
     */
    public static generateTypeaheadDatumsForTutors( tutors: Cash.Tutor[] ): DatumTutor[]
    {
        var data: DatumTutor[] = [];
        for ( var i = 0; i < tutors.length; i++ )
        {
            data[i] = {
                value: tutors[i].name,
                tokens: tutors[i].name.replace( ".", "" ).split( " " ),
                id: tutors[i].id,
                name: tutors[i].name,
                moodle_url: tutors[i].moodle_url
            };
        };
        return data;
    }
    /**
     *
     */
    public static generateTypeaheadDatumsForPlaces( places: Cash.Place[] ): DatumPlace[]
    {
        var data: DatumPlace[] = [];
        for ( var i = 0; i < places.length; i++ )
        {
            data[i] = {
                value: places[i].location,
                tokens: places[i].location.replace( ".", "" ).split( " " ),
                id: places[i].id,
                location: places[i].location
            };
        };
        return data;
    }

    static showSearchResults( query: string = "" ): void
    {
        $( "#search-results" ).empty();
        query = query.toString().toUpperCase();

        if ( query.length >= 3 )
        {
            var data = '';


            for ( var i = 0; i < devPlan.getGroups().length; i++ )
            {
                if ( devPlan.getGroups()[i].name.toString().toUpperCase().indexOf( query ) !== -1 )
                {
                    data = data +
                    '<li class="list-group-item">' +
                    '<a href="timetable.html?timetable=g' + devPlan.getGroups()[i].id + '">' + devPlan.getGroups()[i].name + '</a>' +
                    '</li>';
                }
            }
            for ( var i = 0; i < devPlan.getTutors().length; i++ )
            {
                if ( devPlan.getTutors()[i].name.toString().toUpperCase().indexOf( query ) !== -1 )
                {
                    data = data +
                    '<li class="list-group-item">' +
                    '<a href="timetable.html?timetable=t' + devPlan.getTutors()[i].id + '">' + devPlan.getTutors()[i].name + '</a>' +
                    '<span class="pull-right">' +
                    '<a href="' + devPlan.getTutors()[i].moodle_url + '" title="Wizytówka E-Uczelnia"><i class="fa fa-globe fa-fw"></i></a>' +
                    '</span>' +
                    '</li>';

                }
            }
            //            for ( var i = 0; i < devPlan.getPlaces().length; i++ )
            //            {
            //                if ( devPlan.getPlaces()[i].location.toString().toUpperCase().indexOf( query ) !== -1 )
            //                {
            //                    data = data +
            //                    '<li class="list-group-item">' +
            //                    '<a href="timetable.html?timetable=p' + devPlan.getPlaces()[i].id + '">' + devPlan.getPlaces()[i].location + '</a>' +
            //                    '</li>';
            //                }
            //            }



            $( "#search-panel-body" ).attr( "display", "none" );
            if ( data.length == 0 )
            {
                data = "<tr><td class='text-center'>Brak wyników. Spróbuj jeszcze raz ;)</td</td>";
            }
            $( "#search-results" ).append( data );
        } else
        {
            console.log( "Too short query" );
        }
    }




    static showTimetable( timetable: Cash.Timetable ): void
    {



        var data = "";
        $( "#timetable-results" ).empty();

        timetable.activities = timetable.activities.sort( ( a: any, b: any ) => {return a.starts_at_timestamp - b.starts_at_timestamp });
        console.log( timetable.activities[168] );

        var date = "";


        if ( timetable.activities[0].tutor != null && getUrlParam( "timetable" ) == 't' + timetable.activities[0].tutor.id )
        {
            $( "#panel-title" ).empty().append( 'Plan zajęć:  <a href="timetable.html?timetable=t' + timetable.activities[0].tutor.id + '">' + timetable.activities[0].tutor.name + '</a><a href="' + timetable.activities[0].tutor.moodle_url + '" title="Wizytówka E-Uczelnia"><i class="fa fa-globe fa-fw"></i></a>');
        }

        var activityCounter: number[] = [];
        var activityCounterIndex: string = "";
        var j = 0;
        for ( var i = 0; i < timetable.activities.length; i++ )
        {

            activityCounterIndex = timetable.activities[i].group + timetable.activities[i].name + timetable.activities[i].category + timetable.activities[i].tutor.id;
            if ( activityCounter[activityCounterIndex] == undefined )
            {
                activityCounter[activityCounterIndex] = 0;
            }
            /**
             * zajęcia dla wielu grup - opuszcza kolejne
             */
            if ( timetable.activities[i - 1] != null &&
                timetable.activities[i].name == timetable.activities[i - 1].name &&
                timetable.activities[i].ends_at_timestamp == timetable.activities[i - 1].ends_at_timestamp )
            {
                continue;
            }
            if ( date < timetable.activities[i].date )
            {
                data = data + '<li class="list-group-item list-group-item-success">' +
                '<p id="' + timetable.activities[i].date + '" class="h2">' +
                timetable.activities[i].day_of_week + ' ' + timetable.activities[i].date +

                '</p>' +
                '</li>';
                date = timetable.activities[i].date;
            }
            data = data +
            '<li id="' + i + '" class="list-group-item">' +
            '<p class="h5">' +
            '<strong class="pull-left">' +
            timetable.activities[i].name +
            '</strong>';
console.log(getUrlParam( "timetable" ));
            if ( timetable.activities[i].tutor != null && getUrlParam( "timetable" ) != "t" + timetable.activities[i].tutor.id )
            {
                data = data + '<span class="pull-right">' +

                '<a href="timetable.html?timetable=t' + timetable.activities[i].tutor.id + '">' + timetable.activities[i].tutor.name + "</a> " +

                ( timetable.activities[i].tutor.moodle_url != null ?
                '<a href="' + timetable.activities[i].tutor.moodle_url + '" title="Wizytówka E-Uczelnia"><i class="fa fa-globe fa-fw"></i></a>' : "" ) +

                "</span>";
            }
            data = data + '</p><div class="clearfix"></div>' +

            ( timetable.activities[i].notes != null ? '<p>Notatka: ' + timetable.activities[i].notes + '</p>' : '' ) +
            '<p>' +
            //Time
            '<span class="label label-primary"><i class="fa fa-fw fa-clock-o"></i>' +
            timetable.activities[i].starts_at + " - " + timetable.activities[i].ends_at + '</span> ' +
            //Place
            ( timetable.activities[i].place != null ?
            '<span class="label label-success"><i class="fa fa-fw fa-map-marker"></i>' +
            //            '<a href="timetable.html?timetable=p' + timetable.activities[i].place.id + '">' +
            timetable.activities[i].place.location +
            //            '</a>'+ 
            '</span>'
            : '' ) +
            //Category     
            ' <span class="label label-danger"><i class="fa fa-fw fa-tag"></i>' +
            timetable.activities[i].category +
            '</span>' +
            //Hours
            ' <span class="label label-default">godziny: ' +
            ( activityCounter[activityCounterIndex] + " - " + ( activityCounter[activityCounterIndex] += devPlan.getClassHoursCounter( timetable.activities[i].starts_at, timetable.activities[i].ends_at ) ) ) +
            '</span>' +

            '<br/>';
            /**
             * zajęcia dla wielu grup - lista grup
             */
            j = i;
            do
            {
                if ( j > i )
                {
                    data = data + " | ";
                }
                if ( timetable.activities[j].group != null )
                {
                    data = data + '<small><a href="timetable.html?timetable=g' + timetable.activities[j].group.id + '">' + timetable.activities[j].group.name + "</a></small>";
                }
            } while ( timetable.activities[++j] != null &&
                timetable.activities[i].name == timetable.activities[j].name &&
                timetable.activities[i].ends_at_timestamp == timetable.activities[j].ends_at_timestamp );
            data = data + "</p>" +
            "</li>";
        }
        $( "#timetable-results" ).append( data );
    }

    /**
     * Returns class hours value
     */
    static getClassHoursCounter( startsAt: string, endsAt: string ): number
    {
        var alarms = [
            "07:50", "08:35", "08:45", "09:30", "09:35", "10:20",
            "10:30", "11:15", "11:20", "12:05", "12:15", "13:00",
            "13:05", "13:50", "14:00", "14:45", "14:50", "15:35",
            "15:40", "16:25", "16:30", "17:15", "17:20", "18:05",
            "18:10", "18:55", "19:00", "19:45", "19:50", "20:35",
        ];
        var counter = 0;
        for ( var i = 0; i <= alarms.length; i++ )
        {
            if ( alarms[i] == startsAt )
            {
                for ( var j = i; j <= alarms.length; j++ )
                {
                    if ( alarms[j] <= endsAt )
                    {
                        counter++;
                    }
                }
                break;
            }
        }
        return counter / 2;
    }
}

/**
 * Returns param from url
 */
function getUrlParam( key: string ): string
{
    var result = new RegExp( key + "=([^&]*)", "i" ).exec( window.location.search.replace( /\+/g, " " ) );
    return result && decodeURIComponent( result[1] ) || "";
}
