import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';

export interface IUser extends mongoose.Document {
  email: string;
  password: string;
  fullName: string;
  role: 'host' | 'guest' | 'admin';
  phone?: string;
  avatarUrl?: string;
  createdAt: Date;
  updatedAt: Date;
  comparePassword(candidatePassword: string): Promise<boolean>;
}

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: [true, 'Email is required'],
    unique: true,
    lowercase: true,
    trim: true,
    validate: {
      validator: function(v: string) {
        return /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(v);
      },
      message: 'Please enter a valid email'
    }
  },
  password: {
    type: String,
    required: [true, 'Password is required'],
    minlength: [8, 'Password must be at least 8 characters'],
    select: false
  },
  fullName: {
    type: String,
    required: [true, 'Full name is required'],
    trim: true
  },
  role: {
    type: String,
    enum: ['host', 'guest', 'admin'],
    default: 'guest'
  },
  phone: {
    type: String,
    validate: {
      validator: function(v: string) {
        return /^\+?[\d\s-]+$/.test(v);
      },
      message: 'Please enter a valid phone number'
    }
  },
  avatarUrl: String,
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
}, {
  timestamps: true,
  toJSON: { virtuals: true },
  toObject: { virtuals: true }
});

// Virtual populate for spots (for hosts)
userSchema.virtual('spots', {
  ref: 'Spot',
  localField: '_id',
  foreignField: 'hostId'
});

// Virtual populate for bookings (for guests)
userSchema.virtual('bookings', {
  ref: 'Booking',
  localField: '_id',
  foreignField: 'guestId'
});

// Hash password before saving
userSchema.pre('save', async function(next) {
  if (!this.isModified('password')) return next();
  
  try {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
  } catch (error: any) {
    next(error);
  }
});

// Compare password method
userSchema.methods.comparePassword = async function(candidatePassword: string): Promise<boolean> {
  try {
    return await bcrypt.compare(candidatePassword, this.password);
  } catch (error) {
    return false;
  }
};

// Indexes
userSchema.index({ email: 1 }, { unique: true });
userSchema.index({ role: 1 });

export const User = mongoose.model<IUser>('User', userSchema);