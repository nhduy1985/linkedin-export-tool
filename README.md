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

Get Linkedin API/Secret at http://indiesphp.com/how-to-get-application-api-and-application-secret-of-linkedin/

Usage
=====

1. Run the tool

 ```
 node app.js
 ```

2. Open the browser to request access authentication
  
  ```
  http://localhost:3001/oauth/linkedin
  ```
3. Export data

  ```
  http://localhost:3001/export
  ```
  
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