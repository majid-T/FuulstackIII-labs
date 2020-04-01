//Exercise1:
//Part 1. Use the seed data script
// DONE!

// Part 2 :getting all data in collection
db.getCollection("Restaurants").find({})

// Part 3: Change the result set from tree view to tabular view, by click the following button on right toolbar.
// DONE!

// Exercise 2:  Projections, Query and Sorting
// Part 1:
db.getCollection("Restaurants").find({"cuisine" : "Japanese"})

// Part 2: finding by creiteria
db.getCollection("Restaurants").find({"cuisine" : "Japanese"},
    {"cuisine":1,"name":1})

// Part 3: sorting
db.getCollection("Restaurants").find(
    {"cuisine" : "Japanese"},
    {"cuisine":1,"name":1}
    ).sort({"name":-1})

// Task : ------------->
db.Restaurants.find(
 {"cuisine": { $eq: "Japanese" } },
 {"id":1,"cuisine":1,"name":1,"city":1,"restaurant_id":1})

// Exercise 3:  Logical and Comparison Operators
db.getCollection("Restaurants").find(
    { "cuisine": {$eq: "Delicatessen"},"city":{$ne:"Brooklyn"} },
    {"cuisine":1,"name":1,"city":1}
    ).sort({"name":1})

//Exercise 4:  Multiple Operators
// Task ----------->
db.Restaurants.find(
    {"cuisine":{$in:["Bakery", "Chicken", "Hamburgers", "American"]},
        "city":{$ne:"Brooklyn"},
        "restaurant_id":{$gt:"4000000",$exists: true}},
        {"cuisine":1,"name":1,"city":1,"restaurant_id":1}
).sort({"restaurant_id":-1})

//Exercise 5:  Filtering on Array Columns
// Task -------->
db.getCollection("Restaurants").find(
    {$or:[{"name": /.*Thai.*/},{"address.street":/.*Street.*/},{"address.zipcode":/.*17988.*/}]}
)
