load('application');
before(use('requireLogin'));
before(loadBlockContent, {only: ['show', 'edit', 'update', 'destroy']});
layout('admin');

action('new', function () {
  this.title = 'New blockcontent';
  this.blockcontent = new BlockContent;
  render();
});

action(function create() {
	BlockContent.create(req.body, function (err, user) {
		if (err) {
			flash('error', 'BlockContent can not be created');
			render('new', {
				blockcontent: user,
				title: 'New Block Content'
			});
		} else {
			flash('info', 'BlockContent created');
			redirect(path_to.admin_blockcontents);
		}
	});
});

action(function index() {
	this.title = 'BlockContents index';
	BlockContent.all(function (err, blockcontents) {
		render({
			blockcontents: blockcontents
		});
	});
});

action(function show() {
  this.title = 'Block Content Show';
  render();
});

action(function edit() {
  this.title = 'Block Content Edit';
  render();
});

action(function update() {
	this.blockcontent.updateAttributes(body, function (err) {
		if (!err) {
			flash('info', 'Block Content Updated');
			redirect(path_to.admin_blockcontents);
		} else {
			flash('error', 'Block Content can not be updated');
			this.title = 'Edit Block Content Details';
			render('edit');
		}
	}.bind(this));
});

action(function destroy() {
	this.blockcontent.destroy(function (error) {
		if (error) {
			flash('error', 'Can not destroy Block Content');
		} else {
			flash('info', 'Block Content successfully removed');
		}
		send("'" + path_to.admin_blockcontents + "'");
	});
});

function loadBlockContent() {
	BlockContent.find(params.id, function (err, blockcontent) {
		if (err) {
			redirect(path_to.admin_blockcontents);
		} else {
			this.blockcontent = blockcontent;
			next();
		}
	}.bind(this));
}
