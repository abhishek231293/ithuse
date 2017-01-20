<?php

namespace App\Http\Controllers;

use Illuminate\Support\Facades\Auth;
use App\Http\Requests;
use Illuminate\Http\Request;

class ApiController extends Controller
{

    /**
     * Show the application document.
     *
     * @return \Illuminate\Http\Response
     */
    public function index(Request $request)
    {
        $response = array();
        $dataRequest = $request->all();
        $apiRequestFor = isset($dataRequest['requestFor']) ? $dataRequest['requestFor'] : null;

        if(trim($apiRequestFor)){

            switch (trim($apiRequestFor)){

                case 'getPdfList'       : $this->getPdfList($dataRequest);
                case 'getPdfLink'       : $this->getPdfLink($dataRequest);
                case 'getCalenderEvent' : $this->getCalenderEvent($dataRequest);

                default :   $response['status'] = 'error';
                    $response['message'] = 'Invalid API Request!';
                    die(json_encode($response));
            }

        }else{
            $response['status'] = 'error';
            $response['message'] = 'Invalid API Request!';
            die(json_encode($response));
        }

    }

    public function getPdfList($dataRequest){

        if(isset($dataRequest['categoriesId']) && $dataRequest['categoriesId'] != '' && $dataRequest['categoriesId'] != null){

            if(isset($dataRequest['subCategoriesId']) && $dataRequest['subCategoriesId'] != '' && $dataRequest['subCategoriesId'] != null){

                $category = new \App\Category();
                $categoryData = $category->categoryExist($dataRequest['categoriesId']);

                if($categoryData){
                    $subCategory = new \App\SubCategory();
                    $subCategoryData = $subCategory->subCategoryExist($dataRequest['categoriesId']);

                    if($subCategoryData){

                        if($dataRequest['imei']){

                            $document = new \App\Document();
                            $pdfDetail = $document->getPdfList(null,null,$dataRequest['categoriesId'],$dataRequest['subCategoriesId']);
                            $documentDetail = $pdfDetail->toArray();

                            if($documentDetail){
                                $mobileTable = new \App\MobileDetail();
                                $mobileTable->insertMobileDetail($dataRequest,$documentDetail[0]['pdf_id']);
                                $response['status'] = 'success';
                                $response['data'] = $documentDetail;
//                                    $response['data'][] = urlencode('http://www.adobe.com/devnet/acrobat/pdfs/pdf_open_parameters.pdf');
                                die(json_encode($response));
                            }else{
                                $response['status'] = 'error';
                                $response['message'] = 'No pdf Found.';
                                die(json_encode($response));
                            }

                        }else{
                            $response['status'] = 'error';
                            $response['message'] = 'Please provide IMEI number';
                            die(json_encode($response));
                        }
                    }else{
                        $response['status'] = 'error';
                        $response['message'] = 'Invalid subcategory selected!';
                        die(json_encode($response));
                    }
                }else{
                    $response['status'] = 'error';
                    $response['message'] = 'Invalid category selected!';
                    die(json_encode($response));
                }

            }else{
                $response['status'] = 'error';
                $response['message'] = 'Please provide subcategory id!';
                die(json_encode($response));
            }

        }else{
            $response['status'] = 'error';
            $response['message'] = 'Please provide category id!';
            die(json_encode($response));
        }
    }

    public function getPdfLink($dataRequest){

        if(isset($dataRequest['pdf_id']) && $dataRequest['pdf_id'] != '' && $dataRequest['pdf_id'] != null){

            $pdfModel = new \App\PdfReport();
            $pdfRowset = $pdfModel->getPdfLinks($dataRequest);
            $response['status'] = 'success';

            foreach($pdfRowset as $data){
                $response['data'] = urlencode(asset($data['pdf_name']));
            }

            die(json_encode($response));
        }else{
            $response['status'] = 'error';
            $response['message'] = 'Invalid pdf report request!';
            die(json_encode($response));
        }

    }

    public function getCalenderEvent($dataRequest){

        $subCategory = new \App\Event();
        $eventRowsets = $subCategory->getEvent(null,'ASC');
        $eventRowsets = $eventRowsets->toArray();

        array_walk($eventRowsets, function($detail) use( &$finalCategoryList ) {
            $finalCategoryList[date('M Y',strtotime($detail['event_date']))][] = $detail;
        });

        if($finalCategoryList){
            $response['status'] = 'success';
            $response['data'] = $finalCategoryList;
            die(json_encode($response));
        }else{
            $response['status'] = 'error';
            $response['message'] = 'Please provide category id!';
            die(json_encode($response));
        }

    }
}
