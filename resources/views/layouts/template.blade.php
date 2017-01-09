@section('template')
   
    <div id="wrapper" ng-controller="DocumentController">
        <nav class="navbar-default navbar-static-side" role="navigation">
            <div class="sidebar-collapse">
                <ul class="nav" id="side-menu">
                    <li class="nav-header">
                        <div class="dropdown profile-element" style="text-align: center">
              <span>
                  <img alt="image" class="" src="{{ asset('img/ithuse.png') }}" style="width: 30%;" />
              </span>

            <!--<a data-toggle="dropdown" class="dropdown-toggle" href="#">
              <span class="clear">
                  <span class="block m-t-xs">
                      <strong class="font-bold"></strong>
                  </span> <span class="text-muted text-xs block"> {{$currentUser->name}} <b class="caret"></b></span>
              </span>
            </a>-->

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

            <li ng-class="{true:'active',false:''}[currentTab == 'document']">
                <a ui-sref="document">
                    <i class="fa fa-book"></i>
                    <span class="nav-label">Documents List</span>
                </a>
            </li>

            <li ng-class="{true:'active',false:''}[currentTab == 'manage']">
                <a ui-sref="manage">
                    <i class="fa fa-user"></i>
                    <span class="nav-label">Manage Documents</span>
                </a>
            </li>



            <li ng-class="{true:'active',false:''}[currentTab == 'event']">
                <a ui-sref="event.list">
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
                            <div ui-view></div>
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
   
@endsection
