/**
 * Created by weiqiujuan on 18-2-27.
 */

var express = require('express');
var router = express.Router();


router.get('/',function (req, res) {
    res.render('about', {title:"about"});
});


module.exports=router;