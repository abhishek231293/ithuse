<?php

namespace App\Http\Controllers\Auth;

use App\User;
use App\LoginHistory;
use Carbon\Carbon;
use Illuminate\Http\Request;

use Validator;
use DB;
use Illuminate\Support\Facades\Auth;
use App\Http\Controllers\Controller;
use Illuminate\Foundation\Auth\ThrottlesLogins;
use Illuminate\Foundation\Auth\AuthenticatesAndRegistersUsers;

class AuthController extends Controller
{
    /*
    |--------------------------------------------------------------------------
    | Registration & Login Controller
    |--------------------------------------------------------------------------
    |
    | This controller handles the registration of new users, as well as the
    | authentication of existing users. By default, this controller uses
    | a simple trait to add these behaviors. Why don't you explore it?
    |
    */

    use AuthenticatesAndRegistersUsers, ThrottlesLogins;

    /**
     * Where to redirect users after login / registration.
     *
     * @var string
     */
    protected $redirectTo = '/';

    protected $username = 'contact_number';

    /**
     * Create a new authentication controller instance.
     *
     * @return void
     */
    public function __construct()
    {
        //$this->middleware($this->guestMiddleware(), ['except' => 'logout']);
        $this->middleware('guest', ['except' => ['logout', 'getLogout']]);
    }

    /**
     * Get a validator for an incoming registration request.
     *
     * @param  array  $data
     * @return \Illuminate\Contracts\Validation\Validator
     */
    protected function validator(array $data)
    {

        return Validator::make($data, [
                'name' => 'required|max:255',
            //'email' => 'required|email|max:255|unique:users',
                'contact_number' => 'required|number|max:15|unique:users',
                'password' => 'required|min:6|confirmed',
        ]);
    }

    /**
     * Create a new user instance after a valid registration.
     *
     * @param  array  $data
     * @return User
     */
    protected function create(array $data)
    {
        //dd($data);

        //$user = new User;

        /*
        dd($user);
        $user->username = Input::get('username');
        $user->pass = bcrypt(Input::get('pass'));
        $user->save();
        */

        return User::create([
                'name' => $data['name'],
            //'email' => $data['email'],
                'contact_number' => $data['contact_number'],
            //'is_admin' => $data['is_admin'],
                'password' => bcrypt($data['password']),
        ]);
    }

    public function login(Request $request)
    {
        $this->validateLogin($request);

        $throttles = $this->isUsingThrottlesLoginsTrait();

        if ($throttles && $lockedOut = $this->hasTooManyLoginAttempts($request)) {
            $this->fireLockoutEvent($request);

            return $this->sendLockoutResponse($request);
        }

        $credentials = Auth::attempt([
            //'email' => $request['email'],
                'contact_number' => $request['contact_number'],
                'password' => $request['password'],
            //'is_active' => \DB::raw(" 1 AND ( role = 'admin' OR valid_till_date > '". Carbon::now()."' )")
                'is_active' => 1
        ]);


        if ($credentials) {
            $this->setLoginHistory();
            return $this->handleUserWasAuthenticated($request, $throttles);
        }

        if ($throttles && ! $lockedOut) {
            $this->incrementLoginAttempts($request);
        }

        return $this->sendFailedLoginResponse($request);
    }

    public function logout()
    {
        $this->updateLoginHistory();

        Auth::guard($this->getGuard())->logout();

        return redirect(property_exists($this, 'redirectAfterLogout') ? $this->redirectAfterLogout : '/login');
    }

    public function setLoginHistory()
    {
        $userId = Auth::user()->id;
        $user = User::find($userId);

        //$currentTime = Carbon::now()->toDateTimeString();

        //echo date("d-m-Y h:i:s");
        //dd($currentTime);

        $user->last_login_time  = Carbon::now()->toDateTimeString();

        if($user->save()){}

        $loginHistory = new LoginHistory();

        $loginHistory->login_user_id     = $userId;
        $loginHistory->login_time = Carbon::now()->toDateTimeString();
        $loginHistory->ip_address = $_SERVER["REMOTE_ADDR"];
        $loginHistory->user_agent = $_SERVER['HTTP_USER_AGENT'];
        $loginHistory->is_active  = 1;


        if($loginHistory->save()){}
    }

    public function updateLoginHistory()
    {
        $userId = Auth::user()->id;

        DB::table('login_histories')
                ->where('login_user_id', $userId)
                ->update(['logout_time' => Carbon::now()->toDateTimeString(), 'is_active' => 0]);

    }





    public function redirectPath()
    {//dd(auth()->guard()->user()->role);

        switch (auth()->guard()->user()->role){
            case 'admin':
                return '/admin';
                break;
            case 'company':
                return '/'.auth()->guard()->user()->role;
                break;
            default :
                return property_exists($this, 'redirectTo') ? $this->redirectTo : '/';
        }

//        dd(auth()->guard()->user()->role);

        //return property_exists($this, 'redirectTo') ? $this->redirectTo : '/';
    }
}
