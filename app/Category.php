<?php

namespace App;

use Illuminate\Foundation\Auth\User as Authenticatable;

class Category extends Authenticatable
{
    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */

    protected $fillable = [
        'id', 'category_name', 'is_active'
    ];

    protected $table = 'categorys';
    public $timestamps = false;

    /**
     * @return array
     */
    public function getCategoryWithSubCategoryList()
    {
        $category = \App\Category::query();

        $category->join('sub_categorys', 'sub_categorys.category_id', '=', 'categorys.id');
        $category->where('categorys.is_active','=', 1);
        $data = $category->orderby('categorys.id')->get();

        return $data;
    }

}
