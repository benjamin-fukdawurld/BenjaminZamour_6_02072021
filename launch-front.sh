#!/bin/bash

export NVM_DIR=$HOME/.nvm;
source $NVM_DIR/nvm.sh;

pushd dwj-projet6
nvm exec 14 ng serve