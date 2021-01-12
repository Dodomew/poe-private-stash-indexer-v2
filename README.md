# PoE Private Stash Indexer
https://poe-private-stash-indexer.herokuapp.com/

This is an app which fetches your account's current league Softcore Trade (e.g. Harvest SC) inventory and requests for most of those items their current worth from PoeNinja ( https://poe.ninja/ ). Currently no support for Standard.

The project is built on `Node JS` for the backend and `ReactJS` for the frontend, with SASS for CSS.
The Node server is set up to work like an RESTapi for the frontend. 

You log in using your POESESSIONID (cookie value) from https://www.pathofexile.com and your account name. 

When you log in, these things happen:
1) The server requests your account info from https://www.pathofexile.com ( see `getAccountInventory.js` )
2) When the server gets the data back, it will pass it to the Frontend ( see `server.js` and `AppController.js` )
3) The Frontend categorizes all the items. Some items will be skipped, because they are hard to assign a value to, e.g. items with mods, like weapons or jewels. ( see `categorizeItems.js`)
4) Requests go out to PoeNinja for each category, like currency, fragments etc. PoeNinja orders their data per category, so I have to match the categories that PoeNinja uses so I can fetch the correct category. ( see `getPricesPerCategoryFromPoeNinja.js`)
5) Now I have the PoeNinja values and I must match them with the items fetched from PoE. ( see `StashHandler.js` )
6) When this is done, the values, like item title and chaos worth gets rendered by React components. ( see `Content.js` and `Sidebar.js`)

In order to run this project locally, clone the project, run `npm install` and run `npm run dev`. The project uses the package `concurrently` to allow the server and `Create-React-App` to start simultaneously.

### create-react-app React Project with Node Backend
https://www.freecodecamp.org/news/how-to-make-create-react-app-work-with-a-node-backend-api-7c5c48acb1b0/
