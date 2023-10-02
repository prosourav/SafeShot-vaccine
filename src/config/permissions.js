module.exports = {
  user: [
    { method: 'GET', route: "/api/v1/appointments" },

    { method: 'GET', route: '/api/v1/appointments/:id' },
    { method: 'PATCH', route: '/api/v1/appointments/:id' },
    { method: 'DELETE', route: '/api/v1/appointments/:id' },

    { method: 'GET', route: '/api/v1/users/profile' },
    { method: 'PATCH', route: '/api/v1/users/profile' },

    { method: 'GET', route: '/api/v1/reviews' },
    { method: 'POST', route: '/api/v1/reviews' },

    { method: 'GET', route: '/api/v1/reviews/:id' },
    { method: 'PATCH', route: '/api/v1/reviews/:id' },
    { method: 'DELETE', route: '/api/v1/reviews/:id' },
    
    { method: 'GET', route: '/api/v1/users/:id' }
  ],
  doctor: [],
  admin: ["/flight_reschedule"]
}