@section('template')
    <body ng-app="ithuse">
    <div id="wrapper" ng-controller="DashboardController"  ng-click="bodyFocus($event)" ng-init="getFilters()">
        <nav class="navbar-default navbar-static-side" role="navigation">
            <div class="sidebar-collapse">
                <ul class="nav" id="side-menu">
                    <li class="nav-header">
                        <div class="dropdown profile-element">
              <span>
                  <img alt="image" class="" src="{{ asset('img/ithuse.png') }}" style="width: 30%;" />
              </span>
                            <a data-toggle="dropdown" class="dropdown-toggle" href="#">
              <span class="clear">
                  <span class="block m-t-xs">
                      <strong class="font-bold"></strong>
                  </span> <span class="text-muted text-xs block"> {{$currentUser->name}} <b class="caret"></b></span>
              </span>
                            </a>
                            <ul class="dropdown-menu animated fadeInRight m-t-xs">

                                <li><a ng-click="">Change Password</a></li>

                                <li class="divider"></li>
                                <li><a href="{{ url('/logout'   ) }}">Logout</a></li>
                            </ul>
                        </div>
                        <div class="logo-element">
                            ithuse
                        </div>
                    </li>

                    <li class="active" id="tabEvent" ng-click="activeMe('tabDocuments')">
                        <a ng-click="">
                            <i class="fa fa-book"></i>
                            <span class="nav-label">Documents List</span>
                        </a>
                    </li>

                    <li ng-init="showProfile()" id="tabProfile" ng-click="activeMe('tabProfile')">
                        <a ng-click="">
                            <i class="fa fa-user"></i>
                            <span class="nav-label">Manage Documents</span>
                        </a>
                    </li>



                    <li ng-init="showProfile()" id="tabProfile" ng-click="activeMe('tabEvents')">
                        <a ng-click="">
                            <i class="fa fa-user"></i>
                            <span class="nav-label">Manage Events </span>
                        </a>
                    </li>

                </ul>
            </div>
        </nav>
        <div id="page-wrapper" class="gray-bg">
            <div class="row border-bottom">
                <nav class="navbar navbar-static-top white-bg" role="navigation" style="margin-bottom: 0">
                    <div class="navbar-header">
                        <a class="navbar-minimalize minimalize-styl-2 btn btn-primary " href="#"><i class="fa fa-bars"></i> </a>
                    </div>
                    <ul class="nav navbar-top-links navbar-right">
                        <li>
                            <span class="m-r-sm text-muted welcome-message">Welcome {{$currentUser->name}}</span>
                        </li>
                        <li>
                            <a href="{{ url('/logout') }}">
                                <i class="fa fa-sign-out"></i> Logout
                            </a>
                        </li>
                    </ul>
                </nav>
            </div>
            <div class="wrapper wrapper-content">
                <div class="row">
                    <div class="col-lg-12">
                        <div class="row">

                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="footer">
            <div>
                <strong>Copyright</strong> iTHUSE &copy; 2016-2017
            </div>
        </div>
    </div>
    </body>
@endsection
