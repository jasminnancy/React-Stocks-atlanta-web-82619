import React, { Component } from 'react';
import StockContainer from './StockContainer'
import PortfolioContainer from './PortfolioContainer'
import SearchBar from '../components/SearchBar'
const URL = "http://localhost:3000/stocks"

class MainContainer extends Component {
  state = {
    allStocks: [],
    displayStocks: [],
    portfolioStocks: []
  }

  componentDidMount() {
    fetch(URL)
    .then(response => response.json())
    .then(data =>  {
      this.setState({
        allStocks: data,
        displayStocks: data
      })
    })
  }

  addToPortfolio = (e) => {
    this.setState({
      portfolioStocks: [...this.state.portfolioStocks, e]
    })
  }

  removeFromPortfolio = (e) => {
    this.setState({
      portfolioStocks: this.state.portfolioStocks.filter(stock => stock !== e)
    })
  }

  stockFilterer = (type) => {
    if (type !== "All") {
      this.setState({
        displayStocks: this.state.allStocks.filter(stock => stock.type === type)
      })
    } else {
      this.setState({
        displayStocks: this.state.allStocks
      })
    }
  }

  stockSorter = (type) => {
    let sorted = []
    switch(type){
      case "Alphabetically":
        sorted = this.state.displayStocks.sort((a,b) => a.name > b.name ? 1 : -1)
        break;
      case "Price":
          sorted = this.state.displayStocks.sort((a,b) => a.price > b.price ? 1 : -1)
        break;
      default:
        console.log("Wrong choice")
    }
    this.setState({
      displayStocks: sorted
    })
  }

  render() {
    return (
      <div>
        <SearchBar stockFilterer={this.stockFilterer} stockSorter={this.stockSorter}/>
          <div className="row">
            <div className="col-8">
              <StockContainer stocks={this.state.displayStocks} addToPortfolio={this.addToPortfolio}/>
            </div>
            <div className="col-4">
              <PortfolioContainer stocks={this.state.portfolioStocks} removeFromPortfolio={this.removeFromPortfolio}/>
            </div>
          </div>
      </div>
    );
  }
}

export default MainContainer;