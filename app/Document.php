<?php

namespace App;
use App\D;
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

    public function UploadDocument($categoryFilter,$subCategoryFilter,$pdfpath,$title){

        $category = \App\Document::query();
        $category->select( array('categorys.id'));
        $category->leftjoin('categorys', 'categorys.id', '=', 'document_lists.category_id');
        $existingCategory = $category->where('categorys.category_name','=', $categoryFilter)->get();

        $alreadyExist = $existingCategory->toArray() ? true : false;

        if($alreadyExist){

        }else{

            $categoryIds = \App\Category::query();
            $categoryIds->select( array('categorys.id as categoryId','sub_categorys.id as subCategoryId'));
            $categoryIds->leftJoin('sub_categorys','sub_categorys.category_id','=','categorys.id' );
            $categoryIds->where('categorys.category_name','=', $categoryFilter);
            $categoryIds = $categoryIds->where('sub_categorys.sub_category_name','=', $subCategoryFilter)->get();
            $id = $categoryIds->toArray();

            $categoryObj = new Document();
            $categoryObj->title = $title;
            $categoryObj->category_id = $id[0]['categoryId'];
            $categoryObj->sub_category_id = $id[0]['subCategoryId'];
            $categoryObj->updation_date = date('Y-m-d H:i:s');
            $categoryObj->save();

            $pdfTable = new PdfReport();
            $pdfTable->pdf_name = $pdfpath['pdf0'];
            $pdfTable->uploading_date = date('Y-m-d H:i:s');
            $pdfTable->document_id = $categoryObj->id;
            $pdfTable->save();

            return 'Uploading Successful';


        }

        return $alreadyExist;

    }

}
