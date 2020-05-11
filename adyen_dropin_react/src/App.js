import React, { Component } from 'react';

const API_KEY = 'AQEyhmfxK4zJbBZDw0m/n3Q5qf3VaY9UCJ1+XWZe9W27jmlZiniYHPZ+YtXG9dYfNdwN0H8QwV1bDb7kfNy1WIxIIkxgBw==-uA2G0DS73SlmB4EHi/YNndhli7KlCMjXHbMmm8stboc=-djvcdM2gNHq9dSvC';
const MERCHANT_ACCOUNT = 'TestAccountNY';

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      paymentMethods: [],
      isLoading: true
    };
  }

  getPaymentMethods() {
    fetch('https://checkout-test.adyen.com/v52/paymentMethods', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-API-key': API_KEY
      },
      body: JSON.stringify({
        "merchantAccount": MERCHANT_ACCOUNT,
        "countryCode": "US",
        "shopperLocale": "en-US",
        "amount": {
          "currency": "USD",
          "value": 1000
        }
      })
    }
    )
      .then((response) => response.json())
      .then((json) => { 
        this.setState({ response: json.paymentMethods });
      })
      .catch((error) => console.error(error));
  }

  render() {
    // const { data, isLoading } = this.state;

    return (
      <div className="App">
        <header className="App-header">Hello World</header>

        <div className="paymentMethods">
          <button onClick={this.getPaymentMethods}> Get Payment Methods </button>
        </div>

      </div>
    )
  }
}

export default App;