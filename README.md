# An API of Ice and Fire

This repository will allow the user to access a database of structured
information about the Song of Ice and Fire book series. Inspired by Joakim
Skoog's [An API of Ice and Fire][aaoiaf], this repository sets to create a
graph database of the relationships between different entities in the series. We
intend to match the data found in [Skoog's API][aaoiaf], solely from algorithms
for the first version of this application program interface (API).

## Goals

*   Given the books, create a database with algorithms.
*   Allow access to the database content through an API.

## Potential API

### Book: [Schema][schema-book], [DBPedia][dbp-book]

| Name            | Type               | Description                                       |
| --------------- | ------------------ | ------------------------------------------------- |
| url             | URL                | The hypermedia URL of this book                   |
| slug            | Text               | A unique identifier following [these rules][slug] |
| name            | Text               | The name of this book                             |
| isbn            | Text               | The ISBN of the book                              |
| author          | Person             | The author of the book                            |
| numberOfPages   | Integer            | The number of pages in this book                  |
| publisher       | Agent              | The company that published this book              |
| locationCreated | Place              | The location which this book was published in     |
| bookFormat      | BookFormatType     | The type of format this book was released in.     |
| releasedEvent   | PublicationEvent   | The place and time the release was issued         |
| character       | FictionalCharacter | Fictional person in this book                     |

### Character [Schema][person], [DBPedia][fictional-character]

| Name         | Type               | Description                                       |
| ------------ | ------------------ | ------------------------------------------------- |
| url          | URL                | The hypermedia URL of this character              |
| slug         | Text               | A unique identifier following [these rules][slug] |
| givenName    | Text               | The first name of the character                   |
| familyName   | Text               | The last name of the character                    |
| gender       | Text               | Gender of the character                           |
| birthDate    | Date               | Date of birth                                     |
| birthPlace   | Place              | The place where the character is born             |
| deathDate    | Date               | Date of death                                     |
| deathPlace   | Place              | The place where the character died                |
| titles       | Text               | The titles that this character holds              |
| altenateName | Text               | The aliases that this character goes by           |
| parent       | FictionalCharacter | A parent of this character                        |
| spouse       | FictionalCharacter | This character's spouse                           |
| memberOf     | Organization       | The House this character is a member of           |
| book         | Book               | The Book this character is in                     |

### House [Schema][organization], [DBPedia][group]

| Name            | Type               | Description                                       |
| --------------- | ------------------ | ------------------------------------------------- |
| url             | URL                | The hypermedia URL of this house                  |
| slug            | Text               | A unique identifier following [these rules][slug] |
| name            | Text               | The name of this house                            |
| location        | Place              | The region that this house resides in             |
| coatOfArms      | Text               | Text describing the coat of arms of this house    |
| houseWords      | Text               | The words of this house                           |
| currentLord     | FictionalCharacter | The house's current lord                          |
| heir            | FictionalCharacter | The house's heir                                  |
| overlord        | House              | The house this house answers to                   |
| foundingDate    | Date               | The year that this house was founded              |
| founder         | FictionalCharacter | The character who founded this house              |
| dissolutionDate | Date               | The year that this house died out                 |
| ancestralWeapon | Weapon             | The noteworthy weapon that this house owns        |
| cadetBranch     | House              | The house that was founded from this house        |
| swornMember     | FictionalCharacter | The character that are sworn to this house        |

[aaoiaf]: https://anapioficeandfire.com/ "An API of Ice and Fire"
[schema-book]: http://schema.org/Book "Schema: Book"
[dbp-book]: http://mappings.dbpedia.org/server/ontology/classes/Book "DBPedia: Book"
[slug]: http://patterns.dataincubator.org/book/url-slug.html "URL Slug"
[person]: http://schema.org/Person "Schema: Person"
[fictional-character]: http://mappings.dbpedia.org/server/ontology/classes/FictionalCharacter "DBPedia: Fictional Character"
[organization]: http://schema.org/Organization "Schema: Organization"
[group]: http://mappings.dbpedia.org/server/ontology/classes/Group "DBPedia: Group"
