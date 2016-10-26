import { BASE_URL } from 'constants/index.js'

export const postJSON = (url, body) => fetch(BASE_URL + url, {
  method: 'POST',
  headers: {
    ['content-type']: 'application/json'
  },
  body: JSON.stringify(body)
}).then(res => res.json())
