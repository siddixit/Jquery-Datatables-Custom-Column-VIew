var table;
$(document).ready(function () {

    var data = [];
    for (var i = 0; i < 5000; i++) {
        data.push([i, i, i, i, i, i, i, i, i]);
    }
    table = $('#tblSel').DataTable({
        data: data,
        colReorder: true,
        bStateSave: true,
        scrollY: 200,
        scrollX: true,
        scrollCollapse: true,
        deferRender: true,
        "ordering": false,
        scroller: true,
        initComplete: function (settings, json) {
            $('body').find('.dataTables_scrollBody').css("background", "white");
            $('body').find('.dataTables_scrollBody').css("border-bottom", "white");

        },
    });
});