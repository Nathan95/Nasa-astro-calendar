import React from 'react';
import { mount } from 'enzyme';
import App from '../App';
import moxios from 'moxios';

beforeEach(() => {
  //this initialises moxios and turns off any initiations by axios
  moxios.install();
  //if it sees a request respond to it
  moxios.stubRequest('https://api.nasa.gov/planetary/apod?api_key=NNKOjkoul8n1CH18TWA9gwngW1s1SmjESPjNoUFo&date=2018-09-05', {
      //modify how moxios responds to request
      status: 200,
      response: [{date: '2018-09-05'}]
  });
});

afterEach(() => {
  moxios.uninstall();
});


it('can fetch a calendar', (done) => {
  //Attempt to render the entire app

  const wrapped = mount(
      <App />
  );

  //find the 'fetchComments' button and click it
  //one clicked
  wrapped.find('.fetch').simulate('click');

  //Expect to find the list of comments
  moxios.wait(() => {
    wrapped.update();
    expect(wrapped.find('img').length).toEqual(1);

    done();
    wrapped.unmount();
  });

});
