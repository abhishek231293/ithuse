<?php
function addPdf($category,$subCategory)
{

    dd($category. " " . $subCategory);
    $fileData = $_FILES;
    $response = array();

    foreach($fileData as $key => $param){

        if (isset($param["type"])) {

            if(!file_exists('/pdf_document/'.$category)){

                $result = File::makeDirectory(public_path().'/pdf_document/'.$category, $mode = 0777, true, true);
            }

            if(!is_dir('/pdf_document/'.$category.'/'.$subCategory)){
                $result = File::makeDirectory(public_path().'/pdf_document/'.$category.'/'.$subCategory,$mode = 0777, true, true);
            }

            $targetFolder = '/pdf_document/'.$category.'/'.$subCategory; // Relative to the root

            $targetPath = $_SERVER['DOCUMENT_ROOT'] . $targetFolder;
            $imagePath = 'pdf_document/'.$category."/".$subCategory;
            $file_name = 'document'.date('dmYHis');

            $targetFile = rtrim($targetPath, '/') . '/' . $file_name;
            $fileParts = pathinfo($param['name']);
//            dd($fileParts);
            $imagePath = rtrim($imagePath, '/') . '/' . $file_name . '.' . $fileParts['extension'];

            $fileTypes = array('pdf');

            if ((in_array($fileParts['extension'], $fileTypes))) {
                $sourcePath = $param['tmp_name'];
                move_uploaded_file($sourcePath, $targetFile . "." . $fileParts['extension']);
                $response[$key] = $imagePath;
            } else {
                $response[$key] = '';
            }

        }
    }

    return $response;

}

function deletePdf(){
    
}