# MongoDB Introduction
MongoDB is an open-source document database that provides high performance, high availability, and automatic scaling. With MongoDB, there is no need for an Object Relational Mapping (ORM) to facilitate development.

## Documents
A record in MongoDB is called a document which is data structure composed of field-and-value pairs. MongoDB stores data records as BSON documents. BSON is a binary representation of JSON documents, though it contains more data types than JSON.

The value of a field can be any of the BSON data types, including other documents, arrays, and arrays of documents. For example, the following document contains values of varying types:


```
{
   "_id": ObjectId("5099803df3f4948bd2f98391"),
   "name": { "first": "Alan", "last": "Turing" },
   "birth": new Date('Jun 23, 1912'),
   "death": new Date('Jun 07, 1954'),
   "contribs": [ "Turing machine", "Turing test", "Turingery" ],
   "views" : NumberLong(1250000)
}
```

Above fields have the following data types:

- `_id` holds an ObjectId.
- `name` holds an embedded document that contains the fields first and last.
- `birth` and `death` hold values of the Date type.
- `contribs` holds an array of strings.
- `views` holds a value of the NumberLong type.

## Collections

MongoDB stores documents in collections. Collections are analogous to tables in relational databases. Unlike a table, however, a collection does not require its documents to have the same schema.

In MongoDB, documents stored in a collection must have a unique `_id` field that acts as a primary key.  If the `_id` field is unspecified in the documents, MongoDB uses `ObjectId` as the default value for the `_id` field; i.e. if a document does not contain a top-level `_id` field during an insert, the MongoDB driver adds the `_id` field that holds an `ObjectId`.

`ObjectId` is small, likely unique, fast to generate, and ordered. `ObjectId` values consists of 12-bytes, where the first four bytes are a timestamp that reflect the `ObjectId`’s creation, specifically:

- a 4-byte value representing the seconds since the Unix epoch,
- a 3-byte machine identifier,
- a 2-byte process id, and
- a 3-byte counter, starting with a random value.

## Installation

To install MongoDB on Mac:

```sh
brew update && brew install mongodb
```

