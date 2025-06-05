/* 
Implement an in-memory search engine where multiple documents could  be stored under a particular namespace and 
search on them and sort the  search results by passing the orderBy parameter.

Example ->

const searchEngine = new InMemorySearch();
searchEngine.addDocuments('Movies', 
                    {name: 'Avenger', rating: 8.5, year: 2017}, 
                    {name: 'Black Adam', rating: 8.7, year: 2022}, 
                    {name: 'Jhon Wick 4', rating: 8.2, year: 2023}, 
                    {name: 'Black Panther', rating: 9.0, year: 2022}
                   );
console.log(searchEngine.search('Movies', (e) => e.rating > 8.5, {key: 'rating', asc: false}));


[
  {
    "name": "Black Panther",
    "rating": 9,
    "year": 2022
  },
  {
    "name": "Black Adam",
    "rating": 8.7,
    "year": 2022
  }
]
*/

/* self-attempt */
class InMemorySearch  {
     nsList = {}
     addDocuments = (nsName, ...nsEntries) => {
        //insert nsName and add all the entries to it's correspondense
        this.nsList[nsName] = {...this.nsList[nsName], ...nsEntries};
        console.log('addDocuments() was fucking called')
        console.log("nsList currently -> ", this.nsList);

    }

    search = (ns, comparator, criteria) => {

    }

    printNsList = () => {
        console.log("nsList currently -> ", this.nsList);
    }
}

const searchInstance = new InMemorySearch();
searchInstance.printNsList();
searchInstance.addDocuments('Movies', 
                    {name: 'Avenger', rating: 8.5, year: 2017}, 
                    {name: 'Black Adam', rating: 8.7, year: 2022}, 
                    {name: 'Jhon Wick 4', rating: 8.2, year: 2023}, 
                    {name: 'Black Panther', rating: 9.0, year: 2022}
                   );
// searchInstance.printNsList();
searchInstance.addDocuments('Movies', 
                    {name: 'Avenger1', rating: 8.5, year: 2017}, 
                    {name: 'Black Adam', rating: 8.7, year: 2022}, 
                    {name: 'Jhon Wick 4', rating: 8.2, year: 2023}, 
                    {name: 'Black Panther', rating: 9.0, year: 2022}
                   );
/* self-attempt-end */

/* solution */

class inMemSE {
  constructor() {
    this.entries = new Map();
  }

  registerEntry = (entry) => {
    if(!this.entries.get(entry))
    this.entries.set(entry, []);
  }

  addDocs = (ns, ...entry) => {
    if(!this.entries.get(ns)){
      this.entries.set(ns, [...entry]);
    } else {
      const currEntry = this.entries.get(ns);
      this.entries.set(ns, [...currEntry, ...entry]);
    }

  }

  search = (ns, cbFn, oby) => {
    
  }
}
                   
