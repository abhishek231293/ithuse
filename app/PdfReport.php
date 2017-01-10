<?php

namespace App;

use Illuminate\Foundation\Auth\User as Authenticatable;

class PdfReport extends Authenticatable
{
    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */

    protected $fillable = [
        'id', 'pdf_name', 'uploading_date','document_id', 'is_active'
    ];
    protected $table = 'pdf_reports';
    public $timestamps = false;

    public function insertPdfDetail(){
        
    }
}
