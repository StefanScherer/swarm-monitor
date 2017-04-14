# Docker Swarm Monitor
[![Build Status](https://travis-ci.org/StefanScherer/swarm-monitor.svg?branch=master)](https://travis-ci.org/StefanScherer/swarm-monitor)
[![This image on DockerHub](https://img.shields.io/docker/pulls/stefanscherer/monitor.svg)](https://hub.docker.com/r/stefanscherer/monitor/)

The Docker Swarm Monitor shows running containers (eg. replicas of a swarm service) with the Blinkt! LED strip.

 ```bash
 docker run -v /sys:/sys -v /var/run/docker.sock:/var/run/docker.sock monitor
 ```
