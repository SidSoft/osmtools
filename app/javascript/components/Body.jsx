import React from 'react';
import City from './City';
import Georeverse from './Georeverse';

ReactOnRails.register({
  City,
  Georeverse
});

export default class Body extends React.Component {

  constructor(props) {
    super(props)
    this.getComponent = this.getComponent.bind(this)
    this.state = { component: 'city' };
  }

  componentDidMount() {
    const links = document.querySelectorAll('.nav-link'); 
    console.log(links);
    for (let i = 0; i < links.length; i++){
      links[i].addEventListener('click', this.handleLinks)
    }
  }

  handleLinks = (e) => {
    const links = document.querySelectorAll('.nav-link'); 
    for (let i = 0; i < links.length; i++){
      links[i].classList.remove('active')
    }
    e.target.classList.add('active');
    this.setState({ component: e.target.id })
  }
  
  getComponent(e) {
    console.log(e.target.id);
  };

  render() {
    const types = {
      city: City,
      georeverse: Georeverse
    }

    let render = {
      me: types[this.state.component]
    } 

    return (
            <div className="container fill">
              <render.me />
            </div>
            )
  }
}