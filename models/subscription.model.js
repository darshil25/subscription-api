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
      yearly: 365,
    };

    this.renewalDate = new Date(this.startDate);
    this.renewalDate.setDate(this.renewalDate.getDate() + renewalPeriods[this.frequency]);
  }

  // Auto-update the status if renewal date has passed
  if (this.renewalDate < new Date()) {
    this.status = 'expired';
  }

  next();
});

const Subscription = mongoose.model('Subscription', subscriptionSchema)

export default Subscription;