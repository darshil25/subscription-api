import mongoose from "mongoose";

const subscriptionSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Subscription name is Required'],
    trim: true,
    minLength: 2,
    maxLength: 100
  },
  price: {
    type: Number,
    required: [true, 'Subscription price is Required'],
    min: [0, 'Price must be greater than 0'],
    max: [100000, 'Price must be less than 100k']
  },
  currency: {
    type: String,
    enum: ['USD', 'EUR', 'GBP', 'INR'],
    default: 'INR'
  },
  frequency: {
    type: String,
    enum: ['daily', 'weekly', 'monthly', 'yearly']
  },
  category: {
    type: String,
    enum: ['lifestyle', 'entertainment', 'technology', 'finance', 'lifestyle', 'other'],
    required: true
  },
  paymentMethod: {
    type: String,
    required: true,
    trim: true
  },
  status: {
    type: String,
    enum: ['active', 'cancelled', 'expired', 'paused'],
    default: 'active'
  },
  startDate: {
    type: Date,
    required: true,
    validate: {
      validator: (value) => value < new Date(), message: 'Start Date must be in past'
    }
  },
  renewalDate: {
    type: Date,
    required: true,
    validate: {
      validator: function (value) {
        return value > this.startDate;
      },
      message: 'Renewal Date must be after the start date'
    }
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
    index: true
  }
}, { timestamps: true });

// function to auto calculate if renewal date is missing before running model (basically from start date and renewal period)
subscriptionSchema.pre('save', function (next) {
  if(!this.renewalDate) {
    const renewalPeriods = {
      daily: 1,
      weekly: 7,
      monthly: 30,
      yearly: 365
    };

    //if start is on jan 1 and frequency is monthly 
    //it make renewal date to jan 1  + 30 => 31 jan

    this.renewalDate = new Date(this.startDate);
    this.renewalDate.setDate(this.renewalDate.getDate() + renewalPeriods[this.frequency]);
  }

  // auto updating subscription status based opn renewal date
  if(this.renewalDate < new Date()){
    this.status = 'expired';
  }

  next(); // now proceeding to creating rest of fields in db
})

const Subscription = mongoose.model('Subscription', subscriptionSchema)

export default Subscription;