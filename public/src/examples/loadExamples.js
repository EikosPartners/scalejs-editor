import authFormCss from './authForm.css';
import authFormJson from './authForm.json';
import authFormRegisterJson from './authFormRegister.json';

const examples = [
    {
        name: 'Select an Example'
    },
    {
        name: 'Auth Form',
        data: {
            json: JSON.stringify(authFormJson, null, 4),
            css: authFormCss
        }
    },
    {
        name: 'Auth Form Register',
        data: {
            json: JSON.stringify(authFormRegisterJson, null, 4),
            css: authFormCss
        }
    }
];

examples.forEach((example, index) => {
    example.value = index;
});

export default {
    examples
};

export {
    examples
};
