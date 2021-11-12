const mongoose = require('mongoose')
const Schema = mongoose.Schema;
const mongoosePaginate = require('mongoose-paginate-v2')

const SessionSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
      unique: true,
    },
    description: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      required: true,
    },
    completed: {
      type: Boolean,
      required: false,
    },
    priority: {
      type: Number,
      required: true,
    },
    owner: {
      type: Schema.Types.ObjectId,
      required: true,
    }
  },
  {
    versionKey: false,
    timestamps: true
  }
)

SessionSchema.plugin(mongoosePaginate)
module.exports = mongoose.model('session', SessionSchema)
