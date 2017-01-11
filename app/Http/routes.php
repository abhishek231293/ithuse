<?php

/*
|--------------------------------------------------------------------------
| Application Routes
|--------------------------------------------------------------------------
|
| Here is where you can register all of the routes for an application.
| It's a breeze. Simply tell Laravel the URIs it should respond to
| and give it the controller to call when that URI is requested.
|
*/

Route::get('/', 'HomeController@index');

Route::auth();

Route::get('/home', 'HomeController@index');

Route::post('/getFilter', 'HomeController@getFilter');

Route::post('/getDocumentLists', 'HomeController@getDocumentLists');

Route::post('/addEvent', 'EventController@add');
Route::post('/getEvent', 'EventController@get');
Route::post('/deleteEvent', 'EventController@delete');


/*---------------------- Auth Controller ----------------------*/

// Authentication routes...
Route::get('login', 'Auth\AuthController@getLogin');
Route::post('login', 'Auth\AuthController@postLogin');
Route::get('logout', 'Auth\AuthController@getLogout');

Route::post('addDocument', 'HomeController@addDocument');