/* eslint prefer-arrow-callback: "off" */
/* eslint func-names: "off" */
import jsdom from 'jsdom';
import { assert } from 'chai';
import React from 'react';
import { shallow, mount, render } from 'enzyme';
import cheerio from 'cheerio';
import { FullStory } from '../src/index';

describe('<Fullstory /> Component Tests', function() {
    beforeEach(function() {
        global.document = jsdom.jsdom('<!doctype html><html><head></head><body></body></html>');
        global.window = document.defaultView;
        global.navigator = { userAgent: 'node.js' };

        global.window.FS = {};
        global.window.FS.clearUserCookie = function() {};
        global.window.FS.identify = function(id, data) {
            global.window.myTestId = id;
            global.window.myTestData = data;
        };
    });

    it('should throw an error if the organization key is not set', function() {
        assert.throws(function() {
            mount(<FullStory sessionId="test" />);
        }, TypeError);
    });

    it('should allow prop:settings', function() {
        const wrapper = mount(
            <FullStory settings={{ debug: true, orgKey: '1234' }} sessionId="test" />
        );
        assert.deepEqual({ debug: true, orgKey: '1234' }, wrapper.props().settings);
    });

    it('should allow props:sessionId', function() {
        const wrapper = mount(<FullStory sessionId="1234" settings={{ orgKey: '1234' }} />);
        assert.equal('1234', wrapper.props().sessionId);
    });

    it('should allow props:custom', function() {
        const wrapper = mount(
            <FullStory settings={{ orgKey: '1234' }} sessionId="test" custom={{ foo: 'bar' }} />
        );
        assert.deepEqual({ foo: 'bar' }, wrapper.props().custom);
    });

    it('should display a div tag', function() {
        const wrapper = shallow(
            <FullStory settings={{ orgKey: '1234' }} custom={{ foo: 'bar' }} sessionId="1234test" />
        );
        assert.isTrue(wrapper.contains(<div className="fullstory" />));
    });
});
