var EventEmitter = require('events').EventEmitter;
var EventProxy = require('eventproxy');
var _db = null;

var Neo = module.exports = function Neo(db) {
  _db = db;
};

Neo.prototype.__proto__ = EventEmitter.prototype;


var createRelationship = function (node_a, node_b, rType, cb) {
  var property = {createTime: new Date().getTime(), fromUserId: node_a.data.userId, targetId: node_b.data.userId};
  property.fromNodeId = node_a.id;
  property.targetNodeId = node_b.id;

  node_a.createRelationshipTo(node_b, rType, property, function (err, rel) {
    if (!!err) {
      return cb(err);
      _
    } else {
      rel.index('index_rel_' + rType, rType, node_a.data.userId + '->' + node_b.data.userId, function (err) {
        return cb(err);
      });
    }
  });
};

var getRelationshipByNode = function (node, rType, cb) {
  node.getRelationships([rType], function (err, results) {
    return cb(err, results);
  });
};

var getRelationshipByIndex = function (indexName, indexProperty, indexValue, cb) {
  _db.getIndexedRelationship(indexName, indexProperty, indexValue, function (err, rel) {
    return cb(err, rel)
  });
};

var getRelationshipNodes = function (node, rType, rDirection, cb) {
  node.getRelationshipNodes({type: rType, direction: rDirection}, function (err, results) {
    return cb(err, results);
  });
};

var deleteRelationship = function (relationship, cb) {
  //var sql = "start n = node:index_user(user_node='h1910') match n-[r]->all where r.r='79015->82250' delete r";
  relationship.delete(function (err) {
    return err;
  });
};

var createNode = function (nodeProperty, indexName, indexProperty, indexValue, cb) {
  var currentNode = _db.createNode(nodeProperty);
  currentNode.save(function (err, node) {
    if (!!err) {
      return cb(err);
    } else {
      node.index("index_node_" + indexName, indexProperty, indexValue, function (err) {
        if (!!err) {
          return cb(err);
        } else {
          return cb(err, node);
        }
      });
    }
  });

};


var getNode = function (indexName, indexProperty, indexValue, cb) {
  _db.getIndexedNode('index_node_' + indexName, indexProperty, indexValue, function (err, node) {
    if (!!err) {
      return cb(err)
    } else {
      return cb(err, node);
    }
  });
};

var createMessage = Neo.prototype.createMessage = function (nodeProperty, indexName, indexProperty, indexValue, cb) {
  createNode(nodeProperty, indexName, indexProperty, indexValue, function (err, node) {
    return cb(err, node);
  });
};


Neo.prototype.createUser = function (nodeProperty, indexName, indexProperty, indexValue, cb) {
  createNode(nodeProperty, indexName, indexProperty, indexValue, function (err, node) {
    return cb(err, node);
  });
};

Neo.prototype.getUser = function (indexName, indexProperty, indexValue, cb) {
  getNode(indexName, indexProperty, indexValue, function (err, node) {
    return cb(err, node)
  });
};


Neo.prototype.getMessage = function (indexName, indexProperty, indexValue, cb) {
  getNode(indexName, indexProperty, indexValue, function (err, node) {
    return cb(err, node)
  });
};


Neo.prototype.follow = function (node_a, node_b, rType, cb) {
  createRelationship(node_a, node_b, rType, function (err) {
    return cb(err);
  });
};


Neo.prototype.unFollow = function (node_a, node_b, rType, cb) {
//  _db.query("start r = relationship:user_follow(user_follow='" + node_a.id + '->' + node_b.id + "') delete r;", function(err ,result){
//    return cb(err);
//  });

  _db.getIndexedRelationship('index_rel_' + rType, rType, node_a.data.userId + '->' + node_b.data.userId, function (err, result) {
    if (!!err) {
      return cb(err);
    } else {
      result.delete(function (err) {
        return cb(err)
      })
    }
  });
};

Neo.prototype.getRelationshipNodes = function (nodeFrom, rType, direction, cb) {
  nodeFrom.getRelationshipNodes([
    {rType: rType, direction: direction}
  ], function (err, node) {
    return cb(err, node);
  });
};

Neo.prototype.getOutRel = function (node, rType, cb) {
  // start n = xxx n<-[r:rType]-x return r;
  node.outgoing(rType, function (err, result) {
    return cb(err, result);
  });
};


Neo.prototype.getInRel = function (node, rType, cb) {
  // start n = xxx n-[r:rType]->x return r;
  node.incoming(rType, function (err, result) {
    return cb(err, result);
  });
};
Neo.prototype.receiveNotice = function (userId, rType, cb) {
  var sql = "start n = node:abc(x='') n-[r:]-[r1:]->msg return n.name, msg";
  _db.query(sql, function (err, result) {

  });
};

Neo.prototype.sendNotice = function (fromNode, message, rType, cb) {
  var ep = EventProxy.create("hadNode", "hadMessage", function (nodeObj, messageObj) {
    if ((!!nodeObj.err) || (!!messageObj.err)) {
      if (!!nodeObj.err) {
        console.log(111)
        return cb(nodeObj.err);
      } else {
        console.log(messageObj)
        return cb(messageObj.err);
      }
    } else {
      createRelationship(nodeObj.node, messageObj.node, rType, function (err) {
        //console.log(arguments);
        return cb(err);
      });
    }
  });

  _db.getIndexedNode('index_node_' + fromNode.indexName, fromNode.indexProperty, fromNode.indexValue, function (err, node) {

    if (!!err) {
      ep.emit("hadNode", {err: err, node: null});
    } else {
      ep.emit("hadNode", {err: err, node: node});
    }
  });

  createMessage(message._, 'index_node_' + message.indexName, message.indexProperty, message.indexValue, function (err, node) {
    if (!!err) {
      return ep.emit("hadMessage", {err: err, node: null});
    } else {
      return ep.emit("hadMessage", {err: err, node: node});
    }
  });
};

Neo.prototype.getFollowUserNotice = function (nodeIndexName, nodeIndexProperty, nodeIndexValue, rTypeForFollow, rTypeForMessage, cb) {
  var sql = "start n = node:index_node_" + nodeIndexName + "(" + nodeIndexProperty + "='" + nodeIndexValue + "') match n-[rf:" + rTypeForFollow + "]-nt-[rm:" + rTypeForMessage + "]->message  return message";
  //console.log(sql);
  _db.query(sql, function (err, results) {
    return cb(err, results);
  });
};

Neo.prototype.getUserByUserId = function (indexName, indexProperty, indexValue, cb) {
  _db.getIndexedNode('index_node_' + indexName, indexProperty, indexValue, function (err, node) {
    if (!!err) {
      return cb(err)
    } else {
      return cb(err, node);
    }
  });
};

Neo.prototype.cleanTable = function (cb) {
  var sql = "start n = node(*), r = relationship(*) delete r, n;"
  _db.query(sql, function (err) {
    return cb(err);
  });
}