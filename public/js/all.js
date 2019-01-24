// //all messages to viestit page
$(document).ready(function () {
    $.getJSON("http://localhost:3000/api/viestit/", allMessages)
    function allMessages(data) {
        console.dir(data);
        var $messages = $('#messages');
        for (var message in data) {
            $('<p>').text(data[message].name + ": " + data[message].teksti)
                .appendTo($messages);
        }
    }
})

$('#sendMessage').click(function() {
    location.reload();
});


// //all messages to viestit page
// $(document).ready(function () {
//     $.getJSON("http://localhost:3000/api/viestit/", allMessages)
//     function allMessages(data) {
//         console.dir(data);
//         var $messages = $('#messages');
//         for (var message in data) {
//             $('<p>').text(data[message].name + ": " + data[message].teksti)
//                 .appendTo($messages);
//             //then.location.reload();
//         }
//     }
// })