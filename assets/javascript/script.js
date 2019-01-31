(function ($, window, undefined) {
    var gifSearch = {
        topics: [
            "Clueless", "Party Monster", "Pink Flamingos", "Gummo", "Donnie Darko", "Titanic", "Grease", "Martyrs", "Requiem for a Dream", "Almost Famous"
        ],
        createButtons: function () {
            // Must have this line so that when user adds button, not all buttons are re-added too 
            $("#search-buttons").empty();

            for (var i = 0; i < gifSearch.topics.length; i++) {
                var button = $("<button>");
                button.addClass("show-gifs");
                button.attr("data-search", gifSearch.topics[i]);
                button.text(gifSearch.topics[i])
                $("#search-buttons").append(button);
            };

            $("#add-query").click(function () {
                // Define variable for user input; note the trim to get rid of extra spaces
                var userAdd = $("#user-query").val().trim();
                // Add user input to topics array
                gifSearch.topics.push(userAdd);
                // Empties input field after user input submitted
                $("#user-query").val("");
                // User input value added to array, but button won't be made without running the for loop again
                // Remember, empty out array at beginning of createButtons() so nothing repeats
                gifSearch.createButtons();
                // Without this line, after addition of new button, none of the buttons will display gifs when clicked
                gifSearch.displayGifs();
                // Without this line, the new button will disappear immediately
                // Could have used event.preventDefault() at beginnning instead
                return false;
            });
        },

        displayGifs: function () {
            $(".show-gifs").click(function () {
                var search = $(this).attr("data-search");
                var queryURL = "http://api.giphy.com/v1/gifs/search?q=" + search + "&api_key=hkSxqwou6PZ44qCnovbwmFhV7nt9F8O2&limit=10"

                $.ajax({
                    url: queryURL,
                    method: "GET"
                })
                    .then(function (response) {
                        var results = response.data;
                        console.log(results)
                        for (var i = 0; i < results.length; i++) {
                            var movieImage = $("<img>");
                            movieImage.attr("src", results[i].images.fixed_height_still.url);
                            movieImage.attr("data-animate", results[i].images.fixed_height.url);
                            movieImage.attr("data-still", results[i].images.fixed_height_still.url);
                            movieImage.addClass("gif");

                            
                            var rating = $("<p>").text("Rating: " + results[i].rating);

                            $("#gifs").prepend(movieImage, rating);
                        }
                    });
            });

        }
    }
    $("#gifs").on("click", ".gif", function () {

        if ($(this).attr("src") === $(this).attr("data-still")) {
            $(this).attr("src", $(this).attr("data-animate"))
        }
        else if ($(this).attr("src") === $(this).attr("data-animate")) {
            $(this).attr("src", $(this).attr("data-still"))
        }
    });
    gifSearch.createButtons();
    gifSearch.displayGifs();

})($, window);