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
				title: 'New blockcontent'
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
  this.title = 'BlockContent show';
  render();
});

action(function edit() {
  this.title = 'BlockContent edit';
  render();
});

action(function update() {
	this.blockcontent.updateAttributes(body, function (err) {
		if (!err) {
			flash('info', 'BlockContent updated');
			redirect(path_to.admin_blockcontent(this.blockcontent));
		} else {
			flash('error', 'BlockContent can not be updated');
			this.title = 'Edit blockcontent details';
			render('edit');
		}
	}.bind(this));
});

action(function destroy() {
	this.blockcontent.destroy(function (error) {
		if (error) {
			flash('error', 'Can not destroy blockcontent');
		} else {
			flash('info', 'BlockContent successfully removed');
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
