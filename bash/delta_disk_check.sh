#!/bin/bash

### Delta disk space check for nagios. Will need to run a loop to check if a file greater then 1TB 
### has been created (or copied) to disk. This needs to run on archive01 as that is where 
### almost all the FS's are mounted. If the file is > 1TB that is a critical alert. There is no 
### reason for a warning as Ops barely pays attention to the criticals nevermind warnings.

## This should be the actual df command used along with the fs's that are needing checking
## df -k | egrep "archstreamnfs0*|igfs0*|edfs0*" | awk '{print $4}' *This will get you the
## available space on the egrep'd file systems in kilobytes

## This will get you the FS names
mounts=`df -h | awk '{print $6}' | grep -v Mounted | egrep "archstreamnfs0*|igfs0*|edfs0*"`

## This will get you the used space on the FS's
used=`df -k | egrep "archstreamnfs0*|igfs0*|edfs0*" | grep -v used | awk '{print $3}'`

## 1TB = One trillion bytes 
crit=1000000000000

for i in $mounts; do 
        available=`df -k $i | awk '{print $4}' | grep -v avail`
        delta=$available-$crit
        if [[ $delta == $used ]]; then
                printf "NOK - ${i}: ${available} kilobytes\n"
                critical=true   
        elif [[ $used == $used ]]; then
                printf "OK - ${i}: ${available} kilobytes\n"
                osk=true        
        fi 
done

if [[ $critical = "true" ]]; then
        exit 2
elif [[ $osk = "true" ]]; then
        exit 0
fi



