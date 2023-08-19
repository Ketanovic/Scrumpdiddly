import React, { useEffect } from "react";

conn = new Mongo();
db = conn.getDB("recipe-db");

const fetchrecipes = async () => {
  const url = "www.themealdb.com/api/json/v1/1/search.php?f=a";
  const response = await fetch(url);
  if (response.ok) {
    const json = await response.json();
    db.apirecipes.save(json)
  }
};

useEffect(() => {
  fetchrecipes();
}, []);
