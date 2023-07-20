# Eat Poop You Cat Web

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
