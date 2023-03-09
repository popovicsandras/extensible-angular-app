FROM alpine:latest as builder

USER root
RUN apk update && apk upgrade
RUN apk add gettext

COPY apps/preview/nginx.default.conf /etc/nginx/
COPY dist/apps/preview /usr/share/nginx/html/

RUN chmod 755 /etc/nginx/nginx.default.conf
RUN chmod 755 /usr/share/nginx/html/

ARG store_server_url
ENV STORE_SERVER_URL $store_server_url
ARG store_server_port
ENV STORE_SERVER_PORT $store_server_port

RUN envsubst '${STORE_SERVER_URL} ${STORE_SERVER_PORT}' < /etc/nginx/nginx.default.conf > /etc/nginx/nginx.conf

USER 101

FROM boky/nginx:latest

COPY --from=builder /etc/nginx /etc/nginx
COPY --from=builder /usr/share/nginx/html /usr/share/nginx/html

EXPOSE 3000
