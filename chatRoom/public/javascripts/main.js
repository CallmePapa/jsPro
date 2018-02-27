/**
 * Created by weiqiujuan on 18-2-27.
 */

let socket,
    Chat = {};

Chat.init = function (setup) {
    //连接到socket
    socket = new io.connect(setup.host);
    //收到数据后，更新用户数
    socket.on('message', function (data) {
        setup.dom.count.text(data.Clients);
    });
    //绑定对话框
    setup.dom.form.submit(Chat.submit);

    //处理新的chat事件
    Chat.$chatroom = setup.dom.room;
    socket.on("chat", Chat.printChat);
};


//提交新的对话到服务器上
Chat.submit = function (e) {
    e.preventDefault();
    //获取输入控件中的文本并清空它
    let $message = $(e.target.message),
        text = $message.val();
    $message.val("");
    //通过socket发送消息
    socket.emit('newchat', {text: text});
};
//将新的聊天内容现实在聊天室里
Chat.printChat=function (data) {
    var $newchat=$("<p>"+data.text+"</p>");
    $newchat.appendTo(Chat.$chatroom);

    //滚动到底部
    Chat.$chatroom.animate({scrollTop:Chat.$chatroom.height()},100);
};

$(function () {
    //初始化聊天程序
    Chat.init({
        host: "http://localhost:3000",
        dom: {
            count: $('#client-count'),
            form: $(".chatbox")
        }
    });
});