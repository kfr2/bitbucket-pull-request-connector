module.exports = function() {
    var hipchat = require('node-hipchat');

    var HC = new hipchat(process.env.HIPCHAT_API_KEY);
    var DEFAULT_MESSAGE_PARAMS = {
        room: process.env.HIPCHAT_ROOM_ID,
        from: process.env.HIPCHAT_NAME || 'Bitbucket',
        color: process.env.HIPCHAT_COLOR || 'purple'
    };

    var sendMessage = function(message) {
        params = DEFAULT_MESSAGE_PARAMS;
        params.message = message;
        HC.postMessage(params, function(data) {
            // The message has been sent. We may want to one day do something in response.
        });
    };

    return {
        sendMessage: sendMessage
    };
}();
