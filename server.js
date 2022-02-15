const express = require('express');
const path = require('path');

const app = express();


app.use(express.static(__dirname + '/dist/steam-angular'));

app.get('/*', function(req,res) {
 
res.sendFile(path.join(__dirname+'/dist/steam-angular/index.html'));
});

app.listen(process.env.PORT || 8080);
// const express = require('express')
// const path = require('path')
// const PORT = process.env.PORT || 8080

// express()
//   .use(express.static(path.join(__dirname, 'public')))
//   .get('/', (req, res) => res.render('dist/steam-angular/index'))
//     .listen(PORT, () => console.log(`Listening on ${PORT}`))

// const express = require('express')
// const path = require('path')
// const PORT = process.env.PORT || 8080

// express()
//   .use(express.static(path.join(__dirname, 'public')))
//   .get('/', (req, res) => res.render('dist/steam-angular/index'))
//     .listen(PORT, () => console.log(`Listening on ${PORT}`))
  
// //Install express server
// const express = require('express');
// const path = require('path');

// const app = express();

// // Serve only the static files form the dist directory
// app.use(express.static('./dist/steam-angular'));

// app.get('/', (req, res) =>
//     res.sendFile('index.html', {root: 'dist/steam-angular/'}),
// );

// // Start the app by listening on the default Heroku port
// app.listen(process.env.PORT || 8080);
