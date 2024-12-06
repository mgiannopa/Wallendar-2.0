const http = require('node:http');
const test = require('ava');
const got = require('got');
const express = require('express');
const app = require('../index');



test.before(async (t) => {
    t.context.server = http.createServer(app);
    const server = t.context.server.listen(0);
    const { port } = server.address();
    t.context.got = got.extend({ prefixUrl: `http://localhost:${port}` });
    console.log('Server started');
});

test.after.always((t) => {
    t.context.server.close();
    console.log('Server closed');
});

 /*
**********************************************************
Test for creating an event
**********************************************************
*/

test('POST event', async (t) => {
    const event = {
        date: 2203,
        duration: 2,
        eventId: 4,
        documents: [
          { documentId: 6 }
        ],
        time: 11,
        place: "Main Hall",
        title: "Annual Conference",
        day: "Wednesday",
        participants: [
            {
                password: "securepassword1",
                email_address: "user1@example.com",
                userId: 1,
                preferred_language: "English",
                username: "user1"
            },
            {
                password: "securepassword2",
                email_address: "user2@example.com",
                userId: 2,
                preferred_language: "Spanish",
                username: "user2"
            }
        ]
      };
    const response = await t.context.got.post('event', {
        json: event,
        response: 'json',
        throwHttpErrors: false
    });
    t.is(response.statusCode, 200);
});



/*
**********************************************************
Test for creating an event that already exists
**********************************************************
*/

test('POST event existing event', async (t) => {
    const event = {
        date: 20231001, // Number
        duration: 2, // Number
        eventId: 1, // Number
        documents: [
          { documentId: 1 }, // Number
          { documentId: 2 } // Number
        ],
        time: 1000, // Number
        place: "Conference Room A", // String
        title: "Team Meeting", // String
        day: "Monday", // String
        participants: [
          { 
            password: "password1", // String
            email_address: "alice@example.com", // String
            userId: 1, // Number
            preferred_language: "English", // String
            username: "alice" // String
          },
          { 
            password: "password2", // String
            email_address: "bob@example.com", // String
            userId: 2, // Number
            preferred_language: "English", // String
            username: "bob" // String
          }
        ]
      };
    const response = await t.context.got.post('event', {
        json: event,
        response: 'json',
        throwHttpErrors: false
    });
    t.is(response.statusCode, 400);
});



/*
**********************************************************
Test for creating an event with invalid data
**********************************************************
*/
test('POST event invalid event', async (t) => {
    const event = {
        date: 20231115, // Invalid data type (should be a string)
        duration: "2", // Invalid data type (should be a number)
        eventId: "4", // Invalid data type (should be a number)
        documents: [
            { documentId: "6" }, // Invalid data type (should be a number)
            { documentId: "7" } // Invalid data type (should be a number)
        ],
        time: 1100, // Invalid data type (should be a string)
        place: 123, // Invalid data type (should be a string)
        title: true, // Invalid data type (should be a string)
        day: false, // Invalid data type (should be a string)
        participants: "invalid" // Invalid data type (should be an array)
    };
    const response = await t.context.got.post('event', {
        json: event,
        responseType: 'json',
        throwHttpErrors: false
    });
    t.is(response.statusCode, 400);
}); 



/*
**********************************************************
Test for creating an event with negative values 
**********************************************************
*/
test('POST event event with negative values', async (t) => {
    const event = {
        date: -20231115, // Negative number
        duration: -2, // Negative number
        eventId: -4, // Negative number
        documents: [
            { documentId: -6 }, // Negative number
            { documentId: -7 } // Negative number
        ],
        time: -1100, // Negative number
        place: "Main Hall",
        title: "Annual Conference",
        day: "Wednesday",
        participants: [
            {
                password: "securepassword1",
                email_address: "user1@example.com",
                userId: 1,
                preferred_language: "English",
                username: "user1"
            },
            {
                password: "securepassword2",
                email_address: "user2@example.com",
                userId: 2,
                preferred_language: "Spanish",
                username: "user2"
            }
        ]
    };
    const response = await t.context.got.post('event', {
        json: event,
        responseType: 'json',
        throwHttpErrors: false
    });
    t.is(response.statusCode, 400);
});


/*
**********************************************************
Test for adding an event to a calendar 
**********************************************************
*/

test('POST /calendar/{calendarId}/event Add event to calendar', async (t) => {
    const calendarId = 1;
    const event = {
        date: 20231115,
        duration: 2,
        eventId: 4,
        documents: [
            { documentId: 6 },
            { documentId: 7 }
        ],
        time: 1100,
        place: "Main Hall",
        title: "Annual Conference",
        day: "Wednesday",
        participants: [
            {
                password: "securepassword1",
                email_address: "user1@example.com",
                userId: 1,
                preferred_language: "English",
                username: "user1"
            },
            {
                password: "securepassword2",
                email_address: "user2@example.com",
                userId: 2,
                preferred_language: "Spanish",
                username: "user2"
            }
        ]
    };
    const response = await t.context.got.post(`calendar/${calendarId}/event`, {
        json: event,
        responseType: 'json',
        throwHttpErrors: false
    });
    t.is(response.statusCode, 200);
})


/*
**********************************************************
Test for adding an event to a calendar that does not exist
**********************************************************
*/