To install MongoDB on Windows, [download the installer](https://www.mongodb.com/download-center#community)

## MongoDB Shell
The `mongo` shell is an interactive JavaScript interface to MongoDB and is a component of the MongoDB package. You can use the `mongo` shell to query and update data as well as perform administrative operations.

### Start `mongo`
To start `mongo` shell:

On Mac:
```sh
mongo
```

On Windows:
```sh
mongo.exe
```

Once in `mongo` shell, you can get a list of available commands by typing `help`.

## Create a Database
To create a database:

```
use blogger
```

This will switch to a new database called `blogger`.  Note that if you exit and do not create any collections in this database, it will not be created.

## Insert Data
You can use one of the three insert methods to add documents to a collection in MongoDB. If you attempt to add documents to a collection that does not exist, MongoDB will create the collection for you.

The three methods are:

- `db.collection.insertOne()`
- `db.collection.insertMany()`
- `db.collection.insert()`

### `db.collection.insertOne()`
This method inserts one document in the collection:

```
db.posts.insertOne({
  title: 'Post 1 Title',
  body: 'Post 1 Body',
  authors: ['Jack', 'Tim'],
  likes: 10,
  comments: [
    {
      commenter: 'John Doe',
      body: 'Comment 1 Body'
    },
    {
      commenter: 'Jane Doe',
      body: 'Comment 2 Body'
    }
  ]
})
```

The method returns a document with the status of the operation:

```
{
   "acknowledged" : true,
   "insertedId" : ObjectId("5742045ecacf0ba0c3fa82b0")
}
```

### `db.collection.insertMany()`
This method inserts multiple documents in the collection:

```
db.posts.insertMany([{
  title: 'Post 2 Title',
  body: 'Post 2 Body',
  authors: ['Tim', 'Joe'],
  likes: 20,
  comments: [
    {
      commenter: 'John Doe',
      body: 'Comment 1 Body'
    },
    {
      commenter: 'Jane Doe',
      body: 'Comment 2 Body'
    }
  ]
},
{
  title: 'Post 3 Title',
  body: 'Post 3 Body',
  likes: 30,
  authors: ['Miki', 'Eli'],
  comments: [
    {
      commenter: 'John Doe',
      body: 'Comment 1 Body'
    },
    {
      commenter: 'Jane Doe',
      body: 'Comment 2 Body'
    }
  ]
}])
```

The method returns a document with the status of the operation:
```
{
	"acknowledged" : true,
	"insertedIds" : [
		ObjectId("57a2c503c93f03d66292c428"),
		ObjectId("57a2c503c93f03d66292c429")
	]
}
```

### `db.collection.insert()`
This method inserts a single document or multiple documents into a collection. To insert a single document, pass a document to the method; to insert multiple documents, pass an array of documents to the method.

Single document:

```
db.posts.insert({
  title: 'Post 4 Title',
  body: 'Post 4 Body',
  likes: 40,
  authors: ['Brian', 'Carl'],
  comments: [
    {
      commenter: 'John Doe',
      body: 'Comment 1 Body'
    },
    {
      commenter: 'Jane Doe',
      body: 'Comment 2 Body'
    }
  ]
})
```

The method returns a `WriteResult` object with the status of the operation.

```
WriteResult({ "nInserted" : 1 })
```

Multiple documents:

```
db.posts.insert([{
  title: 'Post 5 Title',
  body: 'Post 5 Body',
  likes: 50,
  authors: ['Rich', 'Jen'],
  comments: [
    {
      commenter: 'John Doe',
      body: 'Comment 1 Body'
    },
    {
      commenter: 'Jane Doe',
      body: 'Comment 2 Body'
    }
  ]
},
{
  title: 'Post 6 Title',
  body: 'Post 6 Body',
  likes: 60,
  authors: ['Sarah', 'Rachel'],
  comments: [
    {
      commenter: 'John Doe',
      body: 'Comment 1 Body'
    },
    {
      commenter: 'Jane Doe',
      body: 'Comment 2 Body'
    }
  ]
}])
```

The method returns a `BulkWriteResult ` object with the status of the operation.

```
BulkWriteResult({
	"writeErrors" : [ ],
	"writeConcernErrors" : [ ],
	"nInserted" : 2,
	"nUpserted" : 0,
	"nMatched" : 0,
	"nModified" : 0,
	"nRemoved" : 0,
	"upserted" : [ ]
})
```

## Query Documents
MongoDB provides the `db.collection.find()` method to read documents from a collection.

Syntax:
```
db.collection.find( <query filter>, <projection> )
```

Where:

- `query filter`: an optional parameter that specifies which documents to return.  
- `projection`: an optional parameter that specifies which fields from the matching documents to return. The projection limits the amount of data that MongoDB returns to the client over the network.

Let's look at some example queries:

### Select all
Omitting a query filter document returns all documents in that collection:

Example:
```
db.posts.find()
```

### Equality Condition
A query filter document can specify equality condition with `<field>`:`<value>` expressions to select all documents that contain the `<field>` with the specified `<value>`.

Example:
```
db.posts.find({ title: 'Post 1 Title' })
```

### Conditions Using Query Operators
A query filter document can use the query operators to specify conditions in the following form:

```
{ <field1>: { <operator1>: <value1> }, ... }
```

`$in` operator example:
```
db.posts.find( { title: { $in: [ "Post 1 Title", "Post 2 Title" ] } } )
```

Although you can express this query using the `$or` operator, use the `$in` operator rather than the `$or` operator when performing equality checks on the same field.

### AND Condition
Separating multiple query filters by a comma indicates an AND condition.

Example:
```
db.posts.find( { title: "Post 1 Title", likes: { $lt: 20 } } )
```

### OR Condition
Using the `$or` operator, you can specify a compound query that joins each clause with a logical OR.

Example:
```
db.posts.find( { $or: [ { title: "Post 1 Title" }, { likes: { $lt: 30 } } ] } )
```

## Query on Embedded Documents
When the field holds an embedded document, a query can either specify an exact match on the embedded document or specify a match by individual fields in the embedded document using dot notation.

### Exact Match
To specify an exact equality match on the whole embedded document, use the query document `{ <field>: <value> }` where `<value>` is the document to match. Equality matches on an embedded document require an exact match of the specified `<value>`, including the field order.

Example:
```
db.posts.find({ comments: { commenter: "Jane Doe", body: "Comment 2 Body" } })
```

### Equality Match on Fields
Use the dot notation to match by specific fields in an embedded document.

Example:
```
db.posts.find({ "comments.commenter": "Jane Doe" })
```

## Query on Arrays
When the field holds an array, you can query for an exact array match or for specific values in the array. If the array holds embedded documents, you can query for specific fields in the embedded documents using dot notation.

### Exact Match on an Array
To specify equality match on an array, use the query document { `<field>`: `<value>` } where `<value>` is the array to match. Equality matches on the array require that the array field match exactly the specified `<value>`, including the element order.

Example
```
db.posts.find( { authors: [ "Rich", "Jen" ] } )
```

### Match an Array Element
Equality matches can specify a single element in the array to match. These match if the array contains at least one element with the specified value.

Example
```
db.posts.find( { authors: "Tim" } )
```

## Updating Documents
You can use one of the three update methods to update documents in a collection in MongoDB:

- `db.collection.updateOne()`
- `db.collection.updateMany()`
- `db.collection.update()`

### `db.collection.updateOne()`
Modifies a single document within the collection based on the filter.

Syntax
```
db.collection.updateOne(
   <filter>,
   <update>,
   {
     upsert: <boolean>
   }
)
```

Where:

- `filter`: the selection criteria for the update, same query selectors as `find` apply here.
- `update`: the modifications to apply. Use Update Operators such as `$set`, `$unset`, or `$rename`.
- `upsert`: when true, the method will either:
  - Creates a new document if no documents match the filter.
  - Updates documents that match the filter.

Example:
```
db.posts.updateOne(
    { title: 'Post 1 Title' },
    { $set: { likes: 11 } }
)
```

The operation returns:

```
{ "acknowledged" : true, "matchedCount" : 1, "modifiedCount" : 1 }
```

If no matches were found, the operation instead returns:

```
{ "acknowledged" : true, "matchedCount" : 0, "modifiedCount" : 0 }
```

Setting `upsert: true` would insert the document if no match was found and return:

```
{
   "acknowledged" : true,
   "matchedCount" : 0,
   "modifiedCount" : 0,
   "upsertedId" : ObjectId("5742045ecacf0ba0c3fa82b0")
}
```

### `db.collection.updateMany()`
Modifies multiple documents within the collection based on the filter.

Syntax
```
db.collection.updateMany(
   <filter>,
   <update>,
   {
     upsert: <boolean>
   }
)
```

Where:

- `filter`: the selection criteria for the update, same query selectors as `find` apply here.
- `update`: the modifications to apply. Use Update Operators such as `$set`, `$unset`, or `$rename`.
- `upsert`: when true, the method will either:
  - Creates a new document if no documents match the filter.
  - Updates documents that match the filter.

Example:
```
db.posts.updateMany(
    { authors: "Tim" },
    { $set: { likes: 11 } }
)
```

The operation returns:

```
{ "acknowledged" : true, "matchedCount" : 2, "modifiedCount" : 2 }
```

If no matches were found, the operation instead returns:

```
{ "acknowledged" : true, "matchedCount" : 0, "modifiedCount" : 0 }
```

Setting `upsert: true` would insert the document if no match was found and return:

```
{
   "acknowledged" : true,
   "matchedCount" : 0,
   "modifiedCount" : 0,
   "upsertedId" : ObjectId("5742045ecacf0ba0c3fa82b0")
}
```

### `db.collection.update()`
Modifies an existing document or documents in a collection. It takes the same parameters as the other two update methods.

## Deleting Documents

### `db.collection.remove()`
Removes one or more documents from a collection.

Syntax
```
db.collection.remove(
   <query>,
   {
     justOne: <boolean>
   }
)
```

Where:

- `query`: specifies deletion criteria using query operators. To delete all documents in a collection, pass an empty document ({}).
- `justOne`: to limit the deletion to just one document, set to true. Omit to use the default value of false and delete all documents matching the deletion criteria.  This parameter is optional.

Example
```
db.posts.remove({ likes: { $lt: 12 } })
```

The operation returns:

```
WriteResult({ "nRemoved" : 3 })
```

## Database References
MongoDB does not support joins. In MongoDB some data is denormalized, or stored with related data in documents to remove the need for joins. However, in some cases it makes sense to store related information in separate documents, typically in different collections or databases.

MongoDB applications use one of two methods for relating documents:

- Manual references
- DBRefs

### Manual References
Manual references are where you save the `_id` field of one document in another document as a reference. Then your application can run a second query to return the related data. These references are simple and sufficient for most use cases.

Example:
```
> db.users.insertOne({
...    firstName: 'Jack',
...    lastName: 'Doe'
...})

{
	"acknowledged" : true,
	"insertedId" : ObjectId("57a35b3dc93f03d66292c440")
}

> db.posts.insertOne({
...  title: 'My Adventure',
...  body: 'I had a great adventure',
...  author_id: ObjectId("57a35b3dc93f03d66292c440"),
...  likes: 10
...})
```

Then, when a query returns the document from the `posts` collection you can, if needed, make a second query for the document referenced by the `author_id` field in the `posts` collection.

For nearly every case where you want to store a relationship between two documents, use manual references. The references are simple to create and your application can resolve references as needed.

## Data Modeling
Data in MongoDB has a flexible schema. Unlike SQL databases, where you must determine and declare a table’s schema before inserting data, MongoDB’s collections do not enforce document structure. This flexibility facilitates the mapping of documents to an entity or an object. Each document can match the data fields of the represented entity, even if the data has substantial variation. In practice, however, the documents in a collection share a similar structure.

MongoDB has a great article on [Data Model Design](https://docs.mongodb.com/manual/core/data-model-design/) considerations that outlines when you should use Embedded Data Models vs Normalized Data Models.
