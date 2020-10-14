import { configure } from 'vee-validate';

configure({
    classes: {
        valid: 'is-valid',
        invalid: 'is-invalid',
        dirty: ['is-dirty']
    }
})