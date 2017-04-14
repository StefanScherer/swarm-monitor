#!/bin/bash
set -e

# test image
docker run -d --name=monitortest -v /sys:/sys -v /var/run/docker.sock:/var/run/docker.sock monitor

sleep 5

docker logs monitortest
