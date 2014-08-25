#!/bin/bash

### Script to check if the merlin log file exists and if not create one 
### This is needed to stop the unknown nagios alerts which alert when there is no file 
### And Zvideo does not create a new one.

MERLINLOG="/opt/zvideo/zvencoder/logs/merlinlog.txt"

if [[ -f $MERLINLOG ]]; then
	exit 0
else 
	#echo -e "Creating empty merlinlog file"
	touch /opt/zvideo/zvencoder/logs/merlinlog.txt ; chown zvideo:zvideo /opt/zvideo/zvencoder/logs/merlinlog.txt ; chmod g+w /opt/zvideo/zvencoder/logs/merlinlog.txt
	exit 0 
fi