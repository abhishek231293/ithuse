
<div class="row">
    <div class="col-lg-12">
        <div  ng-init="count=0" ng-if="!loader" class="panel-group" id="accordion">

            <div ng-if="documentData.length != 0" ng-repeat="(category_name,categoryDetail) in documentData" class="panel panel-default">
                <a data-toggle="collapse" data-parent="#accordion" href="#collapse{{count}}">
                    <div style="background-color: #ececec;" ng-init="count = $index" class="panel-heading">
                        <h4 class="panel-title">
                            {{category_name}}
                        </h4>
                    </div>
                </a>

                <div id="collapse{{count}}" class="panel-collapse collapse" ng-class="{'in' : $index==0}">
                    <div style="color: #2A6CB6;" class="gray-bg panel-body">
                        <div class="col-md-3"><strong>Document Name</strong></div>
                        <div class="col-md-3"><strong>Document Title</strong></div>
                        <div class="col-md-3"><strong>Uploading Date</strong></div>
                        <div class="col-md-3"><strong>Action</strong></div>
                    </div>
                    <div ng-repeat="(subcategory_name,subcategoryDetail) in categoryDetail" class="panel-body">
                        <div class="col-md-3"><strong>{{subcategory_name}}</strong></div>
                        <div class="col-md-3">{{subcategoryDetail.title}}</div>
                        <div class="col-md-3">{{subcategoryDetail.uploading_date | getDateFormat}}</div>
                        <div class="col-md-3">
                            <a target="_blank" href="{{URL+subcategoryDetail.pdf_name}}">
                                <button class="btn btn-xs btn-success">
                                    <i class="fa fa-file-pdf-o" aria-hidden="true"></i> &nbsp; PDF
                                </button>
                            </a>
                            <button ng-click="deleteDocument(subcategoryDetail.document_id)" class="btn btn-xs btn-danger"> <i class="fa fa-times" aria-hidden="true"></i> &nbsp;Delete </button>
                        </div>
                    </div>
                </div>
            </div>
            <div style="height: 300px;" ng-if="documentData.length == 0" align="center">
                <label style="padding: 10px; margin-top: 10%;" class="label-danger">No Records Found</label>
            </div>
        </div>

    </div>
</div>