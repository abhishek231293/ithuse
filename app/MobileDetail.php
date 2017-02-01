<?php

namespace App;

use Illuminate\Foundation\Auth\User as Authenticatable;

class MobileDetail extends Authenticatable
{
    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */

    protected $fillable = [
        'id', 'imei','date', 'document_id'
    ];

    protected $table = 'mobile_details';
    public $timestamps = false;

    /**
     * @return array
     */

    public function insertMobileDetail($data,$documentId){

        $this->imei = $data['imei'];
        $this->date = date('Y-m-d H:i:s');
        $this->document_id = $documentId;
        $this->save();
    }

}
