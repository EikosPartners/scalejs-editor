const timeout = 100; // simulate server response
const users = [];

function validateUser(user, callback) {
    if (users.indexOf(user) !== -1) {
        callback(null, { status: 'Success' });
        return;
    }
    callback({ status: 'error', errors: [{ field: 'username', message: 'This user is not registered with our system, please register.' }] });
}

function registerUser(user, callback) {
    if (users.indexOf(user) === -1) {
        users.push(user);
        callback(null, { status: 'Success' });
        return;
    }
    callback({ status: 'error', errors: [{ field: 'username', message: 'This user name is taken, please choose another name.' }] });
}

function mockAjax(request, callback) {
    setTimeout(() => {
        switch (request.uri) {
            case 'login':
                validateUser(request.data.username, callback);
                break;
            case 'register':
                registerUser(request.data.username, callback);
                break;
            default:
                callback({ status: 'error', message: 'error in server response' });
                break;
        }
    }, timeout);
}

export default {
    ajax: mockAjax
};
