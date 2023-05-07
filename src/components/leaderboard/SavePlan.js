import React, {useState} from 'react'
import { Dialog, DialogActions, DialogContent, DialogTitle, Button } from '@mui/material'
import httpClient from '../../httpClient'
import { useParams } from 'react-router-dom'

export default function SavePlan({open, handleClose, planData, changeData}) {

    const {id} = useParams()

    const [error, setError] = useState("")
    const handleSave = async () => {
        
        try {
            await httpClient.patch(`http://localhost:5000/plans/${id}`,{
                content: planData.content
            })
            handleClose()
        } catch (err) {
            if(err.response.status === 403)
                setError(err.response.data.error)
            console.log(err)
        }
    }
  return (
    <Dialog
        open = {open}
        onClose={() => {
            handleClose()
            changeData()
        }}
    >
    <DialogTitle sx={{
        fontSize: '1.2rem',
        fontWeight: '700'
    }}>Are you sure?</DialogTitle>
    <DialogContent>
        <p>The changes you make are not reversible</p>
        {error && <span className='error'>{error}</span>}
    </DialogContent>
    <DialogActions>
        <Button onClick = {handleSave} className='save-button'>Save</Button>
        <Button onClick = {() => {
            handleClose()
            changeData()
        }}>Cancel</Button>
    </DialogActions>
    </Dialog>
  )
}
