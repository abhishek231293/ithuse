<?php

namespace App\Http\Controllers;

use Illuminate\Support\Facades\Auth;
use App\Http\Requests;
use Illuminate\Http\Request;
use App\Document;
use Storage;

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
        $category = new \App\Category();
        $categoryRowSets = $category->getCategoryWithSubCategoryList();
        $categoryRowSets = $categoryRowSets->toArray();
        $finalCategoryList = array();

        array_walk($categoryRowSets, function($detail) use( &$finalCategoryList ) {
            $finalCategoryList[$detail['category_name']][$detail['sub_category_name']] = $detail;
        });

        die(json_encode($finalCategoryList));
    }

    public function getDocumentLists(Request $request){
        $data = $request->all();

        if(isset($data['category_name'])){
            $category = ($request->input('category_name'));
        }else{
            $category = ($request->input('category'));
        }

        if(isset($data['subcategory_name'])){
            $subCategory = ($request->input('subcategory_name'));
        }else{
            $subCategory = ($request->input('subCategory'));
        }

        $document = new \App\Document();

        $documentRowSets = $document->getDocumentLists($category,$subCategory);

        die($documentRowSets);

    }

    public function addDocument(Request $request){
        $data = $request->all();
        $category = ($request->input('category_name'));
        $subCategory = ($request->input('subcategory_name'));
        $pdfpath = addPdf($category,$subCategory);
        $title = ($request->input('document_title'));
        $document = new \App\Document();

        $status = $document->UploadDocument($category,$subCategory,$pdfpath,$title);
        return $status;
    }

    public function deleteDocument(Request $request){
        $data = $request->all();
        $document = new \App\Document();
        $status = $document->deleteDocument($data);
        return $status;
    }
}
