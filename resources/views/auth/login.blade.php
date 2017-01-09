@extends('layouts.app')

@section('content')
    <body class="gray-bg" ng-app="ithuse">

    <div ng-controller="DocumentController"  ng-init="valueGet()" class="middle-box text-center loginscreen  animated fadeInDown " style="margin-top: -350px !important;">
        <div>
            <p>
                <img src="{{ asset('img/ithuse.png') }}" style="width: 50%;">
            </p>
            <form  class="login-form" role="form" method="POST" action="{{ url('/login') }}">
                {!! csrf_field() !!}
                <div class="form-group{{ $errors->has('email') ? ' has-error' : '' }}">
                    <input type="text" class="form-control" name="email" value="{{ old('email') }}" placeholder="Email" >
                    @if ($errors->has('email'))
                        <span class="help-block">
                             <strong>{{ $errors->first('email') }}</strong>
                        </span>
                    @endif
                </div>

                <div class="form-group{{ $errors->has('password') ? ' has-error' : '' }}">
                    <input  type="password" class="form-control" name="password" class="form-control" placeholder="Password" required>
                    @if ($errors->has('password'))
                        <span class="help-block">
                            <strong>{{ $errors->first('password') }}</strong>
                        </span>
                    @endif

                </div>

                <div class="form-group">
                    <login-button></login-button>



                    <a class="btn btn-link" href="{{ url('/activation/reset-password') }}">Forgot Password? </a>
                    {{--<a class="btn btn-link" href="{{ url('/register') }}">Don't have an account? Register</a>--}}

                </div>

                <!--<p class="m-t"> <small>Inspinia we app framework base on Bootstrap 3 &copy; 2014</small> </p>-->
            </form>

        </div>
    </div>
    </body>
@endsection