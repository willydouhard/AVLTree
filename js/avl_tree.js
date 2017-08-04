'use strict';

class Node {
    constructor(parent, val) {
        this.parent = parent;
        this.val = val;
        this.left = null;
        this.right = null;
        this.height = 0;
    }

    get leftHeight() {
        return (this.left) ? this.left.height + 1 : - 1;
    }

    get rightHeight() {
        return (this.right) ? this.right.height + 1 : - 1;
    }

    get filiation() {
        if(!this.parent) return false;

        else if(this.parent.right === this) return 'right';
        else if(this.parent.left === this) return 'left';
    }

    computeHeight() {
        this.height = Math.max(0, this.rightHeight) + Math.max(0, this.leftHeight);
    }

    rotateLL() {
        const root = this.parent;
        if(!root) return false;
        const tempRight = root.right;
        // invert values
        [root.val, this.val] = [this.val, root.val];
        // invert links
        [root.right, root.left] = [this, this.left];
        if(root.left) root.left.parent = root;
        // restoring right node links
        this.left = this.right;
        this.right = tempRight;

        this.computeHeight();
        root.computeHeight();
    }

    rotateRR() {
        const root = this.parent;
        if(!root) return false;
        const tempLeft = root.left;
        // invert values
        [root.val, this.val] = [this.val, root.val];
        // invert links
        [root.left, root.right] = [this, this.right];
        if(root.right) root.right.parent = root;
        // restoring left node links
        this.right = this.left;
        this.left = tempLeft;

        this.computeHeight();
        root.computeHeight();
    }

    remove() {
        this.decrementParentsHeight(this.parent);
        const filiation = this.filiation;
        if(filiation) this.parent[filiation] = null;
    }

    decrementParentsHeight(root) {
        if(root) root.height = Math.max(0, root.height - 1);
        if(root.parent) this.decrementParentsHeight(root.parent);
    }

    isBalanced() {
        const delta = this.leftHeight - this.rightHeight;
        return delta >= -1 && delta <= 1;
    }
}

class AVLTree {
    constructor(arr) {
        this.root = null;

        for(let entry of arr) {
            this.insert(entry);
        }
    }

    insert(val, root) {
        if(!this.root) return this.root = new Node(null, val);
        root = (root) ? root : this.root;
        root.height += 1;
        const target = (val < root.val) ? 'left' : 'right';
        if(root[target]) {
            this.insert(val, root[target]);
            if(!root.isBalanced()) this.balance(root);
        }
        else root[target] = new Node(root, val);
    }

    search(val, root) {
        if(!this.root) return false;
        root = (root) ? root : this.root;
        if(root.val === val) return root;

        return (val < root.val && root.left) ? this.search(val, root.left) :
               (val > root.val && root.right) ? this.search(val, root.right) : false;
    }

    siftDown(root) {
        let target;
        if(root.right) target = root.right;
        else if(root.left) target = root.left;

        if(target) {
            root.val = target.val;
            root.height = target.height;
            this.siftDown(target);
        } else if(root.parent) root.remove();
    }

    remove(val) {
        const node = this.search(val);
        if(!node) return false;
        else {
            this.siftDown(node);
            return true;
        }
    }

    balance(root) {
        if(root.leftHeight > root.rightHeight) {
            if(root.left.rightHeight > root.left.leftHeight) {
                // LR
                root.left.right.rotateRR();
            }
            root.left.rotateLL();
        } else if(root.rightHeight > root.leftHeight) {
            if(root.right.leftHeight > root.right.rightHeight) {
                // RL
                root.right.left.rotateLL();
            }
            root.right.rotateRR();
        }
    }

    compare(root1, root2) {
        if(!root1 && !root2) return true;
        else if(!root1 || !root2) return false;
        else if(root1.val !== root2.val || root1.height !== root2.height) return false;
        else return this.compare(root1.left, root2.left) && this.compare(root1.right, root2.right);
    }

    compareAgainst(tree) {
        return this.compare(this.root, tree.root);
    }
}

module.exports = AVLTree;
