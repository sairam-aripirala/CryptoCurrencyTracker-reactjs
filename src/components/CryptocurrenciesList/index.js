// Write your JS code here
import {Component} from 'react'
import Loader from 'react-loader-spinner'
import CryptocurrencyItem from '../CryptocurrencyItem'

import './index.css'
import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css'

class CryptocurrenciesList extends Component {
  state = {cryptoData: [], isLoading: true}

  componentDidMount() {
    this.getListData()
  }

  getListData = async () => {
    const response = await fetch(
      `https://apis.ccbp.in/crypto-currency-converter`,
    )
    const data = await response.json()
    // console.log(data)
    const updatedData = data.map(eachItem => ({
      id: eachItem.id,
      currencyLogo: eachItem.currency_logo,
      currencyName: eachItem.currency_name,
      euroValue: eachItem.euro_value,
      usdValue: eachItem.usd_value,
    }))
    // console.log(updatedData)
    this.setState({cryptoData: updatedData, isLoading: false})
  }

  render() {
    const {cryptoData, isLoading} = this.state
    return (
      <div className="bg-container">
        {isLoading ? (
          <div data-testid="loader">
            <Loader type="Rings" color="#ffffff" height={80} width={80} />
          </div>
        ) : (
          <>
            <h1 className="heading">Cryptocurrency Tracker</h1>
            <img
              src="https://assets.ccbp.in/frontend/react-js/cryptocurrency-bg.png"
              alt="cryptocurrency"
              className="crypto-img"
            />
            <ul className="currencies-list-container">
              <li className="currency-table-header">
                <h1 className="table-heading">Coin Type</h1>
                <div className="usd-euro-container">
                  <h1 className="table-heading">USD</h1>
                  <h1 className="table-heading">EURO</h1>
                </div>
              </li>
              {cryptoData.map(eachCurrency => (
                <CryptocurrencyItem
                  key={eachCurrency.id}
                  currenciesDetails={eachCurrency}
                />
              ))}
            </ul>
          </>
        )}
      </div>
    )
  }
}

export default CryptocurrenciesList
