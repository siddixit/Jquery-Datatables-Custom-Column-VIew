var tabDefaults = [];
$("#tblSel thead tr th").each(function () {
    tabDefaults.push($.trim($(this).text()));
});

$("#settingsButton").click(function () {
    $("#settingsModal").modal();
    $('#lstBox1').empty();
    $('#lstBox2').empty();
    table.columns().every(function () {
        if (this.visible()) {
            $('#lstBox2').append(new Option($(this.header()).text(), $(this.header()).text(), false, false));
        }
        else {
            $('#lstBox1').append(new Option($(this.header()).text(), $(this.header()).text(), false, false));
        }
    });
});

$('#btnUp').click(function () {
    var $op = $('#lstBox2 option:selected'),
        $this = $(this);
    if ($op.length) {
        $op.first().prev().before($op);
    }
    var tempList = [];
    $('#lstBox1 option').each(function () {
        tempList.push($(this).val());
    });
    //reorderList(tempList)


});

$('#btnDown').click(function () {
    var $op = $('#lstBox2 option:selected'),
        $this = $(this);
    if ($op.length) {
        $op.last().next().after($op);
    }
});

$('#btnTop').click(function () {
    var $select = $('#lstBox2');
    var $op = $('#lstBox2 option:selected'),
        $this = $(this);
    $op.insertBefore('option:eq(0)');
});

$('#btnBottom').click(function () {
    var $select = $('#lstBox2');
    var $op = $('#lstBox2 option:selected'),
        $this = $(this);
    $op.appendTo($select);

});

$('#btnAddAll').click(function (e) {
    var selectedOpts = $('#lstBox1 option');
    if (selectedOpts.length === 0) {
        alert("Nothing to move.");
        e.preventDefault();
    }
    $('#lstBox2').append($(selectedOpts).clone());
    $(selectedOpts).remove();
    e.preventDefault();
});
$('#btnAdd').click(function (e) {
    var selectedOpts = $('#lstBox1 option:selected');
    if (selectedOpts.length === 0) {
        alert("Nothing to move.");
        e.preventDefault();
    }
    $('#lstBox2').append($(selectedOpts).clone());
    $(selectedOpts).remove();
    e.preventDefault();
});
$('#btnRemove').click(function (e) {
    var selectedOpts = $('#lstBox2 option:selected');
    if (selectedOpts.length === 0) {
        alert("Nothing to move.");
        e.preventDefault();
    }
    $('#lstBox1').append($(selectedOpts).clone());
    $(selectedOpts).remove();
    e.preventDefault();
});

$('#btnRemoveAll').click(function (e) {
    var selectedOpts = $('#lstBox2 option');
    if (selectedOpts.length === 0) {
        alert("Nothing to move.");
        e.preventDefault();
    }
    $('#lstBox1').append($(selectedOpts).clone());
    $(selectedOpts).remove();
    e.preventDefault();
});


$('#btnSaveChanges').click(function (e) {
    var draftOrder = new Array(12);

    var selectedOpts_list1 = $('#lstBox1 option');
    var selectedOpts_list2 = $('#lstBox2 option');
    if (selectedOpts_list1.length > 0) {
        $.each(selectedOpts_list1, function (index, value) {
            var column = table.column(':contains(' + $.trim(selectedOpts_list1[index].innerHTML) + ')');
            column.visible(false);
            for (var i = 0; i < tabDefaults.length; i++) {
                if (tabDefaults[i] === $.trim(selectedOpts_list1[index].innerHTML)) {
                    draftOrder[i] = i;
                }
            }
        });
    }
    var sequence = 0;
    $.each(selectedOpts_list2, function (index, value) {
        var column = table.column(':contains(' + $.trim(selectedOpts_list2[index].innerHTML) + ')');
        column.visible(true);
        while (typeof draftOrder[sequence] !== 'undefined' && draftOrder[sequence] !== null) {
            sequence++;
        }
        draftOrder[sequence] = $.inArray($.trim(selectedOpts_list2[index].innerHTML), tabDefaults);
        sequence++;
    });
    //console.log(draftOrder);
    table.colReorder.reset();
    table.colReorder.order(draftOrder);
    table.columns.adjust().draw();
    table.state.clear();
    table.state.save();
    $("#settingsModal").modal('hide');

});

$('#btnRestore').click(function (e) {
    $('#lstBox1').empty();
    $('#lstBox2').empty();
    $.each(tabDefaults, function (index, value) {
        var optionString = '<option value="' + value + '">' + value + '</option>';
        $('#lstBox2').append(optionString);
    });
});