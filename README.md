# Docker Swarm Monitor
[![Build Status](https://travis-ci.org/StefanScherer/swarm-monitor.svg?branch=master)](https://travis-ci.org/StefanScherer/swarm-monitor)
[![This image on DockerHub](https://img.shields.io/docker/pulls/stefanscherer/monitor.svg)](https://hub.docker.com/r/stefanscherer/monitor/)

The Docker Swarm Monitor shows running containers (eg. replicas of a swarm service) with the Blinkt! LED strip.

 ```bash
 docker run -v /sys:/sys -v /var/run/docker.sock:/var/run/docker.sock monitor
 ```


## Swarm Mode Demo

```
docker service create --name monitor \
--mode global --restart-condition any --mount type=bind,src=/sys,dst=/sys --mount type=bind,src=/var/run/docker.sock,dst=/var/run/docker.sock \
stefanscherer/monitor:1.1.0
```

Create a service

```
docker service create --name whoami stefanscherer/whoami:1.1.0
```

Scale service up and down

```
docker service scale whoami=2
docker service scale whoami=7
docker service scale whoami=1
docker service scale whoami=8
```

Run a rolling update

```
docker service update --image stefanscherer/whoami:1.2.0 --update-parallelism 4  --update-delay 2s whoami
```
