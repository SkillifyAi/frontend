import React,{useState, useEffect} from 'react'
import {Button, Dialog, DialogTitle, DialogContent, Pagination} from '@mui/material'
import LeaderboardUser from './LeaderboardUser'
import httpClient from '../../httpClient'

const LineOfPoints = ({ numOfPoints }) => {
  return (
    <div className="line-of-points">
      {[...Array(numOfPoints)].map((_, index) => (
        <div key={index} className="point"></div>
      ))}
    </div>
  );
};

export default function Leaderboard({data, userPlace}) {

  const [open,setOpen] = useState(false)
  const [currentPage, setCurrentPage] = useState(1)
  const usersPerPage = 5
  const [users, setUsers] = useState([])
  const [userIncluded, setUserIncluded] = useState(false)

  
  const toggleOpen = () => setOpen(prevState => !prevState)

  const leaderboardElements = users.map((element,index) => {
    return <LeaderboardUser key = {index} userEmail = {data.email} number = {(currentPage - 1) * usersPerPage + index} {...element} />
  })

  const handleChange = (event, value) => {
    setCurrentPage(value)
  }

  useEffect(() => {
    for(let i = 1;i <= 5;i++)
    {
      if( (currentPage - 1) * usersPerPage + i === userPlace - 1)
        setUserIncluded(true)
    }
    const getDocumentsForCurrentPage = async () => {
      const skip = (currentPage - 1) * usersPerPage;
      const limit = usersPerPage;
      try {
        const resp = await httpClient.get(`http://localhost:5000/users/leaderboard/?skip=${skip}&limit=${limit}`);
        setUsers(resp.data.users)
      } catch (err) {
        console.log(err)
      }
    };

    getDocumentsForCurrentPage() 
  }, [currentPage, usersPerPage, userPlace])

  return (
    <>
    <Button className='menu-button' onClick = {toggleOpen}>Leaderboard</Button>
    <Dialog
      PaperProps={{
        sx: {
          width: '100%'
        }
      }}
      open = {open}
      onClose = {toggleOpen}
      container={() => document.querySelector("#leaderboard-container")}
    >
      <DialogTitle sx={{
        alignSelf : 'center',
        fontWeight: '700',
        fontSize: "1.4rem"
      }}>
        Leaderboard
      </DialogTitle>
      <DialogContent>
        <div className='leaderboard-content'>
          <div className='top-side'>
            <h4 className='user-name-leaderboard'>User name</h4>
            <h4 className='plans-leaderboard'>Plans</h4>
          </div>
          <div className='leaderboard-users'>
              {leaderboardElements}
          </div>
          <LineOfPoints numOfPoints={36}/>
        {!userIncluded &&  <LeaderboardUser 
            name = {data.username} 
            image = {data.image}
            nrPlans= {data.plansCompleted}
            number = {userPlace - 1}
          />}
          <Pagination count = {Math.ceil((users.length + 1)/ usersPerPage)} color = "primary" onChange={handleChange}/>
        </div> 
      </DialogContent>
       
    </Dialog>
    </>
  )
}
