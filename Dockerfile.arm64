FROM aarch64/node:6.9.1 as build
COPY qemu-aarch64-static /usr/bin/qemu-aarch64-static
WORKDIR /code
COPY package.json /code
RUN npm install --production
COPY app.js /code

FROM aarch64/node:6.9.1-slim
COPY qemu-aarch64-static /usr/bin/qemu-aarch64-static
WORKDIR /code
COPY --from=build /code /code
CMD ["node", "app.js"]
