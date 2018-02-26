var db=require('mongDB');

//删除文档
db.collection("myNewCollection", function (err, collection) {
    collection.remove({num:1},function (err) {
        if(err){
            console.log(err);
        }else{
            console.log("successfully removed");
        }
        db.close({});
    });
});

//删除集合

db.open(function (err,conn) {
    //delete collection
    db.dropCollection("myNewCollection",function (err,result) {
        if(err){
            console.log(err);
        }else {
            console,log(result);
        }
        db.close();
    });
});
