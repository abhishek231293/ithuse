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
            $returnStatus = $device->update(['device_token' =>$dataRequest['device_token']]);
            return $returnStatus;
        }else{
            $this->device_token = $dataRequest['device_token'];
            $this->imei = $dataRequest['imei'];
            $this->device_type = $dataRequest['device_type'];
            $this->save();
            return $this->id;
        }

    }

    public function deviceList(){

        $device = $this->groupby('imei');
        $deviceList = $device->get();
        return $deviceList->toArray();

    }

}
