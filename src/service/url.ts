import process from 'node:process'

const ambient: string = process.env.NODE_ENV || ''

interface IUrl {
  [key: string]: string
}

const url: IUrl = {
  // development: 'http://localhost:3000/',
  production: 'https://api.pwblackstar.com/',
  development: 'https://api.pwblackstar.com/',
  // development: 'https://player-api-z98a.onrender.com/',
}

export default url[ambient]
