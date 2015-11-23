#!/bin/bash

host=$1

echo "Scp'ing rpm's and files to new jetty host"

`scp /Users/hack/jetty9_jdk18_packages/* ahack@$host:/var/tmp`

