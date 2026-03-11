// import passport from "passport";
// import { Strategy as GoogleStrategy } from "passport-google-oauth20";       
// import jwtStrategy from "passport-jwt";
// import dotenv from "dotenv";    
// import { ExtractJwt } from "passport-jwt";
// import User from "../models/userModel.js";

// dotenv.config();

// passport.use(new GoogleStrategy(
//   {
//     clientID: process.env.GOOGLE_CLIENT_ID,
//     clientSecret: process.env.GOOGLE_CLIENT_SECRET,
//     callbackURL: "/auth/google/callback"
//   },
//   async (accessToken, refreshToken, profile, done) => {
//     try {
//       let user = await User.findOne({ googleId: profile.id })

//       if (!user) {
//         user = await User.create({
//           googleId: profile.id,
//           email: profile.emails[0].value,
//         })
//       }

//       return done(null, user)

//     } catch (err) {
//       return done(err, null)
//     }
//   }
// ))

// /* ===============================
//    JWT STRATEGY (Protect API)
// ================================ */
// passport.use(new JwtStrategy(
//   {
//     jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
//     secretOrKey: process.env.JWT_SECRET
//   },
//   async (payload, done) => {
//     try {
//       const user = await User.findById(payload.id)
//       if (!user) return done(null, false)

//       return done(null, user)
//     } catch (err) {
//       return done(err, false)
//     }
//   }
// ))

// module.exports = passport