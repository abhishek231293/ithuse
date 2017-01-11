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
        'event_id', 'title', 'description', 'event_venue','event_date', 'status', 'is_active'
    ];
    protected $table = 'events';
    public $timestamps = false;

    public function addEvent($data){

        $date = explode('/',$data['date']);
        $date = $date[2]."-".$date[1]."-".$date[0];

        $this->title = $data['title'];
        $this->description = $data['description'];
        $this->event_venue = $data['place'];
        $this->event_date = date('Y-m-d H:i:00', strtotime($date." ". $data['myTime']));
        $this->save();
        return $this->id;

    }

    public function getEvent($data){

        $event = $this->query();

        if(isset($data['title']) && $data['title']){
            $event->where('title','like', '%'.$data['title'].'%');
        }
        if(isset($data['time']) && $data['time']){
            $date = explode('/', $data['time']);
            $date = $date[2] . "-" . $date[1] . "-" . $date[0];
            $event->whereRaw('Date(event_date)','=', date('Y-m-d', strtotime($date) ));
        }
        if(isset($data['status']) && $data['status']){
            $event->where('status','=', $data['status']);
        }
        if(isset($data['event_id']) && $data['event_id']){
            $event->where('event_id','=', $data['event_id']);
        }
        $event->where('is_active','=', 1);

        $eventRowset = $event->get();
        return $eventRowset;

    }

    public function deleteEvent($data){

        $event = $this->where('event_id', $data['event_id']);
        $returnStatus = $event->update(['is_active' => 0]);
        return $returnStatus;
    }


}
