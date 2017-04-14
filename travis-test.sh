#!/bin/bash
set -e

if [ "$ARCH" == "amd64" ]; then
  # test image
  docker run -d --name=monitortest monitor

  sleep 5

  docker logs monitortest
fi
