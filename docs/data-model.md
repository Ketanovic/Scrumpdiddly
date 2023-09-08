# Data models

## Recipe microservice

---

### Recipes

| name         | type   | unique | optional |
| ------------ | ------ | ------ | -------- |
| name         | string | yes    | no       |
| category     | string | no     | no       |
| area         | string | no     | no       |
| instructions | string | no     | no       |
| ingredients  | dict   | no     | no       |
| thumbnail    | string | no     | no       |

The `recipe` entity contains the data about any recipe in the database.

## Pantry microservice

---

### Pantry Item

| name    | type   | unique | optional |
| ------- | ------ | ------ | -------- |
| name    | string | true   | false    |
| recipes | string | true   | false    |
| user_id | string | true   | false    |
| id      | string | true   | false    |

### Ingredients

| name   | type   | unique | optional |
| ------ | ------ | ------ | -------- |
| name   | string | yes    | no       |
| recipe | list   | no     | no       |
