import { model, models, Schema } from "mongoose";

const FavoriteSchema = new Schema({
  accountId: { type: String, required: true },
  movieId: { type: Number, required: true },
  movieData: {
    id: { type: Number, required: true },
    title: { type: String },
    name: { type: String },
    overview: { type: String },
    poster_path: { type: String },
    backdrop_path: { type: String },
    release_date: { type: String },
    first_air_date: { type: String },
    vote_average: { type: Number },
    genre_ids: [{ type: Number }],
    media_type: { type: String },
  },
  addedAt: { type: Date, default: Date.now },
});

// Create Index - for fast search
FavoriteSchema.index({ accountId: 1, movieId: 1 }, { unique: true });

const FavoriteModel = models.Favorite || model("Favorite", FavoriteSchema);
export default FavoriteModel; 