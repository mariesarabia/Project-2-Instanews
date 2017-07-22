$(document).ready( function () {

$('select-section').on('change', function (){
    var selectedSection = this.value;

    var url = "https://api.nytimes.com/svc/topstories/v2/" + selectedSection + ".json";
            url += '?' + $.param({      
            'api-key': "a40deeadfb074dcb9a3b5ac209821856",  
            });

    $('.grid-stories ul').html('');  
        
    $.ajax({
    url: url,
    method: 'GET',})

    .done(function(data){

    var results = data.results;
        var newsStoryWithImages = results.filter(function(newsStory){
                return newsStory.multimedia.length !== 0;
    });

    $.each(newsStoryWithImages, function(index, newsStory) {

    if (index < 12 ){ 
        var articleAbstract = newsStory.abstract;
        var articleImage = newsStory.multimedia[4].url;

        $('.grid-stories ul').append('<li><article style="background-image:url(' + articleImage + ')">'+ articleAbstract + '</article></li>');
        }
            });
        });
    });



}); //end of doc.ready