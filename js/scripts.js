$(document).ready( function () {

    //change event fires when the user selects a value from the dropdown with a mouse click
    $('#select-section').on('change', function () {
        
        
        var selectedSection = this.value; //this.value represents the selected section

        //adding parameters to url:
        var url = "https://api.nytimes.com/svc/topstories/v2/" + selectedSection + ".json";
            url += '?' + $.param({      
            'api-key': "a40deeadfb074dcb9a3b5ac209821856",  
            });

            //empty the grid-stories list each time a section is selected: 
            $('.grid-stories ul').html('');  
        
        //retrieve data from the server; ajax is used to perform an asyncrhonous http request - GET   
        $.ajax({
        url: url,
        method: 'GET',
        })

        //chaining the .done method to our Ajax request above after successful response:
        .done(function(data){

            var results = data.results;

            //.filter method constructs a new jQuery object from matching subset of only news stories with images
            var newsStoryWithImages = results.filter(function(newsStory){
                return newsStory.multimedia.length !== 0;
            });

            console.log(newsStoryWithImages);
            
            $.each(newsStoryWithImages, function(index, newsStory) {

    if (index < 12 ){ 
        var articleAbstract = newsStory.abstract;
        var articleImage = newsStory.multimedia[4].url;

        $('.grid-stories ul').append('<li><article style="background-image:url(' + articleImage + ')">' + '<div class="overlay">' + '<p>' + articleAbstract + '</p>' + '</div>' + '</article></li>');
        }
            });
        });
    });



}); //end of doc.ready