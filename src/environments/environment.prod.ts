export const environment = {
  production: true,

  firebase: {
  },

  debug: false,
  log: {
    auth: false,
    store: false,
  },

  smartadmin: {
    api: null,
    db: 'marasco-ui'
  },

  notificationStatus: ['pending', 'opened', 'archived'],

  apiUrl: 'http://api.maras.co/api/',
  apiUrlAuth: 'http://api.maras.co/oauth/',
  redirectUrl: '/dashboard',
  loginUrl:  '/auth/login',
  registerUrl: '/auth/register',
  forgotPasswordUrl: '/auth/forgot-password',
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
