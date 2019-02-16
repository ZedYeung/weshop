#!/bin/bash
git remote add backend git@github.com:ZedYeung/weshop-backend.git
git subtree add --prefix=backend backend master
# git subtree push --prefix=backend backend weshop/master

git remote add frontend git@github.com:ZedYeung/weshop-frontend.git
git subtree add --prefix=frontend frontend master
# git subtree push --prefix=frontend frontend weshop/master