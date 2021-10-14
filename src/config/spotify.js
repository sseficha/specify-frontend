const authEndpoint = process.env.REACT_APP_AUTH_ENDPOINT;
const redirectUri = process.env.REACT_APP_REDIRECT_URI;
const clientId = process.env.REACT_APP_CLIENT_ID;

const scopes = [
  "user-read-private",
  "user-top-read",
  "streaming",
  "playlist-modify-private",
  "playlist-modify-public",
];

export const loginUrl = `${authEndpoint}?client_id=${clientId}&response_type=code&redirect_uri=${redirectUri}&scope=${scopes.join(
  "%20"
)}&show_dialog=true`;
