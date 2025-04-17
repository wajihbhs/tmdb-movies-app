import { required, minLength, maxLength, between, helpers } from "@vuelidate/validators";

const alphaWithSpaces = helpers.withMessage("comments.alphaOnly", helpers.regex(/^[\p{L} ]+$/u));

const alphaNumWithSpaces = helpers.withMessage(
  "comments.alphaNumOnly",
  helpers.regex(/^[\p{L}\p{N} ]+$/u)
);

export const commentSchema = {
  username: {
    required: helpers.withMessage("comments.required", required),
    alphaWithSpaces,
    minLength: helpers.withMessage("comments.minLength", minLength(3)),
    maxLength: helpers.withMessage("comments.maxLength", maxLength(50))
  },
  message: {
    required: helpers.withMessage("comments.required", required),
    alphaNumWithSpaces,
    minLength: helpers.withMessage("comments.minLength", minLength(3)),
    maxLength: helpers.withMessage("comments.maxLength", maxLength(500))
  },
  rating: {
    required: helpers.withMessage("comments.required", required),
    between: helpers.withMessage("comments.ratingRange", between(1, 10))
  }
};
