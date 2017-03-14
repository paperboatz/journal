
//makes specific entry
function Entry(title, author, content, date){
	this.title = title;
	this.content = content;
	this.author = author;
	this.date = date;
	
}

//makes journal factory, with a function to make a number of entries
function JournalFactory(title, content, author, date, tags){
	this.title = title;
	this.content = content;
	this.author = author;

	this.entries = [];
	
	this.manufacture = function(entrytitle, entryauthor, entrycontent, entrydate){
		var entry = new Entry(entrytitle, entryauthor, entrycontent, entrydate);
			this.entries.push(entry);
	}
}
