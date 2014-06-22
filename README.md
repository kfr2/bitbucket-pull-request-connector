# bitbucket-pull-request-connector
bitbucket-pull-request-connector is a node application that accepts Bitbucket pull request POST hooks and sends appropriate messages over notification services.

## License
This project is released under The ISC License. See `LICENSE.md` for more information.

## Features
### Supported pull request action types
* created
* updated
* approved
* declined
* merged

### Supported Notification Services
* HipChat

## Configuration
The following values should be set in the node application's environment:

### Application
* `CONNECTOR` -- the service connector to use. Currently, 'hipchat' is the only option (and is accordingly the default).
* `PORT` -- the port on which the application should run. Defaults to 5000.

### HipChat Connector
* `HIPCHAT_API_KEY` -- a Notification HipChat API key
* `HIPCHAT_ROOM_ID` -- the ID of the room to which to send notifications
* `HIPCHAT_NAME` -- the label of the 'user' who sends the message
* `HIPCHAT_COLOR` -- the background color of the message. One of "yellow", "red", "green", "purple", "gray", or "random". (default: purple)

## Installation
The following instructions should produce a running copy of the application on Heroku. They assume you have a Heroku account and HipChat credentials ([Room ID](https://hipchat.com/rooms) and [API key](https://hipchat.com/admin/api)).

```
git clone git@github.com:kfr2/bitbucket-pull-request-connector.git
cd bitbucket-pull-request-connector
heroku login
heroku create
heroku config:set HIPCHAT_API_KEY=mykey HIPCHAT_ROOM_ID=12345
git push heroku master
heroku ps:scale web=1
heroku open
```

You are now ready to add pull request POST hooks to any repositories you'd like to monitor. Go to your Bitbucket project's settings and add a Pull Request POST hook under the "Hooks" section. The hook's endpoint should be set to the URL listed in your browser after running `heroku open`. For example, it may be something like http://some-app-1234.herokuapp.com/
