export const EnvConfiguration = () => ({
  db_host: process.env.DB_HOST,
  db_port: +process.env.DB_PORT,
  db_name: process.env.DB_NAME,
  db_user: process.env.DB_USENAME,
  db_password: process.env.DB_PASSWORD,
  port: +process.env.DB_PORT,
});
