export const environment = {
  production: true,
  apiUrl: 'https://algam-api.herokuapp.com/', 
  whitelistedDomains: [/localhost:8080/ ],//lista de dominios que o token será enviado (não pode ser enviado para qualquer lugar)
  blacklistedRoutes: [ /\/oauth\/token/]
};
