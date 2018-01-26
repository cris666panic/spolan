var express = require('express');
var router = express.Router();



router.get('/horaServer', function (req, res) {


	//new Date().toJSON().slice(0,10)

	console.log(new Date());



//	res.json(new Date().toJSON().slice(0,10));
	res.json({hora:new Date()});

});

module.exports = router;