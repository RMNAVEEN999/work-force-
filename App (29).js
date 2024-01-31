import UserProfile from './Component/UserProfile/index'

import './App.css'

const userDetailsList = [
  {
    imageUrl:
      'https://pbs.twimg.com/profile_images/1644174631690199042/A_HCQlkq_400x400.jpg',
    name: 'Rahul Attuluri',
    role: 'Co-Founder of CCBP, NXTWAVE, IND',
  },

  {
    imageUrl:
      'https://media.licdn.com/dms/image/C4E03AQF1JPw0V6IhaA/profile-displayphoto-shrink_800_800/0/1517240592643?e=1712188800&v=beta&t=wBzT0sXR9x3w3PhU0QHw2ngSKXqHoqQn2pE5TY-u_5I',
    name: 'Sashank Reddy Gujjula ',
    role: 'Co-Founder And Head, Customer Experience at NxtWave.',
  },
  {
    imageUrl:
      'https://pbs.twimg.com/profile_images/965789881698959360/kIsYtd1q_400x400.jpg',
    name: 'Anupam Pedarla',
    role:
      'Co-Founder and COO at NxtWave,Director with Nxtwave Disruptive Technologies Private Limited',
  },
]

const App = () => (
  <div className="list-container">
    <h1 className="title">NxtWave Heros</h1>
    <ul>
      {userDetailsList.map(eachList => (
        <UserProfile key={eachList.id} userDetail={eachList} />
      ))}
    </ul>
  </div>
)

export default App
