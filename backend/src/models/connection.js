const mongoose = require("mongoose");

const connectionSchema = new mongoose.Schema(
    {
        fromuserid: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },
        touserid: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
            validate: {
                validator: function (v) {
                    return (
                        this.fromuserid &&
                        v &&
                        this.fromuserid.toString() !== v.toString()
                    );
                },
                message: "Cannot create connection to self",
            },
        },
        status: {
            type: String,
            enum: ["ignored", "interested", "accepted", "rejected", "pending"],
            default: "pending",
            required: true,
        },
    },
    {
        timestamps: true,
    },
);

connectionSchema.index({ fromuserid: 1, touserid: 1 }, { unique: true });

connectionSchema.pre("validate", function (next) {
    if (
        this.fromuserid &&
        this.touserid &&
        this.fromuserid.toString() === this.touserid.toString()
    ) {
        return next(new Error("Cannot send request to self"));
    }
    next();
});

module.exports = mongoose.model("Connection", connectionSchema);
