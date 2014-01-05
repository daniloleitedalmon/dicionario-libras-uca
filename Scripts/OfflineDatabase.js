//  Declare SQL Query for SQLite
 
var createStatement = "CREATE TABLE IF NOT EXISTS Dictionary (id INTEGER PRIMARY KEY AUTOINCREMENT, word TEXT, example TEXT, signexample TEXT, meaning TEXT, sign TEXT, video TEXT)";
 
var selectAllStatement = "SELECT * FROM Dictionary";
 
var insertStatement = "INSERT INTO Dictionary (word, example, signexample, meaning, sign, video) VALUES (?, ?, ?, ?, ?, ?)";
 
var updateStatement = "UPDATE Dictionary SET word = ?, example = ?, signexample = ?, meaning = ?, sign = ?, video = ? WHERE id=?";
 
var deleteStatement = "DELETE FROM Dictionary WHERE id=?";
 
var dropStatement = "DROP TABLE Dictionary";
 
var db = openDatabase("AddressBook", "1.0", "Address Book", 200000);  // Open SQLite Database
 
var dataset;
 
var DataType;
 
 function initDatabase()  // Function Call When Page is ready.
 
{
 
    try {
 
        if (!window.openDatabase)  // Check browser is supported SQLite or not.
 
        {
 
            alert('Databases are not supported in this browser.');
 
        }
 
        else {
 
            createTable();  // If supported then call Function for create table in SQLite
 
        }
 
    }
 
    catch (e) {
 
        if (e == 2) {
 
            // Version number mismatch. 
 
            console.log("Invalid database version.");
 
        } else {
 
            console.log("Unknown error " + e + ".");
 
        }
 
        return;
 
    }
 
}
 
function createTable()  // Function for Create Table in SQLite.
 
{
 
    db.transaction(function (tx) { tx.executeSql(createStatement, [], showRecords, onError); });
 
}
 
function insertRecord() // Get value from Input and insert record . Function Call when Save/Submit Button Click..
 
{
 
        var wordtemp = $('input:text[id=word]').val();
        var exampletemp = $('input:text[id=example]').val();
		var signexampletemp = $('input:text[id=signexample]').val();
		var meaningtemp = $('input:text[id=meaning]').val();
		var signtemp = $('input:text[id=sign]').val();
		var videotemp = $('input:text[id=video]').val();
		
        db.transaction(function (tx) { tx.executeSql(insertStatement, [wordtemp, exampletemp, signexampletemp, meaningtemp, signtemp, videotemp], loadAndReset, onError); });
 
        //tx.executeSql(SQL Query Statement,[ Parameters ] , Sucess Result Handler Function, Error Result Handler Function );
 
}
 
function deleteRecord(id) // Get id of record . Function Call when Delete Button Click..
 
{
 
    var iddelete = id.toString();
 
    db.transaction(function (tx) { tx.executeSql(deleteStatement, [id], showRecords, onError); alert("Delete Sucessfully"); });
 
    resetForm();
 
}
 
function updateRecord() // Get id of record . Function Call when Delete Button Click..
 
{
 
    var wordupdate = $('input:text[id=word]').val().toString();
    var exampleupdate = $('input:text[id=example]').val().toString();
    var signexampleupdate = $('input:text[id=signexample]').val().toString();
    var meaningupdate = $('input:text[id=meaning]').val().toString();
	var signupdate = $('input:text[id=sign]').val().toString();
	var videoupdate = $('input:text[id=video]').val().toString();
 
    var idupdate = $("#id").val();
 
    db.transaction(function (tx) { tx.executeSql(updateStatement, [wordupdate, exampleupdate, signexampleupdate, meaningupdate, signupdate, videoupdate, Number(idupdate)], loadAndReset, onError); });
 
}
 
function dropTable() // Function Call when Drop Button Click.. Table will be dropped from database.
 
{
 
    db.transaction(function (tx) { tx.executeSql(dropStatement, [], showRecords, onError); });
 
    resetForm();
 
    initDatabase();
 
}
 
function loadRecord(i) // Function for display records which are retrived from database.
 
{
 
    var item = dataset.item(i);
 
    $("#word").val((item['word']).toString());
    $("#example").val((item['example']).toString());
	$("#signexample").val((item['signexample']).toString());
	$("#meaning").val((item['meaning']).toString());
	$("#sign").val((item['sign']).toString());
	$("#video").val((item['video']).toString());
 
    $("#id").val((item['id']).toString());
 
}
 
function resetForm() // Function for reset form input values.
 
{
 
    $("#word").val("");
    $("#example").val("");
    $("#signexample").val("");
    $("#meaning").val("");
	$("#sign").val("");
	$("#video").val("");
 
    $("#id").val("");
 
}
 
