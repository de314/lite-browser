import _ from 'lodash'
import axios from 'axios' // TODO: convert to REST/tranformation configuration
// import { ACTION_NAME } from '../actions'

const selectSlice = (state) => _.get(state, 'app.plugins')

export const selectPluginConfigs = (state) => selectSlice(state)
export const selectPluginConfigByKey = (state, key) => selectPluginConfigs(state).byId[key]

const googleId = '8a0a1069-9db5-42f8-aa6f-52365ec3e96f'
const redditId = '0a176643-5590-47e8-975c-44d00f519941'
const slackId = 'ab00505c-3801-4b9f-934e-3ace7622d90b'
const imgurId = '90a1b56c-5bca-431d-816b-5ded751ed1e8'

const defaultPlugins = [
  { id: googleId, name: 'Google', thumbnail: 'http://www.bladecreativebranding.com/blog/wp-content/uploads/2015/09/2015-4-Colour-Google-G-Thumbnail.png', url: 'https://google.com' },
  {
    id: redditId,
    name: 'Reddit',
    thumbnail: 'https://vignette.wikia.nocookie.net/hayday/images/1/10/Reddit.png/revision/latest?cb=20160713122603',
    url: 'https://reddit.com',
    identity: {
      strategy: 'OAUTH_IMPLICIT',
      manageUrl: 'https://www.reddit.com/prefs/apps',
      docsUrls: [
        'https://github.com/reddit/reddit/wiki/OAuth2',
        'https://www.reddit.com/dev/api/oauth#GET_api_v1_scopes',
      ],
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
    },
    authentication: {
      strategy: 'OAUTH_IMPLICIT',
      manageUrl: 'https://www.reddit.com/prefs/apps',
      docsUrls: [
        'https://github.com/reddit/reddit/wiki/OAuth2',
        'https://www.reddit.com/dev/api/oauth#GET_api_v1_scopes',
      ],
      authorizationUrl: 'https://www.reddit.com/api/v1/authorize',
      params: {
        client_id: '3F3czpKtH_2RQA',
        redirect_uri: 'http://localhost:3000/oauth/callback',
        scope: 'identity edit flair history modconfig modflair modlog modposts modwiki mysubreddits privatemessages read report save submit subscribe vote wikiedit wikiread'
      }
    }
  },
  { id: slackId, name: 'Slack', thumbnail: 'https://upload.wikimedia.org/wikipedia/commons/7/76/Slack_Icon.png', url: 'https://slack.com' },
  {
    id: imgurId,
    name: 'Imgur',
    thumbnail: 'https://thomas.vanhoutte.be/miniblog/wp-content/uploads/imgur_logo-150x150.jpg',
    url: 'https://imgur.com',
    identity: {
      strategy: 'OAUTH_IMPLICIT',
      manageUrl: 'https://imgur.com/account/settings/apps',
      docsUrls: [
        'https://apidocs.imgur.com/#authorization-and-oauth',
        'https://api.imgur.com/oauth2/addclient',
      ],
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
    authentication: {
      strategy: 'OAUTH_IMPLICIT',
      manageUrl: 'https://imgur.com/account/settings/apps',
      docsUrls: [
        'https://apidocs.imgur.com/#authorization-and-oauth',
        'https://api.imgur.com/oauth2/addclient',
      ],
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
]

const defaultState = {
  loading: false,
  initialized: true,
  byId: _.keyBy(defaultPlugins, 'id'),
  ids: defaultPlugins.map(p => p.id),
  error: null,
};

export default (state = defaultState, action) => {
  switch (action.type) {

    //case ACTION_NAME: {
    //  return {
    //    ...state,
    //    testing: action.testing
    //  }
    //}

    default:
  }
  return state;
}
