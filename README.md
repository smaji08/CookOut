# CookOut


## Elevator Pitch

Are you hungry? Do you want to cook at home or go out? Why not start by going to CookOut a web application that alows users to search a chef-curated database of recipes. Find what you want to cook tonight or save a tasty recipe for later. Don't want to cook? Search your local area for amazing restaurants and find the highest rated or least expensive joint in your area.

## User Story and Motivation

AS SOMEONE who is looking for a place to eat
I WANT to be able to search for gourmet locations within a specified radius of my current location
SO THAT i can choose a place to order takeout, delivery, or dine in

AS SOMEONE looking to cook a meal
I WANT to be able to serach for recipies based on ingredients I have at home, by cuisine, or region
So THAT I can make a meal for my loving family


## Process: Technologies, Tasks and Roles, Challenges and Successes

CookOut was built using the Foundation front-end framework
node Sass for compiling and auto prefixing our css
node browser-sync so we could see our css changes in real time
node gulp to run node sass and browswer-sync from the command line
API calls to Zomato for restaurants, mealDB for recipe, and Bing for location data

Roles were separated into framework/wireframe, api calls, styling, and error handling.

Because we rendered all of our data on one html page we lost use of the browser's back button. We were unable given our time constraints to fix that issue.

We were successfull in creating a clean design, operational code, and demonstrating successfull leveraging of api calls a working with / extending a front-end framework.

## Directions for Future Development

In future releases, we would want to address the issue of no back button.
Then we would want to work on refing our search and filter of local restaurants so that users could filter by price, rating, radius, and options such as delivery, online reservations, and take-out.

## Screenshots and Links to the deployed application and the GitHub repository

Deployed App: https://smaji08.github.io/CookOut/

GitHub Repo : https://github.com/smaji08/CookOut

![MainPage](https://user-images.githubusercontent.com/54964461/72996986-9ffb7880-3dc9-11ea-9eca-1a20de094856.png)

![RecipePage](https://user-images.githubusercontent.com/54964461/72996998-a4c02c80-3dc9-11ea-8c1c-4d62fdd9d5a9.png)

![RestaurantPage](https://user-images.githubusercontent.com/54964461/72997011-aa1d7700-3dc9-11ea-9323-d98af546aef0.png)

## Installation

To extend this project, your computer needs:

- [NodeJS](https://nodejs.org/en/) (0.12 or greater)
- [Git](https://git-scm.com/)

### Manual Setup

Open the folder in your command line, and install the needed dependencies:

```bash
cd projectname
npm install
```

Finally, run `npm start` to run the Sass compiler. It will re-run every time you save a Sass file.

### Contributors (RAZR)
1. Rekha Madalli - https://github.com/rnm-code-repo
2. Augustine Stella Maria - https://github.com/smaji08
3. Zachary Rosensohn - https://github.com/zrosensohn
4. Ramal Imanov - https://github.com/ramalimanov
