module.exports = {

  development: {
    client: 'pg',
    connection: 'postgresql://localhost:5432/influx'
  },
  test: {
    client: 'pg',
    connection: 'postgresql://localhost:5432/influx'
  },
  production: {
    client: 'pg',
    connection: process.env.DATABASE_URL
  },
}
