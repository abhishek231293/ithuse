<?php

namespace App;

use Illuminate\Foundation\Auth\User as Authenticatable;

class Event extends Authenticatable
{
    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */

    protected $fillable = [
        'event_id', 'title', 'description','event_date', 'status', 'is_active'
    ];
    protected $table = 'events';
    public $timestamps = false;

    public function addEvent($data){
            dd($data);
        $this->title = $data['title'];
        $this->description = $data['description'];
        $this->event_date = date('Y-m-d H:i:s', strtotime($data['date']));
        $this->save();
    }


}
