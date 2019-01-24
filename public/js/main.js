
$("#loginForm").submit(function () {
    let $nimi = $("#nameInput").val();
    sessionStorage.setItem('username', $nimi);
    alert("Kirjauduttu!");
});

//send message
$("#sendMessage").on('click', () => {
    event.preventDefault();
    let $messageInput = $("#newMessage").val();
    var messageToSend = new Viesti(sessionStorage.getItem('username'), $messageInput);

    var settings = {
        "async": true,
        "crossDomain": true,
        "url": "http://localhost:3000/api/viestit",
        "method": "POST",
        "headers": {
          "Content-Type": "application/json",
          "Accept": "application/json",
          "cache-control": "no-cache",
        },
        "processData": false,
        "data": JSON.stringify(messageToSend)
        //{name: "Anna", teksti: "Haloo keilaranta"}
       }
       
       $.ajax(settings).done(function (response) {
            console.log(response);
       });
    
       $('<p>').text(`${sessionStorage.getItem('username')}: ${$messageInput}`)
        .appendTo($('#messages'));

        function Viesti(name, message){
            this.name = name;
            this.teksti=message;
        }
});


//search functionality
$('#search').on('click', function () { //Tästä funktiosta puuttuu vielä kutsuttava rest-api
    event.preventDefault();
    let $searchTerm = $('#searchTerm').val();
    console.log($searchTerm);
    $.getJSON("http://localhost:3000/api/viestit/"+$searchTerm, searchOutcome)
    function searchOutcome(data) {
        console.dir(data);
        var $searchResults = $('#searchResults');
        $searchResults.empty();
        for (var message in data) {
            $('<p>').text(data[message].name + ": " + data[message].teksti)
                .appendTo($searchResults);
        }
    }
});

