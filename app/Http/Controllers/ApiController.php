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

                case 'saveDeviceDetail'     : $this->saveDeviceDetail($dataRequest);
                case 'getPdfList'           : $this->getPdfList($dataRequest);
                case 'getPdfLink'           : $this->getPdfLink($dataRequest);
                case 'getCalenderEvent'     : $this->getCalenderEvent($dataRequest);
                case 'eventNotificationAndroid' : $this->eventNotification($dataRequest);
                case 'eventNotificationIOS' : $this->eventNotificationIOS($dataRequest);

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

    public function saveDeviceDetail($dataRequest){

        if(!isset($dataRequest['imei']) || $dataRequest['imei'] == '' || $dataRequest['imei'] == null){
            $response['status'] = 'error';
            $response['message'] = 'No IMEI found';
            die(json_encode($response));
        }
        if(!isset($dataRequest['device_token']) || $dataRequest['device_token'] == '' || $dataRequest['device_token'] == null){
            $response['status'] = 'error';
            $response['message'] = 'No Device Token found';
            die(json_encode($response));
        }

        $device = new \App\DeviceDetail();
        $detailId = $device->saveDetails($dataRequest);

        if($detailId){
            $response['status'] = 'success';
            $response['message'] = 'Device registered';
            die(json_encode($response));
        }
    }

    public function closeEvent(){
        //localhost:8888/api/closeEvent

        $event = new \App\Event();
        $detailId = $event->closeEvent();
        echo $detailId . " Event Completed";
        exit;

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
                                $response['sub_category_name'] = $documentDetail[0]['sub_category_name'];
                                $response['data'] = $documentDetail;
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
        $eventRowsets = $subCategory->getEvent(null,'ASC','app');
        $eventRowsets = $eventRowsets->toArray();

        array_walk($eventRowsets, function($detail) use( &$finalCategoryList ) {
            $finalCategoryList[date('M Y',strtotime($detail['event_date']))][] = $detail;
        });

        if($finalCategoryList){
            $response['status'] = 'success';
            $response['data'] = $finalCategoryList;
            die(json_encode($response));
        }else{
            $response['status'] = 'success';
            $response['data'] = array();
            $response['message'] = 'No event found';
            die(json_encode($response));
        }

    }

    function eventNotificationIOS(){

        $filterData['time'] = date('d/m/Y');
        $filterData['end_time'] = date('d/m/Y');
        $response        = new \stdClass();

        if(isset($dataRequest['detail'])){

            $device = new \App\DeviceDetail();
            $deviceRowSets = $device->deviceList('IOS');

            $registrationIds = array();
            if($deviceRowSets){
                foreach($deviceRowSets as $data){
                    $registrationIds[] = $data['device_token'];
                }
            }else{
                die('No IOS Device found');
            }

            // Put your private key's passphrase here:
            $passphrase = 'test';

            // Create the payload body
            $body['aps'] = array(
                'alert' => 'Some changes in '. $dataRequest['detail'] . ' Event'
            );
            // Encode the payload as JSON
            $payload = json_encode($body);

            $result = $this->sendIosNotification($registrationIds, $payload, $passphrase);

            if($result){
                $response->message = 'Notification send successfully..';
                $response->messageType = 'success';
                $response->messageTitle = 'Sucess..!';
                die(json_encode($response));
            }
        }else{
            $eventList = new \App\Event();
            $eventRowsets = $eventList->getEvent($filterData,'ASC','api');

            if($eventRowsets){
                $eventList = $eventRowsets->toArray();
            }else{
                die('No Event Found');
            }

            $device = new \App\DeviceDetail();
            $deviceRowSets = $device->deviceList('IOS');

            $registrationIds = array();
            if($deviceRowSets){
                foreach($deviceRowSets as $data){
                    $registrationIds[] = $data['device_token'];
                }
            }else{
                die('No IOS Device found');
            }

            // Put your private key's passphrase here:
            $passphrase = 'test';

            if(count($eventList) == 0){
                die('No Event Found');
            }else if(count($eventList) == 1){
                foreach($eventList as $event){
                    $time = explode(':',$event['event_time']);
                    $day = '';

                    if($time[0] <= 11){
                        $time[0] = $time[0];
                        $day = 'AM';
                    }else if($time[0] == 12){
                        $time[0] = 12;
                        $day = 'PM';
                    }else{
                        $time[0] = $time[0] - 12;
                        $day = 'PM';
                    }

                    $timenew = $time[0] ? ($time[0].":".$time[1]." " . $day) : '';

                    $body['aps'] = array(
                        'alert' => $event['title'] . ' at '.date('d/m/Y', strtotime($event['event_date'])) . " " . $timenew ." ."
                    );

                }
                // Create the payload body
            }else{
                // Create the payload body
                $body['aps'] = array(
                    'alert' => 'You have ' . count($eventList).' events scheduled for today.'
                );
            }

            // Encode the payload as JSON
            $payload = json_encode($body);

            $result = $this->sendIosNotification($registrationIds, $payload, $passphrase);

            if($result){
                $response->message = 'Notification send successfully..';
                $response->messageType = 'success';
                $response->messageTitle = 'Sucess..!';
                die(json_encode($response));

            }
        }


    }

    function sendIosNotification($registrationToken, $payload, $passphrase){
        foreach($registrationToken as $token){
            if(!$token){
                continue;
            }
            $ctx = stream_context_create();
            stream_context_set_option($ctx, 'ssl', 'local_cert', 'TestProductionPush.pem');
            stream_context_set_option($ctx, 'ssl', 'passphrase', $passphrase);

            // Open a connection to the APNS server
            $fp = stream_socket_client(
                'ssl://gateway.push.apple.com:2195', $err,
                $errstr, 60, STREAM_CLIENT_CONNECT|STREAM_CLIENT_PERSISTENT, $ctx);

            if (!$fp)
                exit("<br/>Failed to connect: $err $errstr" . PHP_EOL);

            $msg = chr(0) . pack('n', 32) . pack('H*', $token) . pack('n', strlen($payload)) . $payload;

            // Send it to the server
            $pushResult = fwrite($fp, $msg, strlen($msg));
            fclose($fp);
            return $pushResult;
        }
    }

    public function eventNotification($dataRequest){

        $filterData['time'] = date('d/m/Y');
        $filterData['end_time'] = date('d/m/Y');
        $response        = new \stdClass();

        try{
            if(isset($dataRequest['detail'])){

                    $pushMessage = array(
                        'message'    => 'Some changes in '.$dataRequest['detail'].' Event.',
                        'title'      => 'Event Edited',
                        'vibrate'    => 1,
                        'sound'      => 1,
                    );

                $device = new \App\DeviceDetail();
                $deviceRowSets = $device->deviceList('Android');

                $registrationIds = array();

                if($deviceRowSets){
                    foreach($deviceRowSets as $data){
                        $registrationIds[] = $data['device_token'];
                    }
                }else{
                    die('No Android Device found');
                }
                if(count($registrationIds)) {
                    $result = $this->sendPushNotification($registrationIds, $pushMessage);
                }

                if($result){

                    $response->message = 'Notification send successfully..';
                    $response->messageType = 'success';
                    $response->messageTitle = 'Sucess..!';

                    die(json_encode($response));
                }
            }else{
                $eventList = new \App\Event();
                $eventRowsets = $eventList->getEvent($filterData,'ASC','api');

                if($eventRowsets){
                    $eventList = $eventRowsets->toArray();
                }else{
                    die('No Event Found');
                }

                $device = new \App\DeviceDetail();
                $deviceRowSets = $device->deviceList('Android');

                $registrationIds = array();

                if($deviceRowSets){
                    foreach($deviceRowSets as $data){
                        $registrationIds[] = $data['device_token'];
                    }
                }else{
                    die('No Android Device found');
                }

                if(count($eventList) == 1){

                    foreach($eventList as $eventValue){
                        $time = explode(':',$eventValue['event_time']);
                        $day = '';

                        if($time[0] <= 11){
                            $time[0] = $time[0];
                            $day = 'AM';
                        }else if($time[0] == 12){
                            $time[0] = 12;
                            $day = 'PM';
                        }else{
                            $time[0] = $time[0] - 12;
                            $day = 'PM';
                        }

                        $timenew = $time[0] ? ($time[0].":".$time[1]." " . $day) : '';

                        $pushMessage = array(
                            'message'    => $eventValue['description'],
                            'title'      => $eventValue['title'] . " at " . $timenew,
                            'vibrate'    => 1,
                            'sound'      => 1,
                        );
                    }

                } else if(count($eventList) == 0){
                    die('No Event Found');
                }
                else{
                    $pushMessage = array(
                        'message'    =>'You have ' . count($eventList).' events scheduled for today.',
                        'title'      => 'Event Scheduled',
                        'vibrate'    => 1,
                        'sound'      => 1,
                    );
                }

                if(count($registrationIds)) {
                    $result = $this->sendPushNotification($registrationIds, $pushMessage);
                }

                if($result){

                    $response->message = 'Notification send successfully..';
                    $response->messageType = 'success';
                    $response->messageTitle = 'Sucess..!';

                    die(json_encode($response));
                }

            }



            // }
        }catch (Exception $e){
            $response['message']        = $e->getMessage();
            $response['messageType']    = 'warning';
            $response['messageTitle']   = 'Error..!';
        }
    }

    function sendPushNotification($registration_ids, $message) {

        $url = 'https://android.googleapis.com/gcm/send';
        $fields = array(
            'registration_ids' => $registration_ids,
            'data' => $message,
        );

        define('GOOGLE_API_KEY', 'AAAAPnhFlUI:APA91bEmz2OBD4NR2zr27A7V0FYwPYDz-81oO903zYvqMCikDKgSWNhucbsrjPVzyXxHisg5ClTKerc0fOUBn0gZDsSvG-9IYb29qsNd-pK9dIGSuNRCP6q8o8UtZag_epXOsrBnSi3j');

        $headers = array(
            'Authorization:key=' . GOOGLE_API_KEY,
            'Content-Type: application/json'
        );
        //echo json_encode($fields);
        $ch = curl_init();
        curl_setopt($ch, CURLOPT_URL, $url);
        curl_setopt($ch, CURLOPT_POST, true);
        curl_setopt($ch, CURLOPT_HTTPHEADER, $headers);
        curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
        curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, false);
        curl_setopt($ch, CURLOPT_POSTFIELDS, json_encode($fields));

        $result = curl_exec($ch);

        if($result === false)
            die('Curl failed ' . curl_error());

        curl_close($ch);
        return $result;

    }
}
