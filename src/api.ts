export let REACT_APP_API_SERVER =
    window.origin.includes('localhost')
        ? 'http://127.0.0.1:8080'
        : 'https://api.coinbear.xyz'