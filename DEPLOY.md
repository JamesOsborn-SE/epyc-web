# Deployments

## Github

1. Secrets
   1. `DJANGO_KEY` SECRET KEY for Django
   2. `FLY_API_TOKEN` API token from your fly.io
  
2. Variables
   1. `BACKEND_APP_NAME` flyio app name
   2. `FRONTEND_APP_NAME` flyio app name

3. Setup
   1. a persistant storage for sqlite data needs to be setup manually **see below for details*

## fly.io from local machine

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
