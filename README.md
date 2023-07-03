# frontend_v3

### Folder Structure
see Advanced structure 'https://www.youtube.com/watch?v=UUga4-z7b6s'
src
>analytics
    contents to implement analytics tracking
> assets
    images
>components
    reusable components that are independent to redux
>containers
    main pages
>features
    reused components that are tied to redux states
    grouped by feature use so it's easier to find
>hooks
    app wide used hooks
>navigation
    handles routing, and only returns containers
>services
    related to api and graphql
>store 
    redux implementation
>utils
    constants, colors, font, type


### Running android
Ensure your environment is setup properly for react native and android studio
windows: https://reactnative.dev/docs/0.71/environment-setup?guide=native&os=windows 

to point sdk to proper location by adding file
android/local.properties
sdk.dir = /Users/ghost/Library/Android/sdk

### Running on Mac
mac: https://reactnative.dev/docs/0.71/environment-setup?guide=native&os=macos


### Build
When creating a build make sure to set NODE_ENV to either production, development or local
We use [direnv](https://direnv.net/docs/installation.html) to read env files

### Installation direnv
[direnv installation](https://direnv.net/docs/installation.html)

1. For mac `brew install direnv`
2. [hook into your shell](https://direnv.net/docs/hook.html): Add `eval "$(direnv hook zsh)"` to ~/.zshrc
3. Run `exec $SHELL` to save and restart 
4. cd into project folder (if you are already there cd out and cd back)
5. run `direnv allow` it should read all your exported variables
6. run `echo $EXPO_CLIENT_ID` to see if it read your .envrc `export EXPO_CLIENT_ID` value
7. set NODE_ENV to production, development, or local (default is development)
8.  in app.config.ts `console.log("environment", process.env.NODE_ENV, environment);` to make sure you've set the right NODE_ENV variable
9. in `src/utils/constants/apis.ts` add `console.log(Constants.expoConfig.extra.ENV, URLS);` to make sure you're reading the right variables


### github PR template
`.github/pull_request_template.md` creates a template so that each PR has a base of requested infromation