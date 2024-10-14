import mongoose from "mongoose";

export function mongooseConnect() {
  if (mongoose.connection.readyState === 1) {
    return mongoose.connection.asPromise();
  } else {
    const uri = 'mongodb+srv://shaheershakir22:Ek9tnuaZMWcVoDkl@cluster0.pcmlgvc.mongodb.net/?retryWrites=true&w=majority';
    return mongoose.connect(uri);
  }
}