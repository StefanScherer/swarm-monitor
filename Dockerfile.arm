FROM hypriot/rpi-node:6.10.0 as build

WORKDIR /code
COPY package.json /code
RUN npm install --production
COPY app.js /code

FROM hypriot/rpi-node:6.10.0-alpine

WORKDIR /code
COPY --from=build /code /code
CMD ["node", "app.js"]
