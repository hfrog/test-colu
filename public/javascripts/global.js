// vim: sw=4:formatoptions-=c:formatoptions-=o:formatoptions-=r

// DOM ready
$(document).ready(function() {
    // Asset Data link click
    $('#assetList table tbody').on('click', 'td a.linkassetdata', showAssetData);

    // Send asset link click
    $('#assetList table tbody').on('click', 'td a.linksendasset', sendAsset);
});

// show asset data
function showAssetData(event) {
    // Prevent link from firing
    event.preventDefault();

    // Retreive assetId from link rel attribute
    var assetId = $(this).attr('rel');

    $('#' + assetId + '_tr').toggleClass('hidden');

    var tableContent = '';
//    tableContent += '<tr>';
//    tableContent +=   '<td span=2>AssetId: ' + assetId + '</td>';
//    tableContent += '</tr>';

    // jQuery AJAX call for JSON
    $.getJSON('/asset/data/' + assetId, function(data) {
        $.each(data, function() {
            tableContent += '<tr>';
            tableContent +=   '<td>' + this.amount + '</td>';
            tableContent +=   '<td>' + this.address + '</td>';
            tableContent += '</tr>';
        });
        $('#' + assetId + '_tbody').html(tableContent);
    });

//    alert($('#' + assetId + '_tbody').html());
};

// send asset
function sendAsset(event) {
    // Prevent link from firing
    event.preventDefault();

    // Retreive assetId from link rel attribute
    var assetId = $(this).attr('rel');

//    $('#' + assetId + '_send').toggleClass('hidden');
//    var tableContent = '';
//    $('#' + assetId + '_tbody').html(tableContent);

    var msg = '<head><meta http-equiv="Content-Type" content="text/html; charset=windows-1251" /><link rel="stylesheet" type="text/css" href="http://javascript.ru/clientscript/vbulletin_css/style-81884d78-00003.css" id="vbulletin_css" /><title>send asset</title>';
    msg+= '<body>';
    msg+=assetId;
    msg+='</body></html>';
    popup = window.open('', '', 'height=300, width=700, top=300, left=300, scrollbars=1');
    popup.document.write(msg);
    popup.document.close();
// <a href="print.html"  onclick="window.open('print.html', 'newwindow', 'width=300, height=250'); return false;"> Print</a>
};

