
// Listen for form submit
document.getElementById('myForm').addEventListener('submit', saveBookmark);

// Save Bookmark
function saveBookmark(e){
  // Get form values
  var siteName =document.getElementById('siteName').value;
  var siteURL =document.getElementById('siteURL').value;

  if(!siteName || !siteURL){
  	alert('Please fill in the form ');
  	return false;
  }
  var bookmark = {
    name: siteName,
    url: siteURL
  }

  /*
    // Local Storage Test
    localStorage.setItem('test', 'Hello World');
    console.log(localStorage.getItem('test'));
    localStorage.removeItem('test');
    console.log(localStorage.getItem('test'));
  */

  // Test if bookmarks is null
  if(localStorage.getItem('bookmarks') === null){
    // Init array
    var bookmarks = [];
    // Add to array
    bookmarks.push(bookmark);
    // Set to localStorage
    localStorage.setItem('bookmarks', JSON.stringify(bookmarks));
  } else {
    // Get bookmarks from localStorage
    var bookmarks = JSON.parse(localStorage.getItem('bookmarks'));
    // Add bookmark to array
    bookmarks.push(bookmark);
    // Re-set back to localStorage
    localStorage.setItem('bookmarks', JSON.stringify(bookmarks));
  }
  document.getElementById('myForm').reset();

fetchBookmark();  
  // Prevent form from submitting
  e.preventDefault();
}

//delete bookmark
function deleteBookmark(url){
//get bookmarks from localstorage
  var bookmarks = JSON.parse(localStorage.getItem('bookmarks'));
  //loop through bookmarks
  for(var i=0;i<bookmarks.length;i++){
  	if(bookmarks[i].url==url){
  		bookmarks.splice(i,1);
  	}
  }
  //reset back to localstorage
    localStorage.setItem('bookmarks', JSON.stringify(bookmarks));
//refetch bookmarks
fetchBookmark();
}

//fetch bookmark
function fetchBookmark(){
  // Get bookmarks from localStorage
  var bookmarks = JSON.parse(localStorage.getItem('bookmarks'));
  // Get output id
  var bookmksresult = document.getElementById('bookmksresult');

  // Build output
  bookmksresult.innerHTML = '';
  for(var i = 0; i < bookmarks.length; i++){
    var name = bookmarks[i].name;
    var url = bookmarks[i].url;

    bookmksresult.innerHTML += '<div class="well">'+
                                  '<h3>'+name+'&nbsp&nbsp'+
                                  '<a class="btn btn-secondary" target="_blank" href="'+url+'">Visit</a>'+'&nbsp'+
                                  '<a onclick="deleteBookmark(\''+url+'\')" class="btn btn-danger" href="#">Delete</a>'+'&nbsp'+
                                   '</h3>'+
                                  '</div>';
  }
}

