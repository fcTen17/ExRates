export const checkStatus = (response) => {
    if (response.ok) {
      // .ok returns true if response status is 200-299
      return response;
    }
    throw new Error('Request was either a 404 or 500');
  }

export const json = (response) => response.json()

export const fetchDaylyRates = () => {
  let ratesObj = {};
  fetch(`https://altexchangerateapi.herokuapp.com/latest`)
        .then(checkStatus)
        .then(json)
        .then((data) => {
          if (data) {
            console.log(data);
            const { rates } = data;
            const ratesArr = Object.entries(rates);
            ratesObj = data;
            console.log(ratesArr);  
          }
        })
        .catch((error) => {
          
          console.log(error);
        })
  return ratesObj;
}

export const currencyCollection = {
  code : {
    AUD : {
      country : 'Australia',
      currencyName : 'Australian Dollar'
    },
    BGN : {
      country : 'Bulgaria',
      currencyName : 'Bulgarian Lev',
    },
    BRL : {
      country : 'Brazil',
      currencyName : 'Brazilian Real',
    },
    CAD : {
      country : 'Canada',
      currencyName : 'Canadian Dollar',
    },
    CHF : {
      country : 'Swiss',
      currencyName : 'Swiss Franc',
    },
    CNY : {
      country : 'China',
      currencyName : 'Yuan Renminbi',
    },
    CZK : {
      country : 'Czech Republic',
      currencyName : 'Czech Koruna',
    },
    DKK : {
      country : 'Denmark',
      currencyName : 'Danish Krone',
    },
    EUR : {
      country : 'European Union',
      currencyName: 'EURO',
    },
    GBP : {
      country : 'United Kingdom',
      currencyName : 'Pound Sterling',
    },
    HKD : {
      country : 'Hong Kong',
      currencyName : 'Hong Kong Dollar',
    },
    HRK : {
      country : 'Croatia',
      currencyName : 'Croatian Kuna',
    },
    HUF : {
      country : 'Hungary',
      currencyName : 'Forint',
    },
    IDR : {
      country : 'Indonesia',
      currencyName : 'Rupiah',
    },
    ILS : {
      country : 'Israel',
      currencyName : 'New Israeli Shequel',
    },
    INR : {
      country : 'India',
      currencyName : 'Indian Rupee',
    },
    ISK : {
      country : 'Iceland',
      currencyName : 'Iceland Krona',
    },
    JPY : {
      country : 'Japan',
      currencyName : 'Yen',
    },
    KRW : {
      country : 'Korea, Republic Of',
      currencyName : 'Won',
    },
    MXN : {
      country : 'Mexico',
      currencyName : 'Mexican Peso',
    },
    MYR : {
      country : 'Malaysia',
      currencyName : 'Malaysian Ringgit',
    },
    NOK : {
      country : 'Norway',
      currencyName : 'Norwegian Krone',
    },
    NZD : {
      country : 'New Zealand',
      currencyName : 'New Zealand Dollar',
    },
    PHP : {
      country : 'Phillipines',
      currencyName : 'Phillipines Peso',
    },
    PLN : {
      country : 'Poland',
      currencyName : 'Zloty',
    },
    RON : {
      country : 'Romania',
      currencyName : 'New Romanian Leu',
    },
    RUB : {
      country : 'Russian Federation',
      currencyName : 'Russian Ruble',
    },
    SEK : {
      country : 'Sweden',
      currencyName : 'Swedish Krone',
    },
    SGD : {
      country : 'Sudan',
      currencyName : 'Sudanese Pound',
    },
    THB : {
      country : 'Thailand',
      currencyName : 'Baht',
    },
    TRY : {
      country : 'Turkey',
      currencyName : 'Turkish Lira',
    },
    USD : {
      country : 'United States',
      currencyName : 'US Dollar',
    },
    ZAR : {
      country : 'South Africa',
      currencyName : 'South African Rand',
    },
  }
} 