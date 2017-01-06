<?php

namespace App;

use Illuminate\Foundation\Auth\User as Authenticatable;

class LoginHistory extends Authenticatable
{
    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'login_user_id', 'login_time', 'logout_time','ip_address', 'user_agent', 'is_active'
    ];

    public $timestamps = false;

}
