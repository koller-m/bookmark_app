// listen for submit
document.getElementById('myForm').addEventListener('submit', saveSite);

// save bookmark
function saveSite(e){
	var siteName = document.getElementById('siteName').value;
	var siteUrl = document.getElementById('siteUrl').value;

	if(!validateForm(siteName, siteUrl)){
		return false;
	}

	var bookmark = {
		name: siteName,
		url: siteUrl
	}

	// test if bookmarks is null
	if(localStorage.getItem('bookmarks') === null){
		var bookmarks = [];
		// add to array
		bookmarks.push(bookmark);
		// set to localStorage
		// convert to string
		localStorage.setItem('bookmarks', JSON.stringify(bookmarks));
	} else {
		// get bookmarks from localStorage
		// convert to JSON
		var bookmarks = JSON.parse(localStorage.getItem('bookmarks'));
		// add bookmark to array
		bookmarks.push(bookmark);
		// reset to localStorage
		localStorage.setItem('bookmarks', JSON.stringify(bookmarks));
	}

	document.getElementById('myForm').reset();

	fetchBookmarks();

	e.preventDefault();
}
// delete bookmark
function deleteBookmark(url){
	var bookmarks = JSON.parse(localStorage.getItem('bookmarks'));

	for(var i = 0; i < bookmarks.length; i++){
		if(bookmarks[i].url == url){
			bookmarks.splice(i, 1);
		}
	}
	localStorage.setItem('bookmarks', JSON.stringify(bookmarks));

	fetchBookmarks();
}

// fetch bookmarks
function fetchBookmarks(){
	// get bookmarks from localStorage
	// convert to JSON
	var bookmarks = JSON.parse(localStorage.getItem('bookmarks'));

	// get output id
	var siteResults = document.getElementById('siteResults');

	// build output
	siteResults.innerHTML = '';
	for(var i = 0; i < bookmarks.length; i++){
		var name = bookmarks[i].name;
		var url = bookmarks[i].url;

		siteResults.innerHTML += '<div class="well">'+
								 '<h3>'+name+
								 ' <a class="btn btn-default" target="_blank" href="'+url+'">Go</a> ' +
								 ' <a onclick="deleteBookmark(\''+url+'\')" class="btn btn-danger" href="#">Delete</a> ' +
								 '</h3>'+
								 '</div>';
	}
}

function validateForm(siteName, siteUrl){
	if(!siteName || !siteUrl){
		alert('Please complete the form');
		return false;
	}

	var expression = /[-a-zA-Z0-9@:%_\+.~#?&//=]{2,256}\.[a-z]{2,4}\b(\/[-a-zA-Z0-9@:%_\+.~#?&//=]*)?/gi;
	var regex = new RegExp(expression);

	if(!siteUrl.match(regex)){
		alert('Please use a valid website');
		return false;
	}
	return true;
}