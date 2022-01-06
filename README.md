# PetLove

[[OUR WEBSITE](https://s6akf-saaaa-aaaai-abaoq-cai.raw.ic0.app/)]
[[VIDEO DEMO](https://www.youtube.com/watch?v=KSpNN_Lbqf0)]

![logo image](./images/1.png)

## Introduction
PetLove Application in Internet Computer Platform for Moledao Hackthon 2021. The app is deployed on the IC chain for demonstration.
You can visit it [here](https://s6akf-saaaa-aaaai-abaoq-cai.raw.ic0.app/).

The project is submitted using the HackerLink Account: https://hackerlink.io/hacker/33614.
## Architecture

### User Interface & Experience
Since Internet Computer is a comparatively slow network. We optimized our user experience using the most most advanced front-end technology like React.js and Material-UI.
### Authentication

We used the IC wallet to get the user identity, including the principal and an [actor](https://docs.plugwallet.ooo/getting-started/connect-to-plug/#making-calls-to-canisters-with-plug) that in a representitive of the user to interact with our backend. With the actor, we were able to secure the user while providing login and cryptocurrency transfer services.

### Cryptocurrency
We are able to trade with the help of a canister that issues a cryptocurrency of our own. And the user can get an initial account balance to try our service.

## Deployment
1. Clone the project
```console
$ git clone https://github.com/Bill0412/pet-love.git
$ cd pet-love
$ npm install
```

2. Create a user config file
In the project root, run the following commands
```console
$ mkdir config
$ cd config
$ touch user.json
```

Then you can open the `config/user.json` file with your favorite text editor to edit it. Following is an example,

```json
{
    "backendCanisterId": "szbmr-7yaaa-aaaai-abaoa-cai",
    "cryptoCanisterId": "kfj54-ziaaa-aaaai-qbd2a-cai"
}
```

- `backendCanisterId`: the id for your specific backend
- `cryptoCanisterId`: the id of [the canister](https://ic.rocks/principal/kfj54-ziaaa-aaaai-qbd2a-cai) that we published a cryptocurrency in accordance with ERC20


3. Deploy the project on the Internet Computer

```console
$ npm install
$ dfx deploy --network ic --argument '(principal "'$(dfx identity get-principal)'")' 
```

## Development
You should have `npm`, `node.js`, `dfx` installed in advance.

Each time before you push to remote origin, please make sure your code is up to date. (pull from remote before you commit)
```
$ git commit -m 'your commit message'
$ git pull origin <branch name>
$ git push origin <branch name>
```
The frontend code is at `src/PetLove_assets/src` and backend code is at `src/PetLove/src`. You can follow the following instructions to start your development.

1. You should switch to your target branch for development. 
```
$ git checkout <your branch>
```

2. Install `npm` package dependencies
```
$ npm install
```

3. Start development.
```
$ dfx start --background
$ dfx deploy --argument '(principal "'$(dfx identity get-principal)'")'
$ npm start
```

## References
1. [Deploy React-based web application on IC](https://smartcontracts.org/docs/developers-guide/tutorials/custom-frontend.html)
## Contribution

1.  Fork this repository
2.  Create a new Feat_xxx branch
3.  Submit your code
4.  Create a Pull Request

