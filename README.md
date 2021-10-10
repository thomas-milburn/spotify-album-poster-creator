# Spotify album poster creator

This is a small project that creates posters for your favourite albums.
Once you select an album, the poster will be generated and downloaded as a PDF.
This project uses the [Spotify Web API](https://developer.spotify.com/documentation/web-api/reference/) 
to fetch album data.

## Project setup

First, install the projects dependencies
```
npm install
```

You now need create a Spotify Client ID.

1. Head over to your [Spotify Developer Dashboard](https://developer.spotify.com/dashboard/applications)
2. Create a new app
3. Copy your "Client ID"
4. Paste your client ID into the .env file
5. Click "Edit Settings"
6. Add the redirect URI to the whitelist
(if you're running on localhost this should be http://localhost:8080/oauth-callback)
7. Save the changes



### Compiles and hot-reloads for development
```
npm run serve
```

### Compiles and minifies for production
```
npm run build
```

## Examples

![Poster example](https://i.imgur.com/kpwQ1du.png)
![Poster example](https://i.imgur.com/Chmar1i.png)
