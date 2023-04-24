import React,{useEffect} from 'react'
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, IconButton} from '@mui/material'
import Confetti from 'react-confetti';
import {useParams} from 'react-router-dom'
import httpClient from '../../httpClient';

export default function PlanCompleted({open, handleClose, togglePlanDeleted}) {

    const {id} = useParams()

    const handleDelete = async () => {
       
        try {
             await httpClient.delete(`http://localhost:5000/plans/${id}`)
            togglePlanDeleted()
            handleClose()
            window.location.reload()
        } catch (err) {

            console.log(err)
        }
    }
    useEffect(() => {
        const planCompleted = async () => {
            try {
            
                 await httpClient.get(`http://localhost:5000/plans/completed/${id}`)
            } catch (err) {
                console.log(err)
            }
        }
        planCompleted()
    },[id])
  return (
    <Dialog
        open = {open}
        onClose={handleClose}
        PaperProps={{
            sx:{
                width: '500px',
                overflow: 'hidden'
            }
        }}
    >   
        <Confetti
            width={500}
            height={300}
            numberOfPieces={1000}
            recycle={false}
        />

        <DialogTitle sx={{
            display:'flex',
            justifyContent:'space-between',
        }}
        className='plan-completed-top'
        >
            Congratulations!
            <IconButton onClick = {handleClose} className='close-button'>
                <i className='fa-solid fa-xmark'></i>
            </IconButton>
        </DialogTitle>
        <DialogContent>
            <p>You have completed your plan!</p>
            <p>You can now make a new plan.</p>
        </DialogContent>
        <DialogActions sx={{
            display:'flex',
            flexDirection: 'column',
        }}>
            <Button onClick={handleDelete}>Delete plan</Button>
        </DialogActions>
    </Dialog>
  )
}
