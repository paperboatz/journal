
'use strict'


//CREATE A NEW JOURNAL
// make a journal to store entries. It is container for entries
var journal1 = new JournalFactory( "journaltitle", "journalauthor", "journalcontent", "journaldate"); 


// SUBMIT BUTTON 
$("#form-factory").submit(function(e){
	e.preventDefault();
	createEntry($(this));  //$(this) - is refering back to itself ("#form-factory"), it's taking its values
	
	// jump to current entry after submission
	var savedEntries = $('.current-entry');
	$("html, body").scrollTop(savedEntries.offset().top);
});



//TAKING INPUTS FROM FORM, DISPLAY INPUT W/ DELETE BUTTON
function createEntry(frm){

	var name = frm.find('input[name="name"]').val();
	var author = frm.find('input[name="authorName"]').val();
	var contentName  = frm.find('textarea[name="contentName"]').val();
	var dates = new Date();

	journal1.manufacture(name, author, contentName, dates); //needs entrytitle, entryauthor, entrycontent
	localStorage.setItem("savedAllEntries", JSON.stringify(journal1.entries)) //save variable 

	if(journal1){ // if(journal1) tests if journal1 exist
		$('#list-all-entries').html(''); //clearing out list, so it doesn't add item on top of item in the array
		for (var i = 0; i < journal1.entries.length; i++){
			var html = "<div class='entrycontainer'><h1>" + journal1.entries[i].title + "</h1>" // name of array(journal1.entries) and find index #, then find the name property of that specific property
				html += '<h3>' +journal1.entries[i].author+ '</h3>' ;  // grab variable, adding to .append html below
				html += '<p class="date">' +journal1.entries[i].date+ '</p>' ;
				html += '<div class="content">' +journal1.entries[i].content+ '</div>'; //grab variable from entry factory
				html += "<button class='delete-entry btn btn-default ' id="+ i +"> delete entry</button></div>" // i = specific id for each button
			$('#list-all-entries').prepend(html); // appending html gathered above, adding it to list-of-all-entries
		};

		$('.delete-entry').click(function(){
			hideEntry($(this)); // click delete-entry,  activates hideEntry. NEEDS TO EXIST BEFORE hideEntry fcn for js to read. It needs anonymous fcn to run. 
		})	

	} else {
		$('.all-entries').html('You have no entries');
	}

	// resets input back to blank 
	frm.find('input[name="name"]').val('');
	frm.find('input[name="authorName"]').val('');
	frm.find('textarea[name="contentName"]').val('');

};



//DELETES ENTRY FROM ARRAY & REFRESHES ARRAY
function hideEntry(buttondelete){
	var idbutton = buttondelete[0].id; // buttondelete[0].id finds the id of button entry we want to remove

	journal1.entries.splice(buttondelete[0].id,1) //taking out buttondelete from array

	//running the array again to refresh our list 
	// *hint* create this codeblock in a fcn outside of this fcn. then call it, to limit reduntant code.
	$('#list-all-entries').html('');

	for (var i = 0; i < journal1.entries.length; i++){
		var html = "<div class='entrycontainer'><h1>" + journal1.entries[i].title + "</h1>" 
				html += '<h3>' +journal1.entries[i].author+ '</h3>' ;  // grab variable, adding to .append html below
				html += '<p class="date">' +journal1.entries[i].date+ '</p>' ;
				html += '<div class="content">' +journal1.entries[i].content+ '</div>'
				html += "<button class='delete-entry' id="+ i +"> delete entry</button></div>"
		$('#list-all-entries').append(html);
	};

	$('.delete-entry').click(function(){
		hideEntry($(this));
	})

	// checks again if there are no entries after delete button 
	if (journal1.entries.length === 0) {
		var html = "<div class='entrycontainer noentries'>Currently there are no entries.</div>"
		$('#list-all-entries').append(html);
    }	
};


//Inital No entries
if (journal1.entries.length === 0) {
	var html = "<div class='entrycontainer noentries'>Currently there are no entries.</div>"
	$('#list-all-entries').append(html);
}


// Filters entries 
$(document).ready(function(){
    $("#filter").keyup(function(){
 
        // Retrieve the input field text and reset the count to zero
        var filter = $(this).val();
 
        // Loop through the comment list
        $("#list-all-entries > div").each(function(){
            // If the list item does not contain the text phrase fade it out
            if ($(this).text().search(new RegExp(filter, "i")) < 0) {
                $(this).fadeOut();
 
            // Show the list item if the phrase matches and increase the count by 1
            } else {
                $(this).show();
            }
        });
    });
});

/* Stops keydown Enter, when pressed page will jump to top
    this is default behavior of submitting, but by disabling key
    this no longer happens */
$('#filter').keydown(function(event) {
   if (event.keyCode == 13) return false;
});



// ==== ANIMATIONS ==== // 


//BOUNCE ARROW 
$(document).ready(function(){
	$('.glyphicon').addClass('bounceInDown infinite animated')
})

//BOUNCE HEADER
$(document).ready(function(){
	$('.colorh2').addClass('bounce iteration animates1')
})

