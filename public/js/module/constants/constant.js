'use strict';
/* App Module */
angular.module('ithuseApp')
    .constant('AUTH_EVENTS', {
      notAuthenticated: 'auth-not-authenticated',
      notAuthorized: 'auth-not-authorized'
    })
    .constant('MARKER_IMAGE', {
        riyad: {
            branch : 'auth-login-success',
            atm : 'auth-login-success'
        }
    })
    .constant('USER_ROLES', {
        admin: 'admin',
        dept: 'department',
        guest: 'guest'
    })
    .constant('MAP_RESOURCES', (function() {
	var _serverUrl_ = defaultUrl ;
        var _clientUrl_ = clientUrl;

        return {
            'MARKER_PATH'      :  defaultUrl + "/www/image/icon/riyad/riyad_marker.png",
	    'CLUSTER_PATH'      : defaultUrl + "/www/image/cluster/riyad/"
        };
    })())
    .constant('RESOURCES', (function() {
        var _serverUrl_ = defaultUrl ;
        var _clientUrl_ = clientUrl;

        return {
            'AGE_GRAPH'             : _clientUrl_ + '/graph/age-graph',
            'STATUS_GRAPH'          : _clientUrl_ + '/graph/status-graph',
            'VENDOR_GRAPH'          : _clientUrl_ + '/graph/vendor-graph',
            'FLAG_GRAPH'            : _clientUrl_ + '/graph/flag-graph',
            'AREA_GRAPH'            : _clientUrl_ + '/graph/area-graph',
            'DEPT_STATUS_GRAPH'     : _clientUrl_ + '/graph/status-graph',
            'HIGHCHART_EXPORT_URL'  :'https://export.highcharts.com/'
        }
    })

