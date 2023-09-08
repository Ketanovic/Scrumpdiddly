# APIs

## Recipes

- **Method**: `POST`, `GET`, `GET`, `POST`,
- **Path**: `/api/recipes`, `/api/recipes/search`, `/api/recipes/<int:pk>`

Input:

```json
{
  "name": "string"
}
```

Output:

```json
{
  "id": str,
  "name": str,
  "category": str,
  "area": str,
  "instructions": str,
  "ingredients": dict,
  "thumbnail": str,
}
```

Input:

````json
{
  "id": str,
  "name": str,
  "category": str,
  "area": str,
  "instructions": str,
  "ingredients": dict,
  "thumbnail": str,
}```

Output:

```json
{
  "id": str,
  "name": str,
  "category": str,
  "area": str,
  "instructions": str,
  "ingredients": dict,
  "thumbnail": str,
}
````

Searching a recipe by name turns the id, name, category, area, instructions, ingredients and thumbnail of a recipe with a matching name. This allows the user to search for recipes they already know. Creating a recipe with the same structure allows our third party api to input recipes.

## Pantry Items

- **Method**: `GET`, `POST`, `DELETE`,
- **Path**: `/api/pantry_item/`, `/api/pantry_item/<int:pk>`

Input:

```json
{
  "name": "string",
  "recipes": ["string"],
  "user_id": "string"
}
```

Output:

```json
{
  "name": "string",
  "recipes": ["string"],
  "user_id": "string",
  "id": "string"
}
```

Creating a new pantry item save the name, associated reicpes, user_id, and item id into the user's pantry database. This streamlines recipe recall based on matches in the database.

## Accounts

- Method: `GET`, `POST`
- Path: `/token`, `/api/accounts/`

Input:

```json
{
  "username": "string",
  "email": "string",
  "password": "string"
}
```

Output:

```json
{
  "access_token": "string",
  "token_type": "Bearer",
  "account": {
    "id": "string",
    "username": "string",
    "email": "string"
  }
}
```

The Accounts API will create an account and pantry databse for a user on the website. Users will need to enter in all of the information listed to create an account. When a new account is created so is an access token that'll be used to authenticate the user.

## Ingredients

- Method: `GET`
- Path: `/api/ingredients`

Input:

```json
None
```

Output:

```json
{
  "ingredients": [
    {
      "name": "string",
      "recipe": ["string"]
    }
  ]
}
```

The ingredients API takes all the ingredients in the recipes API and populates the input for ingredients the user can add to their pantry.
