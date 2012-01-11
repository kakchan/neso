require('../../test_helper.js').controller('blockcontents', module.exports);

var sinon  = require('sinon');

function ValidAttributes () {
    return {
        title: '',
        content: ''
    };
}

exports['blockcontents controller'] = {

    'GET new': function (test) {
        test.get('/admin/blockcontents/new', function () {
            test.success();
            test.render('new');
            test.render('form.' + app.set('view engine'));
            test.done();
        });
    },

    'GET index': function (test) {
        test.get('/admin/blockcontents', function () {
            test.success();
            test.render('index');
            test.done();
        });
    },

    'GET edit': function (test) {
        var find = BlockContent.find;
        BlockContent.find = sinon.spy(function (id, callback) {
            callback(null, new BlockContent);
        });
        test.get('/admin/blockcontents/42/edit', function () {
            test.ok(BlockContent.find.calledWith('42'));
            BlockContent.find = find;
            test.success();
            test.render('edit');
            test.done();
        });
    },

    'GET show': function (test) {
        var find = BlockContent.find;
        BlockContent.find = sinon.spy(function (id, callback) {
            callback(null, new BlockContent);
        });
        test.get('/admin/blockcontents/42', function (req, res) {
            test.ok(BlockContent.find.calledWith('42'));
            BlockContent.find = find;
            test.success();
            test.render('show');
            test.done();
        });
    },

    'POST create': function (test) {
        var blockcontent = new ValidAttributes;
        var create = BlockContent.create;
        BlockContent.create = sinon.spy(function (data, callback) {
            test.strictEqual(data, blockcontent);
            callback(null, blockcontent);
        });
        test.post('/admin/blockcontents', blockcontent, function () {
            test.redirect('/admin/blockcontents');
            test.flash('info');
            test.done();
        });
    },

    'POST create fail': function (test) {
        var blockcontent = new ValidAttributes;
        var create = BlockContent.create;
        BlockContent.create = sinon.spy(function (data, callback) {
            test.strictEqual(data, blockcontent);
            callback(new Error, null);
        });
        test.post('/admin/blockcontents', blockcontent, function () {
            test.success();
            test.render('new');
            test.flash('error');
            test.done();
        });
    },

    'PUT update': function (test) {
        BlockContent.find = sinon.spy(function (id, callback) {
            test.equal(id, 1);
            callback(null, {id: 1, updateAttributes: function (data, cb) { cb(null); }});
        });
        test.put('/admin/blockcontents/1', new ValidAttributes, function () {
            test.redirect('/admin/blockcontents/1');
            test.flash('info');
            test.done();
        });
    },

    'PUT update fail': function (test) {
        BlockContent.find = sinon.spy(function (id, callback) {
            test.equal(id, 1);
            callback(null, {id: 1, updateAttributes: function (data, cb) { cb(new Error); }});
        });
        test.put('/admin/blockcontents/1', new ValidAttributes, function () {
            test.success();
            test.render('edit');
            test.flash('error');
            test.done();
        });
    },

    'DELETE destroy': function (test) {
        test.done();
    },

    'DELETE destroy fail': function (test) {
        test.done();
    }
};

