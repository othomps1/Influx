module.exports = {

  development: {
    client: 'pg',
    connection: 'postgresql://localhost:5432/newz'
  },
  test: {
    client: 'pg',
    connection: 'postgresql://localhost:5432/newz'
  },
  production: {
    client: 'pg',
    connection: process.env.DATABASE_URL
  },
}
