import { required, minLength, maxLength, alpha, alphaNum, between } from '@vuelidate/validators'
export const commentSchema = {
    username: {
        required,
        alpha,
        minLength: minLength(3),
        maxLength: maxLength(50)
    },
    message: {
        required,
        alphaNum,
        minLength: minLength(3),
        maxLength: maxLength(500)
    },
    rating: {
        required,
        between: between(1, 10)
    }
}
