#!/bin/bash

HOSTNAME=$1
GATEWAY=$2
BOND0IP=$3
BOND1IP=$4
BOND2IP=$5
#BOND3IP=$5
#ETH0IP=$6
#ETH4IP=$7

echo "${HOSTNAME}:
  gateway: ${GATEWAY}
  interfaces:
    - type: network::bond::static
      values:
        bond0:
          ensure: up
          ipaddress: ${BOND0IP}
          netmask: 255.255.255.224
          bonding_opts: \"miimon=100 mode=4 lacp_rate=1\"
      slave1: eth0
      slave2: eth8
    - type: network::bond::static
      values:
        bond1:
          ensure: up
          ipaddress: ${BOND1IP}
          netmask: 255.255.255.224
          bonding_opts: \"miimon=100 mode=4 lacp_rate=1\"
      slave1: eth1
      slave2: eth9
    - type: network::bond::static
      values:
        bond2:
          ensure: up
          ipaddress: ${BOND2IP}
          netmask: 255.255.255.192
          bonding_opts: \"miimon=100 mode=4 lacp_rate=1\"
      slave1: eth2
      slave2: eth6" >> /Users/hack/personalscripts/bash/ecctl24.txt
