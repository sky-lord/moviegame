
var pageCount;
var apiString;
var filteredMovies;

$("#searchBtn").click(()=>{

  let genreC = $("#genreCats option:selected").val();


  $('#gameContent').html('');
  $('#movieContent').html('');
  
  //Get Movies
  let mURL = "https://api.themoviedb.org/3/search/movie?api_key=aba442bf0028b2c7957a6f762cf916c1&language=en-US&query=" + $('#gameInput').val() + "&page=1&include_adult=false";


  $.getJSON(mURL, function(data){
    filteredMovies = data.results.filter(function(m){
      let catFound = false;
      m.genre_ids.forEach(function(g){
        if(  g == Number( $('#genreCats option:selected').val() ) ){
          catFound = true;
        }
      });
      if ($('#genreCats option:selected').val() == "none" ){
        catFound = true;
      }
      return catFound == true;
    });
    $('#movieContent').html('');

    filteredMovies.forEach(function(movie){
      $('#movieContent').append('<div class="movies"><img src="http://image.tmdb.org/t/p/w185/' + movie.poster_path + '" /><div class="titles">' + movie.original_title + '</div></div>');
    });
    
    console.log(data);
  });

  //Get Games
  $.ajax({
    url: 'https://api-endpoint.igdb.com/games/?search=' + $('#gameInput').val(),
    //url: 'https://api-endpoint.igdb.com/games/41608?fields=*',
    headers: { 
      'user-key': '24906da8f71693c0805dd0aa69a46ede',
      'accept' : 'application/json' 
    },
    success: function(data){
      data.forEach(function(game){
        //$('#gameContent').append('<div class="game">' + game.id + '</div>');
        $.ajax({
          url: 'https://api-endpoint.igdb.com/games/' + game.id + '?fields=*',
          headers: { 
            'user-key': '24906da8f71693c0805dd0aa69a46ede',
            'accept' : 'application/json' 
          },
          success: function(gameData){
         if( gameData[0].popularity > 1 == $('#popCats option:selected').val() == "1"){
            $('#gameContent').append('<div class="game"><img src="http:' + gameData[0].cover.url + '" /><a href="' + gameData[0].url + '"><div class="titles2">' + gameData[0].name + '</a></div><div class="titles3">' + gameData[0].popularity + '</div></div>');
          }
            if ( gameData[0].popularity < 1 == $('#popCats option:selected').val() == "5" ){
           $('#gameContent').append('<div class="game"><img src="http:' + gameData[0].cover.url + '" /><a href="' + gameData[0].url + '"><div class="titles2">' + gameData[0].name + '</a></div><div class="titles3">' + gameData[0].popularity + '</div></div>');
          }
        }
        });
      })
      console.log(data);
    }
  });
});