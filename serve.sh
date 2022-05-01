#!/bin/zsh
dfx deploy --argument '(principal "'$(dfx identity get-principal)'")'