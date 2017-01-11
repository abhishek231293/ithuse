<?php

namespace App\Http\Controllers;

use Illuminate\Support\Facades\Auth;
use App\Http\Requests;
use Illuminate\Http\Request;
use App\Event;

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
    
    public function add(Request $request)
    {
        $data = $request->all();
        
        $eventModel = new \App\Event();
        $returnValue = $eventModel->addEvent($data);

        return $returnValue;
    }

    public function get(Request $request)
    {
        $data = $request->all();
        $eventModel = new \App\Event();
        $returnValue = $eventModel->getEvent($data);

        die(json_encode($returnValue));
    }

    public function delete(Request $request)
    {
        $data = $request->all();
        $eventModel = new \App\Event();
        $returnStatus = $eventModel->deleteEvent($data);
        return $returnStatus;
    }
}
