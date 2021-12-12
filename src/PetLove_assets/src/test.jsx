import * as React from "react";
import {PetLove, idlFactory} from "../../declarations/PetLove";
import {IDL} from "@dfinity/candid";

const TestPage = () => {

    const [principal, setPrincipal] = React.useState();
    const [pet, setPet] = React.useState();

    let onClickLoginButton = async () => {
        const nnsCanisterId = 'qoctq-giaaa-aaaaa-aaaea-cai'
        const whitelist = [nnsCanisterId];

        // Initialise Agent, expects no return value
        await window?.ic?.plug?.requestConnect({
            whitelist,
        });

        // A partial Interface factory
        // for the NNS Canister UI
        // Check the `plug authentication - nns` for more
        const nnsPartialInterfaceFactory = ({ IDL }) => {
            const BlockHeight = IDL.Nat64;
            const Stats = IDL.Record({
                'latest_transaction_block_height' : BlockHeight,
                'seconds_since_last_ledger_sync' : IDL.Nat64,
                'sub_accounts_count' : IDL.Nat64,
                'hardware_wallet_accounts_count' : IDL.Nat64,
                'accounts_count' : IDL.Nat64,
                'earliest_transaction_block_height' : BlockHeight,
                'transactions_count' : IDL.Nat64,
                'block_height_synced_up_to' : IDL.Opt(IDL.Nat64),
                'latest_transaction_timestamp_nanos' : IDL.Nat64,
                'earliest_transaction_timestamp_nanos' : IDL.Nat64,
            });
            return IDL.Service({
                'get_stats' : IDL.Func([], [Stats], ['query']),
            });
        };

        // Create an actor to interact with the NNS Canister
        // we pass the NNS Canister id and the interface factory
        const NNSUiActor = await window.ic.plug.createActor({
            canisterId: nnsCanisterId,
            interfaceFactory: nnsPartialInterfaceFactory,
        });

        // We can use any method described in the Candid (IDL)
        // for example the get_stats()
        // See https://github.com/dfinity/nns-dapp/blob/cd755b8/canisters/nns_ui/nns_ui.did
        const stats = await NNSUiActor.get_stats();
        console.log('NNS stats', stats);

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
        const userProfile = await PetLove.getUserProfile(principal);
        console.log(userProfile);
    }

    let onGeneratePet = async () => {
        const petProfile = await PetLove.randomGeneratePet();
        console.log(petProfile);

        if(petProfile != null) {
            setPet(petProfile)
        }
    }

    let onAbandonPet = async () => {
        if(principal == null || pet == null) {
            console.log("not login yet or no pet yet.");
        } else {
            const success = await PetLove.abandonPet(pet.id);
            if(success === true) {
                console.log("abandon success.")
                const userProfile = await PetLove.getUserProfile(principal);
                console.log(userProfile);
                const petProfile = await PetLove.getPetProfile(pet.id);
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
            const success = await PetLove.sellPet(pet.id, BigInt(400));
            if(success === true) {
                console.log("sell success.")
                const userProfile = await PetLove.getUserProfile(principal);
                console.log(userProfile);
                const petProfile = await PetLove.getPetProfile(pet.id);
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
            const success = await PetLove.purchasePet(principal, principal, pet.id);
            if(success === true) {
                console.log("purchase success.")
                const profile = await PetLove.getUserProfile(principal);
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
            const petProfile = await PetLove.getPetProfile(pet.id);
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
            var success1 = await PetLove.interactWithPet(pet.id, {feed: null})
            if(success1 === true) {
                console.log("feed success.")
                const profile = await PetLove.getPetProfile(pet.id);
                console.log(profile);
            } else {
                console.log("feed failed.")
            }

            var success2 = await PetLove.interactWithPet(pet.id, {play: null})
            if(success2 === true) {
                console.log("play success.")
                const profile = await PetLove.getPetProfile(pet.id);
                console.log(profile);
            } else {
                console.log("play failed.")
            }
        }
    }

    let onGetAllPetOnSelling = async () => {
        var list = await PetLove.getAllPetsOnSelling();
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