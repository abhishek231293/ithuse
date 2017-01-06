<?php

namespace App\Http\Controllers;

use Illuminate\Support\Facades\Auth;
use App\Http\Requests;
use Illuminate\Http\Request;
use App\Document;

class HomeController extends Controller
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
    public function index()
    {
        return view('home');
    }

    public function getFilter(){
        die('test');
    }

    public function getDocumentLists(){
        $document = new \App\Document();
        $documentRowSets = $document->getDocumentLists();
        die(json_encode($documentRowSets->toArray()));
    }
}
