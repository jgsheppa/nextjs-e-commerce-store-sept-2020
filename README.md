### Book Nook - An E-commerce Store

Book Nook is an e-commerce store made with [Next.js](https://nextjs.org/) and bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app). This site uses a `PostgreSQL` database to retrieve information for its pages, such as author names, prices, and book titles. Additionally, some of the files for this project were written using `Typescript`:

![Typescript](https://github.com/jgsheppa/nextjs-e-commerce-store-sept-2020/blob/master/public/screenshot-typescript.png)

#### Testing

Unit tests were created using `Jest` and E2E tests were run using `Cypress`. An example of one of the `Jest` unit tests can been seen below:

![Jest Unit Test](https://github.com/jgsheppa/nextjs-e-commerce-store-sept-2020/blob/master/public/screenshot-testing.png)

#### Design

The Book Nook logo was created using `Figma` and the site's design is responsive to most devices.

![Book Nook Shopping Page](https://github.com/jgsheppa/nextjs-e-commerce-store-sept-2020/blob/master/public/screenshot-shop.png)

## Getting Started

First, run the development server:

```
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying the files in the `pages` folder. The page auto-updates as you edit the file. Additionally, the `components` folder contains files such as `Layout` and `Header`, which offer consistency in the site's design.

Book Nook was deployed using [Heroku](www.heroku.com), and you can do the same. First, go to the Heroku site and make an account. Next, go to your dashboard and click on `New` and then `Create New App`. If there are no bugs in the site, then the deployment should be seamless.

First, click on `Deploy` in the sub-header. Next, connect your **Github** account to Heroku and select the project you want to deploy. Finally, go to the bottom of the page and click on `Deploy`. If you run into any trouble, check the `logs` on Heroku to see what went wrong. Something usually does go wrong, so don't worry if the build fails.
