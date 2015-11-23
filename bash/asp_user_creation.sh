#!/bin/bash

###############################################################
### Script that will let you create new asp partner users   ###
###############################################################

USERNAME=$1
UID=$2 #As of this writing should start at 10028 check /etc/passwd on asp01
GID=10014 #asp group ID should not have to be changed 
DROPOFFDIR=$3 #Where on /xc01/media_delivery/<partner> will content be dropped.

### Add the help here

### If the directory does NOT exist, create it
if [[ ! -d /home/$USERNAME ]]; then
	echo "Creating directory for $USERNAME"
	mkdir -p /home/$USERNAME

	echo "Create the .ssh directory in /home/$USERNAME"
	mkdir -p /home/$USERNAME/.ssh

	echo

