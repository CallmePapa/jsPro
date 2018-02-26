var db = require('mongDB');

//更新整体记录
db.collection("myNewCollection", function (err, collection) {
    collection.update({num: 2}, {num: 10}, {safe: true},function (err) {
        if(err){
            console.log(err);
        }else{
            console.log("successfully updated");
        }
        db.close({});
    });
});

//更新或插入,即便找不到８的文档也会插入７的新文档
/*db.collection("myNewCollection", function (err, collection) {
    collection.update({num:８}, {num: ７}, {safe: true ,upsert:true},function (err) {
        if(err){
            console.log(err);
        }else{
            console.log("successfully updated");
        }
        db.close({});
    });
});*/

//设定特定域
db.collection("myNewCollection", function (err, collection) {
    collection.update({num:3}, {$set:{desc:"favorite number"}},{safe: true},function (err) {
        if(err){
            console.log(err);
        }else{
            console.log("successfully updated");
        }
        db.close({});
    });
});

//查找并修改
db.collection("myNewCollection", function (err, collection) {
    collection.finAndModify({num:4},[['_id','asc']],{num:25},{safe:true},function (err) {
        if(err){
            console.log(err);
        }
        //输出受影响的文档
        else{
            console.log(result);
        }
        db.close({});
    });
});