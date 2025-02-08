import { Schema, model } from "mongoose";

const courseSchema = Schema({
    name: {
        type: String,
        required: true
    },
    teacher: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    students: [
        {
            type: Schema.Types.ObjectId,
            ref: "User",
            default: []
        }
    ]
}, {
    versionKey: false,
    timestamps: true
});

export default model("Course", courseSchema);
