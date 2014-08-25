#!/bin/bash

###############################################################
### Script that should (should) let you do MLB link pushes  ###
###############################################################

YEAR=$1
MNTH=$2
DAY1=$3
DAY2=$4
DAY3=$5
USER=$6
CURR_DIR=`pwd`
HOST=`uname -n`

if [[ "$1" == "-help" || "$1" == "-h" || "$1" == "" || $# < 6 ]]; then
	echo "################################################################################"
	echo "This script is to help automate the MLB Link push process."
	echo "It should be run like below on sce28.mm3 only"
	echo "EX. /opt/bin/AutoMLBLinkpush <Year> <Month> <DAY1> <DAY2> <DAY3 or NONE> <USER>"
	echo "You will only be allowed to push the max three days at one time"
	echo "Day 3 can be optional in case that would only leave a day gap"
	echo "################################################################################"
	exit 0
else
	if [[ $# == 6 ]]; then
		if [[ $CURR_DIR != "/opt/bin/" && $HOST != "sce28" ]]; then
			echo "please run script from /opt/bin on sce28 only"
			exit 0
		elif [[ -d /export/home/$USER/archive_out_mlb ]]; then
			echo "IM in your home directorisz"
			exit 0
		fi
	fi
fi

