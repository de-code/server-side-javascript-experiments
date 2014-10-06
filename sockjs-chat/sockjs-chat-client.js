var sock = new SockJS('http://localhost:8080/chat');

sock.onmessage = function(e) {
  var message = JSON.parse(e.data);
  $('#chat-content').val(function(i, text) {
    return text + 'User ' + message.username + ': ' + message.text + '\n';
  });
};

function sendMessage() {
  var message = {
    username: $('#username').val(),
    text: $('#text').val()
  };
  sock.send(JSON.stringify(message));
}
