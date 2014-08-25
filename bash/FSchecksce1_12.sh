#!/bin/bash

filesystem=$1

if [[ $1 < 1 ]]; then
	echo "Usage: ./FScheck_sce01_12 <filesystem>"
	echo "Example: ./FScheck_sce01_12 lsnas04"
else
	for i in 01 02 03 04 05 06 07 08 09 10 11 12; do 
		ssh -q -t -o stricthostkeychecking=no sclweb$i.mm3.mlbam.com "hostname; df -h | grep ${filesystem}" ; 
	done
fi

