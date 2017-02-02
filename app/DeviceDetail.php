<?php

namespace App;

use Illuminate\Foundation\Auth\User as Authenticatable;

class DeviceDetail extends Authenticatable
{
    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */

    protected $fillable = [
        'id','device_token','imei','send_notification'
    ];
    protected $table = 'device_details';
    public $timestamps = false;


    public function saveDetails($dataRequest){

        $existingImei = $this->whereRaw('imei = "'.$dataRequest['imei'].'"');
        $imeiExisit = $existingImei->get();
        $imeiExisit = $imeiExisit->toArray();

        if($imeiExisit){
            $device = $this->whereRaw('imei = "'.$dataRequest['imei'].'"');
            $returnStatus = $device->update(['device_token' =>$dataRequest['device_token'],'updation_date'=>date('Y-m-d H:i:s')]);
            return $returnStatus;
        }else{
            $this->device_token = $dataRequest['device_token'];
            $this->imei = $dataRequest['imei'];
            $this->device_type = trim($dataRequest['device_type']);
            $this->register_date = date('Y-m-d H:i:s');
            $this->save();
            return $this->id;
        }

    }

    public function deviceList($deviceType){

        $device = $this->whereRaw('send_notification = 1');
        $device = $device->where('device_type','=',$deviceType);
        $device = $device->groupby('imei');
        $deviceList = $device->get();

        if($deviceList){
            return $deviceList->toArray();
        }else{
            return $deviceType;
        }


    }

}
