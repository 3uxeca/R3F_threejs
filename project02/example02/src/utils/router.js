import Home from '../pages/index';

export const routerInfo = [
  {
    path: '/',
    element: <Home />,
    children: [
      {
        path: 'seoul',
        element: <div className='layout-detail'>Seoul</div>
      },
      {
        path: 'newyork',
        element: <div className='layout-detail'>New York</div>
      },               
    ]
  },
]