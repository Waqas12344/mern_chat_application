import { Backdrop, Box, Button, Drawer, Grid, IconButton, Stack, TextField, Tooltip, Typography } from '@mui/material'
import React, { Suspense, lazy, memo, useEffect, useState } from 'react'
import {  matBlack, orange } from '../constants/color'
import { Add as AddIcon, Delete as DeleteIcon, Done as DoneIcon, Edit as EditIcon, KeyboardBackspace as KeyboardBackspaceIcon, Menu as MenuIcon } from '@mui/icons-material'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { Link } from '../components/styles/StyledComponents'
import AvatarCard from '../components/shared/AvatarCard'
import { sampleChats, sampleUsers } from '../constants/sampleData'
import UserItem from '../components/shared/UserItem'
const ConfirmDeleteDialog =lazy(()=>import("../components/dialogs/ConfirmDeleteDialog"))
const AddMemberDialog =lazy(()=>import("../components/dialogs/AddMemberDialog"))

const isAddMember=false;
const Groups = () => {
  
  const chatId=useSearchParams()[0].get('group');
  const navigate = useNavigate();


  const [isMobileMenuOpen,setIsMobileMenuOpen]=useState()
  const [isEdit,setIsEdit]=useState(false)
  const [groupName,setGroupName] =useState("Group Name")
  const [groupNameUpdateValue,setGroupNameUpdateValue] =useState("Group Name")
  const [confirmDeleteDialog,setConfirmDeleteDialog] =useState("")
  const handleMobile = () => {
    setIsMobileMenuOpen((prev)=>!prev);
  }

  const handleMobileClose =()=>setIsMobileMenuOpen(false)
const updateGroupName =()=>{
  setIsEdit(false);
  console.log("update group Name")
}



const openConfirmDeleteHandler =()=>{
  setConfirmDeleteDialog(true)
  console.log("Delete Group")
}
const closeConfirmDeleteHandler=()=>{
setConfirmDeleteDialog(false);
}
const openAddMemberHandler=()=>{
  console.log("Add member")
}

const deleteHandler =()=>{
  console.log("Delete Handler");
  closeConfirmDeleteHandler()
}
const removeMemberHandler=(id)=>[
  console.log('remove Member',id)

]

  const navigateBack = () => {
    navigate("/")
  }

  useEffect(()=>{
   if(chatId){
    setGroupName(`Group Name ${chatId}`);
    setGroupNameUpdateValue(`Group Name ${chatId}`)
   }

    return()=>{
      setGroupName("");
      setGroupNameUpdateValue("")
      setIsEdit(false)
    }
  },[chatId])
  const IconBtns = (
    <>
      <Box  sx={{
        display: {
          xs: "block",
          sm: "none",
          position: 'fixed',
          right: "1rem",
          top: "1rem"
        }
      }}>
        <IconButton onClick={handleMobile}>
          <MenuIcon/>
        </IconButton>
      </Box>
      <Tooltip title="back">
        <IconButton 
          sx={{
            position: "absolute",
            top: "2rem",
            left: "2rem",
            bgcolor: matBlack,
            color: "white",
            "&:hover": {
              bgcolor: "rgba(0,0,0,0.7)"
            },
          }}
          onClick={navigateBack}
        >
          <KeyboardBackspaceIcon/>
        </IconButton>
      </Tooltip>
    </>
  )

  const GroupName = <Stack 
  direction={'row'}
   alignItems={'center'}
    spacing={'1rem'}
    padding={'3rem'} 
    justifyContent={'center'} >
    {
      isEdit ? <>
      <TextField onChange={(e)=>setGroupNameUpdateValue(e.target.value)}/>
        <IconButton onClick={updateGroupName}>
          <DoneIcon/>
        </IconButton>
     
      </>  : <>
      <Typography>
       {groupName}
      </Typography>
      <IconButton  onClick={()=>setIsEdit(true)}> <EditIcon/></IconButton>
      </>
    }
  </Stack>

  

const ButtonGroup =(
  <Stack
  direction={{
    xs:'column-reverse',
    sm:'row'
  }}
  spacing={'1rem'}
  p={{
    xs:'0',
    sm:"1rem",
    md:'1rem 4rem'
  }}
  >
    <Button
     size='small' 
     color='error'
      variant='outlined'
       startIcon={<DeleteIcon/>} 
       onClick={openConfirmDeleteHandler}
       >Delete Group</Button>
    <Button
     size='small' 
     variant='contained' 
     startIcon={<AddIcon/>}
     onClick={openAddMemberHandler}
     >Add Member</Button>

  </Stack>
)

  return (
    <Grid container height={"100vh"}>
      <Grid 
        item
        sx={{
          display: {
            xs: "none",
            sm: "block"
          },
        }}
        sm={4}
        
      >
      <GroupList myGroups={sampleChats} chatId={chatId} />
      </Grid>
      <Grid 
        item
        xs={12}
        sm={8}
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems:'center',
          position:'relative',
          padding:"1rem 3rem"
        }}
        position={'relative'}
      >
        {IconBtns}
        {groupName &&<>
        {GroupName}
        <Typography 
        margin={'2rem'}
        alignSelf={'flex-start'}
        variant='body1'
        >
          Members
        </Typography>
        <Stack 
        // bgcolor={orange}
        // border={`3px solid ${orange}`}
        borderRadius={'1rem'}
        maxWidth={'40rem'}
        width={'100%'}
        boxSizing={'border-box'}
        padding={{
          sm:'1rem',
          xs:'0',
          md:'1rem',
        }}
        spacing={'2rem'}
        height={'50vh'}
        overflow={"auto"}
      
        >
{
  sampleUsers.map((i)=>(
    <UserItem user={i} key={i._id} isAdded  styling={{
      boxShadow:'0 0 0.5rem rgba(0,0,0,0.2)',
      padding:'1rem 2rem ',
      borderRadius:'1rem',
      bgcolor:orange
    }} 
    handler={removeMemberHandler} />
  ))
}


        </Stack>
        {ButtonGroup}
        </>}
      </Grid>

      {
        isAddMember && (
          <Suspense fallback={<Backdrop open/>} >
          <AddMemberDialog/>
        </Suspense>
        )
      }

      {
        confirmDeleteDialog && (
          <Suspense fallback={<Backdrop open/>} >
            <ConfirmDeleteDialog open={confirmDeleteDialog} handleClose={closeConfirmDeleteHandler}  deleteHandler={deleteHandler}/>
          </Suspense>
        )
      }
      <Drawer sx={{
        display:{
          xs:"block",
          sm:"none"
        },
        
      }} open={isMobileMenuOpen} onClose={handleMobileClose}>
<GroupList myGroups={sampleChats} />
      </Drawer>
    </Grid>
  )
}

const GroupList = ({w="100%", myGroups=[],chatId})=>(
  <Stack width={w}
  bgcolor={orange}
  height={"100%"}
  >
    {
      myGroups.length>0 ? (
        myGroups.map((group)=><GroupListItem  group={group} chatId={chatId} key={group._id} />)
      ) :(
        <Typography  textAlign={'center'}>  
          No Group
        </Typography>
      )
    }
  </Stack>
)

const GroupListItem =memo(({group,chatId})=>{
  const {name,avatar,_id} =group;
  return <Link to={`?group=${_id}`} onClick={(e)=>{
    if (chatId === _id) e.preventDefault();
  }}>
  <Stack direction={"row"} spacing={"1rem"} alignItems={"center"}>
    <AvatarCard avatar={avatar} />
    <Typography style={{
      marginLeft:"3rem"
    }}>
      {name}
    </Typography>
  </Stack> 
    </Link>
}
)
export default Groups
