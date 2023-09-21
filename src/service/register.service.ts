import { conect } from '../infra/db.js'

// interface RegisterContract {
//   name: string
//   gameLogin: string
//   email: string
//   password: string
//   confirmPassword: string
// }

export default class Register {
  // name: string
  // gameLogin: string
  // email: string
  // password: string
  // confirmPassword: string

  constructor(
    // name: string,
    // gameLogin: string,
    // email: string,
    // password: string,
    // confirmPassword: string,
  ) {
    // this.name = name,
    // this.gameLogin = gameLogin,
    // this.email = email,
    // this.password = password,
    // this.confirmPassword = confirmPassword
  }

  private async sql() {
    const connection = await conect()
    return connection
    // try {
    //   const rows = await connection.execute('SELECT * FROM users')
    //   return rows
    // }
    // catch (error) {
    //   console.error('Erro ao executar a consulta:', error)
    // }
    // finally {
    //   // connection.release()
    //   connection.end()
    // }
  }

  get() {
    this.sql()
  }
}
