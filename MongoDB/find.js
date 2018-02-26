var db=require('mongDB');

//创建一个集合myCollection
db.open(function (err, conn) {
    db.collection("myCollection", function (err, collection) {
        var count = 0;
        for (var i = 0; i < 5; i++) {
            collection.insert({
                num: i //插入新文档
            }, function (err, result) {
                //输出结果
                console.log(result);
                //增加计数器
                count++;
                //如果计数器的值足够大，关闭连接
                if (count > 4) {
                    db.close();
                }
            });
        }
    });
});

//选择集合中中的所有记录
db.open(function (er, conn) {
    db.collection("myCollection", function (err, collection) {
        collection.find().toArray(function (err, result) {
            console.log(result);
            db.close();
        });
    });
});
//选择特定的记录
db.open(function (er, conn) {
    db.collection("myCollection", function (err, collection) {
        collection.find({num: 2}).toArray(function (err, result) {
            console.log(result);
            db.close();
        });
    });
});
//限制查询文档数量
db.open(function (er, conn) {
    db.collection("myCollection", function (err, collection) {
        collection.find({}, {limit: 3}).toArray(function (err, result) {
            console.log(result);
            db.close();
        });
    });
});
//记录排序
db.open(function (err, conn) {
    db.collection("myCollection", function (err, collection) {
        collection.find({}, {sort: [['num', 'desc']]}).toArray(function (err,result) {
            console.log(result);
            db.close();
        });
    });
});