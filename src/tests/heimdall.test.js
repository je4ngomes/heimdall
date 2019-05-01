import Heimdall from '../heimdall';

const schema = {
    email: Heimdall.Email()
                   .required('Field email required.'),
    username: Heimdall.Text()
                      .required('Field username required.'),
    password: Heimdall.Text()
                      .regex({ msg: 'Invalid password', rule: /...../ })
                      .required('Field password required.')
                      
};

test('Should validate and pass all fields', () => {
    const mockData = {
        email: 'test@gmail.com',
        username: 'testksj',
        password: 'rrRT49*&(cc.'
    };

    const heimdall = Heimdall.New(schema).Check(mockData);

    expect(heimdall.isValid).toBe(true);
    expect(heimdall.isNotValid).toBe(false);
    expect(heimdall.result()).toEqual({});
});

test('Should validate and fail only email and password.', () => {
    const mockData = {
        email: 'test@zlltxd.io',
        username: 'testksj',
        password: 'rrRTcc.'
    };

    const heimdall = Heimdall.New(schema).Check(mockData);

    expect(heimdall.isValid).toBe(false);
    expect(heimdall.isNotValid).toBe(true);
    expect(heimdall.result()).toEqual({
        email: [
            { code: 'DOMAIN_NOT_FOUND', msg: 'Domain not found.' },
            { code: 'INVALID_EMAIL', msg: 'Invalid email.' }
        ],
        password: { code: 'INVALID_PASSWORD', msg: 'Invalid password.' }
    });
});

test('Should validate an individual field and fail', () => {
    const email = Heimdall.Email();

    expect(Heimdall.New(email).Check('test@fdisk.io')).toEqual({
        email: [{ code: 'INVALID_DOMAIN', msg: 'default msg here.' }]
    });
});