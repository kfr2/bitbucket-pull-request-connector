var hipchat = require('../connectors/hipchat');

describe('sendMessage', function() {
    it('should be defined', function() {
        expect(hipchat.sendMessage).toBeDefined();
    });

    it('should be a function', function() {
        var type = typeof hipchat.sendMessage;
        expect(type).toBe('function');
    });
});

