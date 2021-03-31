"use strict";

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert("cocktails", [
      {
        name: "Old Fashioned",
        imageURL:
          "https://www.liquor.com/thmb/lavmUGaMMriZPSxfHsPnyK15bSY=/720x720/filters:fill(auto,1)/__opt__aboutcom__coeus__resources__content_migration__liquor__2018__05__08113350__bourbon-old-fashioned-720x720-recipe-ade6f7780c304999be3577e565c9bcdd.jpg",
        ingredients:
          " 50ml Bourbon, 2 dashes Angostura bitters, 1/2 tsp Brown Sugar",
        method: "Stirred",
        garnish: "Orange peel",
        author: "marcel123",
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: "Tequila Sunrise",
        imageURL:
          "https://www.torani.com/sites/default/files/styles/torani_syrup_recipe_detail/public/recipes/illustration/Tequila%20Sunrise%20with%20Torani%20%281%29.jpg?itok=CRte-7IA",
        ingredients: "40ml tequila, 150ml orange juice, 10ml Grenadine Syrup",
        method: "Shaken or poured directly into the glass",
        garnish: "Mint leaves and lemon wedges",
        author: "TomHanks56",
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: "Melon & Kiwi Martini",
        imageURL:
          "https://s3-eu-west-2.amazonaws.com/style-wp-media/wp-content/uploads/2018/04/11183342/Kiwi-Coconut-Martini-2.jpg",
        ingredients:
          "30ml Vodka, 15ml Midori, 10ml lime juice, 10ml gomme syrup, 1/4 kiwi",
        method: "Shaken",
        garnish: "2 small kiwi chunks with coconut shavings",
        author: "TomHanks56",
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: "Negroni",
        imageURL:
          "https://cdn.liquor.com/wp-content/uploads/2018/05/08110806/negroni-720x720-recipe.jpg",
        ingredients: "20ml Gin, 20ml Campari, 20ml Sweet vermouth",
        method: "Stirred",
        garnish: "Orange wedge",
        author: "John12",
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: "Margarita",
        imageURL:
          "https://shake-that.com/wp-content/uploads/2015/07/Margarita-780x780.jpg",
        ingredients: "35ml Tequila, 20ml Cointreau, 15ml lime juice",
        method: "Shaken",
        garnish: "Sugar rim/lime wheel",
        author: "marcel123",
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: "Piña Colada",
        imageURL:
          "https://d1u8lt4eqehkou.cloudfront.net/wp-content/uploads/easy-pina-colada-recipe.jpg",
        ingredients:
          "25ml White Rum, 25ml Coconut Rum, 15ml double cream, 10ml lime juice, 10ml gomme syrup, 50ml pineapple juice",
        method: "Shaken",
        garnish: "Cocktail cherry and a pineapple piece",
        author: "marcel123",
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: "Caipirinha",
        imageURL:
          "https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcT0gLdx4fqYKSPrfV7cwmgMkN5YEG5Wp4P1DWdkR3L2NK6r5PeK",
        ingredients: "50ml Cachaca, 6 lime wedges, 2tsp brown sugar",
        method: "Muddle limes with brown sugar",
        garnish: "Lime wedge",
        author: "TomHanks56",
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: "Dark & Stormy",
        imageURL:
          "https://hips.hearstapps.com/hmg-prod.s3.amazonaws.com/images/refreshing-dark-and-stormy-cocktail-royalty-free-image-1581678927.jpg?crop=0.518xw:0.777xh;0.230xw,0.184xh&resize=480:*",
        ingredients: "50ml Dark Rum, 100ml ginger beer, 10ml lime juice",
        method: "Pour directly to the glass",
        garnish: "Lime wedges",
        author: "John12",
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: "Woo Woo",
        imageURL:
          "https://images-na.ssl-images-amazon.com/images/G/02/aplusautomation/vendorimages/6ae108d2-c379-44f1-8fac-b56daae4ee76.jpg._CB524320915__SL300__.jpg",
        ingredients: "40ml Vodka, 10ml Peach Schnapps 150ml cranberry juice",
        method: "Pour directly to the glass",
        garnish: "Lime wedge & strawberry",
        author: "John12",
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ]);
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete("cocktails", null, {});
  }
};
