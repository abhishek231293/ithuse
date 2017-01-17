@section('documentList')
    <div class="col-lg-12">
        <div class="ibox-title">
            <h5>Departments</h5>
        </div>
        <div class="ibox-content" style="display: block;">

            <get-filter></get-filter>
            <loader></loader>
            <document-list></document-list>

        </div>
    </div>

@endsection