# CookOut

##Elevator pitch: 
Are you hungry? Do you want to cook at home or go out? Why not start by going to CookOut a web application that alows users to search a chef-curated database of recipes. Find what you want to cook tonight or save a tasty recipe for later. Don't want to cook? Search your local area for amazing restaurants and find the highest rated or least expensive joint in your area.

##Concept: What is your user story? What was your motivation for development?

As someone who is looking for a place to eat
I want to be able to search for gourmet locations within a specified radius of my current location
So that i can choose a place to order takeout, delivery, or dine in

As someone looking to cook a meal
I want to be able to serach for recipies based on ingredients I have at home, by cuisine, or region
So that I can make a meal for my loving family


##Process: What were the technologies used? How were tasks and roles broken down and assigned? What challenges did you encounter? What were your successes?

CookOut was built using the Foundation front-end framework
node Sass for compiling and auto prefixing our css
node browser-sync so we could see our css changes in real time
node gulp to run node sass and browswer-sync from the command line
api calls to zomato, restaurantdb, and bing for location data

Roles were separated into framework/wireframe, api calls, styling, and error handling.

Because we rendered all of our data on one html page we lost use of the browser's back button. We were unable given our time constraints to fix that issue.

We were successfull in creating a clean design, operational code, and demonstrating successfull leveraging of api calls a working with / extending a front-end framework.

##Directions for Future Development

In future releases we would want to address the issue of no back button.
Then we would want to work on refing our search and filter of local restaurants so that users could filter by price, rating, radius, and options such as delivery, online reservations, and take-out.

##Links to the deployed application and the GitHub repository
**Link Here**

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
