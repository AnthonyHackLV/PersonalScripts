#!/bin/bash

directory=$1

(cd /Users/hack/gitbam/$directory && git fetch upstream ; sleep 2 ; git checkout master ; sleep 2 ; git merge upstream/master)
