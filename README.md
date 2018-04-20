# React FullStory Component
[![Build Status](https://travis-ci.org/stikmanw/react-fullstory-component.svg?branch=master)](https://travis-ci.org/stikmanw/react-fullstory-component)
[![NPM version][npm-image]][npm-url]

[npm-image]: http://img.shields.io/npm/v/react-fullstory-component.svg?style=flat-square
[npm-url]: http://npmjs.org/package/react-fullstory-component


## Synopsis
This is a ReactJS Component and library for integrating FullStory into your ReactJS Application or custom JavaScript application.

## Motivation

I built this to make it easy to integrate FullStory services into a ReactJS based application.

## Installation
```
npm install react-fullstory-component
```

## Compatible Version
* React 0.13.3 1.0+
* React 15+ 2.0+

Make sure you install the correct version depending on which version of React you are running. Thanks to Thinh for updating the component to work with React 15.


## Component Code Examples
#### Basic Example
```javascript
import { FullStory } from 'react-fullstory-component';

const settings = {
    debug: false,
    host: 'www.fullstory.com',
    orgKey: 'fake'
};
const data = {
    key: value
};

const sessionId = '123456789';
const jsx = <FullStory settings={settings} sessionId={sessionId} custom={data} />;
```

#### IFrame Example
This is an example for FullStory for an iframe that is not in the same domain as the parent
```javascript
import { FullStory } from 'react-fullstory-component';

const settings = {
    host: 'www.fullstory.com',
    orgKey: 'fake',
    iframe: true
};
const sessionId = '123456789';
const jsx = <FullStory settings={settings} sessionId={sessionId} />;
```

## API Reference
IF you want to just use the wrapper library around used by the component, the following describes the exposed api and how to leverage it.

#### Basic Usage
Common usage for tagging user session to a single id

```javascript
import { FullStoryClient } from 'react-fullstory-component';

const client = new FullStoryClient({
    host: 'www.fullstory.com',
    orgKey: 'fake',
    iframe: true
});

client.render();
client.setSession('mysessionId');
```

#### Attaching Custom Data
The ability to attach custom data to session to be sent to FullStory. Make sure to read the
naming guides on FullStory's site to capture data correctly

```javascript
import { FullStoryClient } from 'react-fullstory-component';

const client = new FullStoryClient({
    host: 'www.fullstory.com',
    orgKey: 'fake',
    iframe: true
});

client.render();
client.setSession('mysessionId', {
    displyName: 'visual identifier in list',
    address_str: 'some address string',
    returnVisit_bool: true,
    personId_int: '1234'
});
```

#### Segmenting session on the same page session
In some cases, you may want to identify user session as seperate segments by session id.  This can be handled directly
utilizing the client.

```javascript
import { FullStoryClient } from 'react-fullstory-component';

const client = new FullStoryClient({
    host: 'www.fullstory.com',
    orgKey: 'fake',
    iframe: true
});

client.render();
client.setSession('mysessionId', {
    displyName: 'visual identifier in list',
    address_str: 'some address string',
    returnVisit_bool: true,
    personId_int: '1234'
});

// lots of user activity
// potential detect refresh or special route #segment-differently

client.clearUserSession();
client.setSession('mynewSessionId');
```

#### Integrating with FullStory events
Once the session is created on the remote server you can use the following handlers to attach functionality to
FullStory events and get the URL reference to the session playback.

```javascript
// option1 set as initial settings on client
const client = new FullStoryClient({
    host: 'www.fullstory.com',
    orgKey: 'fake',
    iframe: true,
    sessionCallbacks: [
        function(sessionUrl) {
            // do something with link to recorded session
        }
    ]
});

// option2 push to client later
client.onLoad(function(sessionUrl)) {
    // do something with link to recorded session
}
client.render();
client.setSession('sessionId');
```

## Tests
There are two scripts to run test

```
npm run test
npm run test-watch
```

* Requires Node Version 4+ to run tests.

## License
This software is [MIT Licensed](/LICENSE).
