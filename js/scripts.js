$(function() {

    //change event fires when the user selects a value from the dropdown with a mouse click
    $('#select-section').on('change', function() {

        let selectedSection = this.value; //this.value represents the selected section

        if (selectedSection != '') {
            $('.main-container').addClass('loader');
            $('header').addClass('header-transform');
        } else {
            $('.main-container').removeClass('loader');
            $('header').removeClass('header-transform');
        }

        //adding parameters to url:
        let url = "https://api.nytimes.com/svc/topstories/v2/" + selectedSection + ".json";
        url += '?' + $.param({
            'api-key': "a40deeadfb074dcb9a3b5ac209821856",
        });

        //empty the grid-stories list each time a section is selected: 
        $('.grid-stories ul').html('');

        //retrieve data from the server; ajax is used to perform an asynchronous http request - GET   
        $.ajax({
            url: url,
            method: 'GET',
        })

        //chaining the .done method to our Ajax request above after successful response:
        .done(function(data) {

            let results = data.results;

            //.filter method constructs a new jQuery object from matching subset of only news stories with images
            let newsStoryWithImages = results.filter(function(newsStory) {
                return newsStory.multimedia.length !== 0;
            }); //multimedia is an array so can use .length

            console.log(newsStoryWithImages);

            $('.main-container').removeClass("loader");

            $.each(newsStoryWithImages, function(index, newsStory) {


                if (index < 12) {
                    let articleAbstract = newsStory.abstract;
                    let articleUrl = newsStory.short_url;
                    let articleImage = newsStory.multimedia[4].url;

                    // console.log(articleUrl);

                    //populate the grid by inserting needed content -- images, abstract, overlay -- using the append method:
                    $('.grid-stories ul').append('<li><a target="_blank" href="' + articleUrl + '"><article style="background-image:url(' + articleImage + ')">' + '<div class="overlay" >' + '<p>' + articleAbstract + '</p>' + '</div>' + '</article></a></li>');
                }
            });
        });
    });


}); //end of doc.ready