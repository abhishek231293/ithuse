<?php

namespace App;

use Illuminate\Foundation\Auth\User as Authenticatable;

class Document extends Authenticatable
{
    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */

    protected $fillable = [
        'id', 'title', 'category_id','sub_category_id', 'updation_date', 'is_active'
    ];
    protected $table = 'document_lists';
    public $timestamps = false;

    /**
     * @return array
     */
    public function getDocumentLists($categoryFilter,$subCategoryFilter)
    {
        $category = \App\Document::query();

        $category->join('pdf_reports', 'pdf_reports.document_id', '=', 'document_lists.id');
        $category->join('categorys', 'categorys.id', '=', 'document_lists.category_id');
        $category->join('sub_categorys', 'sub_categorys.id', '=', 'document_lists.sub_category_id');

        if($categoryFilter){

            $category->where('categorys.category_name','=', $categoryFilter);

            if($subCategoryFilter){
                $category->where('sub_categorys.sub_category_name','=', $subCategoryFilter);
            }
        }
        
        $category->where('document_lists.is_active','=', 1);
        $category->where('pdf_reports.is_active','=', 1);
        $data = $category->orderby('document_lists.category_id','DESC')->get();

        return $data;
    }

}
