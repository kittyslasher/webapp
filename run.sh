#!/bin/sh

git filter-branch --env-filter '
CORRECT_NAME="pokeswapper"
CORRECT_EMAIL="bill@pokeswapper.org"

 export GIT_COMMITTER_NAME="$CORRECT_NAME"
 export GIT_COMMITTER_EMAIL="$CORRECT_EMAIL"ort GIT_AUTHOR_EMAIL="$CORRECT_EMAIL"

' --tag-name-filter cat -- --branches --tags --f