# Scrumdiddly

Welcome to Scrumdiddly, your go-to platform for discovering delicious recipes based on the ingredients you have in your pantry. Never let your ingredients go to waste again!

- Derrik Harp
- Armin Ketanovic
- Kirsten Kwon
- Hainam Nguyen
- Em Korthals

## Design

- [API Design](docs/apis.md)
- [Data Model](docs/data-model.md)
- [GHI](docs/ghi.md)
- [Integrations](docs/integrations.md)

## Intended Market

Recipe Finder is designed for food enthusiasts and home cooks looking for convenient ways to make delicious meals with the ingredients they already have. It's the ideal solution for anyone seeking to reduce food waste and simplify meal planning.

## Functionality

- Ingredient Input: Users can input the ingredients they have in their pantry.
- Recipe Matching: Our platform matches the user's ingredients with our extensive recipe database to suggest - recipes that can be prepared with those ingredients.
- Recipe Details: Users can access detailed recipe information such as ingredients and instructions.
- Recipe Favorites: Registered users can save their favorite recipes for quick access in the future.
- Search and Filtering: Users can search for recipes by name or pantry matches.
- User Accounts: Registered users can create accounts to access a digital pantry.
- Input Recipes: Every time the website is loaded it checks the 3rd party for new recipes and inputs it in to the database.

## Project Initialization

To start using Recipe Finder on your local machine, follow these steps:

1. Clone the repository down to your local machine
2. CD into the new project directory
3. Run docker volume create mongo-express
4. Run docker compose build
5. Run docker compose up
6. Add ingredients to your pantry and search recipes
7. Or search for recipes directly by name in the list all page
