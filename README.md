# Eat Poop You Cat Web

## State

Usable but not production ready

## Purpose

It's currently a work in progress. This is simple project I'm using to learn the listed frameworks.

## Premise

Eat Poop You Cat is a bit like telephone meets that one game where you try to get folks to guess the drawing.

You start with a sentence pass it to the next person and it they draw a picture. Then they pass it to the next person and they can only see the last entry (picture in this case) and they write a sentence. It goes on until everyone has had a turn or boredom takes hold.

## Tech used

[django backend](https://www.djangoproject.com/)

[Vue frontend](https://vuejs.org/)

## Requirements

* Python 3
* Node 16
* Npm 9
* bash (for the npm scripts to work)

## How to run

* setup python venv
  
    ```shell
    npm run setup:venv
    ```

* install python requirements
  
    ```shell
    npm run install:requirements:bash
    ```

* migrate database
  
    ```shell
    npm run migrate:database
    ```

* create a superuser account for django
  
    ```shell
    npm run create:superUser
    ```

* start backend
  
    ```shell
    npm run start:backend:bash
    ```

* start frontend
  
    ```shell
    npm run --prefix frontend/ dev
    ```

## Deploy on fly.io

### Backend

1. secrets

   * the following secrets are required for django see .env for examples.

   * ```env
      ALLOWED_HOSTS
      CSRF_TRUSTED_ORIGINS
      FRONT_END_URL
      SECRET_KEY
      ```

   set the secrets
   ***Replace BACKEND and FRONTEND with your app names***

   * ```shell
      fly secrets set --app "BACKEND" FRONT_END_URL='https://FRONTEND.fly.dev' ALLOWED_HOSTS='["BACKEND.fly.dev"]' CSRF_TRUSTED_ORIGINS='["https://BACKEND.fly.dev", "https://FRONTEND.fly.dev"]'
      ```

2. Data

    a persistant volume is needed to keep the SQLite db.
    Make one with this volume and call it `data`. *TODO: migrate to postgres DB*

3. Deploy

    ***Replace BACKEND and FRONTEND with your app names***

    * ```shell
        flyctl deploy -a "BACKEND"
        ```

4. Migrate DB

    * ```shell
        flyctl ssh console
        python manage.py
        ```

### Frontend

1. secrets

   * the following secrets are required

   * ```env
      VITE_BACKEND_HOSTNAME
      ```

   * set the secrets
   ***Replace BACKEND and FRONTEND with your app names***

   * ```shell
        fly secrets set --app "FRONTEND" VITE_BACKEND_HOSTNAME="https://BACKEND.fly.dev"
        ```

2. Deploy

    ***Replace BACKEND and FRONTEND with your app names***

    * ```shell
        cd FrontEnd
        flyctl deploy --app "FRONTEND" --build-secret VITE_BACKEND_HOSTNAME="BACKEND"
        ```
