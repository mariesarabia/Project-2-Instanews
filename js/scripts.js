$(document).ready( function () {

 // Built by LucyBot. www.lucybot.com
 var url = "https://api.nytimes.com/svc/topstories/v2/home.json";
        url += '?' + $.param({
        'api-key': "a40deeadfb074dcb9a3b5ac209821856",
        'q': "Sacramento"
        });
        $.ajax({
        url: url,
        method: 'GET',
        })
        .done(function(data) {
        console.log(data.results[1].title);

        $.each(data.results, function(index, myArticle)[
            console.log(myArticle.title);
            $('body').append('<p>' + myArticle.title + '</p>');
        });

}); //end of doc.ready 