function loadAndReset() //Function for Load and Reset...
 
{
 
    resetForm();
 
    showRecords()
 
}
 
function onError(tx, error) // Function for Hendeling Error...
 
{
 
    alert(error.message);
 
}
 
function showRecords() // Function For Retrive data from Database Display records as list
 
{
 
    $("#results").html('')
 
    db.transaction(function (tx) {
 
        tx.executeSql(selectAllStatement, [], function (tx, result) {
 
            dataset = result.rows;
 
            for (var i = 0, item = null; i < dataset.length; i++) {
 
                item = dataset.item(i);
 
                var linkeditdelete = '<li>' + item['word'] + ' , ' + item['example'] + ' , ' + item['signexample'] + ' , ' + item['meaning'] + '    ' + '<a href="#" onclick="loadRecord(' + i + ');">edit</a>' + '    ' +
 
                                            '<a href="#" onclick="deleteRecord(' + item['id'] + ');">delete</a></li>';
 
                $("#results").append(linkeditdelete);
 
            }
 
        });
 
    });
	
	$("#word").html('')
 
    db.transaction(function (tx) {
 
        tx.executeSql(selectAllStatement, [], function (tx, result) {
 
            dataset = result.rows;
 
            for (var i = 0, item = null; i < dataset.length; i++) {
 
                item = dataset.item(i);
 
                var linkeditdelete = '<ul><a href="#" onclick="showOneRecord(' + item['id'] + ');"> ' + item['word'] + ' </a></ul>';
 
                $("#word").append(linkeditdelete);
				
				
 
            }
 
        });
 
    });
	
	}
	
 
$(document).ready(function () // Call function when page is ready for load..
 
{
;
 
    $("body").fadeIn(2000); // Fade In Effect when Page Load..
 
    initDatabase();
 
    $("#submitButton").click(insertRecord);  // Register Event Listener when button click.
 
    $("#btnUpdate").click(updateRecord);
 
    $("#btnReset").click(resetForm);
 
    $("#btnDrop").click(dropTable);
	
 
});
 
 function showOneRecord(palavra) // Function For Retrive data from Database Display records as list
 
{

	
	    palavra = palavra - 1;
	
	    $("#example").html('')
 
    db.transaction(function (tx) {
 
        tx.executeSql(selectAllStatement, [], function (tx, result) {
 
            dataset = result.rows;
			
			
			item = null; 
						
			if (palavra < dataset.length) {
 
                item = dataset.item(palavra);
 
                var linkeditdelete = '<ul>' + item['example'] + '</ul>';
 
                $("#example").append(linkeditdelete);
 
            }
 
        });
 
    });
	
	    $("#signexample").html('')
 
    db.transaction(function (tx) {
 
        tx.executeSql(selectAllStatement, [], function (tx, result) {
 
            dataset = result.rows;
			
			item = null; 
			
			if (palavra < dataset.length) {
 
                item = dataset.item(palavra);
 
                var linkeditdelete = '<ul>' + item['signexample'] + '</ul>';
 
                $("#signexample").append(linkeditdelete);
 
            }
 
        });
 
    });
	
	    $("#meaning").html('')
 
    db.transaction(function (tx) {
 
        tx.executeSql(selectAllStatement, [], function (tx, result) {
 
            dataset = result.rows;
			
			item = null;
			
			if ( palavra < dataset.length) {
 
                item = dataset.item(palavra);
 
               var linkeditdelete = '<ul>'+ item['meaning'] + '</ul>';
 
                $("#meaning").append(linkeditdelete);
 
            }
 
        });
 
    });
	
    $("#sign").html('')
 
    db.transaction(function (tx) {
 
        tx.executeSql(selectAllStatement, [], function (tx, result) {
 
            dataset = result.rows;
			
			item = null; 
			
			if (palavra < dataset.length) {
 
                item = dataset.item(palavra);
 
                var linkeditdelete = '<ul>' + item['sign'] + '</ul>';
 
                $("#sign").append(linkeditdelete);
				
 				document.getElementById("img").src = item['sign'] ; 
            }
 
        });
 
    });
	
	    $("#video").html('')
 
    db.transaction(function (tx) {
 
        tx.executeSql(selectAllStatement, [], function (tx, result) {
 
            dataset = result.rows;
			
			item = null; 
			
			if (palavra < dataset.length) {
 
                item = dataset.item(palavra);
 
                var linkeditdelete = '<ul>' + item['video'] + '</ul>';
 
                $("#video").append(linkeditdelete);
				
				document.getElementById("video").src = item['video'] ; 
 
            }
 
        });
 
    });
 
}
  