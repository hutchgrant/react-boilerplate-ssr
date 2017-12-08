export default {
    signup: [
        { 
            label: 'Username', 
            name: 'username', 
            type: 'text', 
            message: 'You must enter a valid username with 4-20 characters, no special characters allowed',
            regex: /^[a-z0-9_-]{4,20}$/i
        },
        { 
            label: 'Email', 
            name: 'email', 
            type: 'email', 
            message: 'You must enter a valid email address',
            regex: /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/
        },
        { 
            label: 'Password', 
            name: 'password', 
            type: 'password', 
            message: 'You must enter a valid password with between 6 and 20 characters, at least 1 capital, 1 number, and 1 special character',
            regex: /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[!@#$%^&amp;*()_+}{&quot;:;'?/&gt;.&lt;,]).{6,20}$/            
        },
        { 
            label: 'Confirm Password', 
            name: 'confirm_password', 
            type: 'password', 
            message: 'Passwords must match',
            regex: /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[!@#$%^&amp;*()_+}{&quot;:;'?/&gt;.&lt;,]).{6,20}$/            
        },
        { 
            label: 'I agree to the', 
            name: 'agreement', 
            type: 'checkbox', 
            message: 'You must agree to the terms of service',
            regex: /^(true)$/
        }
    ],
    login: [
        { 
            label: 'Username', 
            name: 'username', 
            type: 'text', 
            message: 'You must enter a valid username with 4-20 characters, no special characters allowed',
            regex: /^[a-z0-9_-]{4,20}$/i
        },
        { 
            label: 'Password', 
            name: 'password', 
            type: 'password', 
            message: 'You must enter a valid password with between 6 and 20 characters, at least 1 capital, 1 number, and 1 special character',
            regex: /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[!@#$%^&amp;*()_+}{&quot;:;'?/&gt;.&lt;,]).{6,20}$/            
        }  
    ]
};