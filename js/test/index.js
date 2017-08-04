'use strict';

const assert = require('assert');
const AVLTree = require('../avl_tree');

describe('AVLTree', () => {

    it('can insert a value', ()=> {
        const tree = new AVLTree();
        tree.insert(2);
        tree.insert(4);
        assert.equal(tree.root.height, 1);
    })

    it('can create a tree from an array', ()=> {
        const tree = new AVLTree([1,2,5,6]);
        assert.equal(tree.root.height, 3);
    })

    it('cannot contain the same value twice', ()=> {
        const tree = new AVLTree([2, 10, 5, 20, 6, 18]);
        assert.equal(tree.root.height, 5);
        tree.insert(18);
        assert.equal(tree.root.height, 5);
    })

    it('can siftdown a value', ()=> {
        const tree = new AVLTree([1, 10, 15, 8, 40]);
        tree.siftDown(tree.root);
        assert.equal(tree.root.val, 15);
        assert.equal(tree.root.right.val, 40);
    })

    it('can remove a value', ()=> {
        const tree = new AVLTree([2, 1]);
        tree.remove(2);
        assert.equal(tree.root.height, 0);
        tree.remove(1);
        assert.equal(tree.root, null);
    })

    it('can search for a value', ()=> {
        const tree = new AVLTree([1, 10, 15]);
        assert.equal(tree.search(10).val, 10);
        assert.equal(tree.search(20), false);
    })

    it('can compare two trees', ()=> {
        const tree1 = new AVLTree([1, 10, 15]);
        const tree2 = new AVLTree([1, 10, 15]);
        const tree3 = new AVLTree([1, 10, 12]);

        assert.equal(tree1.compareAgainst(tree2), true);
        assert.equal(tree1.compareAgainst(tree3), false);
    })

    it('can auto perform a Right Left and a Right Right rotation', ()=> {
        const tree = new AVLTree([1, 10, 9]);
        assert.equal(tree.root.left.val, 1);
        assert.equal(tree.root.val, 9);
        assert.equal(tree.root.right.val, 10);
        assert.equal(tree.root.height, 2);
    })

    it('can auto perform a Left Right and a Left Left rotation', ()=> {
        const tree = new AVLTree([10, 4, 6]);
        assert.equal(tree.root.left.val, 4);
        assert.equal(tree.root.val, 6);
        assert.equal(tree.root.right.val, 10);
        assert.equal(tree.root.height, 2);
    })

})
