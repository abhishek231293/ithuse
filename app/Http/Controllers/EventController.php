<?php

namespace App\Http\Controllers;

use Illuminate\Support\Facades\Auth;
use App\Http\Requests;
use Illuminate\Http\Request;

class EventController extends Controller
{
    /**
     * Create a new controller instance.
     *
     * @return void
     */
    public function __construct()
    {
        
        $this->middleware('auth');
        $this->currentUser = Auth::User();
        view()->share([ 'currentUser' => $this->currentUser ]);
    }

    /**
     * Show the application document.
     *
     * @return \Illuminate\Http\Response
     */
    
    public function add()
    {
        return "true";
    }

    public function get()
    {
        $eventList = [
            [
                'id' => '1',
                'title' => 'some title',
                'description' => 'some description',
                'date' => 'some date'
            ],
            [
                'id' => '2',
                'title' => 'some title',
                'description' => 'some description',
                'date' => 'some date'
            ]
        ];

        die(json_encode($eventList));
    }
}
