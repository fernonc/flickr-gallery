import React, { Component } from 'react'
import axios from 'axios';
import searchIcon from '../assets/img/search.png';

// App components
import PhotoContainer from './PhotoContainer';

export default class Search extends Component {
    _isMounted = false;

    constructor() {
        super();
        this.state = {
          photos: JSON.parse(localStorage.getItem('photos')) || [],
          loading: false,
          loadingError: null,
          initialPhotoCount: 32,
          searchText: ''
        };
        
        this.onChangeSearch = this.onChangeSearch.bind(this);
      }
    
    onChangeSearch = e => {
        this.setState({ 
            searchText: e.target.value, 
        })
    }
    
    //Search input results
    searchPhotos = async () => {
        // Retrieve photos from API
        let url = `https://api.flickr.com/services/rest/?method=flickr.photos.search&api_key=b709605bb4537ab304135bb9d22c5c59&group_id=16978849@N00&text=${this.state.searchText}&per_page=${this.state.initialPhotoCount}&format=json&nojsoncallback=1;`
        await axios.get(url)
            .then(res => {
                if (this._isMounted) {
                this.setState({
                    photos: res.data.photos.photo,
                    loading: false
                  }, () => {
                    localStorage.setItem('photos', JSON.stringify(this.state.photos))
                  });
                if(res.data.photos.photo.length === 0) {
                    this.setState({loadingError: 'No results found.'})
                } else { 
                    this.setState({loadingError: null})
                }
            }
            })
            // catch method - handles any errors fetching data
            .catch(err => {
                this.setState({
                    loadingError: `Photos cannot be loaded at this moment.`
                })
              });
    }

    // Onscroll results
    infiniteScroll = async () => {
        let url = `https://api.flickr.com/services/rest/?method=flickr.photos.search&api_key=b709605bb4537ab304135bb9d22c5c59&group_id=16978849@N00&text=${this.state.searchText}&per_page=${this.state.initialPhotoCount}&format=json&nojsoncallback=1;`
        // Retrieve photos from API
        await axios.get(url)
            .then(res => {
                if (this._isMounted) {
                this.setState({
                    photos: this.state.photos.concat(res.data.photos.photo),
                    loading: false
                  });
                }
            })
            // catch method - handles any errors fetching data
            .catch(err => {
                this.setState({
                    loadingError: `Photos cannot be loaded at this moment.`
                })
              });
    }

    handleSubmit = e => {
        e.preventDefault();
        this.setState({loading: true})
        this.searchPhotos();
    }

    componentDidMount() {
        this._isMounted = true;
        //mount default flickr gallery fetch if no localstorage is found
        if (localStorage.getItem('photos') === null) {
            this.searchPhotos()
        }
    }
    componentWillUnmount() {
        this._isMounted = false;
      }
    render() {

        return (
        <div className="container">
            <div className="searchPhotos">
            <form className="searchBox" onSubmit={this.handleSubmit}>
                <input 
                    autoComplete="off"
                    type="search" 
                    onChange={this.onChangeSearch}
                    className="searchInput" 
                    name="Search" 
                    placeholder="Search..."
                />
                <button data-testid="searchButton" className="searchButton" href="#">
                    <img alt="searchIcon" src={searchIcon}/>
                </button>
            </form>
            </div>
            <div>
            <h2 id="searchTitle">Search topics or keywords</h2>      
            <p className="errorText">{this.state.loadingError}</p>      
                {
                    this.state.loading && !this.state.loadingError ?
                    <div id="loaderAnimation">
                        <div className="sk-chase">
                            <div className="sk-chase-dot"></div>
                            <div className="sk-chase-dot"></div>
                            <div className="sk-chase-dot"></div>
                            <div className="sk-chase-dot"></div>
                            <div className="sk-chase-dot"></div>
                            <div className="sk-chase-dot"></div>
                        </div>
                        <span data-testid="loadingSpan">Loading...</span>
                    </div> :
                    <PhotoContainer data-testid="resolved" data={this.state.photos} fetchPhoto={this.infiniteScroll} />
                }
        </div>
      </div>
        )
    }
}