test('POST /calendar/{calendarId}/event Add event to nonexisting calendar', async (t) => {
    const calendarId = 5;
    const event = {
        date: 20231115,
        duration: 2,
        eventId: 4,
        documents: [
            { documentId: 6 },
            { documentId: 7 }
        ],
        time: 1100,
        place: "Main Hall",
        title: "Annual Conference",
        day: "Wednesday",
        participants: [
            {
                password: "securepassword1",
                email_address: "user1@example.com",
                userId: 1,
                preferred_language: "English",
                username: "user1"
            },
            {
                password: "securepassword2",
                email_address: "user2@example.com",
                userId: 2,
                preferred_language: "Spanish",
                username: "user2"
            }
        ]
    };
    const response = await t.context.got.post(`calendar/${calendarId}/event`, {
        json: event,
        responseType: 'json',
        throwHttpErrors: false
    });
    t.is(response.statusCode, 400);
})

/*
**********************************************************
Test for adding an existing event to a calendar
**********************************************************
*/

test('POST /calendar/{calendarId}/event Add existing event to calendar', async (t) => {
    const calendarId = 1;
    const event =  {
        date: 20231001,
        duration: 2,
        eventId: 1,
        documents: [
          { documentId: 1 },
          { documentId: 2 }
        ],
        time: 10,
        place: "Conference Room A",
        title: "Team Meeting",
        day: "Monday",
        participants: [
          { participantId: 1, name: "Alice" },
          { participantId: 2, name: "Bob" }
        ]
      };
      const response = await t.context.got.post(`calendar/${calendarId}/event`, {
        json: event,
        responseType: 'json',
        throwHttpErrors: false
    });
    t.is(response.statusCode, 400);
})



/*
**********************************************************
Test for adding an event to a calendar with invalid data
**********************************************************
*/
test('POST /calendar/{calendarId}/event Add event to calendar with invalid data', async (t) => {
    const calendarId = 1;
    const event = {
        date: "invalid-date", // Invalid data type (should be a number)
        duration: -2, // Invalid value (should be a positive number)
        eventId: "invalid-id", // Invalid data type (should be a number)
        documents: [
            { documentId: "invalid-doc-id" }, // Invalid data type (should be a number)
            { documentId: -2 } // Invalid value (should be a positive number)
        ],
        time: "invalid-time", // Invalid data type (should be a number)
        place: 123, // Invalid data type (should be a string)
        title: true, // Invalid data type (should be a string)
        day: false, // Invalid data type (should be a string)
        participants: "invalid-participants" // Invalid data type (should be an array)
    };
    const response = await t.context.got.post(`calendar/${calendarId}/event`, {
        json: event,
        responseType: 'json',
        throwHttpErrors: false
    });
    t.is(response.statusCode, 400);
    
});

/*
**********************************************************
Test for deleting an event from a calendar
**********************************************************
*/


test('DELETE /calendar/{calendarId}/event/{eventId} Delete event from calendar', async (t) => {
    const calendarId = 1;
    const eventId = 1;
    response = await t.context.got.delete(`calendar/${calendarId}/event/${eventId}`, {
        responseType: 'json',
        throwHttpErrors: false
    });
    t.is(response.statusCode, 200);

});

/*
**********************************************************
Test for deleting an event that does not exist from a calendar
**********************************************************
*/
test('DELETE /calendar/{calendarId}/event/{eventId} Delete nonexisting event from calendar', async (t) => {
    const calendarId = 1;
    const eventId = 8;
    response = await t.context.got.delete(`calendar/${calendarId}/event/${eventId}`, {
        responseType: 'json',
        throwHttpErrors: false
    });
    t.is(response.statusCode, 400);

});

/*
**********************************************************
Test for deleting an event from a calendar that does not exist
**********************************************************
*/
test('DELETE /calendar/{calendarId}/event/{eventId} Delete event from nonexisting calendar', async (t) => {
    const calendarId = 8;
    const eventId = 1;
    response = await t.context.got.delete(`calendar/${calendarId}/event/${eventId}`, {
        responseType: 'json',
        throwHttpErrors: false
    });
    t.is(response.statusCode, 400);

});

/*
**********************************************************
Test for adding a document
**********************************************************
*/

test('POST document', async (t) => {
    const document = {
        documentId: 10
    };

    const response = await t.context.got.post('document', {
        json: document,
        responseType: 'json',
        throwHttpErrors: false
    });

    t.is(response.statusCode, 200);
});

/*
**********************************************************
Test for adding a document with invalid id
**********************************************************
*/

test('POST document invalid id', async (t) => {
    const document = {
        documentId: 'a'
    };

    const response = await t.context.got.post('document', {
        json: document,
        responseType: 'json',
        throwHttpErrors: false
    });

    t.is(response.statusCode, 400);
});

/*
**********************************************************
Test for adding a document that already exists
**********************************************************
*/

test('POST document already existing document', async (t) => {
    const document = {
        documentId: 1
    };

    const response = await t.context.got.post('document', {
        json: document,
        responseType: 'json',
        throwHttpErrors: false
    });

    t.is(response.statusCode, 400);
});


/*
**********************************************************
Test for adding a document with negative id
**********************************************************
*/

test('POST document negative id', async (t) => {
    const document = {
        documentId: -1
    };

    const response = await t.context.got.post('document', {
        json: document,
        responseType: 'json',
        throwHttpErrors: false
    });

    t.is(response.statusCode, 400);
});
