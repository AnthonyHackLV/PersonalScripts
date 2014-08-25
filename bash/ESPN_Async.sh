#!/bin/bash

### ASYNC Script so we can async any day as opposed to only being able to async up to yesterday's 
### ESPN content

PATH=/bin:/sbin:/usr/bin:/usr/sbin:/usr/sfw/bin:/usr/sfw/sbin:/opt/sfw/bin:/opt/sfw/sbin:/usr/local/bin:/usr/local/sbin:/opt/csw/bin:/usr/ucb:/usr/cluster/bin:/usr/ccs/bin:/opt/mlb/bin:/opt/bin

SYNCJOB=$1
YEAR=$2
MONTH=$3
DAY=$4
RERUN=$5

if [[ "$1" == "-help" || "$1" == "-h" || "$1" == "" || $# < 5 ]]; then
	echo "#########################################################################"
	echo "This script is for a user to async a ESPN rsync that went bad"
	echo "It should be run with the following parameters: "
	echo "syncjobDT (DT - date/time) EX: 2013-12-01T15-34-02"
	echo "year - 00, month - 00, day - 00"
	echo "rerun number (first run should start with 0 and increment accordingly)"
	echo "EX: ./ESPN_Async.sh {syncjobDT} {year} {month} {day} {rerun}"
	echo "#########################################################################"
	exit 0
else
	### If we have the correct number of arguments then check to see if the syncjob
	### dirctory exists, if not create it. Should check if args are in order but.....
	if [[ $# == 5 ]]; then
		if [[ -d /data/logs/espn/syncjob-$SYNCJOB ]]; then
			echo "Using existing directory syncjob-$SYNCJOB"
		else
			echo "Creating new directory /data/logs/espn/syncjob-$SYNCJOB"
			mkdir -p /data/logs/espn/syncjob-$SYNCJOB
		fi
		LOG="/data/logs/espn/syncjob-$SYNCJOB/espn_asp_$SYNCJOB"
		echo "Date you are ASYNC'ING is $SYNCJOB If this is not the correct job you want to sync, please ctrl-c out of this script within 10 seconds"
		echo "Date you are ASYNC'ING is $SYNCJOB If this is not the correct job you want to sync, please ctrl-c out of this script within 10 seconds" >> $LOG
		sleep 10
		echo "Proceeding with async for $SYNCJOB ...... "
		echo "Proceeding with async for $SYNCJOB ...... " >> $LOG

	fi

	if [[ -d /lsnas04/data/PROD/video/espn/$YEAR/$MONTH/$DAY ]]; then
		### Echo to user
		echo "Running async -L /data/logs/espn/syncjob-$SYNCJOB -N $SYNCJOB -b /data/async/espn/db -B /dmwebfs/share/lfc/aspera/data -d /lsnas04/data/PROD/video/espn/$YEAR/$MONTH/$DAY -r mlbaspx@fas.video-origin.espn.com:/dmwebfs/share/lfc/replay/hls/$YEAR/$MONTH/$DAY --create-dir -w `cat ~aspespn/.ssh/.async_password` -l 100M -K push –c none"
		### Echo to log file
		echo "Running async -L /data/logs/espn/syncjob-$SYNCJOB -N $SYNCJOB -b /data/async/espn/db -B /dmwebfs/share/lfc/aspera/data -d /lsnas04/data/PROD/video/espn/$YEAR/$MONTH/$DAY -r mlbaspx@fas.video-origin.espn.com:/dmwebfs/share/lfc/replay/hls/$YEAR/$MONTH/$DAY --create-dir -w `cat ~aspespn/.ssh/.async_password` -l 100M -K push –c none" >> $LOG
		### Actual command 
		async -L /data/logs/espn/syncjob-$SYNCJOB -N syncjob-$SYNCJOB -b /data/async/espn/db -B /dmwebfs/share/lfc/aspera/data -d /lsnas04/data/PROD/video/espn/$YEAR/$MONTH/$DAY -r mlbaspx@fas.video-origin.espn.com:/dmwebfs/share/lfc/replay/hls/$YEAR/$MONTH/$DAY --create-dir -w `cat ~aspespn/.ssh/.async_password` -l 100M -K push –c none | tee /data/logs/espn/syncjob-$SYNCJOB/rerun$RERUN.out
	else
		### Echo to user
		echo "/lsnas04/data/PROD/video/espn/$YEAR/$MONTH/$DAY does not exist, please find out if there were scheduled events for $YEAR/$MONTH/$DAY"
		### Echo to log file
		echo "/lsnas04/data/PROD/video/espn/$YEAR/$MONTH/$DAY does not exist, please find out if there were scheduled events for $YEAR/$MONTH/$DAY" >> $LOG
	fi

	tail -30 /data/logs/espn/syncjob-$SYNCJOB/$LOG | tr -d "\r" | mailx -r espn_to_aspera_cron -s "espn async to aspera log tail" sysops@mlb.com,MM-ESPNTraffic@mlb.com
fi

