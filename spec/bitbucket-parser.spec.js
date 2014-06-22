var fs = require('fs');
var parser = require('../bitbucket-parser');


describe('generateMessage', function() {
    console.log = function() {};

    it('should return created message if passed created action', function() {
        var data = JSON.parse(fs.readFileSync('spec/pr_actions/created.json', encoding='utf8'));
        var out = parser.generateMessage(data);
        expect(out).toMatch('created');
        expect(out).not.toMatch('<b>Reviewers:</b>');
    });

    it('should return created message with reviewers if passed created action with reviewers', function() {
        var data = JSON.parse(fs.readFileSync('spec/pr_actions/created_with_reviewers.json', encoding='utf8'));
        var out = parser.generateMessage(data);
        expect(out).toMatch('created');
        expect(out).toMatch('<b>Reviewers:</b> Nicolas Venegas');
    });

    it('should return updated message if passed updated action', function() {
        var data = JSON.parse(fs.readFileSync('spec/pr_actions/updated.json', encoding='utf8'));
        var out = parser.generateMessage(data);
        expect(out).toMatch('updated');
    });

    it('should return approved message if passed approved action', function() {
        var data = JSON.parse(fs.readFileSync('spec/pr_actions/approval.json', encoding='utf8'));
        var out = parser.generateMessage(data);
        expect(out).toMatch('approved');
    });

    it('should return declined message if passed declined action', function() {
        var data = JSON.parse(fs.readFileSync('spec/pr_actions/declined.json', encoding='utf8'));
        var out = parser.generateMessage(data);
        expect(out).toMatch('declined');
    });

    it('should return merged message if passed merged action', function() {
        var data = JSON.parse(fs.readFileSync('spec/pr_actions/merged.json', encoding='utf8'));
        var out = parser.generateMessage(data);
        expect(out).toMatch('merged');
    });

    it('should return undefined if passed unknown pull request action', function() {
        var out = parser.generateMessage({'unknown': 'dunno'});
        expect(out).toBe(undefined);
    });
});

