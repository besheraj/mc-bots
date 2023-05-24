# Mc Bots prototype:

## Diagram
![diagram](./diagram.jpg)

### Usage
- run the project with the following command: "docker-compose up -d --scale bot=1 --no-recreate" with 1 bot
- to increase bot change the bot value in the command.
- log to the mongodb to check the records: "mongodb://root:example@localhost:27017"
- to create order send post request to: "localhost:8100" in the request body include: {"vip":true} as member or {"vip":false} as VIP member.