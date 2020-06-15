var express= require("express");
var router= express.Router();

router.get("/", function(req,res,next){
    res.send("API sta lavorando correttamente");

});
module.exports=router;