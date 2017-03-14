//CREATE A NEW JOURNAL
var journal1 = new JournalFactory( "journaltitle", "journalauthor", "journalcontent", "journaldate"
	); // make a journal to store entries. It is container for entries


// SUBMIT BUTTON TRIGGER
$("#form-factory").submit(function(e){
	e.preventDefault();
	createEntry($(this));  //$(this) - is refering back to itself ("#form-factory"), it's taking its values
});

//BOUNCE ARROW 
$(document).ready(function(){
	$('.glyphicon').addClass('bounceInDown infinite animated')
})

//BOUNCE HEADER
$(document).ready(function(){
	$('.colorh2').addClass('bounce iteration animates1')
})

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
			$('#list-all-entries').append(html); // appending html gathered above, adding it to list-of-all-entries
		};

		$('.delete-entry').click(function(){
				hideEntry($(this)); // click delete-entry,  activates hideEntry. NEEDS TO EXIST BEFORE hideEntry fcn for js to read. It needs anonymous fcn to run. 
		})	

	} else {
		$('.all-entries').html('No entries are loaded');
	}
};

//DELETES ENTRY FROM ARRAY & REFRESHES ARRAY
function hideEntry(buttondelete){
	var idbutton = buttondelete[0].id; // buttondelete[0].id finds the id of button entry we want to remove

	journal1.entries.splice(buttondelete[0].id,1) //taking out buttondelete from array

	//running the array again to refresh our list 
	// *hint* create this codeblock in a fcn outside of this fcn. then call it, to limit reduntant code.
	$('#list-all-entries').html('');

	for (var i = 0; i < journal1.entries.length; i++){
		var html = "<div><h1>" + journal1.entries[i].title + "</h1>" 
			html += journal1.entries[i].author ;  
			html += journal1.entries[i].content ;
			html += journal1.entries[i].date ;

			html += "<button class='delete-entry' id="+ i +"> delete entry</button></div>"
		$('#list-all-entries').append(html);
	};

	$('.delete-entry').click(function(){
		hideEntry($(this));
	})		
};


//LOADING ENTRIES 
$('#load').click(function(){

	loaded_entries = JSON.parse(localStorage.getItem('savedAllEntries'));									
	$('#saved-entries').html(" ");

	//ACCESS CONTENT FROM ARRAY TO LOAD
	for (var i = 0; i < loaded_entries.length; i++){
		var html = "<div><h1> title" + loaded_entries[i].title + "</h1>" 
			html += loaded_entries[i].author ;  
			html += loaded_entries[i].content ; 
			html += journal1.entries[i].date ;
			html += "<button class='delete-entry' id="+ i +"> delete entry</button></div>"
		$("#saved-entries").append(html);
	};

	$('.delete-entry').click(function(){
		hideEntry($(this));
	});
});

$(document).ready(function(){
    $("#filter").keyup(function(){
 
        // Retrieve the input field text and reset the count to zero
        var filter = $(this).val(), count = 0;
 
        // Loop through the comment list
        $("#list-all-entries div").each(function(){
            // If the list item does not contain the text phrase fade it out
            if ($(this).text().search(new RegExp(filter, "i")) < 0) {
                $(this).fadeOut();
 
            // Show the list item if the phrase matches and increase the count by 1
            } else {
                $(this).show();
                count++;
            }
        });
 
        // Update the count
        var numberItems = count;
    });
});


