import * as React from "react";
import {PetLove, idlFactory} from "../../declarations/PetLove";

const canisterIds = require("../../../config/user.json")

const TestPage = () => {

    const [principal, setPrincipal] = React.useState();
    const [pet, setPet] = React.useState();
    const [actor, setActor] = React.useState();

    let onClickLoginButton = async () => {
        const backendCanisterId = canisterIds.backendCanisterId;
        console.log("test using canister: ", backendCanisterId);
        const whitelist = [backendCanisterId];

        // Initialise Agent, expects no return value
        await window?.ic?.plug?.requestConnect({
            whitelist,
        });

        // Create an actor to interact with the NNS Canister
        // we pass the NNS Canister id and the interface factory
        const backendActor = await window.ic.plug.createActor({
            canisterId: backendCanisterId,
            interfaceFactory: idlFactory,
        });
        setActor(backendActor);
        console.log("backendActor: ", backendActor);

        // Get the user principal id
        const principalId = await window.ic.plug.agent.getPrincipal();
        console.log(principalId);
        setPrincipal(principalId);

        // const result = await window.ic.plug.requestBalance();
        // console.log(result);
    }

    let onGetPrincipal = () => {
        if (principal == null) {
            console.log("not login yet.");
        } else {
            console.log(`login with ${principal}`);
        }
    }

    let onGetUserProfile = async () => {
        const userProfile = await actor.getUserProfile();
        console.log(userProfile);
    }

    let onGeneratePet = async () => {
        let param;
        if (pet == null) {
            param = [];
        } else {
            param = [pet.id];
        }

        const petProfile = await actor.randomGeneratePet();
        console.log(petProfile);

        if(petProfile != null) {
            setPet(petProfile)
        }
    }

    let onAbandonPet = async () => {
        if(principal == null || pet == null) {
            console.log("not login yet or no pet yet.");
        } else {
            const success = await actor.abandonPet(pet.id);
            if(success === true) {
                console.log("abandon success.")
                const userProfile = await actor.getUserProfile();
                console.log(userProfile);
                const petProfile = await actor.getPetProfile(pet.id);
                console.log(petProfile);
            } else {
                console.log("abandon failed.")
            }
        }
    }

    let onSellPet = async () => {
        if(principal == null || pet == null) {
            console.log("not login yet or no pet yet.");
        } else {
            const success = await actor.sellPet(pet.id, BigInt(400));
            if(success === true) {
                console.log("sell success.")
                const userProfile = await actor.getUserProfile();
                console.log(userProfile);
                const petProfile = await actor.getPetProfile(pet.id);
                console.log(petProfile);
            } else {
                console.log("sell failed.")
            }
        }
    }

    let onPurchasePet = async () => {
        if(principal == null || pet == null) {
            console.log("not login yet or no pet yet.");
        } else {
            const success = await actor.purchasePet(principal, pet.id);
            if(success === true) {
                console.log("purchase success.")
                const profile = await actor.getUserProfile();
                console.log(profile);
            } else {
                console.log("purchase failed.")
            }
        }
    }

    let onGetPetProfile = async () => {
        if (pet == null) {
            console.log("no pet yet.");
        } else {
            const petProfile = await actor.getPetProfile(pet.id);
            if(petProfile == null) {
                console.log("pet not exists.")
            } else {
                console.log(petProfile);
            }
        }
    }

    let onInteractWithPet = async () => {
        if(principal == null || pet == null) {
            console.log("not login yet or no pet yet.");
        } else {
            var success1 = await actor.interactWithPet(pet.id, {feed: null})
            if(success1 === true) {
                console.log("feed success.")
                const profile = await actor.getPetProfile(pet.id);
                console.log(profile);
            } else {
                console.log("feed failed.")
            }

            var success2 = await actor.interactWithPet(pet.id, {play: null})
            if(success2 === true) {
                console.log("play success.")
                const profile = await actor.getPetProfile(pet.id);
                console.log(profile);
            } else {
                console.log("play failed.")
            }
        }
    }

    let onGetAllPetOnSelling = async () => {
        var list = await actor.getAllPetsOnSelling();
        console.log(list);
    }

    return (
        <div>
            <h1>Test Page</h1>
            <button onClick={onClickLoginButton} style={{marginRight: "10px"}}>Connect Plug</button>
            <button onClick={onGetPrincipal} style={{marginRight: "10px"}}>Get Principal</button>
            <button onClick={onGetUserProfile} style={{marginRight: "10px"}}>Get User Profile</button>
            <button onClick={onGeneratePet} style={{marginRight: "10px"}}>Random Generate Pet</button>
            <button onClick={onAbandonPet} style={{marginRight: "10px"}}>Abandon Pet</button>
            <button onClick={onSellPet} style={{marginRight: "10px"}}>Sell Pet</button>
            <button onClick={onPurchasePet} style={{marginRight: "10px"}}>Purchase Pet</button>
            <button onClick={onGetPetProfile} style={{marginRight: "10px"}}>Get Pet Profile</button>
            <button onClick={onInteractWithPet} style={{marginRight: "10px"}}>Interact With Pet</button>
            <button onClick={onGetAllPetOnSelling} style={{marginRight: "10px"}}>Get All Pet OnSelling</button>
        </div>
    );
};

export default TestPage;