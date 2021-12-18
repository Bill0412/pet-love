# PetLove

## Introduction
PetLove Application in Internet Computer Platform for Dfinity Hackthon 2021. The app is deployed on the IC chain for demonstration.
You can visit it [here](https://s6akf-saaaa-aaaai-abaoq-cai.raw.ic0.app/).

The project is submitted using the HackerLink Account: https://hackerlink.io/hacker/33614.
## Architecture
TODO

## Development
You should have `npm`, `node.js`, `dfx` installed in advance.

Each time before you push to remote origin, please make sure your code is up to date. (pull from remote before you commit)
```
$ git commit -m 'your commit message'
$ git pull origin <branch name>
$ git push origin <branch name>
```
### Frontend
The frontend code is at `src/PetLove_assets/src`.

0. You should switch to the `frontend` branch for frontend development. 
```
$ git checkout frontend
```

1. Install `npm` package dependencies
```
$ npm install
```

2. Start development.
```
$ dfx start --background
$ dfx deploy --argument '(principal "'$(dfx identity get-principal)'")'
$ npm start
```

### Backend
TODO
## Deployment
TODO

## References
1. [Deploy React-based web application on IC](https://smartcontracts.org/docs/developers-guide/tutorials/custom-frontend.html)
## Contribution

1.  Fork this repository
2.  Create a new Feat_xxx branch
3.  Submit your code
4.  Create a Pull Request

