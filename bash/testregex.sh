#!/bin/bash

NUMBER=$1

if [[ $NUMBER =~ ^[0-9]{1,2}$ ]]; then
	echo "Number is $NUMBER"
fi