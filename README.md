# Restaurant Finder 
### Brinn Cheney
## Description:

## MVP Goals:
* Users are able to login and log out.
* Users favorited restaurants are stored.
* Restaurants a user sees are generated based off either location or search queries. 
## Stretch Goals: 
* Randomly generate a restaurant for the user from their favorites list.
    * Stretch Goal from Stretch Goal: Generate a random restaurant based off the type of food that want to eat.
* Users are able to rate restaurants on their Covid-19 safety level. 
    * Sanitization, enforcement of social distancing guidelines, mask wearing, outdoor dining availability, spacing between tables...
* Display the restaurant menu and hours.
* Link to Postmates API to allow the user to order food. 
## User Stories:
* As a user I will be able to create an account and sign in and out.
* As a user I will be able to view restaurants through either search queries or based on my location (or both) and add resturants to my favorites list. 
* As a user I will be able to view a page with a list of my favorites resturants and remove resturants if I wish. 
## Explanation of APIs to be used: 
i will be using the Google Places API(https://developers.google.com/maps/documentation/places/web-service/get-api-key). This API requires an API key snd will allow me to search for restaurants by the users location. 
## Daily Sprints:

## Wireframes:
![Login page](loginpage.png)
### 1. User is able to login or create a new account.
![Finding restaurants page](findRestaurants.png)
### 2. User enters their location in order to find restaurants in their area.
![Restaurants page](restaurantsPage.png)
### 3. Restaurants near the user are displayed and the user can add restaurants to their favorites. Stretch: User would be able to click on each restaurant to get more information on it. 
![Favorite restaurants page](favoritesPage.png)
### 4. The user can see all of their favorites and remove them from the list if they wish. Stretch: User is able to click a button on this page to randomly generate a restaurant from this list for them to eat at.
![Log out page](logoutpage.png)
### 5. Use can logout of their account.
## Database ERDs:

## RESTful routing chart: