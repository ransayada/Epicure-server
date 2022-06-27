# show all containers that are running

docker ps -a

# show all images that are in my pc

docker images

### do the docker stuff outside the dir so (cd..)

# build your container

docker build .\epicure-backend\ -t epicureapi:latest

# run the docker container

docker run --name api -p 1337:1337/tcp -d epicureapi

# show the server logs inside docker

docker logs -f api
