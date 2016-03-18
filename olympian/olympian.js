var mysql = require('mysql');
var nunjucks  = require('nunjucks');
var express   = require('express');
var session = require('express-session');
var bodyParser = require('body-parser');

var app       = express();

app.use(express.static(__dirname + '/public')); 


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));

nunjucks.configure('views', {
  autoescape: true,
  express   : app
});

app.get('/', function(req, res) {
var connection = mysql.createConnection({
	multipleStatements: true,
  host     : 'localhost',
  user     : 'root',
  password  : 'wipro@123',
  database : 'mcclatchy'
});
connection.connect();

connection.query('SELECT mainmenu_id,mainmenu_name from mainmenu;SELECT fullmenuname,fullmenu_id,mainmenu_id from fullmenu ;SELECT submenuname,submenu_id,fullmenu_id  from submenuforfullmenu;select breakingnews_name,breakingnews_content from breakingnews;', function(err, result) {
	
 
  if (!err){
  //  console.log('mainmenu : ', result[0]);
	// console.log('fullmenu : ', result[1]);
	//  console.log('submenu : ', result[2]);
	  console.log('brnews: ',result[3]);
	res.render('mainmenu.html', {
		title : 'Olympian',
		mainmenu:result[0],
		fullmenu:result[1],
		submenu:result[2],
		brnews1:result[3],
			});
  }
  else
    console.log('Error while performing Query.', err);
});

connection.end(); 
});

/* var connection = mysql.createConnection({
  host     : 'localhost',
  user     : 'root',
  password  : 'wipro@123',
  database : 'mcclatchy'
});
connection.connect();
app.get('/viewfullmenu',function(req, res) {
/* var connection = mysql.createConnection({
  host     : 'localhost',
  user     : 'root',
  password  : 'wipro@123',
  database : 'mcclatchy'
}); */
//nnection.connect();

/*connection.query('SELECT fullmenuname from fullmenu,mainmenu where mainmenu.mainmenu_id=fullmenu.mainmenu_id AND mainmenu.mainmenu_name="Fullmenu"', function(err, rows, fields) {
	
  if (!err){
    console.log('Session rows : ', rows);
	res.render('mainmenu.html', {
		title : 'Olympian',
		regrows1:rows
			});
  }
  else
    console.log('Error while performing Query.', err);
});
connection.end(); 
});
 */

app.listen(8080, function() {
	console.log("Listening on 8080");
});