export const checkStatus = (response) => {
    if (response.ok) {
      // .ok returns true if response status is 200-299
      return response;
    }
    throw new Error('Request was either a 404 or 500');
  }

export const json = (response) => response.json()

const fetchDaylyRates = () => {
  fetch(`https://altexchangerateapi.herokuapp.com/latest`)
        .then(checkStatus)
        .then(json)
        .then((data) => {
          if (data) {
            console.log(data);
            const { rates } = data;
            const ratesArr = Object.entries(rates);
            this.setState({ results: ratesArr})
            console.log(this.state.results);  
          }
        })
        .catch((error) => {
          this.setState({ error: error.message });
          console.log(error);
        })
}
