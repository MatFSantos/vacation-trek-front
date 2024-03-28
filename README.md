# VACATION TREK

This repository refers to the SPA of the Vacation Trek project, a website for organizing vacations plans.

With this site, the user can plan their vacation in the best possible way, registering the destinations and companies that will enjoy the moment.

## How to run locally withou Docker

Ensure that the constant `API_URL` in `src/data/store/config.js` has the correct API link. The default is `http://localhost:3333`.

You should now have nodejs and yarn installed on your machine. Yarn is a node *package manager*.

After that, just run the following command in the root folder:

```
$ yarn
```

> This command will be install all dependencies of the project.

After installing all dependencies, you'll be ready to run the SPA, to do this run:

```
$ yarn dev
```

> This command will start a development server in your machine.

## How to run locally with Docker

Is as simple as the previous one. You need the Docker installed on your machine.

Ensure again that the `API_URL` is correct.

After that, run the following command:

```
$ sudo docker compose up -d
```

> This command will be create the image of the entire application and run in the background. You can stop the process running `sudo docker stop vacation-trek-front`.