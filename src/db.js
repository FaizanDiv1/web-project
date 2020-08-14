const mongoose = require("mongoose");
const { Timestamp } = require("mongodb");

mongoose.connect("mongodb://127.0.0.1:27017/Data", {
  useNewUrlParser: true,
  useCreateIndex: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
});

const weatherSchema = new mongoose.Schema(
  {
    location: {
      type: String,
    },
    forecast: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

const Weather = mongoose.model("Weather", weatherSchema);


module.exports = Weather;