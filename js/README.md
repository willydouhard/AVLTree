API
===========

```
// create empty tree
const tree = new AVLTree();

// create tree from array
const tree2 = new AVLTree([2, 10, 5, 20, 6, 18]);

// insertion
tree.insert(4);

// lookup
tree.search(4) //output the node it found or false

// deletion
tree.remove(4);

// comparison
tree.compareAgainst(tree2) //output false
```
Test
-------
`npm install -g mocha`
`cd AVLTree/js`
`npm test`
