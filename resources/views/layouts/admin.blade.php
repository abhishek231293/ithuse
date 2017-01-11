<!DOCTYPE html>
<html prevent-right-click lang="en" ng-app="ithuseApp">
<head>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <link rel="icon" href="{{ asset('img/ithuse.png') }}" type="image/png" sizes="16x16">

    <title>iTHUSE</title>

    <!-- Mainly CSS -->

    <link href="{{ asset('css/bootstrap.min.css') }}" rel="stylesheet">
    <link href="{{ asset('css/check.css') }}" rel="stylesheet">
    <link href="{{ asset('css/animate.css') }}" rel="stylesheet">
    <link href="{{ asset('css/style.css') }}" rel="stylesheet">
    <link href="{{ asset('css/sweetalert.css') }}" rel="stylesheet">
    <link href="{{ asset('css/custom.css') }}" rel="stylesheet">
    <link href="{{ asset('css/jquery-ui-1.9.css') }}" rel="stylesheet">
    <link href="{{ asset('css/jquery.timepicker.min.css') }}" rel="stylesheet">


    <!-- Fonts -->
    <link href="{{ asset('css/font-awesome/css/font-awesome.css') }}" rel="stylesheet">
    <link href="https://fonts.googleapis.com/css?family=Lato:100,300,400,700" rel='stylesheet' type='text/css'>

    {{--Vedio CSS--}}
    <link rel="stylesheet" href="{{ asset('bower_components/video.js/dist/video-js.css') }} " />

    {{-- <link href="{{ elixir('css/app.css') }}" rel="stylesheet"> --}}

<!-- Mainly scripts -->


    <script src="{{ asset('js/jquery-2.1.1.js') }}"></script>
    <script src="{{ asset('js/bootstrap.min.js') }}"></script>
    <script src="{{ asset('js/plugins/metisMenu/jquery.metisMenu.js') }}"></script>
    <script src="{{ asset('js/plugins/slimscroll/jquery.slimscroll.min.js') }}"></script>
    <script src="{{ asset('js/custom.js') }}"></script>
    <script src="{{ asset('js/jquery.timepicker.min.js') }}"></script>

    <script src="{{ asset('js/plugins/jsKnob/jquery.knob.js') }}"></script>


    {{--Angular Script--}}
    <script src="{{ asset('js/angular/angular.js') }}"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/angular-ui-router/0.3.2/angular-ui-router.js"></script>
    <script src="{{ asset('js/module/app.js') }}" type='text/javascript'></script>
    <script src="{{ asset('js/module/config.js') }}" type='text/javascript'></script>
    <script src="{{ asset('js/angular/underscore-min.js') }}"></script>

    {{--Google API--}}
    <script type="text/javascript" src="https://maps.googleapis.com/maps/api/js?key=AIzaSyCnxHBtPhiw7YkDrgAD5-_cYJqFMsLMwFM"></script>


    <!-- Angular Dependiences -->
    <script src="{{ asset('angular-theme/js/plugins/uiTree/angular-ui-tree.min.js') }}"></script>
    <script src="{{ asset('angular-theme/js/bootstrap/ui-bootstrap-tpls-0.11.0.min.js') }}"></script>
    <script src="{{ asset('angular-theme/js/angular/lodash.min.js') }}"></script>
    <script src="{{ asset('angular-theme/js/angular/angular-szn-autocomplete.js') }}"></script>
    {{--<script src="{{ asset('angular-theme/js/angular/angularjs-dropdown-multiselect.js') }}"></script>--}}
    {{--<script src="{{ asset('js/module/multiselect.js') }}"></script>--}}
    <script src="{{ asset('js/angular/angular-sanitize.js') }}"></script>

    <script src="{{ asset('js/module/services/service.js') }}" type='text/javascript'></script>
    <script src="{{ asset('js/module/directives/directive.js') }}" type='text/javascript'></script>
    <script src="{{ asset('js/module/directives/multislect-directive.js') }}" type='text/javascript'></script>
    <script src="{{ asset('js/module/filters/filter.js') }}" type='text/javascript'></script>
    <script src="{{ asset('js/module/controllers/controller.js') }}" type='text/javascript'></script>

    {{--Vedio Plugin--}}
    <script src="{{ asset('bower_components/video.js/dist/video.js' ) }}"></script>
    {{--<script src="{{ asset('bower_components/vjs-video/dist/vjs-video.js') }}"></script>--}}

<!-- Custom and plugin javascript -->
    <script src="{{ asset('js/inspinia.js') }}"></script>
    <script src="{{ asset('js/plugins/pace/pace.min.js') }}"></script>

    <!-- jQuery UI -->
    <script src="{{ asset('js/plugins/jquery-ui/jquery-ui.min.js') }}"></script>

    <!-- Sweet Alert -->
    <script src="{{ asset('js/sweetalert.min.js') }}"></script>

    {{-- <script src="{{ elixir('js/app.js') }}"></script> --}}

    <style>
        body {
            font-family: 'Lato';
        }

        .fa-btn {
            margin-right: 6px;
        }
    </style>

    <script>

    </script>

</head>
<body id="app-layout">

    @yield('template')
    @yield('content')

</body>
</html>
