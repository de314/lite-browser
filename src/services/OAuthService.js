import _ from 'lodash'
import axios from 'axios'

const qpPattern = /([^&=]+)=([^&]*)/g

const authApis = {
  imgur: {
    id: 'imgur',
    manageUrl: 'https://imgur.com/account/settings/apps',
    docsUrls: [
      'https://apidocs.imgur.com/#authorization-and-oauth',
      'https://api.imgur.com/oauth2/addclient',
    ],
    authentication: {
      strategy: 'OAUTH_IMPLICIT',
      authorizationUrl: 'https://api.imgur.com/oauth2/authorize',
      params: {
        client_id: '1f8c48f9f2e3689',
      },
      enrich: (meta) => {
        const { account_id: id, account_username: username } = meta
        return new Promise(resolve => resolve({
          id,
          username,
          email: null,
          meta,
        }))
      }
    },
  },
  reddit: {
    id: 'reddit',
    manageUrl: 'https://www.reddit.com/prefs/apps',
    docsUrls: [
      'https://github.com/reddit/reddit/wiki/OAuth2',
      'https://www.reddit.com/dev/api/oauth#GET_api_v1_scopes',
    ],
    authentication: {
      strategy: 'OAUTH_IMPLICIT',
      authorizationUrl: 'https://www.reddit.com/api/v1/authorize',
      params: {
        client_id: '3F3czpKtH_2RQA',
        redirect_uri: 'http://localhost:3000/oauth/callback',
        scope: 'identity'
      },
      enrich(meta) {
        return axios.get('https://oauth.reddit.com/api/v1/me', {
          headers: { Authorization: `Bearer ${meta.access_token}` }
        }).then(({ data: { id, name: username } }) => ({ id, username, email: null, meta }))
      }
    }
  },
  google: {
    id: 'google',
    manageUrl: 'https://console.developers.google.com/apis/credentials',
    docsUrls: [
      'https://developers.google.com/identity/protocols/OAuth2UserAgent',
      'https://developers.google.com/identity/protocols/googlescopes',
    ],
    authentication: {
      strategy: 'OAUTH_IMPLICIT',
      authorizationUrl: 'https://accounts.google.com/o/oauth2/v2/auth',
      params: {
        scope: 'profile email openid',
        redirect_uri: 'http://localhost:3000/oauth/callback',
        client_id: '1064927344211-98ik8vqi387em7ugm2q29h3e61euuhod.apps.googleusercontent.com',
      },
      enrich(meta) {
        return axios.get('https://www.googleapis.com/userinfo/v2/me?fields=email%2Cid', {
          headers: { Authorization: `Bearer ${meta.access_token}` }
        }).then(({ data: { id, email } }) => ({
          id,
          username: email.substring(0, email.indexOf('@')),
          email,
          meta,
        }))
      }
    },
  }
}

const registerApi = (apiConfig) => authApis[apiConfig.id] = apiConfig

const buildAuthUrl = (apiConfig) => {
  const { authentication } = apiConfig
  switch (authentication.strategy) {

    case 'OAUTH_IMPLICIT': {
      const { id } = apiConfig
      const { authorizationUrl, params } = authentication
      let url = authorizationUrl + `?response_type=token&state=${id}`
      _.keys(params).forEach(key => url += `&${key}=${params[key]}`)
      return url;
    }

    default:

  }
  return null
}

const getImgurAuthUrl = () => buildAuthUrl(authApis.imgur)
const getRedditAuthUrl = () => buildAuthUrl(authApis.reddit)
const getGoogleAuthUrl = () => buildAuthUrl(authApis.google)

const parseQueryParams = (location = window.location) => {
  const params = {}
  let m
  let queryString = location.hash.substring(1)
  while (m = qpPattern.exec(queryString)) {
    params[decodeURIComponent(m[1])] = decodeURIComponent(m[2]);
  }
  queryString = location.search.substring(1)
  while (m = qpPattern.exec(queryString)) {
    params[decodeURIComponent(m[1])] = decodeURIComponent(m[2]);
  }
  return params
}

const getUser = (location = window.location) => {
  const res = {}
  const params = parseQueryParams(location)
  const { error } = params
  if (_.isNil(error)) {
    const apiKey = params.state
    const api = _.defaultTo(authApis[apiKey], {})
    const enrich = _.get(api, 'authentication.enrich')
    if (_.isFunction(enrich)) {
      return enrich(params)
    }
    res.user = { meta: params }
  } else {
    console.error(error);
    res.error = error
  }
  return new Promise(resolve => resolve(res))
}

export default {
  registerApi,

  buildAuthUrl,
  getImgurAuthUrl,
  getRedditAuthUrl,
  getGoogleAuthUrl,

  parseQueryParams,
  getUser,
}
