import React from 'react';

export default class Georeverse extends React.Component {

  constructor(props) {
    super(props)
    this.state = { latitude: 48.8566101, longitude: 2.3514992, deltaX: 0.02, deltaY: 0.02, 
                   cities: [], suburbs: [], villages: [], amenities: [], historic: [],
                   tourism: [], railway: []};
  }
  
  componentDidMount() {
    fetch('https://ipinfo.io/geo')
      .then((response) => {return response.json()})
      .then((data) => {
        let loc = data.loc.split(',')
        let lat = loc[0]
        let lon = loc[1]
        this.setState({ latitude: lat, longitude: lon })
        document.querySelector('#lat').value = lat
        document.querySelector('#lon').value = lon
        document.querySelector('#dX').value = this.state.deltaX
        document.querySelector('#dY').value = this.state.deltaY
      })
    const search = document.querySelector('#search')
    search.addEventListener('click', this.handleSearch)  
  }

  handleSearch = _ => {
    let s = (parseFloat(document.querySelector('#lat').value) - parseFloat(document.querySelector('#dX').value)).toFixed(4)
    let n = parseFloat(document.querySelector('#lat').value) + parseFloat(document.querySelector('#dX').value)
    let w = parseFloat(document.querySelector('#lon').value) - parseFloat(document.querySelector('#dY').value)
    let e = parseFloat(document.querySelector('#lon').value) + parseFloat(document.querySelector('#dY').value)
    let url = '/overtest/georev?s=' + s + '&n=' + n + '&w=' + w + '&e=' + e
    console.log(url)
    fetch(url)
    .then((response) => {return response.json()})
    .then((data) => {
      const elements = data.elements
      let cities = []
      let suburbs = []
      let villages = []
      let amenities = []
      let historic = []
      let tourism = []
      let railway = []
      elements.forEach((el) => {
        if (el.tags.place == 'city') {
          cities.push(el) 
        }
        if (el.tags.place == 'suburb') {
          suburbs.push(el) 
        }
        if (el.tags.place == 'village') {
          villages.push(el) 
        }
        if (el.tags.amenity) {
          amenities.push(el)
        }
        if (el.tags.historic) {
          historic.push(el)
        }
        if (el.tags.tourism) {
          tourism.push(el)
        }
        if (el.tags.railway) {
          railway.push(el)
        }
      })
      this.setState({ cities: cities })
      this.setState({ suburbs: suburbs })
      this.setState({ villages: villages })
      this.setState({ amenities: amenities })
      this.setState({ historic: historic })
      this.setState({ tourism: tourism })
      this.setState({ railway: railway })
    })
  }

  toggleVisible = (e) => {
    const node_id = "id_" + (e.target.id).slice(2)
    console.log(node_id)
    const tags = document.querySelector("#" + node_id)
    tags.classList.toggle("invisible")
  } 

