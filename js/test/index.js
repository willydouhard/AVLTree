'use strict';

const assert = require('assert');
const AVLTree = require('../avl_tree');

describe('AVLTree', () => {

    it('can create a tree from an array', ()=> {
        const tree = new AVLTree([1,2,5,6]);
        assert.equal(tree.root.height, 3);
    })

    it('can insert a value', ()=> {
        const tree = new AVLTree([1]);
        tree.insert(2);
        assert.equal(tree.root.height, 1);
    })

    it('can remove a value', ()=> {
        const tree = new AVLTree([2, 1]);
        tree.remove(2);
        assert.equal(tree.root.height, 0);
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

    it('can siftdown and remove a node', ()=> {
        const tree = new AVLTree([1, 10, 15, 8, 40]);
        assert.equal(tree.root.rightHeight, 2);
        tree.siftDown(tree.root);
        assert.equal(tree.root.val, 15);
        assert.equal(tree.root.right.val, 40);
        assert.equal(tree.root.rightHeight, 1);
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
