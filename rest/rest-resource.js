var data = {};

var resource = {
  list: function() {
    return Object.keys(data).map(function(id) {
      return data[id];
    });
  },
  get: function(id) {
    return data[id];
  },
  put: function(id, entry) {
    data[id] = entry;
  },
  delete: function(id, entry) {
    delete data[id];
  }
}

resource.put('0', { id: '0', text: 'Test 0' });
resource.put('1', { id: '1', text: 'Test 1' });

module.exports = resource;
