FROM harbor.hpms.io/library/nodejs:10.16.3 AS base

# run as root to configure items
USER root
RUN yum install wget -y &&\
  wget https://s3.amazonaws.com/dl.softrams.io/oracle-instantclient12.1-basic-12.1.0.2.0-1.x86_64.rpm &&\
  yum install -y oracle-instantclient12.1-basic-12.1.0.2.0-1.x86_64.rpm -y &&\
  sh -c "echo /usr/lib/oracle/12.1/client64/lib > /etc/ld.so.conf.d/oracle-instantclient.conf" &&\
  ldconfig

RUN curl --silent --location https://rpm.nodesource.com/setup_10.x | bash -
RUN curl --silent --location https://dl.yarnpkg.com/rpm/yarn.repo | tee /etc/yum.repos.d/yarn.repo &&\
  yum install -y yarn

EXPOSE 3100

ARG NODE_ENV
ENV NODE_ENV $NODE_ENV

RUN mkdir /app
WORKDIR /app
ADD package.json yarn.lock /app/
# RUN yarn --pure-lockfile --production
RUN yarn --production --frozen-lockfile --audit
RUN yarn global add pm2
ADD . /app

CMD ["yarn", "docker-start"]
