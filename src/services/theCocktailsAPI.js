const cocktailDetailsURL = 'https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=';
const cocktailDetailsByNameURL = 'https://www.thecocktaildb.com/api/json/v1/1/search.php?s=';

export const cocktailDetailsByID = async (id) => {
  const response = await fetch(cocktailDetailsURL + id);
  const { drinks } = await response.json();

  return drinks[0];
};

export const cocktailDetailsByName = async () => {
  const response = await fetch(cocktailDetailsByNameURL);
  const { drinks } = await response.json();

  return drinks;
};

/* API Methods using the developer test key '1' as the API key

Search cocktail by name
www.thecocktaildb.com/api/json/v1/1/search.php?s=margarita

List all cocktails by first letter
www.thecocktaildb.com/api/json/v1/1/search.php?f=a

Search ingredient by name
www.thecocktaildb.com/api/json/v1/1/search.php?i=vodka

Lookup full cocktail details by id
www.thecocktaildb.com/api/json/v1/1/lookup.php?i=11007

Lookup ingredient by ID
www.thecocktaildb.com/api/json/v1/1/lookup.php?iid=552

Lookup a random cocktail
www.thecocktaildb.com/api/json/v1/1/random.php

Lookup a selection of 10 random cocktails (only available to $2+ Patreon supporters)
www.thecocktaildb.com/api/json/v1/1/randomselection.php

List Popular cocktails (only available to $2+ Patreon supporters)
www.thecocktaildb.com/api/json/v1/1/popular.php

List most latest cocktails (only available to $2+ Patreon supporters)
www.thecocktaildb.com/api/json/v1/1/latest.php

Search by ingredient
www.thecocktaildb.com/api/json/v1/1/filter.php?i=Gin
www.thecocktaildb.com/api/json/v1/1/filter.php?i=Vodka

Filter by multi-ingredient (only available to $2+ Patreon supporters)
www.thecocktaildb.com/api/json/v1/1/filter.php?i=Dry_Vermouth,Gin,Anis

Filter by alcoholic
www.thecocktaildb.com/api/json/v1/1/filter.php?a=Alcoholic
www.thecocktaildb.com/api/json/v1/1/filter.php?a=Non_Alcoholic

Filter by Category
www.thecocktaildb.com/api/json/v1/1/filter.php?c=Ordinary_Drink
www.thecocktaildb.com/api/json/v1/1/filter.php?c=Cocktail

Filter by Glass
www.thecocktaildb.com/api/json/v1/1/filter.php?g=Cocktail_glass
www.thecocktaildb.com/api/json/v1/1/filter.php?g=Champagne_flute

List the categories, glasses, ingredients or alcoholic filters
www.thecocktaildb.com/api/json/v1/1/list.php?c=list
www.thecocktaildb.com/api/json/v1/1/list.php?g=list
www.thecocktaildb.com/api/json/v1/1/list.php?i=list
www.thecocktaildb.com/api/json/v1/1/list.php?a=list

 Images
Drink thumbnails
Add /preview to the end of the cocktail image URL
/images/media/drink/vrwquq1478252802.jpg/preview (100x100 pixels)

Ingredient Thumbnails
www.thecocktaildb.com/images/ingredients/gin-Small.png
(100x100 pixels)
www.thecocktaildb.com/images/ingredients/gin-Medium.png
(350x350 pixels)
www.thecocktaildb.com/images/ingredients/gin.png
(700x700 pixels) */
