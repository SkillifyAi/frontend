import React, {useState} from 'react'
import { Dialog, DialogActions, DialogContent, DialogTitle, Button } from '@mui/material'
import httpClient from '../../httpClient'
import { useParams } from 'react-router-dom'

export default function DeletPlan({open, handleClose, togglePlanDeleted}) {

    const [error, setError] = useState("")

    const { id } = useParams()

    const handleDelete = async () => {
      
        try {
            await httpClient.delete(`http://localhost:5000/plans/${id}`)
            togglePlanDeleted()
            handleClose()
            window.location.reload()
        } catch (err) {
            if(err.response.status === 403)
                setError(err.response.data.error)
            console.log(err)
        }
    }
  return (
    <Dialog
        open = {open}
        onClose={handleClose}
    >
    <DialogTitle sx={{
        fontSize: '1.2rem',
        fontWeight: '700'
    }}>Are you sure?</DialogTitle>
    <DialogContent>
        <p>Once you delete it, you can`t recover the data</p>
        {error && <span className='error'>{error}</span>}
    </DialogContent>
    <DialogActions>
        <Button onClick = {handleDelete} className='delete-button'>Delete</Button>
        <Button onClick = {handleClose} >Cancel</Button>
    </DialogActions>
    </Dialog>
  )
}
