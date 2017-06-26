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

function getGridData(pagination, callback) {
    const data = [];
    let limit = pagination.limit;
    function createDataNode() {
        return {
            colData1: Math.floor((Math.random() * 10) + 1),
            colData2: Math.floor((Math.random() * 100) + 1),
            colData3: Math.floor((Math.random() * 1000) + 1),
            colData4: Math.floor((Math.random() * 10000) + 1)
        };
    }

    while (limit) {
        data.push(createDataNode());
        limit -= 1;
    }

    callback(null, { data, skip: pagination.skip + 30, total: 120 });
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
            case 'grid':
                getGridData(request.data, callback);
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
