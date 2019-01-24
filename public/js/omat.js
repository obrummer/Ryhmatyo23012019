//all own messages to omat viestit page
$(document).ready(function () {
    $.getJSON("http://localhost:3000/api/viestit/"+ sessionStorage.getItem('username'), allMessages)
    function allMessages(data) {
        console.dir(data);
        var $omatViestit = $('#omatViestit');
        for (var message in data) {
            $('<p>').text(data[message].name + ": " + data[message].teksti)
                .appendTo($omatViestit);
        }
    }
})