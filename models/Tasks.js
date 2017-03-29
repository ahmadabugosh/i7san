const mongoose = require('mongoose');

const TaskSchema = new mongoose.Schema({

	title: String,
	content: String,
	user:{
		type: Schema.Types.ObjectId,
		ref: 'User'
	}

	});

const Task = mongoose.model('task', TaskSchema);

module.exports = Task;