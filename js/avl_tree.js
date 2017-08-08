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
        return (this.left) ? this.left.height : - 1;
    }

    get rightHeight() {
        return (this.right) ? this.right.height : - 1;
    }

    get filiation() {
        if(!this.parent) return false;

        else if(this.parent.right === this) return 'right';
        else if(this.parent.left === this) return 'left';
    }

    computeHeight() {
        this.height = Math.max(this.leftHeight, this.rightHeight) + 1;
    }

    bottomUp(...fns) {
        for(let fn of fns) {
            fn.apply(this);
        }
        if(this.parent) {
            this.parent.bottomUp(fns);
        }
    }

    siftDown() {
        let target;
        if(this.right) target = this.right;
        else if(this.left) target = this.left;
        if(target) {
            [this.val, target.val] = [target.val, this.val];
            return target.siftDown();
        } else return this;
    }

    remove() {
        const filiation = this.filiation;
        if(filiation) {
            const parent = this.parent;
            parent[filiation] = null;
            parent.bottomUp(this.computeHeight, this.balance);
        }
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

    balance() {
        if(this.isBalanced()) return true;
        if(this.leftHeight > this.rightHeight) {
            if(this.left.rightHeight > this.left.leftHeight) {
                // LR
                this.left.right.rotateRR();
            }
            this.left.rotateLL();
        } else if(this.rightHeight > this.leftHeight) {
            if(this.right.leftHeight > this.right.rightHeight) {
                // RL
                this.right.left.rotateLL();
            }
            this.right.rotateRR();
        }
    }

    isBalanced() {
        const delta = this.leftHeight - this.rightHeight;
        return delta >= -1 && delta <= 1;
    }
}

class AVLTree {
    constructor(arr) {
        this.root = null;

        if(arr instanceof Array) {
            for(let entry of arr) {
                this.insert(entry);
            }
        }
    }

    insert(val, root) {
        if(!this.root) {
            this.root = new Node(null, val);
            return this.root;
        }
        root = (root) ? root : this.root;
        if(root.val === val) return false;

        const target = (val < root.val) ? 'left' : 'right';
        if(root[target]) {
            const res = this.insert(val, root[target]);
            if(res) {
                root.computeHeight();
                root.balance();
            }
            return res;
        }
        else {
            root[target] = new Node(root, val);
            root.computeHeight();
            return root[target];
        }
    }

    search(val, root) {
        if(!this.root) return false;
        root = (root) ? root : this.root;
        if(root.val === val) return root;

        return (val < root.val && root.left) ? this.search(val, root.left) :
               (val > root.val && root.right) ? this.search(val, root.right) : false;
    }

    remove(val) {
        const node = this.search(val);
        if(!this.root.height && node === this.root) return this.root = null;
        if(!node) return false;
        else {
            const leaf = node.siftDown();
            leaf.remove();
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
