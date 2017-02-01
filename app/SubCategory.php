<?php

namespace App;

use Illuminate\Foundation\Auth\User as Authenticatable;

class SubCategory extends Authenticatable
{
    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */

    protected $fillable = [
        'id', 'sub_category_name','category_id', 'is_active'
    ];

    protected $table = 'sub_categorys';
    public $timestamps = false;

    /**
     * @return array
     */

    public function subCategoryExist($id){
        $category = \App\SubCategory::query();
        $category->where('sub_categorys.id','=', $id);
        $category->where('sub_categorys.is_active','=', 1);
        $data = $category->orderby('sub_categorys.id')->get();

        return $data->toArray();
    }

}
