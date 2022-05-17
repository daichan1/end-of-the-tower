FROM ruby:2.5.3

WORKDIR /var/www

ENV TZ Asia/Tokyo

RUN apt update && \
  apt install -y build-essential nodejs

COPY api/Gemfile .
COPY api/Gemfile.lock .

RUN bundle install

COPY api .
