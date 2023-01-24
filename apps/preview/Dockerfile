FROM alpine:latest as builder

USER root
RUN apk update && apk upgrade
RUN apk add gettext

COPY apps/preview/nginx.default.conf /etc/nginx/
COPY dist/apps/preview /usr/share/nginx/html/

RUN chmod 755 /etc/nginx/nginx.default.conf
RUN chmod 755 /usr/share/nginx/html/

# ENV STORE_SERVER_URL_WITH_PORT="http://127.0.0.1:4000"
ENV STORE_SERVER_URL_WITH_PORT="http://192.168.86.221:4000"
RUN envsubst '${STORE_SERVER_URL_WITH_PORT}' < /etc/nginx/nginx.default.conf > /etc/nginx/nginx.conf

USER 101

FROM boky/nginx:latest

COPY --from=builder /etc/nginx /etc/nginx
COPY --from=builder /usr/share/nginx/html /usr/share/nginx/html

EXPOSE 3000
