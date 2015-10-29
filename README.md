linkedin-export-tool
====================

A NodeJS tool to export Linkedin data

Installation
============

```
git clone https://github.com/nhduy1985/linkedin-export-tool.git
cd linkedin-export-tool
npm install
```

Configuration
=============

```
cp config.json.dist config.json
vim config.json
```

Get an API key:

From the [LinkedIn FAQ](https://developer.linkedin.com/support/faq):

> Where can I find my API key?
>
> Click on the [My Apps](https://www.linkedin.com/secure/developer) link in the
> top navigation menu to manage your LinkedIn applications.
>
> From here, you can create a new application if you don't already have one, or
> view the details of your existing applications.  You will find your `Client
> ID` (otherwise known as API Key/ID or Consumer Key/ID) listed in the
> "Authentication" side nav link, underneath the header "Authentication Keys".

Put your API secret into `config.json` as the value for `"secret"`. Put your
Client_ID into `config.json` as the value for `"api"` (which is actually the
client id, confusingly)

Usage
=====

1. Run the tool

 ```
 node app.js
 ```

2. Open the browser to request access authentication:
   [http://localhost:3001/oauth/linkedin](http://localhost:3001/oauth/linkedin)

3. Export data [http://localhost:3001/export](http://localhost:3001/export)

  A json ``export\linkedin.json`` will be saved with data specified on

  ```js
  linkedin.people.me(['id', 'first-name', 'last-name','public-profile-url','picture-url','positions','projects','skills']

  ```

Features
========
- [x] Export simple data from "me"
- [ ] Export more data
- [ ] Integrate with Grunt

References
==========

1. Node-Linkedin https://www.npmjs.org/package/node-linkedin
2. Linkedin APIs https://developer.linkedin.com/apis