  render() {

    const cities = this.state.cities.map((node) => {
      return(
       <div className="nodeBlock" key={node.id}>
        <p><span className="nodeType">city</span><a id={"a_" + node.id} onClick={this.toggleVisible.bind(this)}>{node.tags.name}</a><strong>lat: </strong>{node.lat} <strong>lon: </strong>{node.lon}</p>
        <div className="nodeTags invisible" id={"id_" + node.id}>
          <p>
            {JSON.stringify(node.tags)}
          </p>
        </div>
       </div>
      )
    })

    const suburbs = this.state.suburbs.map((node) => {
      return(
        <div className="nodeBlock" key={node.id}>
         <p><span className="nodeType">suburb</span><a id={"a_" + node.id} onClick={this.toggleVisible.bind(this)}>{node.tags.name}</a><strong>lat: </strong>{node.lat} <strong>lon: </strong>{node.lon}</p>
         <div className="nodeTags invisible" id={"id_" + node.id}>
           <p>
             {JSON.stringify(node.tags)}
           </p>
         </div>
        </div>
       )
    })

    const villages = this.state.villages.map((node) => {
      return(
        <div className="nodeBlock" key={node.id}>
         <p><span className="nodeType">village</span><a id={"a_" + node.id} onClick={this.toggleVisible.bind(this)}>{node.tags.name}</a><strong>lat: </strong>{node.lat} <strong>lon: </strong>{node.lon}</p>
         <div className="nodeTags invisible" id={"id_" + node.id}>
           <p>
             {JSON.stringify(node.tags)}
           </p>
         </div>
        </div>
       )
    })

    const amenities = this.state.amenities.map((node) => {
      return(
        <div className="nodeBlock" key={node.id}>
         <p><span className="nodeType">amenity</span><a id={"a_" + node.id} onClick={this.toggleVisible.bind(this)}>{node.tags.amenity}</a><strong>lat: </strong>{node.lat} <strong>lon: </strong>{node.lon}</p>
         <div className="nodeTags invisible" id={"id_" + node.id}>
           <p>
             {JSON.stringify(node.tags)}
           </p>
         </div>
        </div>
       )
    })
    
    const historic = this.state.historic.map((node) => {
      return(
        <div className="nodeBlock" key={node.id}>
         <p><span className="nodeType">historic</span><a id={"a_" + node.id} onClick={this.toggleVisible.bind(this)}>{node.tags.historic}</a><strong>lat: </strong>{node.lat} <strong>lon: </strong>{node.lon}</p>
         <div className="nodeTags invisible" id={"id_" + node.id}>
           <p>
             {JSON.stringify(node.tags)}
           </p>
         </div>
        </div>
       )
    })

    const tourism = this.state.tourism.map((node) => {
      return(
        <div className="nodeBlock" key={node.id}>
         <p><span className="nodeType">tourism</span><a id={"a_" + node.id} onClick={this.toggleVisible.bind(this)}>{node.tags.tourism}</a><strong>lat: </strong>{node.lat} <strong>lon: </strong>{node.lon}</p>
         <div className="nodeTags invisible" id={"id_" + node.id}>
           <p>
             {JSON.stringify(node.tags)}
           </p>
         </div>
        </div>
       )
    })  

    const railway = this.state.railway.map((node) => {
      return(
        <div className="nodeBlock" key={node.id}>
         <p><span className="nodeType">railway</span><a id={"a_" + node.id} onClick={this.toggleVisible.bind(this)}>{node.tags.railway}</a><strong>lat: </strong>{node.lat} <strong>lon: </strong>{node.lon}</p>
         <div className="nodeTags invisible" id={"id_" + node.id}>
           <p>
             {JSON.stringify(node.tags)}
           </p>
         </div>
        </div>
       )
    })

    return (
      <div className="row">

        <div className="col-lg-8">

          <h1 className="mt-4">Geo Reverse</h1>
          {cities}
          {suburbs}
          {villages}
          {amenities}
          {historic}
          {tourism}
          {railway}

        </div>

        <div className="col-md-4">

          <div className="card my-4">
            <h5 className="card-header">Coordinates</h5>
            <div className="card-body">
              <div className="input-group">
                <label htmlFor="lat" className="col-sm-4 col-form-label">latitude</label>
                <div className="col-sm-8">
                  <input type="text" className="form-control" name="lat" id="lat" />
                </div>
              </div>
              <div className="input-group top10">
                <label htmlFor="lon" className="col-sm-4 col-form-label">longitude</label>
                <div className="col-sm-8">
                  <input type="text" className="form-control" name="lon" id="lon" />
                </div>
              </div>
              <div className="input-group top10">
                <label htmlFor="dX" className="col-sm-4 col-form-label">delta X</label>
                <div className="col-sm-8">
                  <input type="text" className="form-control" name="dX" id="dX" />
                </div>
              </div>
              <div className="input-group top10">
                <label htmlFor="dY" className="col-sm-4 col-form-label">delta Y</label>
                <div className="col-sm-8">
                  <input type="text" className="form-control" name="dY" id="dY" />
                </div>
              </div>
              <div className="input-group top10">
                <label className="col-sm-10 col-form-label"></label>
                <button className="btn btn-secondary" id="search" type="button">Go!</button>
              </div>
            </div>
          </div>

        </div>

      </div>
    );
  }
}