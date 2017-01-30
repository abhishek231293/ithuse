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

    public function edit(Request $request)
    {
        $data = $request->all();
        $eventModel = new \App\Event();
        $returnValue = $eventModel->editEvent($data);

        return $returnValue;
    }

    public function get(Request $request)
    {
        $data = $request->all();
        $eventModel = new \App\Event();
        $returnValue = $eventModel->getEvent($data);
        die($returnValue);

        /*
            $returnValue = $returnValue->toArray();
            $finalCategoryList = array();
            $finalCategoryList['pending'] = 0;
            $finalCategoryList['complete'] = 0;

            array_walk($returnValue, function($detail) use( &$finalCategoryList ) {

                if($detail['status'] == 'pending'){
                    $finalCategoryList['pending'] = $finalCategoryList['pending']+1;
                }else{
                    $finalCategoryList['complete'] = $finalCategoryList['complete'] + 1;
                }

                $finalCategoryList['detail'][] = $detail;
            });

            die(json_encode($finalCategoryList));
        */
    }

    public function delete(Request $request)
    {
        $data = $request->all();
        $eventModel = new \App\Event();
        $returnStatus = $eventModel->deleteEvent($data);
        return $returnStatus;
    }
}
