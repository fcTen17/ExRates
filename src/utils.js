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

export const addBaseRate = (rateObj = {}, baseCurrencyCode) => {
  if (!rateObj) {rateObj = {};};
  rateObj[baseCurrencyCode] = 1;
  return rateObj;
}

export const currencyCollection = {
  code : {
    AUD : {
      country : 'Australia',
      currencyName : 'Australian dollar'
    },
    BGN : {
      country : 'Bulgaria',
      currencyName : 'Bulgarian lev',
    },
    BRL : {
      country : 'Brazil',
      currencyName : 'Brazilian real',
    },
    CAD : {
      country : 'Canada',
      currencyName : 'Canadian dollar',
    },
    CHF : {
      country : 'Switzeland',
      currencyName : 'Swiss franc',
    },
    CNY : {
      country : 'China',
      currencyName : 'Yuan renminbi',
    },
    CZK : {
      country : 'Czech Republic',
      currencyName : 'Czech koruna',
    },
    DKK : {
      country : 'Denmark',
      currencyName : 'Danish krone',
    },
    EUR : {
      country : 'European Union',
      currencyName: 'Euro',
    },
    GBP : {
      country : 'United Kingdom',
      currencyName : 'Pound sterling',
    },
    HKD : {
      country : 'Hong Kong',
      currencyName : 'Hong Kong dollar',
    },
    HRK : {
      country : 'Croatia',
      currencyName : 'Croatian kuna',
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
      currencyName : 'New israeli shequel',
    },
    INR : {
      country : 'India',
      currencyName : 'Indian rupee',
    },
    ISK : {
      country : 'Iceland',
      currencyName : 'Iceland krona',
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
      currencyName : 'Mexican peso',
    },
    MYR : {
      country : 'Malaysia',
      currencyName : 'Malaysian ringgit',
    },
    NOK : {
      country : 'Norway',
      currencyName : 'Norwegian krone',
    },
    NZD : {
      country : 'New Zealand',
      currencyName : 'New Zealand dollar',
    },
    PHP : {
      country : 'Phillipines',
      currencyName : 'Phillipines peso',
    },
    PLN : {
      country : 'Poland',
      currencyName : 'Zloty',
    },
    RON : {
      country : 'Romania',
      currencyName : 'New Romanian leu',
    },
    RUB : {
      country : 'Russian Federation',
      currencyName : 'Russian ruble',
    },
    SEK : {
      country : 'Sweden',
      currencyName : 'Swedish krone',
    },
    SGD : {
      country : 'Sudan',
      currencyName : 'Sudanese pound',
    },
    THB : {
      country : 'Thailand',
      currencyName : 'Baht',
    },
    TRY : {
      country : 'Turkey',
      currencyName : 'Turkish lira',
    },
    USD : {
      country : 'United States',
      currencyName : 'US dollar',
    },
    ZAR : {
      country : 'South Africa',
      currencyName : 'South african rand',
    },
  }
} 