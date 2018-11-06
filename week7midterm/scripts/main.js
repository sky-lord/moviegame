
var pageCount;
var apiString;

$("#searchBtn").click(function(){

  $('#gameContent').html('');
  
  //Get Movies
  var mURL = 'https://api.themoviedb.org/3/search/movie?api_key=aba442bf0028b2c7957a6f762cf916c1&language=en-US&query=' + $('#gameInput').val() + '&page=1&include_adult=false';

  var genreC = $("#genreCats option:selected").val();
  if( genreC == "horror"){
    
  } else if( genreC == "horror"){

  } 


  $.getJSON(mURL, function(data){
    data.results.forEach(function(movie){
      $('#gameContent').append('<div class="movies"><img src="http://image.tmdb.org/t/p/w185/' + movie.poster_path + '" /><div class="titles">' + movie.original_title + '</div></div>');
    });
    
    console.log(data);
  });

  //Get Games
  $.ajax({
    url: 'https://api-endpoint.igdb.com/games/?search=' + $('#gameInput').val(),
    //url: 'https://api-endpoint.igdb.com/games/41608?fields=*',
    headers: { 
      'user-key': '94e21d82c72f27c6295c8fa40523f83d',
      'accept' : 'application/json' 
    },
    success: function(data){
      data.forEach(function(game){
        //$('#gameContent').append('<div class="game">' + game.id + '</div>');
        $.ajax({
          url: 'https://api-endpoint.igdb.com/games/' + game.id + '?fields=*',
          headers: { 
            'user-key': '94e21d82c72f27c6295c8fa40523f83d',
            'accept' : 'application/json' 
          },
          success: function(gameData){
            $('#gameContent').append('<div class="game"><img src="http:' + gameData[0].cover.url + '" /><a href="' + gameData[0].url + '"><div class="titles">' + gameData[0].name + '</a></div></div>');
          }
        });
      })
      console.log(data);
    }
  });
});