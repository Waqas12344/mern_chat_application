import { Avatar, Button, Dialog, DialogTitle, ListItem, Stack, Typography } from '@mui/material'
import React, { memo } from 'react'
import { sampleNotification } from '../../constants/sampleData'

const Notifications = () => {
  const friendRequestHandler=({_id,accept})=>{

  }
  return (
    <Dialog open>
      <Stack p={{ xs: "1rem", sm: "2rem" }} maxWidth={"35rem"}>
        <DialogTitle>
          Notification
        </DialogTitle>

        {
          sampleNotification.length > 0 ? (
          sampleNotification.map(({sender,_id})=>(
<NotificationItem 
sender={sender}
_id={_id}
handler={friendRequestHandler}
key={_id}
/>
          ))
          ) : (
          <Typography>O Notification</Typography>
          )
        }
      </Stack>
    </Dialog>
  )
}


const NotificationItem = memo(({sender,_id,handler})=>{
  const {name,avater}=sender;
  return (
    <ListItem sx={{
      // bgcolor:"red"
  }}>
      <Stack
      alignContent={"center"}
      direction="row"
      spacing="1rem"
      width="100%"
      
      >
          <Avatar src={avater} />
          <Typography
          variant='body1'
          sx={{
              flexGrow:1,
              display:"-webkit-flex",
              WebkitLineClamp:1,
              WebkitBoxOrient:"vertical",
              width:"100%",
              textOverflow:"ellipsis"
          }}
          >{`${name} send you a Friend Request`}</Typography>
       <Stack direction={{
        xs:'column',sm:'row'
       }}>
        <Button onClick={()=>handler({_id,accept:true})}>Accept</Button>
        <Button color='error' onClick={()=>handler({_id,accept:false})}>Reject</Button>
       </Stack>
      </Stack>
  </ListItem>
  )
})

export default Notifications;