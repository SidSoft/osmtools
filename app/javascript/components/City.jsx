import React from 'react';

export default class City extends React.Component {

  constructor(props) {
    super(props)
    this.state = { countries: [], cities: [], villages: []};
  }
  
  componentDidMount() {
    const search = document.querySelector('#search')
    search.addEventListener('click', this.handleSearch)
  }
  
  handleSearch = (e) => {
    let query = document.querySelector('#query')
    console.log("El:", query)
    console.log("Query:", query.value)
    fetch('/overtest?q=' + query.value)
    .then((response) => {return response.json()})
    .then((data) => { 
                      let items = data.elements
                      console.log(items)
                      let c = []
                      let t = []
                      items.forEach((element) => {
                        if (element.tags.place == 'country') {
                          console.log(element)
                          c.push(element) 
                        }
                        if (element.tags.place == 'city') {
                          console.log(element['tags']['is_in:country'])
                          t.push(element) 
                        }
                      })
                      this.setState({ countries: c })
                      this.setState({ cities: t })
                    })
  }

  render() {

    const countries = this.state.countries.map((country) => {
      return(
       <div className="resItem" key={country.id}>
        <h2>{country.tags.name}</h2>
        <p className="locType"><strong>country</strong></p>
        <div className="coordinates">
          <p><strong>lat: </strong>{country.lat} <strong>lon: </strong>{country.lon}</p>
        </div>
        <p><strong>capital: </strong>{country.tags.capital_city}</p>
        <p><strong>population: </strong>{country.tags.population}</p>
        <p><strong>aria: </strong>{country.tags.sqkm}</p>
        <hr />
       </div>
      )
    })

    const cities = this.state.cities.map((city) => {
      return(
       <div className="resItem" key={city.id}>
        <h2>{city.tags.name}</h2>
        <p className="locType"><strong>city</strong></p>
        <div className="coordinates">
          <p><strong>lat: </strong>{city.lat} <strong>lon: </strong>{city.lon}</p>
        </div>
        <p><strong>population: </strong>{city.tags.population}</p>
        <p><strong>country: </strong>{city['tags']['is_in:country']}</p>
        <hr />
       </div>
      )
    })

    return (
      <div className="row">

        <div className="col-lg-8">

          <h1 className="mt-4">Name Search</h1>
          {countries}
          {cities}

        </div>

        <div className="col-md-4">

          <div className="card my-4">
            <h5 className="card-header">Search</h5>
            <div className="card-body">
              <div className="input-group">
                <input type="text" className="form-control" id="query" placeholder="Search for..." />
                <span className="input-group-btn">
                  <button className="btn btn-secondary" id="search" type="button">Go!</button>
                </span>
              </div>
            </div>
          </div>

        </div>

      </div>
    );
  }
}