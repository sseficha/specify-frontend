const authEndpoint = "http://accounts.spotify.com/authorize";
const redirectUri = "http://localhost:3000/login";
const clientId = "02f5d8f312494c38a9ef6ffd47e10700";

const scopes = ["user-read-private", "user-top-read"];

export const loginUrl = `${authEndpoint}?client_id=${clientId}&response_type=code&redirect_uri=${redirectUri}&scope=${scopes.join(
  "%20"
)}`;

// loginUrl = "https://accounts.spotify.com/authorize?client_id=YourClientId&response_type=code&redirect_uri=https://localhost:3000/&scope=streaming%20user-read-email%20user-read-private"
