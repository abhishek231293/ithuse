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
        'event_id', 'title', 'description', 'event_venue','event_date','event_time', 'status', 'is_active'
    ];
    protected $table = 'events';
    public $timestamps = false;

    public function addEvent($data){

        $date = explode('/',$data['date']);
        $date = $date[2]."-".$date[1]."-".$date[0];

        $this->title = $data['title'];
        $this->description = $data['description'];
        $this->event_venue = $data['place'];
        $this->event_date = date('Y-m-d', strtotime($date));
        $this->event_time = $data['myTime'];
        $this->creation_date = date('Y-m-d H:i:s');
        $this->save();
        return $this->id;

    }

    public function editEvent($data){
        $date = explode('-',$data['event_date']);
        $date = $date[2]."-".$date[1]."-".$date[0];

        $title = $data['title'];
        $description = $data['description'];
        $event_venue = $data['event_venue'];
        $date = date('Y-m-d', strtotime($date));;
        $time = $data['event_time'];

        $event = $this->where('event_id', $data['event_id']);
        $returnStatus = $event->update(['title' =>$title,'description'=>$description,'event_venue'=>$event_venue,'event_date'=>$date,'event_time'=>$time,'updation_date'=>date('Y-m-d H:i:s')]);
        return $returnStatus;
    }

    public function getEvent($data,$order = 'DESC'){

        $event = $this->query();

        if(isset($data['title']) && $data['title']){
            $event->whereRaw('LCASE(title) like "%'.strtolower($data['title']).'%"');
        }
        if(isset($data['time']) && $data['time']){
            $date = explode('/', $data['time']);
            $date = $date[2] . "-" . $date[1] . "-" . $date[0];
            $event->whereRaw("Date(event_date) >= '".date('Y-m-d', strtotime($date))."'" );
        }

        if(isset($data['end_time']) && $data['end_time']){
            $date = explode('/', $data['end_time']);
            $date = $date[2] . "-" . $date[1] . "-" . $date[0];
            $event->whereRaw("Date(event_date) <= '".date('Y-m-d', strtotime($date))."'" );
        }

        if(isset($data['status']) && $data['status']){
            $event->where('status','=', $data['status']);
        }
        if(isset($data['event_id']) && $data['event_id']){
            $event->where('event_id','=', $data['event_id']);
        }
        $event->whereRaw('is_active = 1');
        $event->orderby('event_date',$order);
        $event->orderby('event_time',$order);
        $eventRowset = $event->get();
//        dd($eventRowset);
        return $eventRowset;

    }

    public function deleteEvent($data){

        $event = $this->where('event_id', $data['event_id']);
        $returnStatus = $event->update(['is_active' => 0]);
        return $returnStatus;
    }


}
