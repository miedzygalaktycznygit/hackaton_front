import { http, HttpResponse } from 'msw'

export const handlers = [


  http.post('/api/register', async ({ request }) => {
    const newUser = await request.json()
    console.log('MSW: Przechwycono rejestrację:', newUser)

    return HttpResponse.json({ 
      success: true, 
      message: 'Rejestracja pomyślna!' 
    })
  }),


  http.post('/api/login', async ({ request }) => {
    const loginData = await request.json()
    console.log('MSW: Przechwycono logowanie:', loginData)

    return HttpResponse.json({
      userId: 'user-abc-123',
      email: loginData.email, 
      token: 'fake-jwt-token-za-role-pani-w-dziekanacie-12345'
    })
  }),
]