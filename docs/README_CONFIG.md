# Configuration

* [MongoDB](#mongo)
* [API](#api)
* [Recaptcha](#recaptcha)
* [Google+ SignIn](#google-signin)
* [Facebook SignIn](#facebook-signin)
* [Twitter SignIn](#twitter-signin)

## MongoDB

You'll need a mongo database to store your users etc. You can find instructions
to download it for windows/mac/linux at
<a href="http://www.mongodb.com">mongodb.com</a> . If you don't want to install
it on your local machine, you may opt to use a service such as
<a href="www.mlab.com"> mlab.com</a>. You'll need to create a mongo user and
database, then place your mongo URI into the API configuration file.

edit <strong>./API/config/dev.js</strong> with your mongo credentials

```
mongoURI: 'mongodb:/USER:PASS@HOST:PORT/DB_NAME',
```

<strong>Reminder</strong> you'll need to set this variable differently in
production. See
[production](https://github.com/hutchgrant/react-boilerplate-ssr/blob/master/docs/README_PROD.md)
documentation

## API

The API utilizes cookie based authentication and stores each user within a
session. You can create your own cookieKey and sessionKey. The redirectDomain is
the location of the application itself(seperate from the API). By default the
API is on port 5000 and the application(redirectDomain) is on port 3000 of the
localhost. It's setup this way so you can scale the API or the application
renderer seperately.

edit <strong>./API/config/dev.js</strong> with your mongo credentials

```
cookieKey: 'RABID_HONEY_BADGER',
sessionKey: 'MOOSE_RIOT',
redirectDomain: 'http://localhost:3000',
apiDomain: 'http://localhost:5000'
```

## Recaptcha

Register a new site with [invisible recaptcha](https://www.google.com/recaptcha)

edit <strong>./API/config/dev.js</strong> with your mongo credentials

```
googleRecaptchaSecret: 'YOUR_SERVER_SECRET_KEY',
```

You also need to add a clientside key for the react application

edit <strong>./.env</strong> with your Recaptcha public credentials

```
REACT_APP_GOOGLE_RECAPTCHA_SITE_KEY=YOUR_CLIENT_KEY
```

## Google+ SignIn

You'll need developer API credentials for
[Google+](https://console.developers.google.com/).

Add a new project, add the Google+ API library, create OAuth2.0 credentials

Set Authorised JavaScript origins: http://localhost:5000

Set Authorised redirect URIs: http://localhost:5000/auth/google/callback

edit <strong>./API/config/dev.js</strong> with your mongo credentials

```
googleClientId: 'YOUR_GOOGLE_CLIENT_ID',
googleClientSecret: 'YOUR_GOOGLE_CLIENT_SECRET',
```

## Facebook SignIn

You'll need developer API credentials for
[Facebook](https://developers.facebook.com/). Create an application, add
facebook SignIn.

edit <strong>./API/config/dev.js</strong> with your mongo credentials

```
facebookClientId: 'YOUR_FACEBOOK_APP_ID',
facebookClientSecret: 'YOUR_FACEBOOK_APP_SECRET',
```

## Twitter Signin

You'll need developer API credentials for [Twitter](https://apps.twitter.com/).

In the twitter app settings tab, set the twitter app callback URL:
<strong>http://localhost:5000/auth/twitter/callback</strong>

In the twitter app permissions tab, check the box that says "request email
addresses from users" and then click the update settings button

edit <strong>./API/config/dev.js</strong> with your mongo credentials

```
twitterConsumerId: 'YOUR_CONSUMER_KEY',
twitterConsumerSecret: 'YOUR_SECRET_KEY',
```

You can add additional passport strategies see
[Passportjs.org](https://passportsjs.org)
