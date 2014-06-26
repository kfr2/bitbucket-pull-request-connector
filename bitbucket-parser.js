module.exports = function() {
    var spice = require('spice');

    var createdMessage = function(pr) {
        var out = spice(
            '{:pullRequestAuthor} has <b>created</b> a pull request entitled \"<a href="{:pullRequestUrl}">{:pullRequestName}</a>\" for {:repoName} (<i>{:repoSourceName} -> {:repoDestinationName}</i>).',
            {
                pullRequestAuthor: pr.author.display_name,
                pullRequestUrl: pr.links.html.href.replace('api.bitbucket.org', 'bitbucket.org'),
                pullRequestName: pr.title,
                repoName: pr.source.repository.name,
                repoSourceName: pr.source.branch.name,
                repoDestinationName: pr.destination.branch.name
            }
        );
        var reviewers = pr.reviewers;
        if (reviewers.length > 0) {
            var names = [];
            for(var i = 0; i < reviewers.length; i++) {
                names.push(reviewers[i].display_name);
            }
            out += ' <b>Reviewers:</b> ';
            out += names.join(', ');
        }

        return out;
    };

    var updatedMessage = function(pr) {
        var out = spice(
            '{:pullRequestAuthor} has <b>updated</b> the pull request entitled "{:pullRequestName}" for <a href="http://bitbucket.org/{:repoName}">{:repoName}</a> (<i>{:repoSourceName}</i> -> <i>{:repoDestinationName}</i>).',
            {
                pullRequestAuthor: pr.author.display_name,
                pullRequestName: pr.title,
                repoName: pr.source.repository.full_name,
                repoSourceName: pr.source.branch.name,
                repoDestinationName: pr.destination.branch.name
            }
        );
        return out;
    };

    var approvedMessage = function(pr) {
        var out = spice(
            '{:reviewer} has <b>approved</b> a pull request.',
            {
                reviewer: pr.user.display_name
            }
        );
        return out;
    };

    var declinedMessage = function(pr) {
        var out = spice(
            '{:pullRequestAuthor} has <b>declined</b> the pull request for <a href="http://bitbucket.org/{:repoName}">{:repoName}</a> entitled "{:pullRequestName}" because of the following reason: "{:reason}"',
            {
                pullRequestAuthor: pr.author.display_name,
                repoName: pr.destination.repository.full_name,
                pullRequestName: pr.title,
                reason: pr.reason
            }
        );
        return out;
    };

    var mergedMessage = function(pr) {
        var out = spice(
            '{:pullRequestAuthor} has <b>merged</b> the pull request entitled "{:pullRequestName}" for <a href="http://bitbucket.org/{:repoFullName}">{:repoName}</a> (<i>{:repoSourceName} -> {:repoDestinationName}</i>).',
            {
                pullRequestAuthor: pr.author.display_name,
                pullRequestName: pr.title,
                repoFullName: pr.destination.repository.full_name,
                repoName: pr.destination.repository.name,
                repoSourceName: pr.source.branch.name,
                repoDestinationName: pr.destination.branch.name
            }
        );
        return out;
    };

    /**
     * Examine the message from Bitbucket to determine the message to send
     * to the notification service. See [0] for the messages Bitbucket
     * may send.
     *
     * 0: https://confluence.atlassian.com/display/BITBUCKET/Pull+Request+POST+hook+management
     **/
    var generateMessage = function(message) {
        // Created
        if (message.pullrequest_created !== undefined) {
            return createdMessage(message.pullrequest_created);
        }

        // Updated
        else if (message.pullrequest_updated !== undefined) {
            return updatedMessage(message.pullrequest_updated);
        }

        // Approved
        else if (message.pullrequest_approve !== undefined) {
            return approvedMessage(message.pullrequest_approve);
        }

        // Declined
        else if (message.pullrequest_declined !== undefined) {
            return declinedMessage(message.pullrequest_declined);
        }

        // Merged
        else if (message.pullrequest_merged !== undefined) {
            return mergedMessage(message.pullrequest_merged);
        }

        else {
            console.log('An unknown action was submitted.');
            console.log(message);
            return undefined;
        }
    };

    return {
        generateMessage: generateMessage
    };
}();
