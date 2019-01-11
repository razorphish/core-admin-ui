// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `.angular-cli.json`.

export const environment = {
  production: false,

  firebase: {},


  debug: true,
  log: {
    auth: true,
    store: true,
  },

  smartadmin: {
    api: null,
    db: 'marasco-ui'
  },

  notificationStatus: ['pending', 'opened', 'archived'],

  apiUrl: 'http://localhost:3000/api/',
  apiUrlAuth: 'http://localhost:3000/oauth/',
  redirectUrl: '/dashboard',
  loginUrl:  '/auth/login',
  clientId: 'core-web-ui',
  clientSecret:
    'E89fZK0oQnEuMWuqRhpNZG5ObexOw81RdnWHnSIuQVjaei3bag4kq' +
    'nSyPXIrAi5gpYQcPU98leY1J5eL1sQUrUCRjS3SdZlMK1vSSv1kORtDqaxdYslVMe8uCBxk4Np' +
    'PkwFkiWB8ywHnAjXBZpRdXHry8Aj19KS7XQUvi3DVW953MqCJgipQm76Lw8rNfAl1oQMyjPyBV' +
    'cGKGecaevaz5bKulZWKx6m0sFKbNs2eT6FDiOfTuF25IHgKymnnoaCF'

  // apiUrl: 'https://app.glidia.com/api/',
  // apiUrlAuth: 'https://app.glidia.com/oauth/',
  // clientId: 'glidia-web-ui',
  // clientSecret:
  // 'E89fZK0oQnEuMWuqRhpNZG5ObexOw81RdnWHnSIuQVjaei3bag4kq' +
  // 'nSyPXIrAi5gpYQcPU98leY1J5eL1sQUrUCRjS3SdZlMK1vSSv1kORtDqaxdYslVMe8uCBxk4Np' +
  // 'PkwFkiWB8ywHnAjXBZpRdXHry8Aj19KS7XQUvi3DVW953MqCJgipQm76Lw8rNfAl1oQMyjPyBV' +
  // 'cGKGecaevaz5bKulZWKx6m0sFKbNs2eT6FDiOfTuF25IHgKymnnoaCF'
};
