import React from 'react';
import Header from './Header';
import Body from './Body';
import Footer from './Footer';

ReactOnRails.register({
  Header,
  Body,
  Footer
});

export default class Main extends React.Component {

  render() {
    return (
      <div>
        <Header />
        <Body />
        <Footer />
      </div>
    );
  }
}